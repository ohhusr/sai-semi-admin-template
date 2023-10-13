import Mock from 'mockjs';

Mock.mock('/api/login', 'post', (params) => {
  const { username, password } = JSON.parse(params.body);
  console.log(params.body);
  if (!username) {
    return {
      status: 'error',
      msg: '用户名不能为空',
    };
  }
  if (!password) {
    return {
      status: 'error',
      msg: '密码不能为空',
    };
  }
  if (username === 'admin' && password === 'admin') {
    return {
      status: 'ok',
      data: {
        token: 'ffb7cefd-02cb-4853-8238-c0292cf988d5'
      }
    };
  }
  return {
    status: 'error',
    msg: '账号或者密码错误',
  };
});

Mock.mock('/api/userInfo', () => {
  return Mock.mock({
    name: '王立群',
    avatar:
      'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
    email: 'wangliqun@email.com',
    job: 'frontend',
    jobName: '前端开发工程师',
    organization: 'Frontend',
    organizationName: '前端',
    location: 'beijing',
    locationName: '北京',
    introduction: '王力群并非是一个真实存在的人。',
    personalWebsite: 'https://www.arco.design',
    verified: true,
    phoneNumber: /177[*]{6}[0-9]{2}/,
    accountId: /[a-z]{4}[-][0-9]{8}/,
    registrationTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  });
});
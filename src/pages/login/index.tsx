import {useEffect} from 'react';
import { Button, Checkbox, Form } from '@douyinfe/semi-ui';
import axios from 'axios';

const Login = () => {
  const login = (values: any) => {
    axios.post('/api/login', values).then(res => {
      localStorage.setItem('token', res.data.data.token)
      window.location.href = '/';
    })
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/';
    }
  }, [])
  return (
    <div className="flex flex-col items-center gap-y-[0px] h-[100vh] bg-[rgb(var(--semi-grey-0))] overflow-hidden">
      <div className="self-stretch grow basis-[0] flex flex-col justify-center items-center gap-y-[10px] p-[10px]">
        <div className="shrink-0 flex flex-col items-center gap-y-[30px] py-[48px] px-[56px] w-[440px] rounded-[8px] bg-[color:var(--semi-color-bg-0)]">
          <div className="shrink-0 inline-flex flex-col items-center gap-y-[24px] rounded-[8px]">
            <div className="shrink-0 inline-flex flex-col justify-center items-center gap-y-[6px]">
              <p className="shrink-0 min-w-[128px] font-['PingFang SC'] text-[32px] text-[color:var(--semi-color-text-0)] leading-[44px] text-center align-middle font-[600]">
                欢迎回来
              </p>
            </div>
          </div>
          <div className="self-stretch shrink-0 flex flex-col items-start gap-y-[28px]">
            <Form
              onSubmit={(values) => login(values)}
              className="self-stretch shrink-0 flex flex-col items-start gap-y-[24px]"
            >
              <Form.Input
                label={{ text: '用户名' }}
                field="username"
                placeholder="输入用户名"
                style={{ width: '100%' }}
                fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
              />
              <Form.Input
                label={{ text: '密码' }}
                field="password"
                placeholder="输入密码"
                style={{ width: '100%' }}
                fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
              />
              <Checkbox type="default">记住我</Checkbox>
              <Button
                theme="solid"
                htmlType="submit"
                type="primary"
                block
                className="h-[40px]"
              >
                登录
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

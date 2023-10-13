import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import { RouteProps } from '@douyinfe/semi-ui/lib/es/breadcrumb';
import Breadcrumb from './components/Breadcrumb';
import Header from './components/Header';
import Sider from './components/Sider';
import { IRoute, routes } from './routes';

const { Content } = Layout;

const PageLayout = () => {
  const currentRoute = useLocation();
  const navigateTo = useNavigate();
  const [subMenus, setSubMenus] = useState<IRoute[]>([]);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState(
    currentRoute.pathname.slice(1),
  );
  const [breadcrumb, setBreadcrumb] = useState<Array<RouteProps | string>>([]);

  const handleSelect = (key: any) => {
    const match: IRoute | undefined = routes
      ?.filter((menu) => !menu.hidden && menu.path === '*')[0]
      .children?.find((menu) => {
        return menu.path === key.itemKey;
      });
    setSubMenus(match?.children || []);
    if (
      (key.itemKey && key.selectedKeys?.length > 0) ||
      defaultSelectedKey.split('/').length === 1
    ) {
      loadBreadcrumb(match?.children ? match?.children[0].path : undefined);
      navigateTo(match?.children ? match?.children[0].path : '/');
      return;
    }
    if (defaultSelectedKey.split('/').length !== 1) {
      loadBreadcrumb(currentRoute.pathname.slice(1));
    }
  };
  const handleSelectSub = (key: any) => {
    loadBreadcrumb(key.itemKey);
    navigateTo(key.itemKey);
  };

  const loadBreadcrumb = (path: string | undefined) => {
    if (path) {
      const paths = path.split('/');
      const p: IRoute | undefined = routes
        ?.filter((menu) => !menu.hidden && menu.path === '*')[0]
        .children?.find((ele) => ele.path === paths[0]);
      const cp = p?.children?.find((ele) => ele.path === path);
      setBreadcrumb([{ path: p?.path, name: p?.title }, cp?.title ?? '-']);
    }
  };
  useEffect(() => {
    setDefaultSelectedKey(currentRoute.pathname.slice(1));
    handleSelect({ itemKey: currentRoute.pathname.slice(1).split('/')[0] });
  }, [currentRoute.pathname]);

  return (
    <Layout
      className="h-[100vh]"
      style={{ border: '1px solid var(--semi-color-border)' }}
    >
      <Header
        menus={routes}
        defaultSelectedKeys={[defaultSelectedKey.split('/')[0]]}
        onSelect={(key: any) => handleSelect(key)}
      />
      <Layout>
        <Sider
          menus={subMenus}
          defaultSelectedKeys={[defaultSelectedKey]}
          onSelect={(key: any) => handleSelectSub(key)}
        />
        <Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}
        >
          <Breadcrumb routes={breadcrumb} />
          <div className="rounded-lg border border-[var(--semi-color-border)] border-solid p-[20px]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;

import React, { lazy, Suspense } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';

export type IRoute = {
  title: string;
  path: string;
  children?: IRoute[];
  hidden?: boolean;
  redirect?: string;
  icon?: React.ReactElement<any>;
  element?: React.LazyExoticComponent<any>;
};

export const routes: IRoute[] = [
  {
    path: '/',
    title: '首页',
    hidden: true,
    redirect: '/demo',
  },
  {
    path: '*',
    title: '首页',
    element: lazy(() => import('./layout')),
    children: [
      {
        path: 'demo',
        title: 'demo',
        children: [
          {
            path: 'demo/demo-1',
            title: 'demo-1',
            icon: <IconHistogram />,
            element: lazy(() => import('./pages/demo')),
          },
          {
            path: 'demo/demo-2',
            title: 'demo-2',
            icon: <IconLive />,
            element: lazy(() => import('./pages/skeleton')),
          },
        ],
      },
      {
        path: 'demo2',
        title: 'demo2',
        children: [
          {
            path: 'demo2/demo-2',
            title: 'demo-2',
            icon: <IconSetting />,
            element: lazy(() => import('./pages/timeline')),
          },
        ],
      },
    ],
  },
  {
    title: '登录',
    path: '/login',
    hidden: true,
    element: lazy(() => import('./pages/login')),
  },
];

const loadElement = (route: IRoute) => {
  let ele: React.ReactNode = undefined;
  if (route.element) {
    ele = (
      <Suspense fallback={<div>路由加载ing...</div>}>
        <route.element />
      </Suspense>
    );
  } else if (route.redirect) {
    ele = <Navigate to={route.redirect} />;
  } else {
    console.error('路由配置不正确');
  }
  return ele;
};

const syncRouter = (table: IRoute[]): RouteObject[] => {
  let mRouteTable: RouteObject[] = [];
  table.forEach((route) => {
    let childrens: RouteObject[] = [];
    if (route.children && route.children.length > 0) {
      for (let index = 0; index < route.children.length; index++) {
        if (route.children[index].children) {
          let child: RouteObject[] =
            route.children[index].children?.map((m) => {
              const cc: RouteObject = { path: m.path, element: loadElement(m) };
              return cc;
            }) || [];
          childrens = childrens.concat(child);
        }
      }
    }
    mRouteTable.push({
      path: route.path,
      element: loadElement(route),
      children: childrens,
    });
  });
  return mRouteTable;
};

export function SyncRouter() {
  return useRoutes(syncRouter(routes));
}

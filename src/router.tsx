/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-26 12:55:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/src/router.tsx
 */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Spinner from '@/components/Spinner';

import Layout from '@/layouts';

const Demo = lazy(() => import('@/views/demo') as Promise<any>)

export const routerConfig: RouteProps[] = [
  {
    exact: true,
    path: '/demo/:id',
    component: Demo,
  },
];

const Router = () => (
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <Layout>
        <Switch>
          {routerConfig.map(props => (
            <Route {...props} key={props.path as string} />
          ))}
          <Redirect to="/demo/1" />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Suspense>
);

export default Router;

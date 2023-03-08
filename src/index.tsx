/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-27 20:04:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/src/index.tsx
 */
/* node_modules模块 */
import 'react-hot-loader';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import sniffing from '@xmly/sniffing-sdk';
import { initSDK } from '@/utils/jssdk';
import { apm, start as initLog } from '@xmly/xmrep';
import events from '@/events';

/* alias模块 */
import { env } from '@/utils';

/* 相对模块 */
import App from './app';

/* 图片以及样式等静态资源 */
import '@/common/scripts/rem';
import '@/common/styles/index.scss';

if (!env.isProd) {
  // 动态import vconsole，避免打包到同一个vendor，影响打包体积
  // 虽然打包了 但prod环境永远不会加载这部分js
  (async () => {
    const { default: VConsole } = await import(/* webpackChunkName: "vconsole" */ 'vconsole');
    new VConsole();
  })();
}

sniffing.init(events, {
  autoExpo: true,
  xmrep: {
    start: initLog,
    params: {
      b: '255',
    },
  },
});

if (!env.isDev) {
  Sentry.init({
    dsn: '',
    release: process.env.REACT_APP_ENV,
  });
}

apm.init({ name: '--app-name' });

const start = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

initSDK(start, start);

// 环境变量
const REACT_APP_ENV = process.env.REACT_APP_ENV;
// 发布源
const repName = 'yx';
// 应用名称
const appName = '{{appName}}';
// 输出目录
const output = 'dist';

module.exports = {
  repName,
  appName,
  output,

  // 静态资源引用路径
  publicPath: {
    test: `//static2.test.ximalaya.com/${repName}/${appName}/last/${output}/`,
    uat: `//s1.uat.xmcdn.com/${repName}/${appName}/last/${output}/`,
    prod: `//s1.xmcdn.com/${repName}/${appName}/last/${output}/`
  },

  // 打包是否开启sourceMap
  shouldUseSourceMap: true,

  // 定义环境变量 注入前端应用
  define: { REACT_APP_ENV },

  // 接口代理
  proxy: {
    '/redefine-ambassador-web/*': {
      target: 'https://m.ximalaya.com',
      changeOrigin: true
    }
  },

  /* 以下选项开启 请务必保证前端独立发布，用户访问到的是每次前端打包的html，而非托管于后端的html */

  // 是否开启代码分割(loadable-components + content-hash + long-term caching)
  codeSplitting: true,

  // 是否将模块引用关系runtime打入html
  shouldInlineRuntimeChunk: false
};

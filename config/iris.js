/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-26 11:01:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/config/iris.js
 */
const irisConfig = require('../iris.config');
const _ = require('lodash');

const defaultConfig = {
  proxy: {},
  define: {},
  shouldUseSourceMap: true,
  codeSplitting: false,
  shouldInlineRuntimeChunk: false
};

module.exports = _.merge(defaultConfig, irisConfig);

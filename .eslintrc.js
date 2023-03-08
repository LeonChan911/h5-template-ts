/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-26 14:19:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/.eslintrc.js
 */
// @ts-nocheck
const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: { Sentry: 0 },
  rules: {
    ...strictEslint.rules,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/camelcase': 0,
    'react/sort-comp': 0,
    'react/jsx-boolean-value': 0,
    'react/no-did-update-set-state': 1,
    'react/no-array-index-key': 0,
    'react/self-closing-comp': 1,
    'no-undef': 0,
    'import/order': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'jsx-a11y/img-redundant-alt': 0,
    'no-unused-expressions': 0,
    'no-nested-ternary': 0,
    'no-new': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'eslint-comments/no-unlimited-disable': 0,
    'react/no-find-dom-node': 0,
    'import/extensions': 0,
    'max-len': [2, 120],
  },
};

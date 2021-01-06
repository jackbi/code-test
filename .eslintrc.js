/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-23 14:25:52
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 0,
    "prettier/prettier": "off"
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: false
    //   }
    // ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
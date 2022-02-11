/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2021-02-25 16:19:35
 * @LastEditors: wenbin
 * @LastEditTime: 2022-01-25 10:50:20
 */
const path = require("path");
const { name } = require("./package");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const appName = process.env.VUE_APP_MAGUS_LOCAL_APP_NAME;

const port = 8002; // dev port
module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  lintOnSave: !IS_PROD, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // publicPath: `/child/${appName}/`,
  publicPath: "/",
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 跨域
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api/platform/*": {
        target: "http://192.168.30.11:12000", //网关
        changeOrigin: true, //跨域
        pathRewrite: {
          "^/api/platform": "",
        },
      },
      "/api/msgCenter/*": {
        target: "http://192.168.20.30:15000", //网关
        changeOrigin: true, //跨域
        pathRewrite: {
          "^/api/msgCenter": "",
        },
      },
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@assets": resolve("src/assets"),
        "@components": resolve("src/components"),
        "@views": resolve("src/views"),
        "@store": resolve("src/store"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式(必须)
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};

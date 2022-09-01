/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: wenbin
 * @LastEditTime: 2022-02-11 10:38:51
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import magusPlugin from "@jwb_magus/magus-plugin";

import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
import "handsontable/languages/zh-CN";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./utils/plugin";
import "./utils/flexible.js";
import "./utils/webcomponents";

Vue.use(ElementUI);
Vue.prototype.$handsontable = Handsontable;
Vue.component("HotTable", HotTable);

window.hookAJAX = function(token) {
  let req = XMLHttpRequest;
  (function(open, send) {
    XMLHttpRequest.prototype.open = function() {
      open.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      this.setRequestHeader("Authorization", `Bearer ${token}`);
      send.apply(this, arguments);
    };
  })(req.prototype.open, XMLHttpRequest.prototype.send);
};

Vue.config.productionTip = false;

Vue.use(magusPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

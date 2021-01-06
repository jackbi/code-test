/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 14:24:46
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Handsontable from 'handsontable';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/plugin';
import 'handsontable/dist/handsontable.full.css';
import 'handsontable/languages/zh-CN';
import './utils/flexible.js';
Vue.use(ElementUI);
Vue.prototype.$handsontable = Handsontable;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

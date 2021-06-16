/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: wenbin
 * @LastEditTime: 2021-03-23 14:41:25
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import magusPlugin from '@jwb_magus/magus-plugin'

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

console.log(magusPlugin);

Vue.use(magusPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
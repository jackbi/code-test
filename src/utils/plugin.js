/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-08-10 10:56:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 09:40:15
 */
import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

import {
  Button,
  Layout,
  Menu,
  icon,
  breadcrumb,
  Modal,
  Row,
  Col
} from 'ant-design-vue';
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(icon);
Vue.use(icon);
Vue.use(breadcrumb);
Vue.use(Modal);
Vue.use(Row);
Vue.use(Col);

Vue.component('vue-draggable-resizable', VueDraggableResizable);

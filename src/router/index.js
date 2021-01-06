/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 09:44:39
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'entrance',
  component: () => import('@/views/entrance/index'),
  children: [{
      path: 'mxgraph-style',
      name: 'mxgraphStyle',
      component: () => import('@/views/mxgraph-text/index')
    },
    {
      path: 'mxgraph-toobar',
      name: 'mxgraphToobar',
      component: () => import('@/views/mxgraph-text/toobar')
    },
    {
      path: 'mxgraph-codec',
      name: 'mxgraphCodec',
      component: () => import('@/views/mxgraph-text/codec')
    },
    {
      path: 'mxgraph-anchors',
      name: 'mxgraphaAchors',
      component: () => import('@/views/mxgraph-text/anchors')
    },
    {
      path: 'goJs-basic',
      name: 'goJsBasic',
      component: () => import('@/views/goJs/index')
    },
    {
      path: 'goJs-test',
      name: 'goJsTest',
      component: () => import('@/views/goTest/index.vue')
    },
    {
      path: 'goJs-view',
      name: 'goJsView',
      component: () => import('@/views/goView/index.vue')
    },
    {
      path: 'resize-layout',
      name: 'resizeLayout',
      component: () => import('@/views/resizeLayout/index')
    },
    {
      path: 'other-test',
      name: 'otherTest',
      component: () => import('@/views/otherTest/index')
    }
  ]
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
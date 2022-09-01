<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-10 10:46:36
 * @LastEditors: wenbin
 * @LastEditTime: 2022-01-27 11:24:43
-->
<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['mxgraph-text']"
          :default-open-keys="['mxgraph-text']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="mxgraph-text">
            <span slot="title"><a-icon type="user" />mxgraph-text</span>
            <a-menu-item key="1-1">
              <router-link to="mxgraph-style">mxgraph改变样式</router-link>
            </a-menu-item>
            <a-menu-item key="1-2">
              <router-link to="mxgraph-toobar">mxgraph左侧图形</router-link>
            </a-menu-item>
            <a-menu-item key="1-3">
              <router-link to="mxgraph-codec">通过XML展示图形</router-link>
            </a-menu-item>
            <a-menu-item key="1-4">
              <router-link to="mxgraph-anchors">mxgraph锚点</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="goJs-text">
            <span slot="title"><a-icon type="user" />goJs-text</span>
            <a-menu-item key="2-1">
              <router-link to="goJs-basic">goJs基本设置</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="go-text">
            <span slot="title"><a-icon type="user" />goJs-text</span>
            <a-menu-item key="2-2">
              <router-link to="goJs-test">goJs-test</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="resize-layout">
            <span slot="title"><a-icon type="user" />拖拉拽测试</span>
            <a-menu-item key="3-1">
              <router-link to="resize-layout">基本面板</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="other-test">
            <span slot="title"><a-icon type="user" />其他测试</span>
            <a-menu-item key="4-1">
              <router-link to="other-test">基本面板</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="echart-test">
            <span slot="title"><a-icon type="user" />图表测试</span>
            <a-menu-item key="5-1">
              <router-link to="echart-test">实时图表测试</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="three-js-test">
            <span slot="title"><a-icon type="user" />threeJs3D测试</span>
            <a-menu-item key="6-1">
              <router-link to="three-js-test">立方体测试</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="web-components-test">
            <span slot="title"><a-icon type="user" />webComponent测试</span>
            <a-menu-item key="7-1">
              <router-link to="web-components-test"
                >webComponent-test1</router-link
              >
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="handsontable-test">
            <span slot="title"><a-icon type="user" />handsontable测试</span>
            <a-menu-item key="8-1">
              <router-link to="handsontable-test"
                >handsontable-test1</router-link
              >
            </a-menu-item>
            <a-menu-item key="8-2">
              <router-link to="handsontable-test2">创建表格</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout class="layout-content" style="padding: 0 24px 24px">
        <a-breadcrumb class="layout-breadcrumb" style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <slot name="content"></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style lang="less" scoped>
#components-layout-demo-top-side-2 {
  height: 100%;
  .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
  .layout-breadcrumb {
    text-align: left;
  }
}
</style>

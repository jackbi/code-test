<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-11 14:47:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-12 10:55:19
-->
<template>
  <section style="height: 100%;">
    <div style="text-align: right;">
        <a-button @click="goView" value="samll" style="margin-right:10px" type="primary">预览</a-button>
        <a-button @click="goSave" value="small" type="primary">保存</a-button>
    </div>
    <a-row style="height: 100%;" :gutter="[16, 16]">
      <a-col style="height: 100%;" :span="4">
        <div
          id="myPaletteDiv"
          style="width: 100%; height: 100%; margin-right: 2px; background-color: #eee; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
        ></div>
      </a-col>
      <a-col style="height: 100%;" :span="20">
        <div
          id="myDiagramDiv"
          style=" height: 100%; background-color:#eee; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
        ></div>
      </a-col>
    </a-row>
    <!-- 配置节点 -->
    <node-config 
    :nodeJson="nodeJson"
    v-if="showNodeConfig" 
    @closeDialog="closeDialog"
    @updateNode="updateNode"></node-config>
  </section>
</template>

<script>
import createDuBang from './index.js';
import NodeConfig from './components/NodeConfig'
export default {
  components: { NodeConfig },
  data() {
    return {
        newCreate: {},
        nodeJson: {}, // 节点传过来的json
        showNodeConfig: false, // 弹窗组件显示
    };
  }, 
  computed: {},
  watch: {},
  methods: {
    clickNode(data) { // 用于接收diagram上的双击事件
      this.nodeJson = data
      this.showNodeConfig = true
    },
    closeDialog() {
      this.nodeJson = {}
      this.showNodeConfig = false
    },
    updateNode(e) { // 改变node的颜色
      this.newCreate.change(e)
      this.closeDialog()
    },
    initDubang() {
        let params = {
            leftName: 'myPaletteDiv',
            rightName: 'myDiagramDiv',
            globalFontColor: '#606266',
        };
        let newCreate = new createDuBang(params);
        this.newCreate = newCreate;
        newCreate.init();
        if(localStorage.getItem('goNodeData')) { // 如果是从预览跳过来的
            this.newCreate.load(JSON.parse(localStorage.getItem('goNodeData')));
        }
    },
    goView() { // 预览
        localStorage.removeItem('goNodeData')
        let jsonData = this.newCreate.getJson();
        if(JSON.parse(jsonData).nodeDataArray.length < 1 ) {
            return;
        }
        localStorage.setItem('goNodeData',jsonData)
        this.$router.push({name:'goJsView'})
    },
    goSave() { // 保存
      let jsonData = this.newCreate.getJson();
      console.log(jsonData)
      // this.newCreate.load(JSON.parse(jsonData));
      // this.px2rem(jsonData)
    },
    px2rem (strObj) { // 保存时像素格式转成rem
        let nodeData = JSON.parse(strObj)
        nodeData.nodeDataArray.map(x=> {
            x.font = ( x.font.split('px')[0] / 192 ).toFixed(3) + 'rem Helvetica, Arial, sans-serif'
        })
    },
    rem2px(jsonData) { // 读取时像素格式转成px
        let strObj = Object.assign({},jsonData)
        strObj.map(x=> {
            x.font = Math.round( parseInt( x.font.split('rem')[0] * 192 ) ) + 'px Helvetica, Arial, sans-serif'
        })
        return strObj
    },
  },
  created() {},
  mounted() {
    window.doubleClickNode = this.clickNode
    this.initDubang();
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang="scss" scoped></style>

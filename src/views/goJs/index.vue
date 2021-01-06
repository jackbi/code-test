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
      <a-button @click="goSave" value="small" type="primary">保存</a-button>
    </div>
    <a-row style="height: 100%;" :gutter="[16, 16]">
      <a-col style="height: 100%;" :span="4">
        <div
          id="myPaletteDiv"
          style="width: 100%; height: 100%; margin-right: 2px; background-color: rgb(40, 44, 52); position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
        ></div>
      </a-col>
      <a-col style="height: 100%;" :span="20">
        <div
          id="myDiagramDiv"
          style=" height: 100%; background-color: rgb(40, 44, 52); position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
        ></div>
      </a-col>
    </a-row>
    <!-- <div style="width: 100%; display: flex; justify-content: space-between">
      <div
        id="myPaletteDiv"
        style="width: 100px; margin-right: 2px; background-color: rgb(40, 44, 52); position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
      ></div>
      <div
        id="myDiagramDiv"
        style="flex-grow: 1; heght: 100%; background-color: rgb(40, 44, 52); position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
      ></div>
    </div> -->
  </section>
</template>

<script>
import createDuBang from '@/utils/goJs';
export default {
  components: {},
  data() {
    return {
      newCreate: {}
    };
  }, 
  computed: {},
  watch: {},
  methods: {
    initDubang() {
      let params = {
        leftName: 'myPaletteDiv',
        rightName: 'myDiagramDiv'
      };
      let newCreate = new createDuBang(params);
      this.newCreate = newCreate;
      newCreate.init();
    },
    goSave() {
      let jsonData = this.newCreate.getJson();
      // console.log(jsonData);
      console.log(JSON.parse(jsonData));
      this.newCreate.load(JSON.parse(jsonData));
    }
  },
  created() {},
  mounted() {
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

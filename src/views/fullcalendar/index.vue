<!--
 * @Description: 
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-10-17 09:51:40
 * @LastEditors: wenbin
 * @LastEditTime: 2022-10-17 15:32:22
 * @FilePath: /bi-table-test/src/views/fullcalendar/index.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <div class="fullcalendar-demo">
    <custom-fullcalendar
      @dateClick="dateClick"
      @eventClick="eventClick"
      v-model="events"
    ></custom-fullcalendar>
  </div>
</template>

<script>
import customFullcalendar from "../../components/customFullcalendar.vue";
export default {
  name: "fullcalendar-demo-default",
  components: {
    customFullcalendar,
  },
  data() {
    return {
      events: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      this.getEvents();
    },
    /**
     * @description: 获取所有的事件
     * @return {*}
     */

    getEvents() {
      const datas = [];
      for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 2; j++) {
          datas.push({
            title: `测试${i + j}`,
            start: i + 1 < 10 ? `2022-10-0${i + 1}` : `2022-10-${i + 1}`,
            end: i + 1 < 10 ? `2022-10-0${i + 1}` : `2022-10-${i + 1}`,
            color: "#409EFF",
          });
        }
      }
      setTimeout(() => {
        this.events = datas;
      }, 1000);
    },
    dateClick(val) {
      console.log(val);
    },
    eventClick(val) {
      console.log(val);
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.fullcalendar-demo {
  width: 100%;
  height: 100%;
}
</style>

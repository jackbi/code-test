<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-23 14:16:28
 * @LastEditors: wenbin
 * @LastEditTime: 2021-06-16 15:59:55
-->
<template>
  <div class="test-auto-scroll">
    <testComponent></testComponent>
    <div class="scroll-content">
      <button @click="cancel">取消订阅</button>
      <div style="height: 100%; padding: 0 20px">
        <template v-for="round in [0, 1]">
          <template class="event-block" v-for="(detail, idx) in dataList">
            <template v-if="round ? idx < beginIdx : idx >= beginIdx">
              <div class="event-block" :key="round + '-' + idx">
                <span>{{ detail.value }}</span>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import socketJs from "../../common/utils/socket";
export default {
  data() {
    return {
      data: [
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:01",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:02",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:03",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:04",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:05",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:06",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:07",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:08",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:09",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:10",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:11",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:12",
        },
        {
          value: "测试自动滚动的数据——2020-01-19 02:03:13",
        },
      ],
      beginIdx: 0,
      testSocket: null,
    };
  },
  components: {},
  computed: {
    dataList() {
      this.$nextTick(() => {
        this.scrollView();
      });
      if (!this.data) return [];
      return this.data;
    },
  },
  mounted() {
    this.scrollView();
    this.connectSocket();
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    connectSocket() {
      this.testSocket = new socketJs("http://192.168.30.101:20000/stomp");
      this.testSocket.connect(() => {
        // this.testSocket.subscribe(
        //   "/app/mlink/9QQ3L8EH/deviceinfo/monitor/upload",
        //   (res) => {
        //     // console.log("页面参数", res);
        //     if (res && res.data) {
        //       this.testSocket.subscribe(res.data.topic, (response) => {
        //         console.log("topic", response);
        //       });
        //     }
        //   }
        // );
        this.testSocket.subscribe("/user/queue/msg", (res) => {
          console.log("queue", res);
        });
        this.testSocket.subscribe("/queue/msg", (res) => {
          console.log("queueMsg", res);
        });
        // this.testSocket.subscribe("/topic/zjw", (res) => {
        //   console.log("页面参数", res);
        // });
      });
    },
    cancel() {
      this.testSocket.sender("/app/send/9QQ3L8EH/msg", { a: 1111, b: 2222 });
    },
    scrollUp() {
      let beginIdx = this.beginIdx + 1;
      this.beginIdx = beginIdx % this.dataList.length;
    },
    scrollView() {
      this.clearInterval();
      this.box = document.querySelector(".test-auto-scroll");
      this.content = document.querySelector(
        ".test-auto-scroll .scroll-content"
      );
      if (this.content.clientHeight <= this.box.clientHeight) return; // 无需滚动
      this.scrollInterval = setInterval(this.scrollUp, 2000);
    },
    clearInterval() {
      if (this.scrollInterval) {
        this.beginIdx = 0;
        clearInterval(this.scrollInterval);
        this.scrollInterval = null;
      }
    },
  },
  beforeDestroy() {
    if (this.testSocket) {
      this.testSocket.disconnect();
    }
  },
};
</script>
<style lang="less" scoped>
.test-auto-scroll {
  position: relative;
  overflow: hidden;
  height: 200px;

  .event-block {
    text-indent: 2em;
    font-size: 12px;
    color: #333;
    letter-spacing: 0;
    text-align: justify;
    word-break: break-all;
    padding: 5px 0;
    border-bottom: 1px solid #173279;
  }
}
</style>

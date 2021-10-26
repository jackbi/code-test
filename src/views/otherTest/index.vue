<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-23 14:16:28
 * @LastEditors: wenbin
 * @LastEditTime: 2021-10-26 13:52:27
-->
<template>
  <!-- class="test-auto-scroll" -->
  <div style="width: 100%; height: 100%">
    <el-row style="margin-bottom: 15px;">
      <el-col :span="12">
        <el-input
          type="text"
          v-model="token"
          placeholder="websocket地址"
        ></el-input>
        <el-button type="primary" @click="setToken">设置token</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 15px;">
      <el-col :span="12">
        <el-input
          type="text"
          v-model="socketUrl"
          placeholder="websocket地址"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="connectSocket">创建链接</el-button>
        <el-button type="primary" @click="disconnect">关闭连接</el-button>
      </el-col>
      <el-col :span="6">
        {{ isLink ? "已连接" : "未连接" }}
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 15px;">
      <el-col :span="12">
        <el-input
          type="text"
          v-model="subscribeUrl"
          placeholder="订阅地址"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="connectSubscribe" type="primary">订阅</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" style="margin-bottom: 15px;">
        <el-input
          type="text"
          v-model="senderUrl"
          placeholder="消息地址"
        ></el-input>
      </el-col>
      <el-col :span="14" style="margin-bottom: 15px;">
        <el-input
          type="textarea"
          :rows="6"
          resize="none"
          v-model.trim="senderData"
          placeholder="订阅地址"
        ></el-input>
      </el-col>
      <el-col :span="14">
        <el-button @click="sendMessage" type="primary">发送消息</el-button>
      </el-col>
    </el-row>
    <el-row>
      <pre>{{ message }}</pre>
    </el-row>
    <!-- <testComponent></testComponent>
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
    </div> -->
  </div>
</template>

<script>
import socketJs from "../../common/utils/socket";
export default {
  data() {
    return {
      token: "",
      socketUrl: "",
      subscribeUrl: "",
      senderUrl: "",
      senderData: "",
      isLink: false,
      message: "",
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
    this.senderData = JSON.stringify({}, null, 4);
    // this.scrollView();
    // this.connectSocket();
  },
  methods: {
    setToken() {
      if (this.token) {
        localStorage.setItem("token", this.token);
      } else {
        this.$message({ type: "warning", message: "请输入token" });
      }
    },
    connectSocket() {
      if (this.socketUrl) {
        this.testSocket = new socketJs("http://192.168.20.28:20000/stomp");
        this.testSocket.connect(() => {
          this.isLink = true;
        });
      } else {
        this.$message({ type: "warning", message: "请输入连接" });
      }
      // this.testSocket = new socketJs("http://192.168.20.28:20000/stomp");
      // this.testSocket.connect(() => {
      //   this.isLink = true;
      //   // this.testSocket.subscribe(
      //   //   "/app/mlink/9QQ3L8EH/deviceinfo/monitor/upload",
      //   //   (res) => {
      //   //     // console.log("页面参数", res);
      //   //     if (res && res.data) {
      //   //       this.testSocket.subscribe(res.data.topic, (response) => {
      //   //         console.log("topic", response);
      //   //       });
      //   //     }
      //   //   }
      //   // );
      //   // this.testSocket.subscribe(
      //   //   "/topic/DEVICE/BASE/MAGUS/edge/9SLAD6CH/log/monitor/fw6_channel_fw6/upload",
      //   //   (res) => {
      //   //     console.log("queue", res);
      //   //   }
      //   // );
      //   // this.testSocket.subscribe("/queue/msg", (res) => {
      //   //   console.log("queueMsg", res);
      //   // });
      //   // this.testSocket.subscribe("/topic/zjw", (res) => {
      //   //   console.log("页面参数", res);
      //   // });
      // });
    },
    connectSubscribe() {
      if (this.subscribeUrl) {
        if (this.isLink) {
          this.testSocket.subscribe(this.subscribeUrl, (res) => {
            this.message += `\n${JSON.stringify(res)}`;
          });
        } else {
          this.$message({ type: "warning", message: "请先连接websocket" });
        }
      } else {
        this.$message({ type: "warning", message: "请输入连接" });
      }
    },
    sendMessage() {
      if (this.senderUrl) {
        if (this.isLink) {
          this.testSocket.sender(this.senderUrl, JSON.parse(this.senderData));
        } else {
          this.$message({ type: "warning", message: "请先连接websocket" });
        }
      } else {
        this.$message({ type: "warning", message: "请输入连接" });
      }
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
    disconnect() {
      if (this.testSocket) {
        this.testSocket.disconnect();
        this.testSocket = null;
        this.isLink = false;
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

<template>
  <div style="width: 100%; height: 100%" :id="`render-${id}`">
    <div :id="id" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
import "echarts-liquidfill";
var echarts = require("echarts");
var elementResizeDetectorMaker = require("element-resize-detector");
export default {
  props: {
    option: Object,
    type: String,
    id: String,
    renderPage: Object,
  },
  data() {
    return {
      chartInstance: null,
      // 用于加载依赖文件
      chartType: [],
    };
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler: function(val) {
        if (val && val.series) {
          if (this.chartInstance == null) {
            this.init();
          } else {
            this.reDraw();
          }
        }
      },
    },
  },
  mounted() {
    this.chartResize();
  },
  methods: {
    setEchartsDeport() {
      if (this.chartInstance) {
        this.chartInstance.dispose();
        this.chartInstance = null;
      }
    },
    chartResize() {
      let _this = this;
      var erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById(`render-${_this.id}`), function() {
        _this.$nextTick(function() {
          _this.reSize();
        });
      });
    },
    /**
     * @name: 获取地图数据
     * @test: test font
     * @msg:
     * @param {type}
     * @return:
     */
    getMapJson() {
      this.chartType = this.getType();
      let mapIndex = this.option.series.findIndex((i) => i.type == "map");
      let scatterIndex = this.option.series.findIndex(
        (i) => i.coordinateSystem == "geo"
      );
      return new Promise((resolve) => {
        if (mapIndex != -1 || scatterIndex != -1) {
          let name;
          if (this.$route.query.basemap && !this.option.geo.basemaplock) {
            name = this.$route.query.basemap;
          } else {
            name = this.option.geo.basemapSelect;
          }
          if (sessionStorage.getItem(name)) {
            resolve(JSON.parse(sessionStorage.getItem(name)));
          } else {
            resolve();
          }
        } else {
          resolve();
        }
      });
    },
    /**
     * @method 加载依赖文件
     * 异步加载
     */
    loadRequireFile() {
      this.chartType = this.getType();
      // 折线图
      return new Promise((resolve) => {
        resolve();
      });
    },
    init() {
      let _this = this;
      Promise.all([this.loadRequireFile(), this.getMapJson()]).then(
        (request) => {
          if (request[1]) {
            echarts.registerMap("magusmap", request[1]);
          }
          this.chartInstance = echarts.init(document.getElementById(this.id));
          this.chartInstance.setOption(this.option);
          this.chartInstance.off("click");
          this.chartInstance.on("click", function(params) {
            _this.chartClick(params);
          });
        }
      );
    },
    /**
     * @name: echart点击方法
     * @test: test font
     * @msg:
     * @param {type}
     * @return:
     */
    chartClick(params) {
      this.$emit("chartClick", params);
    },
    getType() {
      if (!this.option) return;
      return this.option.series.map((x) => x.type);
    },
    reDraw() {
      let newChatType = this.getType();
      // 图表类型变化，需要强制重置
      // console.debug('chart-forceReload', this.option._forceReload);
      let typeChange =
        newChatType.join() != this.chartType.join() || this.option._forceReload;
      delete this.option._forceReload;
      this.chartType = newChatType;

      // 如果改变主题，图表重新加载
      if (this.option.theme && this.option.theme != this.theme.name) {
        this.chartInstance.dispose();
        this.init();
      } else {
        let mapIndex = this.option.series.findIndex((i) => i.type == "map");
        let scatterIndex = this.option.series.findIndex(
          (i) => i.coordinateSystem == "geo"
        );
        if (mapIndex != -1 || scatterIndex != -1) {
          this.init();
        }
        this.chartInstance.setOption(this.option, typeChange);
      }
    },
    /**
     * 相应布局组件调用
     */
    reSize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  },
};
</script>
<style scoped></style>

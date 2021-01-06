<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-07-17 15:43:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-10 14:25:58
-->
<template>
  <div class="">
    <div id="graphContainer"></div>
  </div>
</template>

<script>
import mxgraph from './index';
const {
  mxGraph,
  mxClient,
  mxCodec,
  mxUtils,
  mxConstants,
  mxPerimeter
} = mxgraph;
export default {
  components: {},
  data() {
    return {
      km: null
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false);
    } else {
      // 再容器中创建图表
      let container = document.getElementById('graphContainer');
      let MxGraph = mxGraph;
      let MxCodec = mxCodec;
      var graph = new MxGraph(container);
      // 生成 Hello world!
      var parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      try {
        //矩形默认情况下
        // graph.insertVertex(parent, null, '矩形', 50, 50, 200, 100, "shape=rectangle;perimeter=ellipsePerimeter;");
        // // 矩形 圆角矩形
        // // shape=rounded 定义圆角  arcSize=10 定义圆角弧度
        // graph.insertVertex(parent, null, '圆角矩形', 300, 50, 200, 100, "rounded=true;perimeter=ellipsePerimeter;arcSize=20;");
        // // 画椭圆
        // // shape=elipse 定义椭圆  perimeter=ellipsePerimeter 让连线的箭头或起点触到边缘
        // graph.insertVertex(parent, null, '椭圆', 550, 50, 200, 100, "shape=ellipse;perimeter=ellipsePerimeter;");
        // // 画三角形
        // // shape=triangl 定义三角形  perimeter=ellipsePerimeter 让连线的箭头或起点触到边缘 direction=south 让三角形倒立
        // graph.insertVertex(parent, null, '三角形', 800, 50, 200, 200, "shape=triangle;perimeter=ellipsePerimeter;direction=south;");
        // // 画菱形
        // // shape=rhombus 定义菱形
        // graph.insertVertex(parent, null, '三角形', 1050, 50, 200, 200, "shape=rhombus;perimeter=ellipsePerimeter;");
        // // 画柱形
        // // shape=cylinder 定义柱形
        // graph.insertVertex(parent, null, '柱形', 1300, 50, 200, 200, "shape=cylinder;perimeter=ellipsePerimeter;");
        // // 画人
        // // shape=actor 定义执行者
        // graph.insertVertex(parent, null, '执行者', 50, 300, 100, 200, "shape=actor;perimeter=ellipsePerimeter;");
        // // 画云
        // graph.insertVertex(parent, null, '云', 300, 300, 200, 100, "shape=cloud;perimeter=ellipsePerimeter;");//泳道
        // graph.insertVertex(parent, null, '泳道', 800, 300, 200, 100, "shape=swimlane;perimeter=ellipsePerimeter;");//双椭圆
        // graph.insertVertex(parent, null, '双圆', 1050, 300, 200, 100, "shape=doubleEllipse;perimeter=ellipsePerimeter;");//六边形
        // graph.insertVertex(parent, null, '六边形', 1300, 300, 150, 150, "shape=hexagon;perimeter=ellipsePerimeter;");
        var style = graph.getStylesheet().getDefaultVertexStyle();
        var style1 = mxUtils.clone(style);
        style1[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
        style1[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
        style1[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        graph.getStylesheet().putCellStyle('style1', style1);
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 200, 80, 30);
        var v2 = graph.insertVertex(
          parent,
          null,
          'World',
          200,
          150,
          80,
          30,
          'style1'
        );
        var v3 = graph.insertVertex(
          parent,
          null,
          'everyBody!',
          300,
          350,
          60,
          60
        );
        graph.insertEdge(parent, null, '', v1, v2);
        graph.insertEdge(parent, null, '', v2, v3);
        //  graph.insertEdge(parent, null, '', v1, v3);
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
      // 打包XML文件
      let encoder = new MxCodec();
      let xx = encoder.encode(graph.getModel());
      // 保存到getXml参数中
      this.getXml = mxUtils.getXml(xx);
    }
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

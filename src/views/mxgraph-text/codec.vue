<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-17 15:44:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-17 17:37:18
-->
<template>
  <div
    id="graphCodec"
    ref="graphCodec"
    class="mxgraph"
    style="width: 100%; height: 100%;"
    v-html="xmlInfo"
  ></div>
</template>

<script>
import mxgraph from '@/utils/graph';
const {
  mxGraph,
  mxClient,
  mxUtils,
  mxConstants,
  mxRubberband,
  mxConnectionConstraint,
  mxPoint,
  mxConnectionHandler,
  mxConstraintHandler,
  mxCellState,
  mxEdgeHandler,
  mxCodec,
  mxEdgeStyle
} = mxgraph;
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {
    xmlInfo: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        const _this = this;
        this.$nextTick(() => {
          // console.log(this.$refs.graphIndex);
          if (_this.$refs.graphCodec) {
            _this.showGraph(_this.$refs.graphCodec);
          }
        });
      }
    }
  },
  props: {
    xmlInfo: {
      default: `&lt;mxGraphModel&gt;&lt;root&gt;&lt;mxCell id="0"/&gt;&lt;mxCell id="1" parent="0"/&gt;&lt;mxCell id="2" vertex="1" parent="1" value="Interval 1"&gt;&lt;mxGeometry x="380" y="0" width="140" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="3" vertex="1" parent="1" value="Interval 2"&gt;&lt;mxGeometry x="200" y="80" width="380" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="4" vertex="1" parent="1" value="Interval 3"&gt;&lt;mxGeometry x="40" y="140" width="260" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="5" vertex="1" parent="1" value="Interval 4"&gt;&lt;mxGeometry x="120" y="200" width="240" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="6" vertex="1" parent="1" value="Interval 5"&gt;&lt;mxGeometry x="420" y="260" width="80" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="7" edge="1" source="2" target="3" parent="1" value="Transfer1"&gt;&lt;mxGeometry as="geometry"&gt;&lt;Array as="points"&gt;&lt;Object x="420" y="60"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="8" edge="1" source="2" target="6" parent="1" value=""&gt;&lt;mxGeometry as="geometry" relative="1" y="-30"&gt;&lt;Array as="points"&gt;&lt;Object x="600" y="60"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="9" edge="1" source="3" target="4" parent="1" value="Transfer3"&gt;&lt;mxGeometry as="geometry"&gt;&lt;Array as="points"&gt;&lt;Object x="260" y="120"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="10" edge="1" source="4" target="5" parent="1" value="Transfer4"&gt;&lt;mxGeometry as="geometry"&gt;&lt;Array as="points"&gt;&lt;Object x="200" y="180"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="11" edge="1" source="4" target="6" parent="1" value="Transfer5"&gt;&lt;mxGeometry as="geometry" relative="1" y="-10"&gt;&lt;Array as="points"&gt;&lt;Object x="460" y="155"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;/root&gt;&lt;/mxGraphModel&gt;`
    }
  },
  methods: {
    showGraph(container) {
      if (mxClient.isBrowserSupported()) {
        var xml = mxUtils.getTextContent(container);
        var xmlDocument = mxUtils.parseXml(xml);
        if (
          xmlDocument.documentElement != null &&
          xmlDocument.documentElement.nodeName == 'mxGraphModel'
        ) {
          var decoder = new mxCodec(xmlDocument);
          var node = xmlDocument.documentElement;

          container.innerHTML = '';

          var graph = new mxGraph(container);
          graph.centerZoom = false;
          graph.setTooltips(false);
          graph.setEnabled(false);

          // Changes the default style for edges "in-place"
          var style = graph.getStylesheet().getDefaultEdgeStyle();
          style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

          // Enables panning with left mouse button
          graph.panningHandler.useLeftButtonForPanning = true;
          graph.panningHandler.ignoreCell = true;
          graph.container.style.cursor = 'move';
          graph.setPanning(true);

          if (container.style.width == '' && container.style.height == '') {
            graph.resizeContainer = true;
          } else {
            // Adds border for fixed size boxes
            graph.border = 20;
          }

          decoder.decode(node, graph.getModel());
          graph.resizeContainer = false;

          // Adds zoom buttons in top, left corner
          var buttons = document.createElement('div');
          buttons.style.position = 'absolute';
          buttons.style.overflow = 'visible';

          var bs = graph.getBorderSizes();
          buttons.style.top = container.offsetTop + bs.y + 'px';
          buttons.style.left = container.offsetLeft + bs.x + 'px';

          var left = 0;
          var bw = 16;
          var bh = 16;

          if (mxClient.IS_QUIRKS) {
            bw -= 1;
            bh -= 1;
          }
          if (container.nextSibling != null) {
            container.parentNode.insertBefore(buttons, container.nextSibling);
          } else {
            container.appendChild(buttons);
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      // console.log(this.$refs.graphIndex);
      if (_this.$refs.graphCodec) {
        _this.showGraph(_this.$refs.graphCodec);
      }
    });
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

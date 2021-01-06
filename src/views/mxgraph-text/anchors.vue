<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-18 10:16:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-18 10:23:49
-->
<template>
  <div id="graphAnchors" ref="graphAnchors" class=""></div>
</template>

<script>
import mxgraph from '@/utils/graph';
const {
  mxGraph,
  mxClient,
  mxUtils,
  mxCell,
  mxGeometry,
  mxDivResizer,
  mxConstants,
  mxRubberband,
  mxConnectionHandler,
  mxToolbar,
  mxGraphModel,
  mxKeyHandler,
  mxImage,
  mxEvent,
  mxCodec,
  mxShape,
  mxConnectionConstraint,
  mxPoint,
  mxPolyline
} = mxgraph;
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    creatAnchor(container) {
      // Overridden to define per-shape connection points
      mxGraph.prototype.getAllConnectionConstraints = function(
        terminal,
        source
      ) {
        if (terminal != null && terminal.shape != null) {
          if (terminal.shape.stencil != null) {
            if (terminal.shape.stencil.constraints != null) {
              return terminal.shape.stencil.constraints;
            }
          } else if (terminal.shape.constraints != null) {
            return terminal.shape.constraints;
          }
        }

        return null;
      };

      // Defines the default constraints for all shapes
      mxShape.prototype.constraints = [
        new mxConnectionConstraint(new mxPoint(0.25, 0), true),
        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
        new mxConnectionConstraint(new mxPoint(0.75, 0), true),
        new mxConnectionConstraint(new mxPoint(0, 0.25), true),
        new mxConnectionConstraint(new mxPoint(0, 0.5), true),
        new mxConnectionConstraint(new mxPoint(0, 0.75), true),
        new mxConnectionConstraint(new mxPoint(1, 0.25), true),
        new mxConnectionConstraint(new mxPoint(1, 0.5), true),
        new mxConnectionConstraint(new mxPoint(1, 0.75), true),
        new mxConnectionConstraint(new mxPoint(0.25, 1), true),
        new mxConnectionConstraint(new mxPoint(0.5, 1), true),
        new mxConnectionConstraint(new mxPoint(0.75, 1), true)
      ];

      // Edges have no connection points
      mxPolyline.prototype.constraints = null;
      if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      } else {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        graph.setConnectable(true);

        // Enables connect preview for the default edge style
        graph.connectionHandler.createEdgeState = function(me) {
          var edge = graph.createEdge(null, null, null, null, null);

          return new mxCellState(
            this.graph.view,
            edge,
            this.graph.getCellStyle(edge)
          );
        };

        // Specifies the default edge style
        graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] =
          'orthogonalEdgeStyle';

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
          var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
          var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
          var e1 = graph.insertEdge(parent, null, '', v1, v2);
        } finally {
          // Updates the display
          graph.getModel().endUpdate();
        }
      }
    }
  },
  created() {
    const _this = this;
    _this.$nextTick(() => {
      if (_this.$refs.graphAnchors) {
        _this.creatAnchor(_this.$refs.graphAnchors);
      }
    });
  },
  mounted() {},
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

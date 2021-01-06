<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-10 13:48:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-10 16:53:02
-->
<template>
  <div class="graph">
    <div id="graphIndex" ref="graphIndex"></div>
  </div>
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
  mxEdgeHandler
} = mxgraph;
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    createFraphIndex(container) {
      // Checks if the browser is supported
      if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      } else {
        // Snaps to fixed points
        mxConstraintHandler.prototype.intersects = function(
          icon,
          point,
          source,
          existingEdge
        ) {
          return (
            !source || existingEdge || mxUtils.intersects(icon.bounds, point)
          );
        };

        // Special case: Snaps source of new connections to fixed points
        // Without a connect preview in connectionHandler.createEdgeState mouseMove
        // and getSourcePerimeterPoint should be overriden by setting sourceConstraint
        // sourceConstraint to null in mouseMove and updating it and returning the
        // nearest point (cp) in getSourcePerimeterPoint (see below)
        var mxConnectionHandlerUpdateEdgeState =
          mxConnectionHandler.prototype.updateEdgeState;
        mxConnectionHandler.prototype.updateEdgeState = function(
          pt,
          constraint
        ) {
          if (pt != null && this.previous != null) {
            var constraints = this.graph.getAllConnectionConstraints(
              this.previous
            );
            var nearestConstraint = null;
            var dist = null;

            for (var i = 0; i < constraints.length; i++) {
              var cp = this.graph.getConnectionPoint(
                this.previous,
                constraints[i]
              );

              if (cp != null) {
                var tmp =
                  (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

                if (dist == null || tmp < dist) {
                  nearestConstraint = constraints[i];
                  dist = tmp;
                }
              }
            }

            if (nearestConstraint != null) {
              this.sourceConstraint = nearestConstraint;
            }

            // In case the edge style must be changed during the preview:
            // this.edgeState.style['edgeStyle'] = 'orthogonalEdgeStyle';
            // And to use the new edge style in the new edge inserted into the graph,
            // update the cell style as follows:
            //this.edgeState.cell.style = mxUtils.setStyle(this.edgeState.cell.style, 'edgeStyle', this.edgeState.style['edgeStyle']);
          }

          mxConnectionHandlerUpdateEdgeState.apply(this, arguments);
        };
        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        graph.setConnectable(true);

        if (graph.connectionHandler.connectImage == null) {
          graph.connectionHandler.isConnectableCell = function(cell) {
            return false;
          };
          mxEdgeHandler.prototype.isConnectableCell = function(cell) {
            return graph.connectionHandler.isConnectableCell(cell);
          };
        }

        graph.getAllConnectionConstraints = function(terminal) {
          if (terminal != null && this.model.isVertex(terminal.cell)) {
            return [
              new mxConnectionConstraint(new mxPoint(0, 0), true),
              new mxConnectionConstraint(new mxPoint(0.5, 0), true),
              new mxConnectionConstraint(new mxPoint(1, 0), true),
              new mxConnectionConstraint(new mxPoint(0, 0.5), true),
              new mxConnectionConstraint(new mxPoint(1, 0.5), true),
              new mxConnectionConstraint(new mxPoint(0, 1), true),
              new mxConnectionConstraint(new mxPoint(0.5, 1), true),
              new mxConnectionConstraint(new mxPoint(1, 1), true)
            ];
          }

          return null;
        };

        // Connect preview
        graph.connectionHandler.createEdgeState = function(me) {
          var edge = graph.createEdge(
            null,
            null,
            null,
            null,
            null,
            'edgeStyle=orthogonalEdgeStyle'
          );

          return new mxCellState(
            this.graph.view,
            edge,
            this.graph.getCellStyle(edge)
          );
        };

        // Disables moving of edge labels in this examples
        graph.edgeLabelsMovable = false;

        // Enables rubberband selection
        new mxRubberband(graph);

        // Needs to set a flag to check for dynamic style changes,
        // that is, changes to styles on cells where the style was
        // not explicitely changed using mxStyleChange
        graph.getView().updateStyle = true;

        // Overrides mxGraphModel.getStyle to return a specific style
        // for edges that reflects their target terminal (in this case
        // the strokeColor will be equal to the target's fillColor).
        var previous = graph.model.getStyle;

        graph.model.getStyle = function(cell) {
          if (cell != null) {
            var style = previous.apply(this, arguments);

            if (this.isEdge(cell)) {
              var target = this.getTerminal(cell, false);

              if (target != null) {
                var targetStyle = graph.getCurrentCellStyle(target);
                var fill = mxUtils.getValue(
                  targetStyle,
                  mxConstants.STYLE_FILLCOLOR
                );

                if (fill != null) {
                  style += ';strokeColor=' + fill;
                }
              }
            } else if (this.isVertex(cell)) {
              var geometry = this.getGeometry(cell);

              if (geometry != null && geometry.width > 80) {
                style += ';fillColor=green';
              }
            }

            return style;
          }

          return null;
        };

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
          var v1 = graph.insertVertex(
            parent,
            null,
            'Hello,',
            20,
            20,
            80,
            30,
            'fillColor=green'
          );
          var v2 = graph.insertVertex(
            parent,
            null,
            'World!',
            200,
            150,
            80,
            30,
            'fillColor=blue'
          );
          graph.insertVertex(
            parent,
            null,
            'World!',
            20,
            150,
            80,
            30,
            'fillColor=red'
          );
          graph.insertEdge(
            parent,
            null,
            'Connect',
            v1,
            v2,
            'perimeterSpacing=4;strokeWidth=4;labelBackgroundColor=white;fontStyle=1'
          );
          // var v1 = graph.insertVertex(
          //   parent,
          //   null,
          //   'Hello,',
          //   20,
          //   20,
          //   80,
          //   60,
          //   'shape=triangle;perimeter=trianglePerimeter'
          // );
          // var v2 = graph.insertVertex(
          //   parent,
          //   null,
          //   'World!',
          //   200,
          //   150,
          //   80,
          //   60,
          //   'shape=ellipse;perimeter=ellipsePerimeter'
          // );
          // var v3 = graph.insertVertex(parent, null, 'Hello,', 200, 20, 80, 30);
          // var e1 = graph.insertEdge(
          //   parent,
          //   null,
          //   '',
          //   v1,
          //   v2,
          //   'edgeStyle=elbowEdgeStyle;elbow=horizontal;' +
          //     'exitX=0.5;exitY=1;exitPerimeter=1;entryX=0;entryY=0;entryPerimeter=1;'
          // );
          // var e2 = graph.insertEdge(
          //   parent,
          //   null,
          //   '',
          //   v3,
          //   v2,
          //   'edgeStyle=elbowEdgeStyle;elbow=horizontal;orthogonal=0;' +
          //     'entryX=0;entryY=0;entryPerimeter=1;'
          // );
        } finally {
          // Updates the display
          graph.getModel().endUpdate();
        }
      }
    }
  },
  created() {},
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      // console.log(this.$refs.graphIndex);
      if (_this.$refs.graphIndex) {
        _this.createFraphIndex(_this.createFraphIndex(_this.$refs.graphIndex));
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
<style lang="less" scoped>
.graph {
  width: 100%;
  height: 100%;
}
</style>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-10 14:31:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-18 18:20:12
-->
<template>
  <div class="graph">
    <a-button @click="watchXml" type="primary">Primary</a-button>
    <a-button @click="zoomIn" type="primary">zoomIn</a-button>
    <a-button @click="zoomOut" type="primary">zoomOut</a-button>
    <div id="graphToobar" ref="graphToobar"></div>
    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
      <div></div>
      <codec :xmlInfo="xmlInfo"></codec>
    </a-modal>
  </div>
</template>

<script>
import codec from './codec';
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
  components: {
    codec
  },
  data() {
    return {
      graphContent: '',
      visible: false,
      xmlInfo: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    deleteCell() {
      console.log('111111111');
      this.graphContent.removeCells();
    },
    handleOk(e) {
      this.visible = false;
    },
    zoomIn() {
      this.graphContent.zoomIn();
    },
    zoomOut() {
      this.graphContent.zoomOut();
    },
    watchXml() {
      // console.log(this.graphContent.getModel());
      var encoder = new mxCodec();
      var node = encoder.encode(this.graphContent.getModel());
      var o = document.createElement('div');
      o.appendChild(node);
      let htmlString = o.innerHTML.replace(/[<>&"]/g, function(c) {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
      });
      this.xmlInfo = htmlString;
      this.visible = true;
    },
    createDraph(boxContainer) {
      const _this = this;
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
      // Checks if browser is supported
      if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is
        // not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      } else {
        // Defines an icon for creating new connections in the connection handler.
        // This will automatically disable the highlighting of the source vertex.
        mxConnectionHandler.prototype.connectImage = new mxImage(
          'images/connector.gif',
          16,
          16
        );

        // Creates the div for the toolbar
        var tbContainer = document.createElement('div');
        tbContainer.style.position = 'absolute';
        tbContainer.style.overflow = 'hidden';
        tbContainer.style.padding = '2px';
        tbContainer.style.left = '0px';
        tbContainer.style.top = '0px';
        tbContainer.style.width = '24px';
        tbContainer.style.bottom = '0px';

        boxContainer.appendChild(tbContainer);

        // Creates new toolbar without event processing
        var toolbar = new mxToolbar(tbContainer);
        toolbar.enabled = false;

        // Creates the div for the graph
        var container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.overflow = 'hidden';
        container.style.left = '24px';
        container.style.top = '0px';
        container.style.right = '0px';
        container.style.bottom = '0px';
        container.style.background = 'url("images/grid.gif")';

        boxContainer.appendChild(container);

        // boxContainer.appendChild(
        //   mxUtils.button('View XML', function() {
        //     var encoder = new mxCodec();
        //     var node = encoder.encode(graph.getModel());
        //     mxUtils.popup(mxUtils.getPrettyXml(node), true);
        //   })
        // );

        // Workaround for Internet Explorer ignoring certain styles
        if (mxClient.IS_QUIRKS) {
          boxContainer.style.overflow = 'hidden';
          new mxDivResizer(tbContainer);
          new mxDivResizer(container);
        }

        // Creates the model and the graph inside the container
        // using the fastest rendering available on the browser
        var model = new mxGraphModel();
        var graph = new mxGraph(container, model);

        // Enables new connections in the graph
        graph.setConnectable(true);
        graph.setMultigraph(false);

        // Stops editing on enter or escape keypress
        var keyHandler = new mxKeyHandler(graph);
        var rubberband = new mxRubberband(graph);

        var addVertex = function(icon, w, h, style) {
          var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
          vertex.setVertex(true);

          var img = _this.addToolbarItem(graph, toolbar, vertex, icon);
          img.enabled = true;

          graph.getSelectionModel().addListener(mxEvent.CHANGE, function() {
            var tmp = graph.isSelectionEmpty();
            mxUtils.setOpacity(img, tmp ? 100 : 20);
            img.enabled = tmp;
          });
        };

        addVertex('images/rectangle.gif', 100, 40, '');
        addVertex('images/rounded.gif', 100, 40, 'shape=rounded');
        addVertex('images/ellipse.gif', 40, 40, 'shape=ellipse');
        addVertex('images/rhombus.gif', 40, 40, 'shape=rhombus');
        addVertex('images/triangle.gif', 40, 40, 'shape=triangle');
        addVertex('images/cylinder.gif', 40, 40, 'shape=cylinder');
        addVertex('images/actor.gif', 30, 40, 'shape=actor');
        _this.graphContent = graph;
      }
    },
    addToolbarItem(graph, toolbar, prototype, image) {
      // Function that is executed when the image is dropped on
      // the graph. The cell argument points to the cell under
      // the mousepointer if there is one.
      var funct = function(graph, evt, cell, x, y) {
        graph.stopEditing(false);

        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = x;
        vertex.geometry.y = y;

        graph.addCell(vertex);
        graph.setSelectionCell(vertex);
      };

      // Creates the image which is used as the drag icon (preview)
      var img = toolbar.addMode(null, image, function(evt, cell) {
        var pt = this.graph.getPointForEvent(evt);
        funct(graph, evt, cell, pt.x, pt.y);
      });

      // Disables dragging if element is disabled. This is a workaround
      // for wrong event order in IE. Following is a dummy listener that
      // is invoked as the last listener in IE.
      mxEvent.addListener(img, 'mousedown', function(evt) {
        // do nothing
      });

      // This listener is always called first before any other listener
      // in all browsers.
      mxEvent.addListener(img, 'mousedown', function(evt) {
        if (img.enabled == false) {
          mxEvent.consume(evt);
        }
      });

      mxUtils.makeDraggable(img, graph, funct);

      return img;
    }
  },
  created() {},
  mounted() {
    const _this = this;
    _this.$nextTick(() => {
      if (_this.$refs.graphToobar) {
        _this.createDraph(document.getElementById('graphToobar'));
      }
    });
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 46 || key == 8) {
        _this.deleteCell();
      }
    };
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
  #graphToobar {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>

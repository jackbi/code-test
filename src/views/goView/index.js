/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-11-11 15:16:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-12 18:10:52
 */
import go from 'gojs';
class createDuBang {
  constructor(initData) {
    this.initData = initData;
    this.myDiagram = {};
  }
  /**
   * @name: 初始化
   * @test: test font
   * @msg:
   * @param {*}
   * @return {*}
   */
  init() {
    var that = this
    var $ = go.GraphObject.make;
    let myDiagram = $(
      go.Diagram,
      this.initData.rightName, // 必须命名或引用DIV HTML元素
      {
        isReadOnly:true,
        validCycle: go.Diagram.CycleNotDirected,  // don't allow loops
        "undoManager.isEnabled": true
      });
    // 复制功能
    myDiagram.model.copiesArrays = true,
    myDiagram.model.copiesArrayObjects = true,
    myDiagram.model.copiesKey = false;
    this.myDiagram = myDiagram;
    
    // 节点双击
    myDiagram.addDiagramListener('ObjectDoubleClicked', function(e, datas) {
        var obj = e.subject.part.lb;
        window.doubleClickNode(obj)
        console.log(obj)
    });
    // 节点模板的帮助程序定义
    function nodeStyle() {
        return [
            // Node.location来自节点数据的“ loc”属性,
            // 由Point.parse静态方法转换.
            // 如果Node.location更改，它将更新节点数据的“ loc”属性,
            // 使用Point.stringify静态方法转换回.
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
                go.Point.stringify
            ),
            {
                // Node.location位于每个节点的中心
                locationSpot: go.Spot.Center
            }
        ];
    }

    // 定义用于创建通常透明的“端口”的函数.
    // "name" 用于 GraphObject.portId,
    // "align" 用于确定端口相对于节点主体的位置,
    // "spot" 用于控制链接与端口的连接方式以及端口是否
    // 沿着节点的侧面延伸,
    // and the boolean "output" and "input" 参数控制用户是否可以从端口绘制链接或到端口.
    function makePort(name, align, spot, output, input) {
      var horizontal =
        align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
      // 端口基本上只是一个透明的矩形，沿着节点的侧面延伸,
      // 并在鼠标经过时变成彩色
      return $(go.Shape, {
        fill: 'transparent', // 在mouseEnter事件处理程序中更改为颜色
        strokeWidth: 0, // no stroke
        width: 8, // 如果不水平伸展，则只有8宽
        height: 8, // 如果不垂直伸展，则只有8高
        alignment: align, // 在主形状上对齐端口
        stretch: horizontal
          ? go.GraphObject.Horizontal
          : go.GraphObject.Vertical,
        portId: name, // 声明此对象为 a "port"
        fromSpot: spot, // 声明链接可以在此端口连接的位置
        fromLinkable: output, // 声明用户是否可以从此处绘制链接
        toSpot: spot, // 声明链接可以在此端口连接的位置
        toLinkable: input, // 声明用户是否可以在此处绘制链接
        cursor: 'pointer', // 显示不同的光标以指示潜在的链接点
        mouseEnter: function(e, port) {
          // PORT参数将是这个Shape
          if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)';
        },
        mouseLeave: function(e, port) {
          port.fill = 'transparent';
        }
      });
    }
    // 字体样式
    function textStyle() {
        return {
            margin:10,
            font: '14px Helvetica, Arial, sans-serif',
            stroke: '#606266'
        };
    }

    // 文本节点
    function addParallelType({ type }) {
      myDiagram.nodeTemplateMap.add(
        type,
        $(go.Node,'Table',nodeStyle(),
          $(go.Panel,'Auto',
            $(go.TextBlock, textStyle(),
              {
                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                editable: true,  // 文字可编辑
                font: "bold 14px Helvetica, Arial, sans-serif",
                stroke: "#606266"
              },
              new go.Binding("text").makeTwoWay())
          )
        )
      );
    }
    addParallelType({ type: 'Parallel' });

    // 表格节点
    var fieldTemplate =$(go.Panel, "TableRow",  // this Panel is a row in the containing Table
        {
          background: "transparent",  // so this port's background can be picked by the mouse
        },
        $(go.TextBlock,
          { column: 1,
            margin: new go.Margin(5, 5),
            font: "bold 13px sans-serif",
            wrap: go.TextBlock.WrapFit,
            editable:true
          },
          new go.Binding("text", "name").makeTwoWay()),
        $(go.TextBlock,
          {
            column: 2,
            margin: new go.Margin(5, 5),
            font: "13px sans-serif",
            wrap: go.TextBlock.WrapFit,
            editable:true
          },
          new go.Binding("text", "value").makeTwoWay())
      );
      
    function addTable({type}) { // 初始化表格
      myDiagram.nodeTemplateMap.add(
        type,
        $(go.Node, "Auto",nodeStyle(),
          $(go.Shape,{ fill: "#fff",stroke:'#79bbff' }),
          $(go.Panel, "Vertical",
            { stretch: go.GraphObject.Horizontal, alignment: go.Spot.TopLeft },
            $(go.Panel, "Auto",
              { stretch: go.GraphObject.Horizontal },
              $(go.Shape,
                { 
                  fill: "#79bbff", 
                  stroke: "#79bbff",
                }),
              $(go.TextBlock,
                {
                  margin: new go.Margin(5, 5),
                  alignment: go.Spot.Center,
                  stroke: "white",
                  textAlign: "center",
                  editable:true,
                  font: "bold 16px sans-serif"
                },
                new go.Binding("text", "title").makeTwoWay())),
            $(go.Panel, "Table",
              {
                name: "TABLE", 
                defaultAlignment: go.Spot.Center,
                defaultColumnSeparatorStroke: "#79bbff",
                defaultRowSeparatorStroke: "#79bbff",
                itemTemplate: fieldTemplate
              },
              new go.Binding("itemArray", "fields").makeTwoWay()
            )
          ),
          makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
          makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
          makePort('R', go.Spot.Right, go.Spot.RightSide, true, false),
          makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true) 
        )
      )
    }
    addTable({ type:'mtTable'})

    // 初始化连接线的模板
    myDiagram.linkTemplate = $(go.Link, // the whole link panel
        {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            mouseEnter: function(e, link) {
            link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)';
            },
            mouseLeave: function(e, link) {
            link.findObject('HIGHLIGHT').stroke = 'transparent';
            },
            selectionAdorned: false
        },
      new go.Binding('points').makeTwoWay(),
      $(
        go.Shape, // the highlight shape, normally transparent
        {
          isPanelMain: true,
          strokeWidth: 0,
          stroke: 'transparent',
          name: 'HIGHLIGHT'
        }
      ),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, stroke: "#79bbff", strokeWidth: 2 },
        new go.Binding('stroke','color')
      ),
      $(
        go.Shape, // 箭头配置
        { toArrow: 'standard', strokeWidth: 0, fill: "#79bbff" },
        new go.Binding('fill','color')
      ),
      $(go.Panel,'Auto', // the link label, normally not visible
        { visible: false,name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
        new go.Binding('visible', 'visible').makeTwoWay(),
        $(go.Shape,'RoundedRectangle', // the label shape
          { fill: 'transparent', strokeWidth: 0 }
        ),
        $(go.TextBlock,"连线",
          { textAlign: 'center',
            font: '14px helvetica, arial, sans-serif',
            stroke: "#79bbff",
            minSize: new go.Size(10, NaN),
            editable: true
          },
          new go.Binding('text').makeTwoWay()
        )
      )
    );
    // 如果来自“Conditional”节点，则使链接标签可见。
    // 该侦听器由“ LinkDrawn”和“ LinkRelinked” DiagramEvents调用。
    function showLinkLabel(e) {
      var label = e.subject.findObject('LABEL');
      if (label) {
        label.visible = true;
      }
    }
    // 临时的连线（还在画图中），包括重连的连线，都保持直角
    myDiagram.toolManager.linkingTool.temporaryLink.routing =
    go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing =
    go.Link.Orthogonal;

    this.load(); // 从一些JSON文本加载初始图
  }
  // 节点动态更新 (不需要load)
  change(e) {
      var nodeData = this.myDiagram.model.findNodeDataForKey(JSON.parse(e).key);
      nodeData.data_code = JSON.parse(e).data_code
      this.myDiagram.model.updateTargetBindings(nodeData);
    }
    getJson() {
        return this.myDiagram.model.toJson();
    }

    load(datas) {
        if (datas) {
            this.myDiagram.model = go.Model.fromJson(JSON.stringify(datas));
        }
    }
}

export default createDuBang;

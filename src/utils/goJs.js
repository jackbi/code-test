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
    var $ = go.GraphObject.make;
    let myDiagram = $(
      go.Diagram,
      this.initData.rightName, // 必须命名或引用DIV HTML元素
      {
        initialContentAlignment: go.Spot.Center,
        allowDrop: true,
        scrollsPageOnFocus: false,
        'undoManager.isEnabled': true,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
        LinkDrawn: showLinkLabel, // 该DiagramEvent侦听器在下面定义
        LinkRelinked: showLinkLabel,
        'undoManager.isEnabled': true // 启用撤消和重做
      }
    );
    // 复制功能, 复制除了key之外的值
    myDiagram.model.copiesKey = false;
    this.myDiagram = myDiagram;
    // 修改文档后，在标题上添加“ *”并启用“保存”按钮
    myDiagram.addDiagramListener('Modified', function(e) {
      var button = document.getElementById('SaveButton');
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf('*');
      if (myDiagram.isModified) {
        if (idx < 0) document.title += '*';
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    myDiagram.addDiagramListener('ObjectDoubleClicked', function(e, datas) {
      // 兼容性
      var obj = e.subject.part.lb;
      console.log(obj);
      obj.text = '测试';
      // obj.lineConditionExpression = 'adasdasd';
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
        width: horizontal ? NaN : 8, // 如果不水平伸展，则只有8宽
        height: !horizontal ? NaN : 8, // 如果不垂直伸展，则只有8高
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
        font: 'bold 12px Helvetica, Arial, sans-serif',
        stroke: '#606266'
      };
    }

    // 为常规节点定义节点模板
    myDiagram.nodeTemplateMap.add(
      '', // 默认类别
      $(
        go.Node,
        'Table',
        nodeStyle(),
        // 主要对象是一个面板，该面板围绕着矩形的TextBlock
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'RoundedRectangle',
            {
              fill: '#fff000',
              strokeWidth: 2,
              stroke: '#c0c4cc'
            },
            new go.Binding('figure', 'figure')
          ),
          $(
            go.TextBlock,
            textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit
            },
            new go.Binding('text').makeTwoWay()
          )
        ),
        // 四个命名端口，每侧一个:
        makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
        makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        makePort('R', go.Spot.Right, go.Spot.RightSide, true, false),
        makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true)
      )
    );
    function addSubType({ type, color = 'beige' }) {
      myDiagram.nodeTemplateMap.add(
        type, // the default category
        $(
          go.Node,
          'Table',
          nodeStyle(),
          $(
            go.Panel,
            'Auto',
            $(
              go.Shape,
              'RoundedRectangle',
              {
                fill: color,
                strokeWidth: 2,
                stroke: '#c0c4cc'
              },
              new go.Binding('figure', 'figure')
            ),
            $(
              go.TextBlock,
              textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit
              },
              new go.Binding('text').makeTwoWay()
            )
          ),
          makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
          makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
          makePort('R', go.Spot.Right, go.Spot.RightSide, true, false),
          makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true)
        )
      );
    }
    addSubType({ type: 'Sub-h', color: 'bisque' });
    addSubType({ type: 'Sub' });
    addSubType({ type: 'Sub-d', color: '#9CFF46' });

    function addStepType({ type, color = 'beige' }) {
      myDiagram.nodeTemplateMap.add(
        type, // the default category
        $(
          go.Node,
          'Table',
          nodeStyle(),
          $(
            go.Panel,
            'Auto',
            $(
              go.Shape,
              'RoundedRectangle',
              {
                fill: color,
                strokeWidth: 2,
                stroke: '#c0c4cc'
              },
              new go.Binding('figure', 'figure')
            ),
            $(
              go.TextBlock,
              textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit
              },
              new go.Binding('text').makeTwoWay()
            )
          ),
          makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
          makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
          makePort('R', go.Spot.Right, go.Spot.RightSide, true, false),
          makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true)
        )
      );
    }

    addStepType({ type: 'Step-h', color: 'bisque' });
    addStepType({ type: 'Step' });
    addStepType({ type: 'Step-d', color: '#9CFF46' });

    // 排他网关
    function addConditionType({ type, color = 'beige' }) {
      myDiagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Table',
          nodeStyle(),
          $(
            go.Panel,
            'Auto',
            $(go.Shape, 'Diamond', {
              fill: color,
              strokeWidth: 2,
              stroke: '#c0c4cc',
              width: 100,
              height: 50
            }),
            $(
              go.Shape,
              'XLine',
              {
                fill: color,
                strokeWidth: 4,
                stroke: '#828489',
                width: 20,
                height: 20
              },
              new go.Binding('figure', 'figure')
            )
          ),
          makePort('T', go.Spot.Top, go.Spot.Top, true, false),
          makePort('L', go.Spot.Left, go.Spot.Left, false, true),
          makePort('R', go.Spot.Right, go.Spot.Right, true, false),
          makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
        )
      );
    }

    addConditionType({ type: 'Conditional-h', color: 'bisque' });
    addConditionType({ type: 'Conditional' });
    addConditionType({ type: 'Conditional-d', color: '#9CFF46' });

    // 并行网关
    function addParallelType({ type, color = 'beige' }) {
      myDiagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Table',
          nodeStyle(),
          $(
            go.Panel,
            'Auto',
            $(go.Shape, 'Diamond', {
              fill: color,
              strokeWidth: 2,
              stroke: '#c0c4cc',
              width: 100,
              height: 50
            }),
            $(
              go.Shape,
              'PlusLine',
              {
                fill: 'beige',
                strokeWidth: 4,
                stroke: '#828489',
                width: 20,
                height: 20
              },
              new go.Binding('figure', 'figure')
            )
          ),
          makePort('T', go.Spot.Top, go.Spot.Top, true, false),
          makePort('L', go.Spot.Left, go.Spot.Left, false, true),
          makePort('R', go.Spot.Right, go.Spot.Right, true, false),
          makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
        )
      );
    }
    addParallelType({ type: 'Parallel-h', color: 'bisque' });
    addParallelType({ type: 'Parallel' });
    addParallelType({ type: 'Parallel-d', color: '#9CFF46' });

    // 开始
    function addStartType({ type, color = 'beige' }) {
      myDiagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Table',
          nodeStyle(),
          $(
            go.Panel,
            'Auto',
            $(go.Shape, 'Circle', {
              minSize: new go.Size(50, 50),
              fill: color,
              strokeWidth: 2,
              stroke: '#c0c4cc'
            }),
            $(go.TextBlock, 'Start', textStyle(), new go.Binding('text'))
          ),
          makePort('L', go.Spot.Left, go.Spot.Left, true, false),
          makePort('R', go.Spot.Right, go.Spot.Right, true, false),
          makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
        )
      );
    }
    addStartType({ type: 'Start-h', color: 'bisque' });
    addStartType({ type: 'Start' });
    addStartType({ type: 'Start-d', color: '#9CFF46' });

    // 结束
    function addEndType({ type, color = 'beige', top }) {
      myDiagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Table',
          nodeStyle(),
          $(
            go.Panel,
            'Auto',
            $(go.Shape, 'Circle', {
              minSize: new go.Size(50, 50),
              fill: color,
              strokeWidth: 2,
              stroke: '#c0c4cc'
            }),
            $(go.TextBlock, 'End', textStyle(), new go.Binding('text'))
          ),
          makePort('T', go.Spot.Top, go.Spot.Top, false, true),
          makePort('L', go.Spot.Left, go.Spot.Left, false, true),
          makePort('R', go.Spot.Right, go.Spot.Right, false, true)
        )
      );
    }
    addEndType({ type: 'End-h', color: 'bisque' });
    addEndType({ type: 'End' });
    addEndType({ type: 'End-d', color: '#9CFF46' });

    go.Shape.defineFigureGenerator('File', function(shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(0, 0, true); // 初始点
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
      var fig2 = new go.PathFigure(0.75 * w, 0, false);
      geo.add(fig2);
      // The Fold
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.25 * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
      geo.spot1 = new go.Spot(0, 0.25);
      geo.spot2 = go.Spot.BottomRight;
      return geo;
    });
    // 替换linkTemplateMap中的默认链接模板
    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
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
        { isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
        new go.Binding('stroke', 'isSelected', function(sel) {
          return sel ? 'dodgerblue' : 'gray';
        }).ofObject()
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: 'standard', strokeWidth: 0, fill: 'gray' }
      ),
      $(
        go.Panel,
        'Auto', // the link label, normally not visible
        {
          visible: true,
          name: 'LABEL',
          segmentIndex: 2,
          segmentFraction: 1,
          margin: 20,
          segmentOffset: new go.Point(20, 10)
        },
        new go.Binding('visible', 'visible').makeTwoWay(),
        $(
          go.Shape,
          'Diamond', // the label shape
          { fill: 'transparent', strokeWidth: 0 }
        ),
        $(
          go.TextBlock,
          '', // the label
          {
            textAlign: 'center',
            font: '10pt helvetica, arial, sans-serif',
            stroke: '#333333'
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
    // LinkingTool和RelinkingTool使用的临时链接也是正交的：
    myDiagram.toolManager.linkingTool.temporaryLink.routing =
      go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing =
      go.Link.Orthogonal;
    this.load(); // 从一些JSON文本加载初始图
    // 初始化页面左侧的调色板
    let myPalette = $(
      go.Palette,
      'myPaletteDiv', //  must name or refer to the DIV HTML element
      {
        scrollsPageOnFocus: false,
        nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
        model: new go.GraphLinksModel([
          // specify the contents of the Palette
          { category: 'Start', text: '开始', type: '8' },
          { category: 'Step', text: '任务', type: '1' },
          {
            category: 'Conditional',
            text: '排他网关',
            type: '2',
            figure: 'XLine'
          },
          {
            category: 'Parallel',
            text: '并行网关',
            type: '3',
            figure: 'PlusLine'
          },
          { category: 'Sub', text: '子流程', type: '4' },
          { category: 'End', text: '结束', type: '9' }
        ])
      }
    );
    // 这是默认动画的重新实现，不同的是它从向下而不是向上渐变。
    function animateFadeDown(e) {
      var diagram = e.diagram;
      var animation = new go.Animation();
      animation.isViewportUnconstrained = true; // 因此，Diagram定位规则使动画从屏幕外开始
      animation.easing = go.Animation.EaseOutExpo;
      animation.duration = 900;
      // 淡入淡出，换句话说，从上方淡入
      animation.add(
        diagram,
        'position',
        diagram.position.copy().offset(0, 200),
        diagram.position
      );
      animation.add(diagram, 'opacity', 0, 1);
      animation.start();
    }
  }
  // Show the diagram's model in JSON format that the user may edit
  save() {
    // console.log(this.myDiagram.model.toJson());
    this.myDiagram.isModified = false;
  }

  getJson() {
    return this.myDiagram.model.toJson();
  }

  load(datas) {
    if (datas) {
      this.myDiagram.model = go.Model.fromJson(JSON.stringify(datas));
    }
    // this.myDiagram.model = go.Model.fromJson(datas);
  }

  // 通过打开一个包含每个页面的图表内容的SVG图像的新窗口来打印图表
  printDiagram() {
    var svgWindow = window.open();
    if (!svgWindow) return; // 未能打开新窗口
    var printSize = new go.Size(700, 960);
    var bnds = this.myDiagram.documentBounds;
    var x = bnds.x;
    var y = bnds.y;
    while (y < bnds.bottom) {
      while (x < bnds.right) {
        var svg = this.myDiagram.makeSVG({
          scale: 1.0,
          position: new go.Point(x, y),
          size: printSize
        });
        svgWindow.document.body.appendChild(svg);
        x += printSize.width;
      }
      x = bnds.x;
      y += printSize.height;
    }
    setTimeout(function() {
      svgWindow.print();
    }, 1);
  }
}

export default createDuBang;

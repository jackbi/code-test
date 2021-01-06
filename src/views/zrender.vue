<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-07-15 16:21:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-15 17:36:16
--> 
<template>
  <div class='z-render'>
    <div id="z-render-con">

    </div>
  </div>
</template>

<script>
  import zrender from 'zrender'
  export default {
   components: {},
   data() {
    return {
      zr: null,
      group: null,
      dataJson: [
        {
          value: '2010-02-05 12:00',
          status: '1',
          name: '第一阶段测试测试'
        },
        {
          value: '2010-02-05 13:00',
          status: '2',
          name: '第二阶段测试'
        },
        {
          value: '2010-02-05 14:00',
          status: '3',
          name: '第三阶段测试测试'
        },
        {
          value: '2010-02-05 15:00',
          status: '4',
          name: '第四阶段测试测试测试测试'
        }
      ]
    };
   },
   computed: {},
   watch: {},
   methods: {
     init () {
       if (this.zr) {
         this.zr.dispose()
       }
        this.zr = zrender.init(document.getElementById('z-render-con'));
        this.group = new zrender.Group();
        this.drawReady();
        this.zr.add(this.group);
     },
     /**
      * @name: 画图前准备数据
      * @test: test font
      * @msg: 
      * @param {type} 
      * @return: 
      */
     drawReady() {
       let _this = this;
       let width = this.zr.dom.clientWidth;
       let datas = JSON.parse(JSON.stringify(this.dataJson));
       let stepWidth =  width / datas.length
       datas.map((item, index) => {
        //  item.width = stepWidth;
        //  item.height = this.zr.dom.clientHeight;
        //  item.x = index * stepWidth;
        //  item.y = 0;
        let infoMation = {
          width: stepWidth,
          height: 30,
          x: index * stepWidth,
          y: 0,
          CircleRadius: 10,
          item
        }
        _this.drawWrap(infoMation);
        if (index < datas.length - 1) {
          _this.drawLines(infoMation);
        }
       })
     },
     drawWrap(datas) {
       let topText = new zrender.Rect({
         shape: {
           x: datas.x,
           y: datas.y,
           width: datas.width,
           height: datas.height
         },
         style: {
            text: datas.item.value,
            fill: 'transparent', // 填充颜色，默认#000
            stroke: '#000', // 描边颜色，默认null
            lineWidth: 0 // 线宽， 默认1
         }
       })
       let midGrap = new zrender.Circle({
         shape: {
          cx: datas.width / 2 + datas.x, // 圆心x坐标
          cy: datas.height + datas.CircleRadius, // 圆心y坐标
          r: datas.CircleRadius, // 圆的半径
        },
        style: {
          fill: 'transparent', // 填充颜色，默认#000
          stroke: '#000', // 描边颜色，默认null
          lineWidth: 2 // 线宽， 默认1
        },
       })
       let arrs = datas.item.name.split('');
       let bottomText = new zrender.Rect({
         shape: {
           x: datas.x,
           y: datas.height + datas.CircleRadius * 2,
           width: datas.width,
           height: datas.height 
         },
         style: {
            text: arrs.join('\n'),
            fill: 'transparent', // 填充颜色，默认#000
            stroke: '#000', // 描边颜色，默认null
            lineWidth: 0, // 线宽， 默认1
            textPosition: 'bottom',
            textOffset: [0, -30]
         }
       })
       this.group.add(topText).add(midGrap).add(bottomText);
     },
     drawLines(datas) {
      let lines = new zrender.Line({
         shape: {
           x1: datas.x + datas.width / 2 + datas.CircleRadius,
            y1: datas.height + datas.CircleRadius,
            x2: datas.x + datas.width / 2 + datas.width - datas.CircleRadius,
            y2: datas.height + datas.CircleRadius
         }
       })
       this.group.add(lines)
     }
   },
   created() {
   },
   mounted() {
     let _this = this;
     this.init();
     window.onresize = () => {
       _this.init();
     }
   },
   beforeCreate() {},
   beforeMount() {},
   beforeUpdate() {},
   updated() {},
   beforeDestroy() {},
   destroyed() {},
   activated() {},
  }
</script>
<style scoped>
.z-render{
  width: 100%;
  height: 100%;
}

#z-render-con{
  width: 100%;
  height: 100%;
}
</style>
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-15 16:05:27
--> 
<template>
  <div class='zRenderBox'>
    <div id="zRenderCanvas">

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
        this.zr = zrender.init(document.getElementById('zRenderCanvas'));
        this.group = new zrender.Group();
        this.drawStepCon();
        this.zr.add(this.group);
     },
     drawStepCon() {
      //  console.log(this.zr.dom.clientWidth)
       let width = this.zr.dom.clientWidth;
      //  let height = this.zr.dom.clientHeight;
       let datas = JSON.parse(JSON.stringify(this.dataJson));
       let stepWidth =  (width - 25) / (datas.length -1)
       datas.forEach((item, index) => {
         item.x = index * (stepWidth - 25);
         item.y = 60;
         if (index < datas.length - 1) {
           item.x2 = index * (stepWidth - 25) + (stepWidth - 10);
           item.y2 = 60;
         }
       })

       datas.map(i => {
         this.drawCircle(i.x, i.y, i.name, i.value, i.x2, i.y2)
       })
     },
     drawCircle(x, y, name, value, x2, y2) {
      // 创建一个圆circle
      let circle = new zrender.Circle({
        shape: {
          cx: x + 25, // 圆心x坐标
          cy: y, // 圆心y坐标
          r: 10, // 圆的半径
          silent: true
        },
        style: {
          fill: 'transparent', // 填充颜色，默认#000
          stroke: '#000', // 描边颜色，默认null
          lineWidth: 2 // 线宽， 默认1
        },
        onmouseover(e) {
          console.log(e)
          let toolipDiv = document.createElement('div');
          toolipDiv.innerHTML = name;
          toolipDiv.className = 'toolip';
          toolipDiv.style = `position: fixed; top: ${e.clientY}px; left: ${e.clientX}px`
          document.getElementsByClassName('zRenderBox')[0].append(toolipDiv)
        },
        onmouseout() {
          let child = document.getElementsByClassName('toolip')[0]
          document.getElementsByClassName('zRenderBox')[0].removeChild(child)
        }
      });

      let arrs = name.split('');

      let names = new zrender.Text({
        style: {
          x: x + 18,
          y: y + 25,
          text: arrs.join('\n')
        }
      })

      let values = new zrender.Text({
        style: {
          x: x,
          y: y - 30,
          text: value,
          textOrigin: ['50%', '50%']
        }
      }) 

      let lines = new zrender.Line({
        shape: {
          x1: x + 35,
          y1: y,
          x2: x2,
          y2: y2
        }
      })
      // 添加圆到group里
      this.group.add(circle).add(names).add(values).add(lines);
    }
   },
   created() {

   },
   mounted() {
     let _this = this
     this.init();
     window.onresize = function () {
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
.zRenderBox{
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
#zRenderCanvas{
    width: 100%;
    height: 100%;
  }
</style>

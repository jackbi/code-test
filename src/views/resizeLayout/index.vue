<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-13 09:39:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-03 11:22:13
-->
<template>
  <div class="resize-layout">
    <a-row class="resize-layout-inner" :gutter="[16, 16]">
      <a-col class="left-layout" :span="4">
        <ul class="left-content">
          <li
            v-for="item in 5"
            draggable="true"
            @dragstart="drag($event)"
            @dragend="onDragend($event)"
            @dragover="onDragover($event)"
            @drop="onDrop($event)"
            class="left-content-item"
            :key="item"
          >
            {{ item }}
          </li>
          <li>
            <a-button @click="goSave" value="small" type="primary"
              >保存</a-button
            >
          </li>
        </ul>
      </a-col>
      <a-col class="right-layout" :span="20">
        <div :style="backgrounStyle" style="width: 100%; height: 100%">
          <vue-draggable-resizable
            :class-name="`my-class-${element.id}`"
            :ref="`drag-item-${element.id}`"
            :grid="[10, 10]"
            v-for="element in elements"
            :key="element.id"
            :x="element.x"
            :y="element.y"
            :w="element.w"
            :h="element.h"
            :z="element.zIndex"
            @resizing="
              (x, y, width, height) => resizestop(element.id, width, height)
            "
            @activated="onActivated(element.id)"
            @deactivated="onDeactivated(element.id)"
            @dragging="(left, top) => dragging(element.id, left, top)"
            @dragstop="(left, top) => dragstop(element.id, left, top)"
          >
            <p>
              {{ element.text }}
            </p>
          </vue-draggable-resizable>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      backgrounStyle: {
        position: "relative",
        backgroundColor: "#808080",
        background:
          "linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)",
        backgroundSize: "10px 10px, 10px 10px",
      },
      sync: false,
      draggingId: null,
      prevOffsetX: 0,
      prevOffsetY: 0,
      elements: [
        { id: 1, zIndex: 1, x: 0, y: 0, text: "Element 1" },
        { id: 2, zIndex: 1, x: 50, y: 50, text: "Element 2" },
      ],
    };
  },
  computed: {
    draggingElement: function () {
      if (!this.draggingId) return;
      return this.elements.find((el) => el.id === this.draggingId);
    },
  },
  watch: {},
  methods: {
    drag(e) {
      // console.log('================drag====================');
      // console.log(e);
      // console.log('================drag====================');
    },
    onDragend(e) {
      // console.log('==============onDragend======================');
      // console.log(e);
      // console.log('==============onDragend======================');
    },
    onDragover(e) {
      console.log("================onDragover====================");
      console.log(e);
      console.log("================onDragover====================");
    },
    onDrop(e) {
      // console.log('=================onDrop===================');
      // console.log(e);
      // console.log('=================onDrop===================');
    },
    resizestop(id, width, height) {
      let indexs = this.elements.findIndex((i) => i.id == id);
      this.$set(this.elements[indexs], "w", width);
      this.$set(this.elements[indexs], "h", height);
      let myClass = document.getElementsByClassName(`my-class-${id}`)[0];
      myClass.style.width = `${width / 190}rem`;
      myClass.style.height = `${height / 190}rem`;
    },
    goSave() {
      // console.log(this.elements);
      // this.$refs[`drag-item-1`][0].style.width = `${200 / 190}rem`;
      // this.$forceUpdate();
      // console.log(this.$refs[`drag-item-1`][0]);
      // let myClass = document.getElementsByClassName(`my-class-1`)[0];
      // console.log(myClass.style.width);
      // myClass.style.width = `${200 / 190}rem`;
      this.elements.forEach((item) => {
        let myClass = document.getElementsByClassName(`my-class-${item.id}`)[0];
        myClass.style.width = `${item.w / 190}rem`;
        myClass.style.height = `${item.h / 190}rem`;
        // myClass.style.transform = `translate(${item.x / 190}rem, ${item.y /
        //   190}rem)`;
        // console.log(myClass.style);
      });
    },
    onActivated(id) {
      let indexs = this.elements.findIndex((i) => i.id == id);
      this.$set(this.elements[indexs], "zIndex", 100);
      this.$forceUpdate();
    },
    onDeactivated(id) {
      let indexs = this.elements.findIndex((i) => i.id == id);
      this.$set(this.elements[indexs], "zIndex", 1);
      this.$forceUpdate();
    },
    dragging(id, left, top) {
      this.draggingId = id;

      if (!this.sync) return;

      const offsetX = left - this.draggingElement.x;
      const offsetY = top - this.draggingElement.y;

      const deltaX = this.deltaX(offsetX);
      const deltaY = this.deltaY(offsetY);

      this.elements.map((el) => {
        if (el.id !== id) {
          el.x += deltaX;
          el.y += deltaY;
          // let myClass = document.getElementsByClassName(`my-class-${id}`)[0];
          // myClass.style.transform = `translate(${deltaX / 190}rem, ${deltaY /
          //   190}rem)`;
        }

        return el;
      });
    },
    dragstop(id, left, top) {
      this.elements.map((el) => {
        if (el.id === id) {
          el.x = left;
          el.y = top;
          // let myClass = document.getElementsByClassName(`my-class-${id}`)[0];
          // myClass.style.transform = `translate(${left / 190}rem, ${top /
          //   190}rem)`;
        }

        return el;
      });

      this.draggingId = null;
      this.prevOffsetX = 0;
      this.prevOffsetY = 0;
    },
    deltaX(offsetX) {
      const ret = offsetX - this.prevOffsetX;

      this.prevOffsetX = offsetX;

      return ret;
    },
    deltaY(offsetY) {
      const ret = offsetY - this.prevOffsetY;

      this.prevOffsetY = offsetY;

      return ret;
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang="less" scoped>
.resize-layout {
  height: 100%;
  .resize-layout-inner {
    height: 100%;
    .left-layout {
      height: 100%;
      background-color: #e5e5e5;
      .left-content {
        list-style: none;
        .left-content-item {
          line-height: 30px;
          font-size: 14px;
          margin-bottom: 10px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .right-layout {
      height: 100%;
      // height: calc(100% - 30px);
      overflow: hidden;
    }
  }
}

.my-class {
  background-color: #e6e7e8;
  border: 1px dashed grey;
  position: relative;
}

[class*="my-class-"] {
  background-color: #e6e7e8;
  border: 1px dashed grey;
  position: relative;
  width: 1.025641rem;
  height: 1.025641rem;
}
</style>

<!--
 * @Description: 
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-12-22 13:24:24
 * @LastEditors: wenbin
 * @LastEditTime: 2021-12-22 14:06:32
 * @FilePath: /bi-table-test/src/views/threeJs/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="thressTest" ref="thressTest"></div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
} from "three";
export default {
  name: "index",
  components: {},
  data() {
    return {
      renderer: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description: 创建渲染器
     * @param {*}
     * @return {*}
     */

    createCube() {
      const w = this.$refs.thressTest.clientWidth;
      const h = this.$refs.thressTest.clientHeight;
      // 渲染器
      this.renderer = new WebGLRenderer();
      this.renderer.setSize(w / 2, h / 2);
      // document.body.appendChild( renderer.domElement );
      this.$refs.thressTest.appendChild(this.renderer.domElement);
      // this.drawCube();
      this.drawLine();
    },
    /**
     * @description: 画立方体
     * @param {*}
     * @return {*}
     */

    drawCube() {
      const w = this.$refs.thressTest.clientWidth;
      const h = this.$refs.thressTest.clientHeight;
      const scene = new Scene(); // 场景
      // 相机
      /**
       *第一个参数是视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)
       *第二个参数是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的值。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。
       *第三个参数 近截面（near）
       *第四个参数 远截面（far）
       */
      const camera = new PerspectiveCamera(75, w / h, 0.1, 1000);

      const _this = this;
      // 画立方体
      const geometry = new BoxGeometry();
      const material = new MeshBasicMaterial({ color: "#fff" });
      const cube = new Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 2;

      const animate = function() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;

        _this.renderer.render(scene, camera);
      };

      animate();
    },
    /**
     * @description: 画线
     * @param {*}
     * @return {*}
     */

    drawLine() {
      const _this = this;
      const w = this.$refs.thressTest.clientWidth;
      const h = this.$refs.thressTest.clientHeight;
      const scene = new Scene(); // 场景
      const camera = new PerspectiveCamera(45, w / h, 1, 500);
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      const material = new LineBasicMaterial({ color: "#fff" });

      const points = [];
      points.push(new Vector3(-10, 0, 0));
      points.push(new Vector3(0, 0, 0));
      points.push(new Vector3(10, 0, 0));

      const geometry = new BufferGeometry().setFromPoints(points);

      const line = new Line(geometry, material);

      scene.add(line);
      _this.renderer.render(scene, camera);
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.createCube();
    });
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style scoped>
.thressTest {
  width: 100%;
  height: 100%;
}
</style>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-10 10:49:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-10 14:28:20
-->
<template>
  <div class="">
    <layout>
      <template slot="content">
        <router-view></router-view>
      </template>
    </layout>
  </div>
</template>

<script>
import layout from '@/components/layout/backStage';
export default {
  components: {
    layout
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
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

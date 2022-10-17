<!-- @format -->

<!--
 * @Description: 
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-17 15:47:01
 * @LastEditors: wenbin
 * @LastEditTime: 2022-09-02 14:56:53
 * @FilePath: /bi-table-test/src/views/echarts/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="chart-test">
    <div class="chart-legend">
      <el-table size="mini" border height="100%" :data="tableData">
        <el-table-column
          prop="name"
          label="名称"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="color" label="颜色" min-width="80">
          <template slot-scope="scope">
            <el-color-picker
              v-model="scope.row.color"
              size="mini"
            ></el-color-picker>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="值" min-width="120">
        </el-table-column>
        <el-table-column prop="unit" label="单位" min-width="120">
        </el-table-column>
        <el-table-column prop="max" label="上限" min-width="120">
          <!-- <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.max"></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="min" label="下限" min-width="120">
          <!-- <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.min"></el-input>
          </template> -->
        </el-table-column>
        <el-table-column prop="width" label="线宽" min-width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.width"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="chart-series"></div>
  </div>
</template>

<script>
export default {
  name: "chartIndex",
  components: {},
  data() {
    return {
      tableData: [
        {
          name: "测试",
          color: "#333",
          value: 100,
          unit: "m/s",
          max: 300,
          min: 100,
          width: 2,
        },
      ],
    };
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
  activated() {},
};
</script>
<style lang="less" scoped>
.chart-test {
  width: 100%;
  height: 100%;
  .chart-legend {
    height: 50%;
    box-sizing: border-box;
    padding-bottom: 15px;
  }
  .chart-series {
    height: 50%;
    box-sizing: border-box;
    padding-top: 15px;
  }
}
</style>

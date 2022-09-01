<!--
 * @Description: 
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-01-27 11:24:05
 * @LastEditors: wenbin
 * @LastEditTime: 2022-01-27 17:07:25
 * @FilePath: /bi-table-test/src/views/hansontable/createTable.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <el-row class="create-table">
    <el-col :span="4" class="create-table-tree">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-col>
    <el-col :span="6" class="create-table-data">
      <div class="create-table-data-index">
        <h3 class="create-table-title">数据</h3>
        <!-- <div class="data-filter">
          <el-input type="text" size="mini" v-model="query.dataname"></el-input>
        </div> -->
        <div class="create-table-data-content">
          <el-table
            size="mini"
            stripe
            border
            :data="indexTableData"
            height="100%"
            style="width: 100%"
          >
            <el-table-column prop="date" label="" min-width="120">
              <template slot="header">
                数据名称
                <el-input
                  v-model="query.dataname"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="数据编码" min-width="120">
              <template slot="header">
                数据编码
                <el-input
                  v-model="query.datacode"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="create-table-data-fixed">
        <h3 class="create-table-title">默认数据</h3>
        <div class="create-table-fixed-content"></div>
      </div>
    </el-col>
    <el-col :span="14" class="create-table-config">
      <div class="create-table-config-form">
        <h3 class="create-table-title">表格属性设置</h3>
        <div class="create-table-config-inner">
          <el-form
            :model="formData"
            :rules="formRules"
            ref="formRef"
            label-width="100px"
            size="mini"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="表格总行数" prop="maxRows">
                  <el-input-number
                    controls-position="right"
                    v-model="formData.maxRows"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="表格总列数" prop="maxCols">
                  <el-input-number
                    controls-position="right"
                    v-model="formData.maxCols"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="标题行数" prop="titleRows">
                  <el-input-number
                    controls-position="right"
                    v-model="formData.titleRows"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="标题列数" prop="titleCols">
                  <el-input-number
                    controls-position="right"
                    v-model="formData.titleCols"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="冻结起始行数" prop="fixedRowsTop">
                  <el-input-number
                    controls-position="right"
                    v-model="formData.fixedRowsTop"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="冻结起始列数" prop="fixedColumnsLeft">
                  <el-input-number
                    controls-position="right"
                    v-model="formData.fixedColumnsLeft"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="overflow: hidden">
              <el-col :span="8">
                <el-form-item label="自适应宽度" prop="stopAutoWidth">
                  <el-switch
                    v-model="formData.stopAutoWidth"
                    active-value="all"
                    inactive-value="none"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button size="mini" type="primary" @click="renderTable"
                  >生成表格</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="create-table-config-table" ref="table-config-preview">
        <div id="hotTable" ref="hotTable"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Handsontable from "handsontable";
import contextMenu from "./contextMenu";
export default {
  name: "createTable",
  mixins: [contextMenu],
  components: {},
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text",
      },
      treeData: [],
      indexTableData: [],
      fixedTableData: [],
      query: {
        dataname: "",
        datacode: "",
      },
      formData: {
        maxRows: 10,
        maxCols: 10,
        titleRows: 0,
        titleCols: 0,
        fixedRowsTop: 0,
        fixedColumnsLeft: 0,
        stopAutoWidth: "none",
      },
      formRules: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleNodeClick() {},
    renderTable() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let settingsData = {};
          let height = this.$refs["table-config-preview"].offsetHeight;
          settingsData.language = "zh-CN"; // en-US
          settingsData.stretchH = this.formData.stopAutoWidth;
          settingsData.colsNum = this.formData.maxCols;
          settingsData.rowsNum = this.formData.maxRows;
          settingsData.titleRows = this.formData.titleRows;
          settingsData.titleCols = this.formData.titleCols;
          settingsData.fixedRowsTop = this.formData.fixedRowsTop;
          settingsData.fixedColumnsLeft = this.formData.fixedColumnsLeft;
          settingsData.mergeCells = [];
          // settingsData.colWidths = [];
          settingsData.data = Handsontable.helper.createEmptySpreadsheetData(
            this.formData.maxRows,
            this.formData.maxCols
          );
          // for (let i = 0; i < this.formData.maxCols; i++) {
          //   settingsData.colWidths.push(150);
          // }
          settingsData.cell = [];
          for (let z = 0; z < settingsData.titleRows; z++) {
            for (let s = 0; s < settingsData.colsNum; s++) {
              settingsData.cell.push({
                col: s,
                row: z,
                className: "vtable-cell-row-title",
              });
            }
          }
          for (let k = 0; k < settingsData.titleCols; k++) {
            for (
              let p = settingsData.titleRows;
              p < settingsData.rowsNum;
              p++
            ) {
              settingsData.cell.push({
                col: k,
                row: p,
                className: "vtable-cell-col-title",
              });
            }
          }
          settingsData.contextMenu = this.contextMenu;
          this.settings = {
            colHeaders: true,
            rowHeaders: true,
            licenseKey: "non-commercial-and-evaluation",
            height,
            hiddenColumns: {
              columns: [],
              indicators: true,
            },
            hiddenRows: {
              rows: [],
              indicators: true,
            },
            ...settingsData,
          };
          this.createHandson(this.settings);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * TAG_TREE 创建表格
     * @name: 创建表格
     * @test: test font
     * @msg:
     * @param {*} tableData
     * @return {*}
     */
    createHandson(tableData) {
      let _this = this;
      if (_this.handsonTables) {
        _this.handsonTables.destroy();
      }
      if (_this.$refs.hotTable) {
        _this.handsonTables = new _this.$handsontable(
          _this.$refs.hotTable,
          tableData
        );
      }
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
.create-table {
  width: 100%;
  height: 100%;
  .create-table-tree,
  .create-table-data,
  .create-table-config {
    height: 100%;
  }
  .create-table-tree {
    overflow: auto;
    border: 1px solid #f5f5f5;
  }

  .create-table-data {
    border: 1px solid #f5f5f5;
    .create-table-data-index {
      height: calc(100% - 300px);

      .data-filter {
        padding: 5px 10px;
      }
      .create-table-data-content {
        height: calc(100% - 30px);
        box-sizing: border-box;
        padding: 10px;
      }
    }
    .create-table-data-fixed {
      height: 300px;
      .create-table-fixed-content {
        height: calc(100% - 30px);
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
  .create-table-config {
    padding-left: 15px;
    .create-table-config-form {
      .create-table-config-inner {
        padding: 10px;
      }
    }
    .create-table-config-table {
      height: calc(100% - 188px);
    }
  }
  .create-table-title {
    line-height: 30px;
    height: 30px;
    font-size: 12px;
    padding-left: 15px;
    background-color: #e5e5e5;
  }
}
</style>

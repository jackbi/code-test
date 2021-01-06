<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-11 14:48:55
-->
<template>
  <div id="home" ref="home"></div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      handsonTables: ''
    };
  },
  mounted() {
    this.createHandson2();
  },
  methods: {
    createHand() {
      let _this = this;
      _this.handsonTables = new _this.$handsontable(_this.$refs.home, {
        data: _this.$handsontable.helper.createSpreadsheetData(5, 10), // 生成行：100 列 10 的表格
        colWidths: 100,
        width: '100%',
        height: 320,
        rowHeaders: true, // 是否显示行头
        colHeaders: true, // 是否显示列头
        // fixedRowsTop: 2, // 行固定
        // fixedColumnsLeft: 2, // 列固定
        // fixedRowsBottom: 2, // 底部固定
        // manualColumnResize: true, // 列可拖动调整大小
        // manualRowResize: true, // 行可拖动调整大小
        // manualColumnMove: true, // 移动列
        // manualRowMove: true, // 移动行
        // headerTooltips: { // 表头提示工具
        //   rows: false,
        //   columns: true, // 列头显示
        //   onlyTrimmed: false // 超出才显示
        // },
        // stretchH: 'all', // 列拉伸
        // contextMenu: true, // 右键菜单
        // manualColumnFreeze: true,// 手动冻结列(配合contextMenu使用)
        // trimRows: [1, 2, 5],
        nestedHeaders: [
          ['A', { label: 'B', colspan: 8 }, 'C'],
          ['D', { label: 'E', colspan: 4 }, { label: 'F', colspan: 4 }, 'G'],
          [
            'H',
            { label: 'I', colspan: 2 },
            { label: 'J', colspan: 2 },
            { label: 'K', colspan: 2 },
            { label: 'L', colspan: 2 },
            'M'
          ],
          ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
        ],
        collapsibleColumns: [
          { row: -4, col: 1, collapsible: true },
          { row: -3, col: 1, collapsible: true },
          { row: -2, col: 1, collapsible: true },
          { row: -2, col: 3, collapsible: true }
        ],
        language: 'zh-CN',
        licenseKey: 'non-commercial-and-evaluation'
      });
    },
    createHandson2() {
      let _this = this;
      _this.handsonTables = new _this.$handsontable(_this.$refs.home, {
        // data: _this.$handsontable.helper.createSpreadsheetData(5,10),
        data: [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [9, 8, 7, 6, 5, 5, 6, 7, 8, 9],
          [9, 8, 7, 6, 5, 5, 6, 7, 8, 9],
          [9, 8, 7, 6, 5, 5, 6, 7, 8, 9],
          [9, 8, 7, 6, 5, 5, 6, 7, 8, 9],
          [9, 8, 7, 6, 5, 5, 6, 7, 8, 9],
          [null, null, null, null, null, null, null, null, null, null]
        ],
        colHeaders: true,
        rowHeaders: true,
        hiddenColumns: true,
        colWidths: 60,
        nestedHeaders: [
          [{ label: 'AAAAA', colspan: 0 }, { label: 'B', colspan: 8 }, 'C'],
          ['D', { label: 'E', colspan: 4 }, { label: 'F', colspan: 4 }, 'G'],
          [
            'H',
            { label: 'I', colspan: 2 },
            { label: 'J', colspan: 2 },
            { label: 'K', colspan: 2 },
            { label: 'L', colspan: 2 },
            'M'
          ],
          ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
        ],
        collapsibleColumns: [
          { row: -4, col: 1, collapsible: true },
          { row: -3, col: 1, collapsible: true },
          { row: -2, col: 1, collapsible: true },
          { row: -2, col: 3, collapsible: true }
        ],
        columnSummary: [
          {
            destinationRow: 6,
            destinationColumn: 1,
            sourceColumn: 0,
            // ranges: [
            //   [0, 1], [2]
            // ],
            // reversedRowCoords: true,  // 反向指定显示行
            type: 'sum'
          }
        ],
        mergeCells: [{ row: 1, col: 1, rowspan: 5, colspan: 1 }],
        licenseKey: 'non-commercial-and-evaluation'
      });
      _this.handsonTables.selectCell(0, 0);
    }
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>

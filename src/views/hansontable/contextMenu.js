/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-01-27 16:33:05
 * @LastEditors: wenbin
 * @LastEditTime: 2022-01-27 17:13:09
 * @FilePath: /bi-table-test/src/views/hansontable/contextMenu.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
export default {
  data() {
    let _this = this;
    return {
      contextMenu: {
        // callback: function(key, options) {
        //   if (key === "row_above" || key === "row_below") {
        //     let data = _this.handsonTables.getData();
        //     _this.formData.maxRows = data.length;
        //   } else if (key === "col_left" || key === "col_right") {
        //     let data = _this.handsonTables.getData();
        //     _this.formData.maxCols = data[0].length;
        //   }
        // },
        items: {
          cancel_cell_filled: {
            name: "取消必填",
            callback: function(key, options) {
              let hot = _this.handsonTables;
              let start = options[0].start;
              let end = options[0].end;
              for (var i = start.row; i <= end.row; i++) {
                for (var j = start.col; j <= end.col; j++) {
                  hot.setCellMeta(
                    i,
                    j,
                    "className",
                    hot.getCellMeta(i, j).className.replace("cell-filled", " ")
                  );
                  // console.log(hot.getCellMeta(i, j).className);
                }
              }
              hot.render();
            },
          },
          cell_filled: {
            name: "设置为必填",
            callback: function(key, options) {
              let start = options[0].start;
              let end = options[0].end;
              for (var i = start.row; i <= end.row; i++) {
                for (var j = start.col; j <= end.col; j++) {
                  _this.handsonTables.setCellMeta(
                    i,
                    j,
                    "className",
                    _this.handsonTables
                      .getCellMeta(i, j)
                      .className.replace("cell-filled", " ")
                  );
                  _this.handsonTables.setCellMeta(
                    i,
                    j,
                    "className",
                    _this.handsonTables.getCellMeta(i, j).className +
                      " cell-filled"
                  );
                }
              }
              _this.handsonTables.render();

              // let datas = options[0].start
              // hot.setCellMeta(datas.row, datas.col, 'className', hot.getCellMeta(datas.row, datas.col).className + ' cell-filled')
              // console.log(hot.getCellMeta(datas.row, datas.col).className)
            },
          },
          set_background_color: {
            name: "设置背景颜色",
            callback: function(key, options) {
              _this.selectCellOptions = options;
              _this.setBgColor.isShow = true;
            },
          },
          make_read_only: {},
          mergeCells: {},
          remove_row: {},
          remove_col: {},
          alignment: {},
          alignment: {},
          row_above: {},
          row_below: {},
          col_left: {},
          col_right: {},
          hidden_columns_hide: {},
          hidden_columns_show: {},
          hidden_rows_hide: {},
          hidden_rows_show: {},
        },
      },
    };
  },
};

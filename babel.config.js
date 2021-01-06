/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-06-01 09:23:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-10 13:27:47
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
   plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }
    ]
  ]
}

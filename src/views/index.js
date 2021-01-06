/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-07-17 16:38:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-07 13:30:39
 */ 
import mx from 'mxgraph';
const mxgraph = mx({
  mxImageBasePath: './src/images',
  mxBasePath: './src'
});
// decode bug https://github.com/jgraph/mxgraph/issues/49
window.mxGraph = mxgraph.mxGraph;
window.mxGraphModel = mxgraph.mxGraphModel;
window.mxEditor = mxgraph.mxEditor;
window.mxGeometry = mxgraph.mxGeometry;
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler;
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu;
window.mxStylesheet = mxgraph.mxStylesheet;
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar;
window.mxConstants = mxgraph.mxConstants;
window.mxPerimeter = mxgraph.mxPerimeter;

export default mxgraph;
/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-07-17 16:38:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-17 15:56:13
 */

import mx from 'mxgraph';
const mxgraph = mx({
  mxImageBasePath: '../../public/images',
  mxBasePath: '../../public'
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
window.mxRubberband = mxgraph.mxRubberband;
window.mxConnectionHandler = mxgraph.mxConnectionHandler;
window.mxConstraintHandler = mxgraph.mxConstraintHandler;
window.mxToolbar = mxgraph.mxToolbar;
window.mxKeyHandler = mxgraph.mxKeyHandler;
window.mxCell = mxgraph.mxCell;
window.mxImage = mxgraph.mxImage;
window.mxEvent = mxgraph.mxEvent;
window.mxCodec = mxgraph.mxCodec;
window.mxCellState = mxgraph.mxCellState;
window.mxEdgeStyle = mxgraph.mxEdgeStyle;
window.mxEdgeHandler = mxgraph.mxEdgeHandler;
window.mxConnectionConstraint = mxgraph.mxConnectionConstraint;
window.mxPoint = mxgraph.mxPoint;
window.mxPolyline = mxgraph.mxPolyline;
window.mxDivResizer = mxgraph.mxDivResizer;

export default mxgraph;

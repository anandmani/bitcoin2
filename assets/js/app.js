// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import Chart from "chart.js"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket, {fillBlocksTable, fillCharts, fillBlockTable} from "./socket"

let pathname = window.location.pathname
let singleBlockPath = /\/blocks\/[a-z]*/
if(pathname == '/metrics'){
  fillCharts()
}else if(pathname == '/blocks'){
  fillBlocksTable()
}else if(singleBlockPath.test(pathname)){
  let blockHeight = pathname.split('/')[2]
  fillBlockTable(blockHeight)
}

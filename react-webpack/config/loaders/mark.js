// loader是一个函数，它的入参是对象或字符串。它返回值可能是对象、字符串，还有可能是JS代码。
// 当这个loader是处理某种模块的最后一个loader，要求返回值JS代码。

const marked = require('marked')
const _loaderUtils = require("loader-utils")

function markLoader (source) {

  const html = marked.parse(source)
  const options = (0, _loaderUtils.getOptions)(this)
  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true
  return `${esModule ? 'export default' : 'module.exports ='} ${JSON.stringify(html)}`
}

module.exports = markLoader

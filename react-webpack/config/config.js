// 这是webpack官方推荐的默认的配置文件
// 运行在node环境中，语法CommonJS语法

// module.exports = {}
// module.exports = function (arg) { return {} }
// module.exports = (arg) => { return {} }
// module.exports = (arg) => ({})

const { resolve } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const ProgressPlugin = require('progress-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const webpack = require('webpack')
const smp = new SpeedMeasurePlugin()
const WebpackCleanPlugin = require('./plugins/WebpackCleanPlugin')

const serve = require('./serve')
const build = require('./build')

// 这个config是两个环境都需要的配置
const config = {
  // 入口
  // entry: './src/main.js',
  // entry: path.resolve(__dirname, 'src/main.js'),
  entry: {
    // 在多个chunk模块中需要共享的代码
    // 抽离vendor，把第三方包中的代码从业务代码抽离出来
    vendor: ['react', 'react-dom/client'],  // V18
    // vendor: ['react', 'react-dom'],   // V17
    app: {
      import: resolve('src/main.js'),
      dependOn: 'vendor'
    }
  },

  // 出口
  output: {
    // 指定打包结果放在什么地方
    path: resolve('dist'),
    // 指定打包结果的名字，一束、一捆
    // filename: 'bundle.js'
    // 为什么要加[contenthash]？
      // [contenthash]有什么特点？只有当前chunk中的代码发生变化时，打包才会得到新的hash值。
      // 浏览器有什么特点？默认为对静态资源进行缓存，它会根据服务端文件名的变化重新缓存。
      // 解决“浏览器因为缓存而导致的网站版本不更新”的问题。
    filename: 'static/js/[name].[contenthash].js',
    // 每次打包时，先删除掉dist旧文件
    // clean: true,
    // 指定chunk的命名规则。那些由()=>import()语法而分割出来的模块就叫chunk
    chunkFilename: 'static/js/chunk-[name].[chunkhash].js'
  },
  // plugins插件
  plugins: [
    // 作用，把output的结果，自动注入到指定的html中
    new HtmlWebpackPlugin({
      title: 'GP8',
      template: resolve('public/index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: resolve('public/favicon.ico')
    }),
    // 开启编译进度条，除了用这个插件 --progress
    new ProgressPlugin({clear:true}),
    // 在源码中不需要import就可以使用的第三方包
    new webpack.ProvidePlugin({
      'React': 'react',
      'window.React': 'react'
    }),
    // 使用自定义插件删除dist文件
    new WebpackCleanPlugin()
  ],
  // 一切文件皆模块，在webpack眼中都是模块
  // 定义的是处理各种模块的规则，一种模块配置一条规则
  module: {
    rules: [
      // 处理图片模块问题
      // { test: /\.(png|jpg|jpeg|svg|gif)$/, use: 'url-loader' },
      // { test: /\.(png|jpg|jpeg|svg|gif)$/, use: 'file-loader' },
      // 使用自定义loader
      { test: /\.md$/, use: [resolve('./config/loaders/mark.js')] }
    ]
  },
  // 解析配置
  resolve: {
    // 省略后缀只考虑js文件，
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    alias: {
      '@': resolve('./src'),
      '@@': resolve('./public')
    }
  },
  // 支持外部CDN引入的第三方的访问
  externals: {
    'echarts': 'echarts',
  }
}

module.exports = ({development}) => {
  // do something
  // 坑：smp.wrap()包裹生产环境时，scss样式抽离报错
  if (development) {
    return smp.wrap(merge(config, serve))
  } else {
    return merge(config, build)
  }
}

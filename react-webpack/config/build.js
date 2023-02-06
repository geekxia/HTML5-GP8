const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  // 打包时得到高质量的代码
  devtool: 'source-map',
  target: 'web',   // 构建的webpack应用
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 3  // 使用3个线程进行编译
      }),  // 使用terser进行高效压缩
      new CssMinimizerPlugin(),  // 使用cssnano压缩css
    ]
  },
  cache: false,
  output: {
    // 注意：它不是用来指定静态资源目录
    publicPath: './'  // 影响模块化导入的css和js路径
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    // 生成manifest文件
    new WebpackManifestPlugin(),
    // 打包分析
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8080
    // })
  ],
  module: {
    rules: [
      // 当webpack工作时，遇到以.js结尾的模块时，就使用babel-loader进行加载，然后交给Babel编译器进行编译。
      // @babel/core通过babel.config.js来完成真正的编译工作。
      { test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(css|scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/img/[name].[hash][ext]',
          // publicPath: 'http://qiniu.com/qf/cdn/'
          publicPath: './' // 影响模块化导入的图片路径
        }
      }
    ]
  }
}

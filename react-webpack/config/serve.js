const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  // 保证浏览器中报错位置就是源码位置
  devtool: 'inline-source-map',
  // 本地服务（对打包是没用的）
  optimization: {
    minimize: false, // 开发环境不压缩JS代码
  },
  // 只对开发环境有用
  cache: {
    type: 'memory',   // filesystem
  },
  devServer: {
    port: 8080,
    // 开启HMR热更新功能（Hot Module Replacement）
    // 具体做法：启本地服务时，顺便启一个socket服务，当本地代码有变化时，socket主动通信浏览器更新代码。
    hot: true,
    // 在v5中，contentBase已经废弃了，无须再指定静态服务器目录，默认就是public
    // 启动成功后，自动打开当前电脑上的默认浏览器进行开发
    open: true,
    // 自定义覆盖层的报错级别
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
    },
    // 代理
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      // 当webpack工作时，遇到以.js结尾的模块时，就使用babel-loader进行加载，然后交给Babel编译器进行编译。
      // @babel/core通过babel.config.js来完成真正的编译工作。
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,  // 缓存node_modules/.cache
            cacheCompression: false
          }
        },
        exclude: /node_modules/
      },
      // 当webpack工作时，遇到以.css结尾的模块时，先使用css-loader加载css文件，得到css代码，然后把css代码交给style-loader，把css代码插入html的head标签中。
      { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    //  这个插件，一定要babel-loader更早工作
    new ESLintPlugin({
      eslintPath: 'eslint',  // 指定代码检测工具
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules', // 只检测业务代码
      fix: false
    })
  ]
}

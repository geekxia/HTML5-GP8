// 这是@vue/cli脚手架给我们的配置文件
// 在这里可以配置端口、配置HTTP代理、配置打包选项
// 更多配置，参考：https://cli.vuejs.org/zh/

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    // 配置解决跨域问题（配置成功，要重启项目）
    proxy: {
      // 代理QQ音乐服务器
      '/splcloud': {
        target: 'https://c.y.qq.com',  // 远程服务器
        changeOrigin: true  // 允许改变“源”
      },
      '/api': {
        target: 'http://localhost:9999',  // Node服务
        changeOrigin: true
      }
    }
  }
})

// 这是Babel(V7)编译器指定的配置文件

// 告诉@babel/core如何工作
module.exports = {
  // 在这里配置“预设”
  // 预设，就是那些真正的用于编译各种JS语法的包
  // @babel/preset-env 用于编译大多数的ES6语法
  // @babel/preset-react  用于编译JSX语法
  // @babel/preset-typescript  用于编译TS语法
  presets: [
    ['@babel/preset-env', { targets: "defaults" }],
    ['@babel/preset-react', {}]
  ],
  // 在这里配置“插件”
  // 插件，预设无法完成的编译工作，由插件们来解决。
  plugins: [
    // 用于编译装饰器语法
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties"],
    // 支持 可操作链 语法
    ["@babel/plugin-proposal-optional-chaining"],
    // 支持 ()=>import() 动态导入
    ["@babel/plugin-syntax-dynamic-import"]
  ],
  // 从babel的角度指定浏览器的兼容性
  targets: {
    chrome: "58",
    ie: "11"
  }
}

created at 2022-06-06 by gp8

# 环境搭建

```
cnpm i create-react-app -g
create-react-app -V  // v5.0.1

yarn create react-app react-project

cd react-project

git init
git add --all
git commit -m 'first eject'

# 把webpack暴露出来
npm run eject   // y

rm -rf node-modules
yarn

npm start
```

- 整理项目目录（符合我们的开发习惯）
  - package.json
  - src
  - public

- 研究scripts、config目录
- 作用：检验你对webpack的理解、借鉴里面比较好的写法或工具。
- 修改入口文件的名字
- 修改了端口号
- 关闭了“自动打开浏览器”
- 添加 @ 别名
- 添加less-loader和less支持Less
- 配置代理（setupProxy、package.json、webpackDevServer.config.js）

'var(--ant-primary-color)'

# 总结

- 熟练使用create-react-app(webpack)
- 熟练使用react-router-dom(v6) 几个组件、几个Hooks、和V5区别
- 熟练使用(antd）布局、表单、表格、交互组件（类antd组件）
- 熟练使用(redux、react-redux、redux-thunk) redux传统架构（state-view-action）
- 会配置国际化（react-intl）antd国际化、业务组件化
- 大约理解React权限设计（redux、react-router-dom）权限流程（登录、获取用户信息、动态生成路由）
- 熟练使用Table、Form做增删改查（Upload）
- 会用Echarts、BizCharts（结合文档使用它们）
- 扩展：使用百度地图、react-quill、ahooks、react-use、虚拟列表长列表（react-virtualized）建议自己再做多几个demo
- 扩展：three.js / react-three-fiber 建议自己整两个demo

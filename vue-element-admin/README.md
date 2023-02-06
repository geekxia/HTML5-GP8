
# vue-element-admin

- 在package.json中先删除掉 tui-editor 这条记录，在当前环境中安装它会报错。
- 如果遇到 core-js 反复报错，说明是 core-js 安装失败，建议大家使用yarn或者cnpm来安装依赖。
- 淘宝镜像的使用方法：https://www.npmjs.com/package/cnpm
- 启动项目时，如果遇到 tui-editor 报错，找到对应的源码，把tui-editor代码暂时注释掉。


1、研究新项目的思路

README.md
package.json（技术栈、知道怎么安装依赖、启动项目、没见过的包）
研究各种配置文件
src
src/入口文件.js
src/App.tsx
src/路由、Layout，怎么配置新页面？
src/store状态管理文件
src/axios封装、api封装、跨域代理写在哪里
src/翻看别人写的页面、了解编程范式（代码习惯）
把项目跑起来(安装依赖包)，边看效果边看代码


2、研究结果输出

需要直属小领导帮助讲解的问题列表（10个以内）
罗列不值得问、自已又不会的问题列表




## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev
  - sit
  - stage
  - prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```

# 环境搭建

```
mkdir react-umiapp
cd react-umiapp
yarn create @umijs/umi-app
yarn
npm start
```

# 关于umi

- dva脚手架 ( react、react-router-dom、redux、redux-thunk/redux-saga ) 解决react+redux传统架构的复杂性
- dva官网：https://dvajs.com/

- umi(v3) 基于dva的更加高级的脚手架。
- umi特点：基于配置的，基于插件的，基于antd生态的，基于Webpack5、基于NodeJS环境，内置了TS、内置国际化、内置了dva(redux、路由)，支持Hooks编程。

- umi是基于配置的，支持两种配置方式：.umirc.ts 、 config/config.ts(优先级更高)
- umi官网：https://umijs.org/zh-CN

# TypeScript(V4)

- 用什么环境学习TS？用tsc命令行编译.ts，用有ts环境的脚手架学习。
- 尽量安装比较新的 VScode代码编译器（内置了TS检测），也安装一下汉化包。
- TS学习资料（TS官网）：https://www.typescriptlang.org/

- TS简介：来自微软开源，是JS超集（强类型语法）、它和Flow(来自Facebook)是竞争关系、2020年年底火起来。

- TS配置文件：tsconfig.json / jsconfig.json
  - 顶层配置选项：compilerOptions、include、exclude
  - 遇到不懂的配置，要参考TS配置文档。

- TS环境特点：语法报错会影响项目启动和热更新，如果只是类型错误一般是不影响项目启动和热更新。

- TS声明文件：项目中那些 *.d.ts文件，那些已经安装过的 @types/*包。
  - 这种*.d.ts声明文件，是我们自己定义的类型，用于业务代码的检测。
  - 那些在node_modules中的*.d.ts声明文件，常常需要先导入再使用，用于组件、API的类型检测。

- 常用的TS类型
  - 常用TS类型、对象类型、泛型、枚举等。




# 理解Webpack

- 构建工具（打包器）：作用是把咱们代码中的各种模块打包编译成浏览器能够普遍兼容的ES5代码。
- 基于配置的：在webpack中有很多概念，Webpack怎么工作取决于我们给它什么样的配置。
- 架构基础：是前端架构的基础。
- 模块化：在webpack眼中一切皆模块。在我们工程中，你可以使用任何模块，只要你能有合适的loader。
- 作业拓展：查资料补充你对webpack的理解。

# 环境准备

- node(v14+)
- npm/cnpm/yarn
- webpack(v5)

一、搭建一个最小化的wepback环境

- cnpm i webpack -g/-D  核心包（API、内置插件）
- cnpm i webpack-cli -g/-D  命令行包
- 默认配置文件：webpack.config.js （语法、Schema）

二、搭建一个相对完整的wepback

- 什么是一个相对完整的wepback环境？（支持打包、支持本地服务）
- 对打包来讲：配置[name]、配置[contenthash]、浏览器缓存
- cnpm i webpack-dev-server -g  构建本地开发服务器（**）
- 什么HRM？（背后的工作方式）
- cnpm i html-wepback-plugin -D  把html和js组装起来（**）


三、区分生产环境与开发环境

- 有两种办法：cross-env在node进程添加环境变量，使用--env选项指定环境（**）
- 具体做法：根据人为思考，把webpack各种配置分为三类（公共配置、生产配置、开发配置），
- 再使用webpack-merge合并（**）

四、使用Babel编译器

- 问题：webpack默认对JS友好，那为什么还需要使用Babel？
- Babel又是什么？理解Babel（**）
- 具体做法：配置{test:/js/,use:'babel-loader'}，babel-loader要求加载@babel/core。
- Babel怎么作的？它会根据你的babel.config.js的配置（预设、插件）来工作。
- 有哪些常用的预设？有哪些常用的插件？（**）

五、集成sass编译

- 常用的css预处理器有哪些？sass、less、stylus...
- 具体做法：{ test:/.scss/, use: ['style-loader','css-loader','sass-loader']}
- 这些样式的loader是怎么工作的？流程是怎么的呢？
- style-loader，通过JS把样式代码插入到DOM中。如果build，没有css文件？（Css抽离插件）
- mini-css-extract-plugin 它给我们一个插件、它还给我们一个loader （**）

六、处理图片模块的三种方式

- file-loader  返回可访问的图片路径
- url-loader   返回base64路径
- { test, type ,generator }  加载模块资源

七、publicPath理解

- 在打包部署时所发挥的重要作用（部署）
- 问题：build打包结果怎么查询效果？（双击index.html、部署本地node/nginx服务器）

八、集成React环境

- 安装react、react-dom
- 安装@babel/preset-env，配置编译JSX语法

九、集成ESlint检测

- 安装eslint-webpack-plugin、eslint
- 添加eslint配置文件，如何编写配置文件？.eslintrc.js
- 为了兼容比较新的ES6语法的编译，还要安装@babel/eslint-parser配合ESlint。
- ESlint报错在浏览器有覆盖层，devServer.client.overlay
- 安装一系列检测React代码风格：airbnb官网提供的ESlint
- 识别并解决ESLint？（修改rules、添加注释、.eslintignore）

十、抽离vendor

- 什么是抽离vendor？从bundle业务代码中把那些第三方包抽离出来。
- entry支持多入口配置，app: { import: './main.js', dependOn: [] }


十一、分割chunk

- 什么bundle？什么又是chunk？
- 如何分割chunk：从技术角度webpack默认就支持代码分割（当打包时遇到()=>import()自动独立出一个新文件），从业务角度我们一般会从路由的角度拆分chunk。
- 在业务代码中使用()=>import()有语法报错，安装babel相关插件解决。

十二、你怎么做Webpack优化？

- 两层：编译运行速度、代码输出质量
- babal中配置targers、webpack中配置target
- progress-webpack-plugin 开启编译进行条
- 开启TerserPlugin压缩（webpack-parallel-uglify-plugin、uglifyjs-webpack-plugin）
- 使用css-minimizer-webpack-plugin压缩CSS代码
- cache: { type: 'memory' }
- babel-loader实现JS编译缓存 （cache-loader）
- 在V4中，thread-loader、happypack，都可以开启多线程编译
- speed-measure-webpack-plugin 分析哪些构建环节浪费时间，把构建时间报告你的控制台上。
- webpack.ProvidePlugin 实现在业务代码中无须引入第三方包，就可以直接使用它们
- externals  实现对外部扩展中的第三包的引用
- webpack-manifest-plugin   用于生成记录chunk等模块的信息文件
- webpack-nano 是一个轻量级的webpack-cli的工具
- tree-shaking  Webpack默认支持去除“死代码”
- webpack-bundle-analyzer 用于打包分析

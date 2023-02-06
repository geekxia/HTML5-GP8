# 导学

- 技术栈：vue(v2) + vue-router(v3) + vuex(v3)  + @vue/cli + vant(v2) | element-ui
	- .vue单文件组件、选项式
	- 文档：https://cn.vuejs.org/


- 技术栈：vue(v3) + vue-router(v4) + vuex(v4) | pinia(v2) + @vue/cli | vite + vant(v3) | element-plus
	- .vue单文件组件、组合式 | 选项式

- 文档：
	- Vue3文档：https://vuejs.org/
	- VueRouter4：https://router.vuejs.org/zh/index.html
	- Pinia：https://pinia.vuejs.org/
	- Vite官网：https://vitejs.dev/
	- ElementPlus：https://element-plus.gitee.io/zh-CN/


Vue3简介：2020年下半年（TS）、2022年新年正式发布了（v3.2）

# 创建Vue3项目
```
yarn create vite vue3-study --template vue-ts
cd vue3-study
yarn
yarn dev / npm run dev
```

- Volar：在VScode中为了支持Vue3的高亮语法和TS检验等，建议安装 Volar插件。

-  Vite环境默认就支持TS
	- 在项目根目录添加 tsconfig.json文件（找一个配置参考）
	- 在项目根目录添加 types.d.ts 添加一个模块声明。
	- 在.vue文件中，<script lang='ts'></script>
	- 如果是非.vue文件，以 *.ts 为后缀命名文件。


# 组件（只是演示了四种写法）

- 非组合式的选项式组件：在Vue3中完全支持Vue2的那种options选项式的组件。
- 组合式的选项式组件：使用setup选项，大约在Vue3.1中用得比较多，还在Vue3文档中很多地方都有这种写法。
- 支持JSX风格的组件：安装@vitejs/plugin-vue-jsx、@vue/babel-plugin-jsx支持JSX组件。
- setup语法糖组件：在<script setup></script>，这种语法糖组件可以禁止你再使用组件式写法，你只能使用组合API进行开发。

- 最佳实例：在Vue3开发时，不要再使用选项式写法的，建议使用组合式写法。

# Vue3最大的特点？

- 什么是组合？为什么要使用组合？
	- Vue3提供了一套组合API，可以完美地解决Vue2“数据和逻辑不分离”的缺陷。
	- 如何解决？
	- 第一步，把data/computed/methods/watch等用组合API替换；
	- 第二步，把逻辑关注点封装成自定义Hooks。

# 常用组合API

- ref / reactive / computed / watch / watchEffect / on*生命周期 。。。

# 父子组件信息

- defineProps / defineEmits / defineExpose / useAttrs / useSlots

# Vue3有哪些变化的细节？

- 非兼容的变化：https://v3-migration.vuejs.org/breaking-changes/
- API文档（非常重要）：https://vuejs.org/api/

# vue-router(v4)的一些变化细节

- 注意：在vue3环境中，必须要使用vue-router(v4)
- 创建router，使用createRouter()
- 指定路由模式，使用history属性：createWebHashHistory/createWebHistory()
- 路由注册，在mian.js中 app.use(router)
- 如果当前项目严格使用组合式API进行开发，必须使用 useRoute、userRouter等Hooks API进行开发。
- <router-link>已经没有tag属性的，可以用custom和插槽实现自定义。
- <router-view>新增了"插槽"功能，极其强大，参见路由中的伪代码，它在实现<keep-alive>和<transition>动画将变得更简单，还可以Suspense实现Loading。
- 新增了几个组合API：useRoute/useRouter/useLink。
- router.addRoutes() 方法移除了。

# pinia(v2)官方推荐

- 理解：下一代的vuex，对vue2/vue3都支持。
- 集成：app.use(pinia)
- 四个概念：State、Getters、Actions、Plugins
- createPinia / defineStore / $patch / 监听器 / storeToRefs

# 响应式原理

- Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

# 虚拟DOM与Diff算法

- Vue Template Expoler：https://vue-next-template-explorer.netlify.app/
- 霍春阳：https://zhuanlan.zhihu.com/p/150732926

# 关于Vite(ESBuild)

- vite有什么特点？
- vite为什么比较快？（使用ESM模块化、冷启动、ESBuild作用）
- vite实践中，可以搭建vue3开发环境、react开发环境。

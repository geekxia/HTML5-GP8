# 什么是MVC、MVP、MVVM？（理解）

- 网页本质：View视图(Browser) + (ajax) + Model数据(Server)   
- M+V 如何组装？在jQ时代，通过DOM操作直接组装。
- 在MVVM框架中，通过VM(虚拟DOM)与Diff运算，找到最小化的差异，再根据DOM来操作更新。
- 参考文献：http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html

# vue有哪些特点？

- 基于选项的，el、data、methods
- 基于指令的，v-text
- 是响应式的，为什么是响应式的？
- 是MVVM框架，M数据 + V视图 + VM虚拟DOM
- 渐近式的，vue可大可小可扩展，可以构建大型的Web系统，也可以构建小型的H5页面。

- el选项有什么用？
  - 用于挂载 / $mount()
  - 挂载之后，在vue地盘内部，就可以使用各种指令了

- 为什么在data选项上定义的声明式变量，可以通过this/app访问？
- data选项有什么特点？为什么data数据变化，视图会更新？


# 什么是声明式？

- jQuery开发：使用DOM选择器找到指定的节点，对它、孩子等。
- 声明式（在MVVM开发思路）：当我们要操作一个视图节点，先得声明一个合适的响应式变量，然后通过指令去实现节点的更新。


# 谈一谈jquery和vue的区别？

- 从MVVM角度
- 开发体验（开发范式）
- 网站性能

- 谈一谈vue2和vue3的区别？
- 谈一谈vue和react的区别？

# vue中常用的指令有哪些？(应用)

- 文本类指令
  - v-text，用于渲染string、number值（innerText、nodeValue）
  - {{ }} 文本插值，缺点是页面初始化或刷新时，有{{}}样式一闪过过，处理办法使用v-cloak加样式。
  - v-cloak，用于解决{{}}一闪而过的bug。
  - v-once，被它修饰的节点，只渲染一次，它要配合{{}}一起作用。它所对应的声明式变量变化，视图不更新。
  - v-html， 用于渲染html字符串，浏览器支持解析。v-html默认是支持防注入攻击(XSS)
  - 问题：什么XSS？前端应该做些什么事儿来阻止XSS？
  - v-pre，一般用于调试代码，阻止vue编译器解析vue指令。被v-pre包裹的节点，vue不编译。

- 动态属性：html标签是属性的，但这个属性是与声明式变量有关。
  - v-bind:标签属性='表达式'，用于给节点绑定动态的属性。
  - 结论：当一个DOM节点的属性是动态的，我们使用v-bind这个指令。因为v-bind用得非常多，所以它可以简写成 :
  - 动态class、动态style，是vue开发实现动态样式的常用手段。它们都支持数组语法和对象语法。

- 事件绑定
  - v-on:事件名称.事件修饰符='methods方法'，用于绑定交互事件。因为v-on用得非常多，所以它可简写成【 @事件名称.系列修饰符='methods方法'】
  - 如何拿到事件对象？当没有自定义事件传参时，事件处理器函数的第一个参数就是事件对象。
  - 如何自定义事件传参？ 语法：@事件名='methods方法(1, $event, [1,2])'
  - 有哪些常用的事件修饰符？.stop阻止冒泡，.prevent阻止默认事件，.enter监听键盘Enter事件。事件修饰符比较多，参考文档，并且在同一个事件处理器上可以同时使用多个修饰符。

- 列表渲染
  - v-for，用于渲染数组、JSON对象、Number整数。v-for能够循环哪些类型的JS变量？
  - 注意：v-for渲染数组时要key。为什么要加key？加key有什么值得注意的？

- 表单绑定
  - v-model，它最基础的作用是用于表单双向绑定，也就是方便我们取表单值。
  - 表单有哪些常用的修饰符？.number / .trim / .lazy(性能优化)
    - 详细说一下.lazy，当表单失焦时才会把表单最新值更新到data上，常用于长文本输入框。
    - 表单修饰符也可以链式使用。
  - v-model能够作用在哪些HTML标签上呢？HTML表单标签、自定义组件。
    - 在单选按钮组上如何使用v-model？
    - 在多先按钮组上如何使用v-model？
    - 在select表单上如何使用v-model？    
  - v-model是一种语法糖，它背后的原理是什么？
    - 对普通文本表单来讲，v-model = v-bind:value + v-on:input
    - 对radio或checkbox来讲，v-model = v-bind:checked + v-on:change
    - 对select来讲，v-model = v-bind:value + v-on:change
  - v-model还有哪些高级用法？
    - 在自定义组件上使用v-model，后续讲“组件化”时再说。

- 条件渲染
  - v-show  相当于display:none/block;的功能，不会反复地移除或插入DOM节点。
  - v-if/v-else-if/v-else  每次切换显示与隐藏时，对DOM进行反复地移除和插入。
  - 结论：如果目标DOM需要频繁地显示与隐藏，建议使用v-show；反之，可以使用v-if系列。
  - 注意1：v-if/v-else-if/v-else配套使用中，中间不能插入其它的DOM节点。
  - 注意2：v-if一般不建议和v-for一起使用（不要作用在同一个节点上），如果在同一个节点上同时使用v-if和v-for，那么v-if的优先级更高。

- 插槽（组件化）
  - v-slot 用于封装vue组件。因为它用得也非常多，所以可以简写成 #。
  - 结论：所在在vue所有指令中，只有三个简单：v-bind(:)、v-on(@)、v-slot(#)，这三个指令非常重要，它们是vue组件封装的基础。

- 在vue中有哪些指令可以简写？哪些指令不能接收值？(v-cloak、v-once、v-else) 哪些指令只能接收布尔值？v-for能循环哪些数据类型？
- 指令的背后到底是什么呢？（DOM功能）如何自定义封装v-model/v-on/v-bind等指令？什么是自定义指令？（Vue.directive）你工作中封装过哪些好用的指令？（v-pression、v-auth）
- Vue3.0中指令有哪些变化？


# 计算属性与侦听器

- computed 这是vue组件的一个选项
  - 作用：把视图模板中比较复杂的表达式抽离出来，以便于代码的可阅读性和可维护性。
  - 语法：计算属性是一个函数，它根据data声明式变量参与运算，最后返回新值。
  - 特点：在整个vue组件运行过程中，只有当其关联的声明式变量发生变化时，这个计算属性才会重新执行。所以说，计算属性是基于vue缓存系统的，在工作推荐多使用计算属性，这有利于组件的性能提升。
  - 写法：computed计算属性，默认是GET操作。我们还可以把计算属性拆解成GET/SET的写法，这样的话，计算属性还可以绑定在v-model。
  - 问题：计算属性可以计算哪些变量？在vue中，计算属性可以用于计算那些带有__ob__的声明式变量。

- watch 这也是vue组件的一个选项
  - 作用：用于监听某个响应式变量的变化，去做一另件事。
  - 语法：在watch选项中，你要监听哪个变量，函数名就是那个变量的名称。
  - 特点：watch监听器默认只监听数据的第一层，对那些层级较深的对象来讲，默认不能监听对象深层结构的变化。如果一定要监听对象深层结构变化，要使用deep:true这个属性。
  - 为什么watch默认只监听对象数据的第一层？监听的层级越深，Vue要做的事儿就越多。对JSON对象来讲，没有必要监听那么深。
  - 问题：在Vue中，watch监听器可以监听哪些数据呢？可以监听那些带有__ob__的响应式数据，比如data数据、计算属性、$route路由、vuex数据。


# Vue组件封装（）

- 简单谈一谈组件化？在MVVM框架中，组件是基础，我们的Web应用是由组件“堆砌”而成的。当我们要构建一个大型的web系统时，我们要先构建出若干个小的组件。
- 组件化的目的：封装（封装、便于维护），快速开发（避免重复造组件）。

- 到底如何理解组件？你可以这样理解，组件是HTML标签的扩展。传统时代我们用HTML标签“堆砌”网站，如今数据时代我们更加健壮的组件来“堆砌”网站。

- 如何封装一个Vue组件呢?
  - 语法：Vue.component('组件名称', '选项')
  - 组件名称，必须是两个以上的单词由 - 连接而成。为什么要求两个词组以上？
  - 自定义组件可以使用哪些选项？基本上Vue选项都可以使用，el不再需要了，template用于指定当前自定义组件的视图结构(视图结构必须是单一根节点)，props这个选项是专门用于接受父组件传递过来的自定义属性。
  - 在自定义组件中，所学过的指令都可以正常使用。

- 父子组件通信（“通信”在应用程序中指的是“数组交互”）
  - 父组件向子组件传递数据使用自定义属性（在子组件中使用props选项来接收父组件给的数据）
  - 子组件向父组件传递数据使用自定义事件（在子组件中使用this.$emit('事件名','数据')触发父组件给的自定义事件）

- <slot>插槽（是封装组件的重要技术点之一）
  - <slot>是Vue官方提供的一个内置组件，可以直接使用。
  - 什么插槽？你可以理解成，在自定义组件的内部嵌套视图组件。
  - 具名插件：<slot>组件有一个name属性，用于指定插槽名字。有了具名插槽，我们在自定义组件中可以使用多个slot来控制组件的结构。
  - v-slot最后一个指令，用于指定具名插槽的结构，它要配合<template #插槽名称>一起使用，因为v-slot用得非常多，所以它可以简写成 # 。

- 如何理解自定义属性(:xxx) 自定义事件(@yyy) 自定义插槽(#zzz)？自定义属性是给子组件数据，自定义事件是给子组件功能逻辑，自定义插槽是给子组件视图结构。


# 响应式原理
  - 官方解释：https://cn.vuejs.org/v2/guide/reactivity.html
  - 描述响应响应式原理：每一个vue组件都有一个data选项（对象），当组件初始化时，Vue会遍历data并劫持data中所有的变量，给它们添加getter/setter。Vue组件在浏览器中进行编译运行，指令将第一次接触（getter）这些声明变量，分门别类地收集每个声明式变量所对应的依赖（DOM节点的更新方法）。接着通知Watcher更新视图。当有人修改（setter）某个声明式变量时，这会notify通知Watcher更新当前声明式变量所对应的依赖集合。
  - 什么是Watcher？专门调用依赖集合中的DOM方法更新视图的。

# 生命周期
  - 官方解释：https://cn.vuejs.org/v2/guide/instance.html
  - 强调：每一个Vue组件都有一套独立的生命周期。
  - 生命周期有哪些？（2*4 + 2 + 1）
  - 在生命周期的每个阶段，Vue在背后做了什么事儿？
  - 响应式原理，发生在生命周期的哪个阶段？
  - 什么是虚拟DOM？为什么要有虚拟DOM的存在？虚拟DOM在生命周期哪些阶段中生成的？
  - 什么是diff运算？目的是为了什么？
  - 你在工作中，常用的生命周期有哪些？
  - 初始化执行哪些生命周期呢？请描述一下Vue组件更新阶段的流程。

# Vue内置组件

- Vue中有哪些内置组件？

- 用v-if、v-show、<component is>这三种方式实现Tab，有哪些本质性的区别？
- 如何自定义封装Tab选项卡（Tab多标签）组件？

- <keep-alive include exclude> 这个组件有什么用？在什么场景下会用到？
- 与<keep-alive>有关的两个重要生命：activated、deactivated。被<keep-alive>包裹过的组件不会被销毁，activated表示组件“激活”(进入前台)，deactivated表示组件“休眠”(进入后台)。
- 关于mounted和activated的差异性：前者在组件的整个生命中只执行一次，后者每次都执行。所以，如果有某个功能需要在组件激活都执行，建议写在activated中。
- 关于beforeDestroy和deactivated的差异性，在工作中要灵活使用。

- <transition>使用这个内置组件，可以非常方便地制作vue动画。
- 过渡动画有六个钩子：4个时刻、2个过程。
  - c-enter -> c-enter-active -> [c-enter-to]
  - [c-leave] -> c-leave-active -> c-leave-to
  - 这个 c 就是过渡动画的名称：<transition name='c'></transition>
- 过渡动画的样式，只在动画过程中起作用，不影响元素最终的显示效果。
- 在真实工作中，我们一般推荐<transition>配合第三方动画库使用，比如:animate.css。
  - Animate.css官网：https://animate.style/
  - CDN：https://www.jsdelivr.com/package/npm/animate.css
  - enter-active-class用于指定进入动画的class动画样式；
  - leave-active-class用于指定离开动画的class动画样式；
  - mode = in-out / out-in
  - 对多个元素执行动画时，一定要加key，否则动画无效。

# Vue逻辑复用

- Vue.mixin 混入
  - 全局混入：使用Vue.mixin({选项})向Vue系统中所有的组件注入相同的选项。
  - 全局混入有什么特点？有什么缺点？
  - 局部混入：使用 mixins:[] 这个选项，按需混入相同的选项。
  - 混入带来的变量优先级问题：组件自有的选项 > 局部混入选项 > 全部混入选项。

- 问题：在混入或自定义组件中，为什么data必须使用工厂函数呢？
  - 答：因为混入要被多个组件复用、自定义组件也会被复用，为了保证data数据的独立性，我们要使用工厂函数来实现。

- Vue.filter 过滤器
  - 作用：通常用于封装文本数据数据的逻辑。
  - 全局过滤器：Vue.filter('a', val=>())，一次封装，在所有组件中都可以使用。
  - 局部过滤器：使用 filters 选项来定义，只能在当前组件中使用。
  - 注意：过滤器只能用在 {{}} 和 v-bind 这两个指令中，其它指令不能使用过滤器。
  - 使用过滤器的语法：{{ count|a|b }}   v-bind:title='count|a|b'

- Vue.directive 自定义指令
  - 作用：通常用于封装具有相同逻辑的DOM功能。指令的背后实际上就是DOM功能。
  - 全局指令：使用Vue.directive('指令名称', fn | {bind,update})，一次封装任何组件中都可以使用。
  - 局部指令：使用 directives 这个选项来封装，只能在当前组件中使用。
  - 工作中几乎用的都是全局指令。
  - 封装自定义指令的核心是，理解指令背后的几个钩子：bind/inserted/update/componentUpdated/unbind，还要注意每个钩子函数给的参数API(el/binding/vnode)。
  - 你工作中封装过哪些自定义指令？解决什么问题？你是怎么封装的？
  - Vue中有哪些内置指令？如果让你模拟封装某个内置指令，你的思路是什么？

- Vue.prototype 原型链
  - 作用：当某个变量或方法需要经常用到时，我们将其放在Vue.prototype上，任何组件中都可以通过this来访问它。
  - 约定：放在Vue原型的API，都最好以 $ 开头。

- Vue.use 插件开发
  - 概念：封装第三方可复用的Vue插件包，开源给Vue社区，供广大的开发者使用。
  - 如何封装Vue插件呢？ const QfPlugin = { install(Vue) {} }，在install方法使用Vue注册一些全局的东西，包括原型链、混入、全局组件、全局过滤器、全局指令等。
  - 如何使用Vue插件呢？Vue.use(QfPlugin)，实际上在调用插件的install()方法。

# 两个重要的API

- $forceUpdate()
  - Vue2.0是有响应式缺陷，比如对某些比较复杂的引用数据类型(数组或对象)来讲，数据确实发生了变化，但视图不更新。怎么办？
  - 解决方案：使用 this.$forceUpdate() 强制更新视图。
  - 替换方案：使用  JSON.parse(JSON.stringify()) 深拷贝，对声明式变量重新赋值。

- $nextTick()
  - 首先要知道一个事，我们在set声明式变量时，这会触发Vue更新阶段（第三阶段），这是异步的。什么是Tick呢？你可以理解是更新流程中的“工作单元”。
  - 场景：比如我们Vue开发中，动态地向视图插入HTML结构，接着希望进一步操作这些刚被插入的HTML结构，这时我们需要用到this.$nextTick(callback)，在callback中执行对HTML的操作。
  - 替代方案：使用 updated() 这个生命周期也可以实现上述相同功能，但是不推荐。为什么不推荐呢？

# 盘点Vue中常见的通信方案

- 父子组件通信，父传子使用自定义属性(props)，子传父使用自定义事件($emit)。

- 状态提升：当多个组件需要共享一个数据时，我们要找到这些组件的最近的父级组件，然后把这个数据定义在这个父组件中去。找父组件比较容易时，我们可以这种方案。状态提升这种数据通信方案，普遍常用于兄弟组件之间，这样的代码也容易维护。

- ref通信：ref是Vue内置的属性，使用ref可以方便地访问DOM对象或Vue组件实例。
  - ref作用在普通HTML节点上，相当于是一种快捷的DOM访问方式，所以ref可以实现DOM访问。
  - ref作用在Vue组件上，访问的是组件对象，通过访问组件内部的data和调用methods方法实现通信。
  - 使用范围：this.$refs来操作的，ref是一种父子组件之间的通信方案。
  - 温馨提示：ref尽量少用，能不用尽量不用。

- $parent/$children，通过这两个内置API，可以Vue组件树之间任意穿梭。
  - $parent代表的是当前组件的父组件（父亲只有一个）
  - $children代表的是当前组件的子组件们（是一个数组）
  - 慎用：容易出现这样的代码 this.$parent.$children[2].$children[2]

- $attrs/$listeners，通过这两个内置API，可以轻松地访问父组件给我的自定义属性和自定义事件。
  - $attrs是在子组件中访问父组件传递过来的自定义属性，有点类似props的功能。需要注意的是，$attrs是无法接收style和class的。
  - $listeners在子组件访问父组件传递过来的自定义事件，既然能访问，当可以调用，这就有点像$emit()的功能了。
  - 结论：这种通信方案，在某种程度上是可以替代props/$emit()这种父子组件通信的。

- provide/inject，用于在组件树中“注入-消费”数据，是一种自上而下的数据通信方案。
  - provide在组件树的节点上注入数据。
  - inject在组件树的节点上消费数据。
  - 特点：数据只能从父级组件向后代组件传递，不能倒着来。

- 事件总线：是Vue内置的一种基于“订阅-发布”模式的通信方案。你可以理解成，这是一种基于Vue系统的事件机制，它不涉及到组件之间的关系。
  - 如何创建事件总线？const bus = new Vue()
  - 如何订阅消息？bus.$on('频道', callback)
  - 如何发布消息？bus.$emit('频道', '数据')
  - 如何取消订阅？bus.$off('频道')
  - 说明：事件总线是一种跨越了组件层级关系的通信方案，只与你是否订阅了有关。一处“发布(bus.$emit())”，多处可“订阅(bus.$on())”，只要订阅了就能收到消息。

- Vuex终极通信方案：这是一种状态管理的数据流方案，我们后面再讲。


# Vue脚手架环境

- 关于Node.js运行时环境的安装
  - window7，只能安装node(v12)，已经不符合我们前端开发的需求，必须得换更新的系统。
  - window10，可以安装node(v14/v16)，这是我们前端开发的最低配。
  - 如何安装Node环境：http://nodejs.cn/download/
  ```
  node -v
  npm -v
  ```
  - 使用淘宝镜像。在国内安装一些npm包，因为网络原因会导致失败，我们推荐使用淘宝镜像来安装各种包。参考文档：https://www.npmjs.com/package/cnpm
  ```
  npm install cnpm -g --registry=https://registry.npmmirror.com
  ```
  - 约定：在学习过程中，我们统一使用 cnpm 来安装各种包。

- 关于命令行工具
  - Git Bash，因为它自带了很类Linux的命令。
  - CMD命令行，不建议用，好多命令都没有。
  - VsCode命令行，可以用，好处是方便。

- 使用@vue/cli这个脚手架来创建Vue项目
  ```
  cnpm i @vue/cli -g  // 全局安装Vue官方脚手架
  vue -V              // 或
  vue --version       // 验证是否安装成功
  vue ui              // 使用可视化界面来创建项目（一般不用）
  vue create vue-webapp // 创建项目，需要一些时间
  cd vue-webapp       // 进入项目根目录
  npm run serve       // 启动项目，在浏览器地址栏输入url进行访问
  ```

- 关于目录结构
  - README.md 用于记录环境运行、特殊业务、Bug列表的地方。
  - package.json (scripts/dependencies/devDependencies/eslintConfig)，每次我们安装第三方时，都要将其记录在package.json中；如果以后丢包，先删除 node_modules包，再使用`cnpm i`重新安装这些依赖。
  - vue.config.js 是脚手架环境的官方配置文件，它是基于 Webpack的。这个配置每次修改，都得重新启动项目才能生效。
  - jsconfig.json 这是TS以前的配置文件。目前最新的TS配置文件，一般用tsconfig.json。
  - babel.config.js 这是Babel编译器的配置文件，编译器是用于把.vue语法或ES6+语法，转换成浏览器能够普遍兼容的ES5代码。
  - node_modules 当前环境所需要的第三方包，都在放在这里。如果丢包，要删除整个目录，再重新安装；提交代码或者发代码给他人时，不要带上这个目录。
  - public 是本地开发服务器的静态资源目录，通过端口号可以直接访问的。
  - src 是source code的简写，是我们真正写代码的地方；.vue文件是单文件组件，是Vue官方提供的一种方便我们编写“组件原材料”的方式，在Vscode中要安装vetur这个插件来支持高亮样式。

- 在脚手架中如何使用sass样式语法？
  - 如果VueCLI 是v4的，建议这样安装
    - cnpm i sass -D
    - cnpm i sass-loader@10.2.0 -D
  - 如果VueCLI 是v5的，建议这样安装
    - cnpm i sass -D
    - cnpm i sass-loader -D
  - 这里的 '-D'，表示把依赖包记录在devDependencies中
  - 在.vue文件中，在 <style lang='scss'></style>
  - 现在，你就可以开始使用sass编写样式了

- 在移动端(webapp)时，如何处理样式的兼容性问题？
  - 什么是webapp？长得像APP，交互也像APP，但实际上是H5页面的应用。
  - 问题：在代码中使用px做单位，是无法解决不同手机之间的问题的。
  - 方案：我们建议 rem 来做移动端布局，替代方案(vw/vh样式单位，很少用)。
  - 什么是rem布局呢？通过JS代码把html根字体大小设置成当前手机屏幕的1/10，然后我们在编写css时就可以使用rem做单位(相对于html根字体的)了，不再使用px这种绝对单位了。
  - 在VsCode中安装px自动转换rem的插件：自己安装喜欢的转换插件，打开这个插件的设置，把转换单位改成 75。为什么是75？因为市面的移动端UI稿的宽度都是750px。然后在代码中写css时依照UI稿用px，插件帮你自动转换成rem单位。

- 如何使用 VantUI 组件库？
  - 为什么要使用组件库？每一种web产品，其用户体验是类似的，使用组件库可以更快地完成这些相似的用户体验开发。避免重复造轮子，即使有需求方面的差异，我们也可以通过使用自定义属性、自定义事件、自定义插槽来完成定制。在需求和效率之间进行权衡，在满足产品需求的同时，尽可能地追求开发效率。
  - 官网(v2)：https://vant-contrib.gitee.io/vant/v2/#/zh-CN/
  ```
  cnpm i vant@latest-v2 -S
  cnpm i babel-plugin-import -D
  ```
  - 支持按需导入，在babel.config.js中配置如下
  ```
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
  ```
  - 局部注册使用组件：import导入组件，在components选项上进行注册。
  - 全局注册使用组件：import导入组件，使用Vue.use()进行注册。


# Vue-Router

- 版本问题
  - vue(v2) + vue-router(v3) + vuex(v3) + 第三包的版本问题
  - vue(v3) + vue-router(v4) + vuex(v4) + 第三包的版本问题
  ```
  cnpm i vue-router@3.5.3 -S  
  # -S，意思把这个包记录在dependencies中
  ```

- 在脚手架中集成vue-router路由系统，只需要考虑以下三个问题：
  - 路由规则是怎样的？path -> component 的映射关系是如何定义的？还要在main中挂载。
  - <router-view> 你放在哪里？它是用于显示path所对应的组件的。
  - 如何触发地址栏中url的变化？<router-link> 或 this.$router。

- 单页面应用程序SPA(Single Page Application)
  - 理解：整个应用程序中只有一个页面(index.html)，由路由系统把若干个组件串联起来，当URL变化时，路由加载对应的组件，在视觉上就发了生页面跳转。

- 两个内置组件
  - <router-view name> 作用是用于显示URL所对应的Component组件。
    - name属性，默认值是default，作用是给视图容器取个名字。
  - <router-link to active-class> 作用类似<a>，用于改变URL。
    - to属性，表示跳转到哪里？
    - active-class属性，当url配置成功时的高亮样式。
    - exact-* 地址栏中的URL和to完全相同时才起使用。

- 两个命名
  - 命名视图：使用name属性给<router-view>取个名字。在路由规则中使用`components`属性来指定用哪个“命名视图容器”来显示匹配成功的组件。
  - 命名路由：使用name属性给“路由规则”取一个名字。在页面及其业务逻辑中，我们跳转路由时，可以使用 name名字来指定跳转到哪个“路由规则”。
  ```
  <router-link :to='{name:"index"}'>首页</router-link>
  this.$router.push({name:'index'})
  ```

- 别名与重定向
  - 别名：使用alias属性给“路由规则”取个“小名”。有什么用？当path路径太长时，我们使用别名来简化它。别名，是可以当作URL来访问的。
  - 重定向：在定义路由规则时，使用redirect属性，添加“重定向规则”。当你访问未定义的URL时，我们要重定向到一个已经定义过的路由中去。

- 两个路由API (每个组件都能通过this访问)
  - $route   表示的是当前页面所对应的路由信息
    - 在任意的Vue组件中，watch 都可以监听 $route的变化。
  - $router  在JS逻辑中，用于路由跳转。
    - $router.push() 跳转新页面，并且向路由栈中追加一条路由信息。
    - $router.replace() 跳转新页面，把路由栈中的栈顶信息替换成当前路由信息。
    - $router.back() 返回上一页，把路由栈中的栈顶信息，推出栈。

- 两种路由模式
  - 在创建路由实例时，使用 mode 属性来指定路由模式。
  - hash模式：URL端口后面有一个#标记；它背后的原理是监听onhashchange事件实现的；这种模式的SPA应用打包部署到服务端，不会出现404的访问问题。
  - history模式：URL端口后面是没有#的；它背后使用history API来实现的；这种模式的SPA应用打包部署到服务端，访问时会出现404问题，需要服务端Nginx配合来解决这个问题。
  - 注意：在本地开发服务中，history的404问题已处理过了；部署上线时，history的404需要我们自己去处理。

- 两种路由跳转
  - 声明式路由跳转：在页面中使用<router-link to>进行页面的跳转。
  - 编程式路由跳转：在业务逻辑中，使用$router.push/replace/back等方法进行的跳转。
  - 约定：无论哪种跳转方式，都可以使用。一般与导航菜单有关的跳转，我们使用声明式跳转；与菜单无关的跳转，我们推荐使用编程式跳转。

- 两种路由传参
  - query传参：使用URL查询参数语法，跳转页面并向其传递路由参数。
    - 跳转：this.$router.push(`/detail?id=${id}`)
    - 接收：this.$route.query
  - 动态路由传参：像这样 {path:'/detail/:id'} 定义路由规则，这就是“动态路由”，因为`:id`的值不确定是什么。
    - 跳转：this.$router.push(`/detail/${id}`)
    - 接收：默认使用this.$route.params接收；如果在定义路由规则时开启了`props:true`，你还可以使用props选项来接收。这两种接收方式可以同时使用。
  - 结论：query传参不影响路由匹配规则；但是，动态路由传参，会影响路由匹配规则。

- 路由懒加载
  - 问题场景：在SPA单页面应用程序中，所以的组件都是由路由串联起来的。假如整个应用中有100页面。那么应用程序启动时，路由系统加载100个页面的所有组件，这会导致启动速度很慢。有没有像“图片懒加载”一样的玩法呢？我们访问什么页面，就加载什么组件；没有访问到的页面，就不加载这些组件。
  - 路由懒加载，就可以解决上述这一问题。它背后的原理：Vue异步组件(使用动态导入语法来引入组件)、Webpack代码分割技术。
  - 语法：`const Home = () => import('./Home.vue')`

- 嵌套路由
  - 概念：从组件树的角度，<router-view>所显示的组件中还有<router-view>；从定义路由规则的角度，路由规则还有“children子路由规则”。
  - 需求：从网站的信息架构层面来讲，实现多层级菜单。
  - 场景：要想搞明白“嵌套路由”的应用场景，建议大家研究知乎官网。
  - 注意：嵌套路由，从技术的角度来讲，可以无限地嵌套下去；但实际工作中，最多三层；一般到两层就够了。如果真的需要第三层，你可以使用v-if/Tab选项卡的方式去实现。

- 路由守卫与元信息
  - 今天不讲，放后面的项目中来讲。

# Vuex状态管理

- 版本问题
  - vue(v2) + vuex(v3)
  - vue(v3) + vuex(v4)
  - 我们当下环境是 vue(v2)，所以要安装vuex(v3)
  ```
  cnpm i vuex@3.6.2 -D
  ```

- 聊一聊 Vuex 这个状态管理工具
  - Vuex是Vue官方提供的状态管理工具(管理数据流)，它是基于Flux数据架构思想而诞生一个Vue数据管理工具。
  - 状态管理有什么用？在组件之间实现数据共享(通信)；实现数据缓存。
  - 回忆一个结论：虽然在Vue层面上，已经很多的通信方案，但是Vuex是终极通信方案。

- 在脚手架中如何集成Vuex呢？
  - 创建Vuex.Store实例(5个选项)，抛出，并在main中进行挂载。
  - 在任意组件中，通过 this.$store 就可以访问到 store的数据和API。

- ES6模块化语法
  - 使用 export default xx 抛出，使用 import xx from './*' 导入。
  - 使用 export { yy, zz } 抛出，使用 import { yy } from './*' 导入。
  - 在同一个JS文件中，最多只能出现一次 export default，但 export 可以使用多次。

- axios（HTTP工具）
  - 特点：基于AJAX、Promise封装的。
  - 场景：在Web前端、Node端，都可以使用。
  - 用法：安装、创建axios实例并为它封装拦截器、使用封装好的axios实例去调接口。
  - 扩展：axios是基于AJAX的，在浏览器中会遭遇CORS对它跨域请求的阻塞，所以我们经常需要在环境解决跨域问题。
  ```
  cnpm i axios -S
  ```
  - 在脚手架中如何解决“浏览器CORS阻塞AJAX跨域请求”这一问题？
    - 如果是Node环境中，使用AJAX跨域请求，会被阻塞？（不会）
    - 在浏览器中，使用JSONP调接口，会被阻塞吗？（不会）
    - 在浏览器中，使用AJAX请求同域接口，会被阻塞吗？（不会）
  - 在vue.config.js使用 devServer.proxy 进行接口代理，配置成功后需要重启项目。

- Vuex流程图：会画、会讲、会写
  - 你怎么理解Vuex？（数据流管理、通信方案、缓存、基于Flux单向数据流）
  - 描述Vuex的工作流程（组件需求->Actions(API)->Mutations->State->4个map*到组件中）
  - 在mutations方法中，可以调接口吗？（可以，但是它的主要任务是修改state）
  - 在actions方法中，能不能绕过mutations方法，直接修改state？（可以）
  - 为什么在拆分store时，要添加namespaced ？（解决子store中变量命名冲突的问题）
  - 解释一下Vuex的五个概念，分别有什么特别。
  - 举个具体的例子，你在工作使用Vuex解决过什么具体的问题。  
  - Vuex有没有什么缺陷？（当state中的变量是复杂的引用数据类型时响应式失效；Vuex自身没有提供监听器的功能；Vuex虽然也是一种通信方案，但它不是“事件总线”的替代方案，它们工作机制是完全不同，所以使用场景也有很大的不同；Vuex数据是保存内存中，如果我们毫无节制地在Vuex中放数据，这是很可怕的，这需要我们手动清理Vuex中无关数据。）

- 五个概念、四个API
  - state，用于声明可共享的vuex响应式变量
  - getters，用于简化复杂的state运算，相当于vue中的计算属性
  - mutations，一般用于修改state
  - actions，一般用于与后端API通信
  - modules，用于拆分子store，便于代码的维护，拆分store要开启命名空间。
  - mapState/mapGetters，用于映射数据，只能写在computed中。
  - mapMutations/mapActions，用于映射方法，只能写在methods中。
  - 扩展：如果让你自己封装map*方法，你怎么封装？你的思路什么？

# vue-webapp

- 项目经验常见的一些面试题
  - 介绍一下你最近做的(最有代表性的)一个前端项目？
  - 在这个项目中，你遇到过哪些难点？你是怎么解决的？
  - 你这个项目，有哪些亮点？
  - 在这个项目中，你做哪些优化(性能优化、用户体验优化、SEO优化)？
  - 是如何打包、部署上线的？有哪些注意事项？
  - 问某一个具体的功能(比如下拉刷新)，你是怎么实现的？
  - 你自己封装哪些组件？举些具体的例子

- 如何总结我们这个vue-webapp项目？
  - 1、详细介绍你的技术栈
    - @vue/cli、vue(v2)、vue-router(v3)、vuex(v3)、vant(v2)、sass、axios  
  - 2、移动布局及样式：
    - 你是如何解决不同手机之间的兼容性？css层面的，用rem适配；js层面，脚手架打包。
    - rem布局，说清楚是如何实现的？除了rem布局，还有没有其它可以使用移动端布局方案？用vant中的栅格布局；sass、less。
    - vant组件库：你用到了vant中哪些功能？（国际化、定制主题色）使用到了哪些组件？如何解决组件库与真实需求之间差异？（自定义属性、插槽、手动修改vant内置样式）如何实现vant组件的按需加载？（babel-plugin-import）
  - 3、路由及相关功能
    - 路由懒加载（Vue异步组件、Webpack代码分割）有利于发包上线。
    - 使用 beforeEach 等导航守卫实现鉴权拦截（token登录流程是怎么做的？）
    - 使用命名视图和<keep-alive>实现首页缓存（@scroll实现滚动鉴别、保留滚动）
  - 4、状态管理及相关功能
    - 为了让项目更好维护，把长页面拆分成多个小组件，使用vuex实现小组件之间的通信。原本可以直接定义当前长页面中的data，要搬到vuex中以实现组件封装后的通信问题。
    - 使用vuex实现缓存，实现“品类-二级品类”页面的缓存问题，在vuex中定义一个缓存变量，每次调接口都放数据存在缓存中；当一级品类发生变化时，先判断vuex中有没有可用的数据，如果有就直接渲染，如果没有再调接口再缓存。相比使用localStorage做缓存，效率更高，并且数据可以预测，配合devtool也方便调试。
  - 5、若干代码复用的技巧
    - 封装一些公共组件：BackTop回到项目，NotData数据组件、自定义封装NavBar、TabBar、品类轮播图的二次封装、定制的搜索框及搜索面板。
    - 封装自定义指令：v-scroll 定位指令、v-login 元素级别的权限指令。
    - 封装过滤器：封装常用数据处理函数，比如价格处理。。。
    - 巧用ES6模块化语法和Vue.prototype，方便一些全局访问的引用和调用。
    - axios封装：封装请求拦截，统一添加token鉴权标识；封装响应拦截器，对常见的HTTP状态码进行拦截，对后端业务状态码进行拦截，做统一的交互提示。
    - 表单验证方法封装：项目中用到很多表单组件，封装一些公共的表单验证方法。
  - 6、其它
    - computed 的秒用
    - watch 的秒用
    - ref 的秒用。。。
    - 遇到的一些坑：下拉刷新与触底加载（loading/finished...）购物车全选、单选的交互(监听器、@change、@click)、首页<keep-alive>包裹后切换Tabbar滚动条位置丢失。

# vue-element-admin

- 1、如何研究一个新项目？

  - README.md
  - package.json（技术栈、知道怎么安装依赖、启动项目、没见过的包）
  - 研究各种配置文件（eslint、babel、部署配置、环境变量）
  - src（目录结构是如何划分的，见名知义）
  - src/入口文件main.js
  - src/App.vue（根组件）
  - src/路由、Layout，怎么配置新页面？（路由守卫）
  - src/store状态管理文件（研究写法、有哪些state变量）
  - src/axios封装、api封装、mockjs、跨域代理写在哪里（调接口）
  - src/翻看别人写的页面、了解编程范式（代码习惯）
  - src/可复用的代码逻辑，比如自定义指令、过滤器、utils、公共组件、公共样式等。
  - 把项目跑起来(安装依赖包)，边看效果边看代码

- 2、研究结果输出

  - 需要直属小领导帮助讲解的问题列表（10个以内）
  - 罗列不值得问、自已又不会的问题列表

# Node.js 基础

- 运行时环境：由C++编写，它不支持TS。Deno，下一代的Node.js，它默认就支持TS。
- 在前端开发中有两个作用，前端工程化（脚手架环境的搭建）、node中间层的开发（node api服务、SSR服务端渲染）
- 三大特点：基于谷歌V8引擎，事件驱动、非阻塞I/O。

- 1、Node.js安装问题
  - LST稳定版本：v12、v14、v16（我推荐v16）
  - Current最新版本：一般不推荐开发使用。
  - 如果你的电脑是window7，只能使用v12。为了后面更好地学习，建议大家使用v14/v16。
  - 各种版本的下载链接：https://registry.npmmirror.com/binary.html?path=node/
  - 提示：如果你的电脑对node版本有特殊要求，建议先卸载node，再下载合适的node版本、重新安装。不建议使用一些交互式命令行来管理node版本，比如`n`。
  - 环境变量：node安装时一般会自动添加环境变量。如果失败，建议手动检查电脑上的node环境变量。
  - 如何验证node安装成功：在命令行输入`node -v`或`npm -v`，有对应的版本号打印，就是成功了。

- 2、使用npm包管理器
  - npm 是 Node.js内置的包管理器工具。
  - NPM官网（JS轮子的生态）：https://www.npmjs.com/
  ```
   npm init (-y)  生成package.json（用于记录当前项目的信息）
   npm install    根据package.json中的信息，重新安装所有依赖node_modules包
   npm install abc -g(--global)  全局安装依赖
    # 全局包一般安装在 C:\Users\Administrator\AppData\Roaming\npm
   npm install abc -S(--save)     本地安装并记录在dependencies中
   npm install abc -D(--save-dev) 本地安装并记录devDependencies中
   npm cache clean  清除npm缓存
   npm uninstall abc -g/-S/-D  不建议使用，如果你卸载一个包直接删除即可。
  ```
  - npm 其它命令文档：https://docs.npmjs.com/cli/v8/commands

  - 关于包的版本号
    - 每一个包都有版本号：主版本号.次版本号.修订版本号
    - `^5.1.30` 每次安装依赖包时，保证主版本号不变，次版本号和修订版本号用最新的。
    - `~5.2.89` 每次安装依赖包时，保证主版本号和次版本号不变，修订版本号用最新的。
    - `*3.12.4` 每次安装依赖包时，主版本、次版本、修订版本都用最新的，下载这个包的最新版本。
    - 如果包的前面什么标记都没有，就安装当前固定版本。

  - 关于镜像源问题
    - 我们在使用npm下载第三方包时，默认是npm官方服务器下载，网速通常比较慢。
    - 我们推荐使用淘宝镜像、或者使用公司内部镜像源。
    - 推荐两个工具：`cnpm`淘宝镜像， `nrm`用于切换npm镜像源地址。
    ```
    npm install cnpm -g --registry=https://registry.npmmirror.com
    # 全局安装淘宝镜像，安装成功后，就可以cnpm代替npm了。
    ```
    ```
    npm install -g nrm
    nrm ls   罗列可用的镜像源地址
    nrm use  使用指定的镜像源地址，它改变的是npm命令所对应的镜像地址
    ```
    - 注意：有些公司有自己的镜像命令和地址，去到公司根据公司文档来使用。

- 3、使用Yarn包管理器
  - 说明：Yarn和npm一样，都是包管理器，二者可以兼容使用。
  - 经验：有时使用npm/cnpm都无法下载的包，使用yarn可以解决问题。
  - Yarn包管理器的官网：https://yarnpkg.com/
  ```
  npm install yarn -g   全局安装Yarn这个包管理器
  yarn -v  如果有版本号打包，则说明安装成功
  ```
  ```
  yarn init  生成package.json文件
  yarn       根据package.json安装所有依赖node_modules
  yarn add axios  本地安装并记录在dependencies中
  yarn add eslint --dev  本地安装并记录在devDependencies中
  ```

- 4、Node.js语法说明
  - Node.js是遵守CommonJS模块化语法，不支持ES6模块化语法。CommonJS不是什么第三方包(无须安装)，它就是一种模块化语法的概念。
  ```
  # 抛出一个变量，这个变量可以函数、对象、其它数据类型。
  module.export = function/object/其它变量

  # 在另一个JS文件中，使用require()导入模块。
  const xxx = require('./path/to/module.js')
  ```
  - 应用场景：后面我们要学习的Babel、ESLint、Webpack、Mockjs都是基于node运行时环境的工具，所以它们用的都是CommonJS模块化语法。
  - 语法说明：在编写Node.js代码，可以使用几乎所有的ES5语法、大多数的ES6+语法、Node.js内置API、还可以使用已经安装过的第三方包。不能使用DOM和BOM的API，也不能使用TS。你的电脑上Node版本不同，所支持的语法也会有所不同，必须得有这个意识。

  - 关于Node.js内置API：一类是全局API，使用时无须导入，可以直接使用；另一个是非全局API，必须先require导入，才能使用。
  - 在Node.js中，最顶层的模块是 `global`，在global上的变量都是全局API，可以直接使用。
  ```
  # 这个process模块就是Node.js的全局模块
  const baseURL = process.env.NODE_BASE_URL

  # 这个path模块是Node.js中的非全局模块
  const path = require('path')
  ```
  - 如何运行node代码吗？`node app.js`在Node.js环境中运行app.js这个文件。-
  - 推荐一个Node.js入门教程：http://nodejs.cn/learn

# 搭建Node.js服务器

  - 服务器：能够为客户端提供服务的程序，都叫做服务器。在构建node服务器时，一个是静态资源服务(为客户端提供静态文件资源)、另一个动态资源服务(RESTful API接口)。
  - 如何构建node服务器呢？不使用node框架(原生开发)、使用node框架。
    - Express  是Node.js入门级别的非常经典的一个服务器框架。
    - Koa  是express原班人马重构的一个服务器框架，对箭头函数、async/await语法支持良好。
    - Nuxt.js  是Vue官方提供的一个基于node环境的SSR服务端渲染框架。
    - Next.js  是React官方提供的一个基于node环境的SSR服务端渲染框架。
    - Egg.js   是阿里开源的一个node开发环境。
    - 更多Node框架：https://bestofjs.org/projects?tags=nodejs-framework

  - BSR客户端渲染、SSR服务端渲染
    - BSR，数据和视图，在客户端完成“组装”。简述：在客户端访问`/home`，Vue路由系统加载Home组件，在生命周期中调接口拿到数据，放在data上，再通过指令组装数据。（前后端分离开发）
    - SSR，数据和视图，在服务端完成“组装”。简述：在客户端访问`/home`，在服务端，Nuxt根据路由加载Home组件，在生命周期钩子中调接口拿数据，放在asyncData，通过指令把数据和视图结合起来，Nuxt背后的`vue-server-renderer`把Vue组件转化成静态的HTML字符串，最终把HTML返回给客户端。（前后端不分离）
    - 面试题：BSR、SSR分别什么用？它们分别有什么优势和劣势？
    - 面试题：什么是SEO搜索引擎优化？前端有哪些策略可以增强SEO优化？

  - 守护进程：nodemon / supervisor
    - 作用：使用守护进程启动node服务，当node代码发生变化时自动生效，无须重启服务。
    ```
    cnpm i nodemon -g  全局安装
    cnpm i nodemon -D  本地安装
    # 启动node项目时，使用nodemon代替node命令。
    ```

  - 使用Express/Koa快速搭建node服务器
    - Express官网：https://www.expressjs.com.cn/
    - Koa官网：https://koa.bootcss.com/

  - 需求：假如我公司在ECS云服务器上，使用的是Node.js搭建的服务器（替代方案Nginx/Apache）。我现在要把vue-webapp项目部署到ECS云服务器上，该怎么做？
    - 把node服务(8888端口服务，相当于是Nginx/Apache的功能)部署到云服务器上
    - 把数据库服务(9999端口服务)和MongoDB服务(27017端口服务)部署到云服务器上
    - 开始打包vue-webapp，得到静态资源文件，然后部署到云服务器上的node服务(8888)中
      - 打包最重要的是注意各种URL路径：调接口的baseURL、图片访问URL。
      - 打包后，咱们vue本地代码中的devServer是没有用的，对部署是没有任何作用的。
    - 前端静态页面中也有调接口，在上线后也会遇到跨域请求问题，怎么办？如果是Node服务，建议使用`http-proxy-middleware`这个中间件在云服务器上实现HTTP代理。

# MongoDB数据库

- 官网：https://www.mongodb.com/
- 简介：由C++编写的数据库软件，它是一个NoSQL数据库（非关系型数据库），MongoDB存储数据用的是BSON（二进制的JSON数据）格式。
- 概念：Collection集合（表），Document文档（行），Field域（字段），索引（_id）。
- 人话：一个数据库服务器中，可以有多个数据库（DB），一个数据库中可以有多个集合，一个集合中可以有多个文档，一个文档可以由任意个完全不相关的域（字段）构成，每一个文档都使用_id作为唯一标识。

- 为什么在Node开发时习惯选择MongoDB作为数据库？因为MongoDB的语法，和JS非常接近。所以市面上有这么一个全栈开发的概念：MEAN（MongoDB、Express、Angular、Node.js）。
  - 毕业设计：MKVN = (MongoDB + Koa + Vue + Node.js)

- 连接（操作）数据库的三种方式（先启动数据库，再连接再操作）
  - 命令行工具（mongo）了解即可
  - 可视化工具（Robo3T）一定要会用
  - Node.js驱动模块（mongodb/mongoose）这里我们推荐使用mongoose操作数据库
    - mongoose官网：https://mongoosejs.com/

- 使用mongoose连接MongoDB数据库
  ```
  cnpm i mongoose -S
  ```
  ```
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/dbname')
  mongoose.connection.on('error', handler)

  const userModel = mongoose.model('users', new mongoose.Schema({}))
  ```
- 使用mongoose操作MongoDB数据库
  - 增：userModel.insertMany()
  - 删：userModel.findByIdAndUpdate(id, {status:0})
  - 改：userModel.updateOne({_id:id}, {$set:{...}})
  - 查：userModel.find({...params}).limit().skip().sort().count().then()

- 编写RESTful API一些要点
  - 概念：什么RESTful API？编写API时，根据接口的功能特点，使用正确的相应的HTTP方法(GET/POST/PUT..)。在实际工作中，一般只用GET、POST。增与改一般用POST、查与删一般用GET、文件上传用POST。

  - 编写接口的基本逻辑
    - 如何接收入参(req.query/req.body)，入参，决定着接口文档的入参（非必填、必填、数据类型）。
    - 参数处理：如果是非必填参数，要给它添加默认值；如果是必须参数，必须校验是否存在；验证数据类型时，能转换尽量自已转换，或者使用正则等方式进行数据类型及其格式校验；如果有数据无法使用代码校验，一定要加状态字段，使用人工审核。
    - 使用mongoose.model对象操作数据库（CURD）,这些都是异步的，建议参考mongoose文档。
    - 如果数据库操作成功或失败，使用业务状态码来区分这些情况。
    - 如果有些接口，需要验证Token，可以使用中间件来处理。

- 什么是“中间件”？
  - 在软件开发中，中间件是非常常用的一种程序设计方案。在Node中，把HTTP请求抽象成一个闭环过程，分为请求阶段和响应阶段，所谓中间件，就是在这个闭环过程中起作用的各种功能节点，用于处理数据，或者响应客户端请求。中间件的设计原则是：一个中间件只做一件事儿，中间是有严格的执行顺序要求的。


# Vue3全家桶（环境搭建）

- 时间：2020年底 Vue3发布了，TS也跟着火起来了。2022年年初，Vue3变成了默认版本，预示着鼓励企业使用Vue3，也预示着Vue3越来越稳定了。
- 挑战：就业时选择Vue2还是Vue3？在企业开发中你要把Vue2重构成Vue3？你没有选择，你必须都会。

- Vue3全家桶（版本意识）
  - Vue3官网（翻译不完全，但资料是最新的）：https://vuejs.org/
  - Vue3中文网（技术点不一定是最新的）：https://v3.cn.vuejs.org/
  - VueRouter(v4)：https://router.vuejs.org/zh/index.html
  - Vuex(v4)：https://vuex.vuejs.org/zh/index.html
  - 强调：vue(v3) + vue-router(v4) + vuex(v4) 是配套使用的
  - Vite（脚手架环境）：https://cn.vitejs.dev/
  - 强调：在Vue3开发中建议使用Vite，不建议使用VueCLI（背后是Webpack）
  - UI组件库：element-plus、ant-design-vue、vant(v3)
  - 强调：大家使用Vue3开发时，一定找到对应版本的UI组件库、其它插件。大家一定要有很强的版本意识。

- 搭建Vue3开发环境（创建项目）
  - 创建Vue3项目，可以使用VueCLI创建，也可以使用Vite环境。我们一律推荐使用Vite。
  - 命令行文档：https://vitejs.dev/guide/#scaffolding-your-first-vite-project
  ```
  # npm 6.x
  npm create vite@latest vue3-project --template vue
  # npm 7+
  npm create vite@latest vue3-project -- --template vue

  # 建议使用yarn创建vue3项目
  yarn create vite vue3-project --template vue
  # 进入Vue3项目根目录
  cd vue3-project
  # 根据package.json安装依赖
  yarn  或者  cnpm install
  # 启动本地服务
  yarn dev  或者 npm run dev
  ```
  - 使用Vite搭建的Vue3项目，启动本地服务是非常快的，这个开发体验欲罢不能。

- 在Vue3中使用TypeScript
  - 编辑器强烈建议使用VsCode（因为TS和VsCode都是微软这家公司开源的，在VsCode对TS有非常友好的支持）
  - 在VsCode中，安装 volar 系列插件，支持高亮样式和TS检验。
  - 在项目根目录，添加 tsconfig.json配置文件，还要添加TS声明文件（.d.ts）。
  - 在写代码时，如果是.vue文件，必须在<script lang='ts'></script>，如果是非.vue文件，建议使用.ts后缀才能写TS代码。

- 集成sass
  - `yarn add sass --save`
  - 在 <style lang='scss'></style>

- 集成vue-router(v4)路由系统
  - `yarn add vue-router`
  - 参考vue-router(v4)文档集成路由系统

- 集成vuex(v4)状态管理
  - `yarn add vuex`
  - 参考vuex(v4)文档集成状态管理

- 集成vant(v3)组件库
  - `yarn add vant`
  - 参考文档：https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart

# Vue3那些重要的知识点

- Vue3中组件封装的多种语法
  - Vue2风格的组件：在Vue3中是完全兼容支持Vue2风格的组件。
  - setup选项式组件：使用setup、data、props、methods、computed混合使用。
  - jsx语法的函数式组件：像React函数式组件那样编写组件。
  - <script setup>语法糖组件：官方推荐的最优雅的写法，这样就不能再使用Vue选项了、不能使用JSX了、不能使用函数式组件了，只能使用组合API进行编程。
  - 等等！！！

- setup与组合API
  - 使用<script setup>语法糖封装组件
  - 把传统的选项式API(Options API)替换成组合式API(Composition API)
  - 根据业务功能逻辑，拆解，封装自定义Hooks

- Vue3入门学习资源：https://zhuanlan.zhihu.com/p/482851017

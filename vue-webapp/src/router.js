import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册路由插件
// 它会给我们 <router-view> <router-link> this.$route this.$router
// Vue.use() 它实际上在调用VueRouter.install(Vue)方法
Vue.use(VueRouter)

import store from '@/store'
console.log('---store', store)


// 路由懒加载
// 这种加载组件的语法，就是动态导入语法（目前这种语法还没有被ES采纳）
// import HomePage from './pages/home/HomePage.vue'
const HomePage = ()=>import('./pages/home/HomePage.vue')
const GoodInfo = ()=>import('./pages/home/GoodInfo.vue')

const FindPage = ()=>import('./pages/find/FindPage.vue')
const CartPage = ()=>import('./pages/cart/CartPage.vue')

const UserPage = ()=>import('./pages/user/UserPage.vue')
const AskList = ()=>import('./pages/user/components/AskList.vue')
const ArticleList = ()=>import('./pages/user/components/ArticleList.vue')
const VideoList = ()=>import('./pages/user/components/VideoList.vue')
const LoginRegist = ()=>import('./pages/user/LoginRegist.vue')

// 创建路由实例
const router = new VueRouter({
  // 前端有两种常用的路由模式
  mode: 'hash', // 'history'
  // route 路由规则的意思，routes 表示多个路由规则
  routes: [
    // 如何解读这条规则？当你访问/home时，路由系统加载Home组件并将其显示在一个名字叫alive的视图容器中。
    // 这个 name属性，就是命名路由，意思是给路由规则取个名。
    // 这个 alias属性，就是别名，别名是带有 / 的，它可以当作URL来访问的。
    { path:'/home', components:{alive:HomePage}, name:'index', alias:'/' },
    // 需求：当你访问/find时，路由系统加载Find组件并将其显示在一个名字叫ningyu的视图容器中。
    // 这个 :id 就是动态路由，这个id在 this.$route.params中是变量名。
    // 注意：在设计动态路由时，一定要考虑匹配规则的问题。query传参，是不影响路由规则的。
    // 这个props:true，可以开启“使用props选项来接收动态路由参数”
    { path:'/detail/:id', component:GoodInfo, props:true },
    {
      path:'/find',
      // 配合“命名视图”的写法
      components: { ningyu: FindPage }
    },
    {
      path:'/user',
      component:UserPage, // 在App.vue的<router-view>中显示
      // 用于定义子路由规则（嵌套路由），子路由规则的path前面一般不加 /，它会自动拼接父路由规则中的path。
      children: [
        { path:'ask' , component:AskList }, // 在UserPage.vue的<router-view>中显示
        { path:'article', component:ArticleList },
        { path:'video', component:VideoList }
      ]
    },
    {
      path: '/cart',
      component: CartPage
    },
    {
      path: '/login',
      component: LoginRegist
    },
    {
      path: '/regist',
      component: LoginRegist
    },
    // 添加一条重定向规则（一般是routes数组的最后一条）
    // redirect的值，必须是一个已经定义过的path
    { path: '/*', redirect: '/' }
  ]
})

// 全局导航守卫（描述的是路由匹配的过程）
const authList = ['/cart','/user']

// 1、地址栏url和路由系统中的path开始配对之前
router.beforeEach((to,from,next)=>{
  // 在这里我们用token判断是否登录了
  // 实战工作中，更建议使用userinfo来判断是否登录了
  // 思考：为什么使用token判断是否登录不太安全呢？
  const isLogin = store.getters['user/isLogin']
  // 判断你要访问的页面是否在“权限列表”中
  if (authList.includes(to.path)) {
    // 判断你是否登录了
    if (isLogin) {
      next()
    } else {
      next('/login')
      // window.location.href='#/login'
    }
  } else {
    next()
  }
})
// 2、路由系统的path和component开始配对解析之前
// router.beforeResolve((to,from,next)=>{
//   console.log('---beforeResolve',to,from)
//   next()
// })

// 3、component解析成功，在<router-view>显示组件
// router.afterEach((to,from)=>{
//   console.log('---afterEach', to, from)
// })

// 抛出路由实例
export default router

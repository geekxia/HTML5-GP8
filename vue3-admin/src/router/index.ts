import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import useUserStore from '@/store/user'

const GoodList = () => import('@/pages/good/GoodList.vue')
const GoodForm = () => import('@/pages/good/GoodForm.vue')

export const routes = [
  { id: 1, text: '商品列表', path: '/good/list', component: GoodList },
  { id: 2, text: '商品新增', path: '/good/form', component: GoodForm },
]

const router = createRouter({
  // history: createWebHistory(),  // history路由
  history: createWebHashHistory(), // hash路由
  routes: [
    // {
    //   path: '/a',
    //   alias: '/aa',
    //   name: 'a',
    //   component: ()=>import('@/pages/PageA.vue'),
    //   meta: { transition: 'qf' }
    // },
    // { path: '/b', component: ()=>import('@/pages/PageB.vue') },
    // { path: '/q/:id', components: { qf:  ()=>import('@/pages/PageQ.vue') } , props: true },
    // { path: '/r', component: () => import('@/pages/PageR.vue') },

    ...routes,

    { from: '/*', redirect: '/good/list' }
  ]
})

router.beforeEach((to,from,next)=>{
  const store = useUserStore()
  console.log('---在路由守卫中使用store', store)
  next()
})

export default router

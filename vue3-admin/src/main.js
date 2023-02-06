import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import { ElButton, ElContainer, ElAside, ElHeader, ElMain, ElMenu, ElSubMenu, ElMenuItemGroup, ElMenuItem, ElCol, ElRow, ElInput, ElSelect, ElOption, ElTable, ElTableColumn, ElPagination } from 'element-plus'

const app = createApp(App)
const pinia = createPinia()

// 使用Pinia插件
const QfPiniaPlugin = (ctx) => {
  console.log('---在插件中的上下文', ctx)
  return { hehe: '呵呵' }
}
pinia.use(QfPiniaPlugin) // 使用Pinia插件
pinia.use(({ store }) => {
  store.$subscribe(() => {
    console.log('--全局监听store变化')
  })
})

app.use(router)
app.use(pinia)

// 全局注册icon组件库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局注册ElementPlus（添加国际化）
app.use(ElementPlus, {
  locale: zhCn,
})

// 按需注册全局组件
// app.use(ElButton)  // app.component(ElButton.name, ElButton)
// app.use(ElContainer)
// app.use(ElHeader)
// app.use(ElMain)
// app.use(ElAside)
// app.use(ElMenu)
// app.use(ElMenuItem)
// app.use(ElMenuItemGroup)
// app.use(ElSubMenu)
// app.use(ElCol)
// app.use(ElRow)
// app.use(ElInput)
// app.use(ElSelect)
// app.use(ElOption)
// app.use(ElTable)
// app.use(ElTableColumn)
// app.use(ElPagination)




app.config.globalProperties.$img = 'http://qf.com'
// app.provide('version', 'v3')
app.mount('#app')

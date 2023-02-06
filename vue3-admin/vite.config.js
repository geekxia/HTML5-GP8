import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 支持element-plus按需加载
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const path = require('path')

// Vite的配置文件（Vite配置发生变化，无须重启）
// Vite语法，支持ES6语法、Node API都可以使用。
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),   // 支持JSX语法编译
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      // defaultLocale: zhCn
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

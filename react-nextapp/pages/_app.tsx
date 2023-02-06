import type { AppProps } from 'next/app'
import { Layout } from '../components'
// 全局样式，不需要CSS Modules
import '../styles/globals.css'

// 相当于APP根组件
function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App

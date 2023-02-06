import { ThemeProvider } from '@/utils/theme'
import { ThemeToggle } from '@/components'

// 集成路由
import { HashRouter } from 'react-router-dom'
import { useState } from 'react'
import Layout from '@/layout'

// 状态管理
import { Provider } from 'mobx-react'
import store from '@/store'

// 根组件
const App = () => {

  const [theme, setTheme] = useState({color:'#000000',background:'#ffffff'})

  return (
    <HashRouter>
      <Provider {...store}>
        <ThemeProvider theme={ theme } >
          <Layout />
        </ThemeProvider>
      </Provider>

    </HashRouter>
  )
}

export default App

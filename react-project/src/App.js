import Layout from '@/layout'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Permission from './Permission'
import store from '@/store'

// 支持antd换肤功能
import 'antd/dist/antd.variable.min.css'

function App() {

  return (
    <HashRouter>
      <Provider store={store}>
        <Permission />
      </Provider>
    </HashRouter>
  )
}

export default App


// 在不使用useRoutes的时候，用下面这段代码实现路由规则的定义

// let result = []
// function createRoutes (routes) {
//   routes.map(ele=>{
//     if (ele.path) {
//       result.push(
//         <Route key={ele.key} path={ele.path} element={ele.element} />
//       )
//     } else {
//       if (ele.children) {
//         createRoutes(ele.children)
//       }
//     }
//   })
//   return result
// }

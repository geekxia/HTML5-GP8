// 集成store
import { Provider } from 'react-redux';
import { store } from './store';

// 路由系统
import { HashRouter, Routes, Route } from 'react-router-dom'

import '@/assets/style.css'

import { tabRoutes } from '@/pages'
const routeRender = (arr:any) => {
  return arr.map((ele:any)=>{
    return (
      <Route key={ele.key} path={ele.path} element={ele.element} />
    )
  })
}

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          { routeRender(tabRoutes) }
        </Routes>
      </Provider>
    </HashRouter>  
  );
}

export default App;

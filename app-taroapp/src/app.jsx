import Taro, { useDidShow } from '@tarojs/taro'
import { Provider } from 'mobx-react'
import './app.scss'

import store from './store'

function App (props) {

  useDidShow(()=>{
    Taro.login().then(res=>{
      console.log('---res code', res)
    })
  })

  return (
    <Provider {...store}>
      { props.children }
    </Provider>
  )
}

export default App

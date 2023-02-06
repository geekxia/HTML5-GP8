import { Route, Redirect, Switch } from 'react-router-dom'
import routes from '@/pages'
import NavBarTwo from './NavBarTwo'

// 自定义方法渲染<Route>路由规则
const renderRoutes = () => {
  let result = []
  routes.map(ele=>{
    if (ele.routes) {
      ele.routes.map(ele=>{
        result.push(
          <Route key={ele.id} path={ele.path} exact component={ele.component} />
        )
      })
    }
  })
  return result
}

export default () => {

  return (
    <div className='container'>
      <NavBarTwo />
      <Switch>
        { renderRoutes() }
        <Redirect from='/*' to='/' />
      </Switch>
    </div>
  )
}

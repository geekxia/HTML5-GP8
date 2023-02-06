// study 是具有修饰功能的容器组件（高阶组件）
// 高阶组件本质上一个纯函数（不能修改入参，相同修饰得到结果）
// WrappedComponent 这个入参被称之为“UI组件”

import { ThemeConsumer } from '@/utils/theme'

export function study (WrappedComponent) {
  return class extends React.PureComponent {
    constructor (props) {
      super(props)
      this.state = {
        count: 1
      }
    }
    onRequest () {
      console.log('----向服务器发起埋点请')
    }
    render () {
      const { count } = this.state
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} name='qf' count={count} onRequest={()=>this.onRequest()} />
          <div>千锋出品</div>
        </React.Fragment>
      )
    }
  }
}

export const role = WrappedComponent => {
  // do something 在这里从状态管理中取出用户信息
  return props => {
    // do something
    return (
      <WrappedComponent {...props} role='admin' />
    )
  }
}

export const theme = WrappedComponent => props => (
  <ThemeConsumer>
  {
    ctx => (
       <div style={ ctx }>
          <WrappedComponent {...props} />
       </div>
    )
  }
  </ThemeConsumer>
)

// @meta(['admin', 'editor'])
export function meta (roleArr) {
  if (!Array.isArray(roleArr)) {
    throw new Error('权限数据语法错误')
  }
  // do something 从状态管理取出当前登录用户的角色信息
  const roles = ['admin', 'editor']

  const hasPermission = roles.some(ele => roleArr.includes(ele))

  return function (WrappedComponent) {
    return props => {
      return (
        hasPermission
          ? <WrappedComponent {...props} roles={roles} />
          : <h2>403 当前页面你没有访问权限</h2>
      )
    }
  }
}

// const xxx = arg1 => arg2 => callback => W => props => <W />
// @xxx(1)(2)(()=>{})
// class Home
//
// const yyy = (arg1, arg2, callback) => W => props => ()
// @yyy(1,2,()=>{})
// class Home

export const qf = WrappedComponent => {
  // 配合高阶组件使用ref
  return React.forwardRef((props, ref)=>{
    return (
      <WrappedComponent {...props} forwardRef={ref} />
    )
  })
  // return class extends React.PureComponent {
  //   render () {
  //     return (
  //       <WrappedComponent />
  //     )
  //   }
  // }
}

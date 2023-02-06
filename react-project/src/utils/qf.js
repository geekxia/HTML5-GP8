import React, { useContext, useEffect, useState, useReducer } from 'react'
// connect(mapStateToProps, mapDispatchToProps)(UI)

import { ReactReduxContext } from 'react-redux'

// function mapStateToProps (state) {
//   return {
//     a: state.study.a,
//     list: state.study.list
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     add: () => dispatch({type}),
//     sub: () => dispatch({type,payload})
//   }
// }

export function qfconnect1 (mapStateToProps, mapDispatchToProps) {

  return function (WrappedComponent) {
    let unsubscribe = null
    class NewWC extends React.PureComponent {
      componentDidMount () {
        const { store } = this.context
        // 订阅store的变化
        unsubscribe = store.subscribe(()=>{
          console.log('---store数据变了')
          this.forceUpdate()
        })
      }
      componentWillUnmount () {
        // 当组件销毁时，取消订阅
        unsubscribe()
      }
      render () {
        const { store } = this.context
        // console.log('上下文---store', store)
        const state = mapStateToProps(store.getState())
        const methods = mapDispatchToProps(store.dispatch)
        return (
          <WrappedComponent {...this.props} {...state} {...methods} />
        )
      }
    }
    NewWC.contextType = ReactReduxContext
    return NewWC
  }
}

export function qfconnect2 (mapStateToProps, mapDispatchToProps) {

  return function (WrappedComponent) {
    // 返回函数式组件
    return props => {
      const [count, setCount] = useState(0)
      const { store } = useContext(ReactReduxContext)
      console.log('----ctx', store)
      const state = mapStateToProps(store.getState())
      const methods = mapDispatchToProps(store.dispatch)
      useEffect(()=>{
        const unsubscribe = store.subscribe(()=>{
          // 解决在这个作用域中总是访问旧count问题
          setCount(count=>count+1)
        })
        return ()=>unsubscribe()
      }, [])
      return (
        <WrappedComponent {...props} {...state} {...methods} />
      )
    }
  }
}

// const count = useSelector(state=>state.study.count)

export function useSelector1 (mapState) {
  const { store } = useContext(ReactReduxContext)
  // 把store中用户需要的数据放在state上
  const [state, setState] = useState(mapState(store.getState()))
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      // 解决在这个作用域中总是访问旧count问题
      setState(mapState(store.getState()))
    })
    return ()=>unsubscribe()
  }, [])
  return state
}

export function useSelector2 (mapState) {
  const { store } = useContext(ReactReduxContext)
  // 把store中用户需要的数据放在state上
  const [_, forceUpdate] = useReducer(s=>s+1, 0)

  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      // 解决在这个作用域中总是访问旧count问题
      forceUpdate()
    })
    return ()=>unsubscribe()
  }, [])
  return mapState(store.getState())
}

export  function useQfDispatch () {
  const { store } = useContext(ReactReduxContext)
  return store.dispatch
}

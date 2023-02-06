import React from 'react'
import { connect } from 'react-redux'

import { qfconnect1, qfconnect2 } from '@/utils/qf'
import { addCount, subCount } from '@/store/actions'

// state，就是store.getState()的结果
// 作用：用于访问store中的state数据
function mapStateToProps (state) {
  return {
    count: state.study.count,
    list: state.study.list
  }
}

// dispatch，就是store.dispatch
// 作用：向store派发一个信号 dispatch(action={type,payload})
function mapDispatchToProps (dispatch) {
  return {
    add (payload) {
      dispatch(addCount(payload))
    },
    sub: payload => {
      // dispatch({type:'study/sub', payload})
      dispatch(subCount(payload))
    }
  }
}

// @connect(mapStateToProps, mapDispatchToProps)
@qfconnect2(mapStateToProps, mapDispatchToProps)
class ChildA extends React.PureComponent {
  render () {
    console.log('----ChildA props', this.props)
    const { count, add, sub } = this.props
    return (
      <div>
        <h1>我是ChildA</h1>
        <h1>{ count }</h1>
        <button onClick={()=>add(10)}>自增</button>
        <button onClick={()=>sub(5)}>自减</button>
      </div>
    )
  }
}

export default ChildA

import produce from 'immer'
// 语法：const mutateState = produce(oldState, newState => { 直接修改newState })

import { STUDY_COUNT_ADD, STUDY_COUNT_SUB, STUDY_CNODE_LIST } from '../actionTypes'

// 定义一个子reducer
const initState = {
  count: 1,
  list: []
}

// reducer是一个函数，并且是纯函数，专门用于修改store
// reducer函数还接收两个参数：state是状态数据，action是信号

// 在reducer中执行深拷贝的几种常见方法
// let newState = JSON.parse(JSON.stringify(state))
// let newState = Object.assign({}, state)
// let newState = { ...state }
// 还可以使用 immutable实现，现在主流推荐使用 immer 来实现。

// 1、把根reducer拆分成多个子reducer
// 2、使用immer实现深拷贝
// 3、使用switch语句编写修改state的逻辑
// 4、封装可复用的低耦合的“action生成器”
// 5、把action.type抽离变成常量字典，避免人为导致的信号冲突

export default function (state=initState, {type,payload}) {
  // console.log('----信号来了', action)
  return produce(state, state=>{
    switch (type) {
      case STUDY_COUNT_ADD:
        state.count += payload
        break
      case STUDY_COUNT_SUB:
        state.count -= payload
        break
      case STUDY_CNODE_LIST:
        state.list = payload
        break
      default:
    }
  })
}

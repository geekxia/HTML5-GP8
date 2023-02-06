// 学习目标：redux、react-redux、@reduxjs/toolkit
// 简介：redux数据容器，一般只用在react技术栈，它是基于Facebook的Flux数据流思想而实现的一个工具。
// 怎么学redux？记住三个三
// 第一个三（3个API）：createStore、combineReducers、applyMiddleware
// 第二个三（3个概念）：store、reducer、action
// 第三个三（3个特点）：store是单一数据源，store是只读的，store只能通过reducer纯函数进行修改。

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

// 这个中间件是redux作者亲手写的，用于在store中“捕获”dispatch派发过来的函数。
// 如果捕获到函数，就调用它，并且给它传递一个dispatch的实参。
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import study from './modules/study'
import app from './modules/app'
import user from './modules/user'
import good from './modules/good'

// 它是创建store实例最核心的一个参数
const store = createStore(
  // 合并多个子reducer
  combineReducers({
    study, app, user, good
  }),
  // 使用多个redux中间件（注意中间件是有顺序的）
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)

export default store

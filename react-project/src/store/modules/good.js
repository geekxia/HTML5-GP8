import produce from 'immer'
import { GOOD_LIST, GOOD_ALL_CATES, GOOD_SUBMIT, GOOD_INFO } from '../actionTypes'

const initState = {
  cates: [],
  goodList: [],
  total: 0,
  done: 0,
  info: {}
}

export default function (state=initState, {type,payload}) {
  return produce(state, state=>{
    switch (type) {
      case GOOD_ALL_CATES:
        state.cates = payload
        break
      case GOOD_LIST:
        state.goodList = payload.list
        state.total = payload.total
        state.done = 0
        break
      case GOOD_SUBMIT:
        state.done = payload
        state.info = {}
        break
      case GOOD_INFO:
        state.info = payload
        break
      default:
    }
  })
}

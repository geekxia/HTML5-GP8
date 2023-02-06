import { fetchCnodeList } from '@/services/article'

// redux + redux-saga (dva数据流)
export default {
  namespace: 'article',   // 子store命名空间
  // 可以被组件共享的状态数据
  state: {
    count: 1,
    list: []
  },
  // 相当于vuex中的mutations
  reducers: {
    add (state: any, action:{type:'add',payload: number}) {
      state.count += action.payload
    },
    sub (state: any, action:any) {
      state.count -= action.payload
    },
    setList (state:any, action:any) {
      state.list = action.payload
    }
  },
  // 相当于vuex中的actions
  effects: {
    // call(调接口方法, 入参) 用于触发API接口
    // put({type,payload}) 相当于dispatch()
    * getCnodeList (action:any, {call, put}: any) : any {
      const res: any = yield call(fetchCnodeList, action.payload)
      console.log('---model res', res)
      yield put({type:'setList',payload:res.data})
    }
  }
}

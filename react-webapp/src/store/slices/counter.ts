import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchCount } from '../../api'

// 抛出去给页面使用
export const asyncAdd = createAsyncThunk(
  'counter/asyncAdd',
  async (data:any) => {
    const res = await fetchCount(data)
    // 这个返回值，会给到 extraReducers中的addCase的payload
    return res.data
  }
)

const slice = createSlice({
  name: 'counter',
  // 可共享的状态数据
  initialState: {
    num: 0
  },
  // 同步的action
  reducers: {
    add (state, action) {
      state.num += action.payload
    },
    sub (state, action) {
      state.num -= action.payload
    }
  },
  // 异步的action
  extraReducers: builder => {
    builder.addCase(asyncAdd.fulfilled, (state, action)=>{
      // console.log('asyncAdd fulfilled action', action)
      state.num += action.payload
    })
  }
})

// slice.actions
console.log('----slice', slice)

export const { add, sub } = slice.actions

export default slice.reducer

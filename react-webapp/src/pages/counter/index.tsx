import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { add, sub, asyncAdd } from '../../store/slices/counter'
import './style.css'

import { QfTabbar } from '@/components';


export default function Counter() {
  const { num } = useAppSelector(state=>state.counter)
  const dispatch = useAppDispatch()
  

  return (
    <div>
      <h1>计数器页面</h1>
      <h1>{ num }</h1>

      <button onClick={()=>dispatch(sub(10))}>自减</button>
      <button onClick={()=>dispatch(add(20))}>自增</button>
      <button onClick={()=>dispatch(asyncAdd(100))}>异步自增</button>
      <hr />

      <button onClick={()=>dispatch({type:'counter/sub',payload:10})}>自减</button>
      <button onClick={()=>dispatch({type:'counter/add',payload:20})}>自增</button>
      <button onClick={()=>dispatch({type:'counter/asyncAdd/fulfilled',payload:100})}>异步自增</button>
      <hr />

      
      <QfTabbar />
    </div>
  )
}

// 代码

// 10rem          750px
// -----     =  --------
// 手机宽屏       750px


// 75px   1rem
// 150px  2rem

// x       ?

// x/75

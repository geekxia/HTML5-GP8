<script setup>
  import { storeToRefs } from 'pinia'
  import useUserStore from '@/store/user'

  // import useStore from '@/store'
  // const rootStore = useStore()
  // console.log('---rootStore', rootStore)

  import { onMounted, watchEffect } from 'vue'
  const store = useUserStore()
  console.log('---user store', store)
  // console.log('---user store', store.msg)

  // 用了解构，会导致响应式失效，要使用 storeToRefs把解构结构变成ref变量。
  let { msg, num, total1, total2, total3, total4, list } = storeToRefs(store)

  const update1 = () => {
    // wrong 这种直接修改state的逻辑，不推荐
    // store.msg = 'hello world'  // 【不解构】
    // msg.value = 'hello world'  // 【解构】
  }

  const update2 = () => {
    store.$patch({ msg: 'hello world', num: 200 })
  }

  const update3 = () => {
    store.$state = { msg: 'hello world', num: 300 }
  }

  const update4 = () => {
    store.$reset()
  }

  const update5 = () => {
    store.setMsg('hello world')
  }

  const add = () => {
    store.addNum(2)
  }

  onMounted(()=>{
    const params = { limit: 5, page: 1 }
    store.getCnodeListSync(params)
  })

  watchEffect(()=>{
    // 监听user的变化，默认情况下当组件销毁时会取消监听。
    // detached: true 这会保留监听
    store.$subscribe((mutations, state)=>{
      console.log('--mutations信号', mutations)
      console.log('--state', state)
    }, { detached: true })
  })

  watchEffect(()=>{
    // 监听actions的执行，用于测量action执行时间。
    store.$onAction(({ after, name })=>{
      console.log('---actions name', name)
      console.log('---start time', Date.now())
      after(()=>console.log('---end time', Date.now()))
    })
  })

</script>

<template>
  <h1>学习Pinia状态管理</h1>
  <hr>

  <h1>{{`msg: ${msg}`}}</h1>
  <h1>{{`num: ${num}`}}</h1>
  <h1>{{`total1: ${total1}`}}</h1>
  <h1>{{`total2: ${total2}`}}</h1>
  <h1>{{`total3: ${total3}`}}</h1>
  <h1>{{`total4: ${total4(3)}`}}</h1>
  <button @click='update1'>修改1</button>
  <button @click='update2'>修改2</button>
  <button @click='update3'>修改3</button>
  <button @click='update4'>修改4</button>
  <button @click='update5'>修改5</button>
  <hr>
  <button @click='add'>自增</button>
  <hr>
  <div v-for='item in list'>
    <div v-text='item.title'></div>
  </div>
</template>

<style>
</style>

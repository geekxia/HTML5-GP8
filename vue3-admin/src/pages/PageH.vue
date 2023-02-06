<script setup>
  import {
    ref, onBeforeMount, onMounted,
    onBeforeUpdate, onUpdated,
    onBeforeUnmount, onUnmounted,
    onRenderTracked, onRenderTriggered,
    onActivated, onDeactivated,
    onErrorCaptured,
    inject
  } from 'vue'

  console.log('----start')

  const num = ref<number>(100)
  // 挂载阶段
  onBeforeMount(()=>console.log('---开始挂载'))
  onRenderTracked(()=>console.log('---跟踪'))
  onMounted(()=>console.log('---挂载完成'))

  // 更新阶段
  onRenderTriggered(()=>console.log('---触发'))
  onBeforeUpdate(()=>console.log('---开始更新'))
  onUpdated(()=>console.log('---更新完成'))

  // 销毁阶段
  onBeforeUnmount(()=>console.log('---开始销毁'))
  onUnmounted(()=>console.log('---销毁完成'))

  // 与动态组件有关
  onActivated(()=>console.log('---激活'))
  onDeactivated(()=>console.log('---休眠'))

  // 异常捕获
  onErrorCaptured(()=>console.log('---错误捕获'))

  const msg = inject('name', '张三')
  console.log('---msg', msg)

  console.log('----end')
</script>

<template>
  <h1>学习生命周期</h1>
  <h1 v-text='num'></h1>
  <button @click='num++'>自增</button>
</template>

<style lang="css" scoped>
</style>

<script setup>
  import { reactive, defineExpose } from 'vue'
  const list = reactive([1,2,3,4])
  const handler = () => {
    console.log('----handler')
  }
  defineExpose({
    list,
    handler
  })
</script>

<template>
  <h1>我是ChildA组件</h1>
</template>

<style>
</style>

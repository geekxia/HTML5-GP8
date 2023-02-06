<script setup>
  import { ref } from 'vue'
  import CnodePage from '@/components/CnodePage.vue'

  let page = ref(1)

  // const hander = (ev) => {
  //   console.log('---来自孩子的消息', ev)
  //   page.value = ev
  // }
</script>

<template>
  <h1>父组件</h1>
  <hr>
  <CnodePage :value='page' @input='page=$event' />
  <hr>
</template>

<style lang="css" scoped>
</style>

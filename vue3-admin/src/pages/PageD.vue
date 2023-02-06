<script setup>
  import { ref } from 'vue'
  const num = ref(1)
  const add = () => {
    num.value++
  }
</script>

<template>
  <h1>页面组件D</h1>
  <h1 v-text='num'></h1>
  <button @click='add'>自增</button>
</template>

<style>

</style>

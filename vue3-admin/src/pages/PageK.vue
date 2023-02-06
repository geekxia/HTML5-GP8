<script setup>
  import { defineAsyncComponent } from 'vue'
  import { useGlobal } from './hooks'
  import ChildB from '@/components/ChildB.vue'

  const ChildAsyncB = defineAsyncComponent({
    loader: ()=>import('@/components/ChildB.vue')
  })

  const $img = useGlobal('$img')
  console.log('----$img', $img)
</script>

<template>
  <h1>同步组件</h1>
  <ChildB name='同步组件' class='childb' style='color:red;font-size:30px' />
  <hr>

  <!-- <h1>异步组件</h1> -->
  <!-- <ChildAsyncB /> -->

</template>

<style>
</style>

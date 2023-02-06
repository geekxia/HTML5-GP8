<script setup>

  import { useList, useFilter, useQuery } from './hooks'

  const list = useList()  // 第一个逻辑点
  // const [list2, filter] = useFilter(list)  // 第二个逻辑点
  const [list2, search] = useQuery()  // 第三个逻辑点

</script>

<template>
  <h1>页面组件E</h1>
  <!-- <button @click='filter'>过滤</button> -->
  <button @click='search'>搜索</button>
  <!-- 列表 -->
  <div v-for='item in list2'>
    <span v-text='item.id'></span>
    --
    <span v-text='item.name'></span>
  </div>
</template>

<style lang="css" scoped>
</style>

<script setup>

  import { useCounter, useTodo } from './hooks'

  const [num, setNum] = useCounter(500)
  const { todo, list, confirm } = useTodo([])

</script>

<template>
  <h1 v-text='num'></h1>
  <button @click='setNum'>自增</button>

  <hr>
  <input type="text" v-model='todo' @keyup.enter='confirm' />
  <div v-for='item in list'>
    <h2 v-text='item.task'></h2>
  </div>
</template>

<style lang="css" scoped>
</style>

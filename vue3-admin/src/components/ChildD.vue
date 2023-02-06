<script setup>
  import { defineProps, inject } from 'vue'
  const props = defineProps({
    a: { type: Number, default: 0 },
    // 接收引用数据类型时，default要用工厂函数
    b: { type: Array, default: () => {
      return [1,2,3,4]
    }},
    c: { type: Object, default: () => {
      return { id: 1, name: '张三' }
    }},
    d: { type: Object, default: () => {
      console.log('---this', this)
      const version = inject('version', 'v2')
      return { version }
    }}
  })
</script>

<template>
  <h1>我是ChildD组件</h1>
  <h1 v-text='a'></h1>
  <hr>

  <div v-for='item in b'>
    <h1 v-text='item'></h1>
  </div>

  <hr>
  <div v-for='(value, key, idx) in c'>
    <h1>{{`${idx} - ${key} : ${value}`}}</h1>
  </div>

  <hr>
  <h1 v-text='d.version'></h1>
  
</template>

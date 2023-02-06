<script setup>
  import ChildF from '@/components/ChildF.vue'
</script>

<template>
  <h1>学习插槽</h1>
  <ChildF>
    <template #header='scoped'>
      <h2>头部 {{ scoped.a }}</h2>
    </template>
    <template #default='scoped'>
      <h2>主体内容 {{ scoped.b }}</h2>
    </template>
    <template #footer='scoped'>
      <h2>底部 {{ scoped.c }}</h2>
    </template>
  </ChildF>
</template>

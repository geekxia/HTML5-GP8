<script setup>
  import { useSlots } from 'vue'
  const slots = useSlots()
  console.log('---slots', slots)
</script>

<template>
  <div>
    <slot name='header' a='1'>
      <div>我是默认的头部</div>
    </slot>
    <hr>
    <slot b='2'>
      <div>我是默认的主体内容</div>
    </slot>
    <hr>
    <slot name='footer' c='3'>
      <div>我是默认的底部</div>
    </slot>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    show: { type: Boolean, default: true }
  })
</script>

<template>
  <transition name='cc'>
    <h1 v-if='show'>我是ChildC组件</h1>
  </transition>
</template>

<style>
  .cc-enter-from, .cc-leave-to {
    opacity: 0;
    color: red;
  }
  .cc-enter-active, .cc-leave-active {
    transition: all 2s ease;
  }
</style>

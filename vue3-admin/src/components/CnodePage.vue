<script setup>
  import { reactive, defineProps, defineEmits, toRefs } from 'vue'
  // 接收父组件传递过来的自定义属性
  const { value } = defineProps({
    value: { type: Number, default: 1 }
  })

  // 接收父组件传递过来的自定义事件
  const emit = defineEmits(['input'])

  // console.log('---cn page', props)
  const pages = reactive([1,2,3,4,5])
  const change = p => {
    // console.log('---p', p)
    emit('input', p)
  }
</script>

<template>
  <div class="cn-pages">
    <span v-text='`<<`'></span>
    <span v-for='item in pages' v-text='item' :class='{on: value===item}' @click='change(item)'></span>
    <span v-text='`>>`'></span>
  </div>
</template>

<style lang="scss">
.cn-pages {
  span {
    display: inline-block;
    padding:  10px 20px;
    cursor: pointer;
    border: 1px solid #ccc;
  }
  span.on {
    color: red;
  }
}
</style>

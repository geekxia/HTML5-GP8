<script setup>
  import { reactive, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    // modelValue: { type: String, default: 'good' },
    tab: { type: String, default: 'good' },
    page: { type: Number, default: 1 },
    // 接收自定义修改符
    tabModifiers: { default: () => ({}) },
    pageModifiers: { default: () => ({}) }
  })
  // const emit = defineEmits(['update:modelValue'])
  const emit = defineEmits(['update:tab', 'update:page'])


  const tabArr = reactive([
    { id: 1, tab: '精华', value: 'good' },
    { id: 2, tab: '问答', value: 'ask' },
    { id: 3, tab: '招聘', value: 'job' }
  ])
  const changeTab = item => {
    console.log('---item', item.value)
    console.log('---tab上的修饰符', props.tabModifiers)
    const { upper } = props.tabModifiers
    if (upper) {
      emit('update:tab', item.value)
    } else {
      emit('update:tab', item.value)
    }
    // emit('update:modelValue', item.value)
  }

  const pages = [1,2,3,4,5]
  const changePage = idx => {
    console.log('---page上的修饰符', props.pageModifiers)
    emit('update:page', idx)
  }
</script>

<template>
  <div>
    <span v-for='item in tabArr'>
      <span v-text='item.tab' :class='{"on":tab===item.value}' @click='changeTab(item)'></span>
    </span>
    <hr>
    <span v-for='item in pages'>
      <span v-text='item' :class='{"on":page===item}' @click='changePage(item)'></span>
    </span>
  </div>
</template>

<style>
.on {
  color: red;
}
</style>

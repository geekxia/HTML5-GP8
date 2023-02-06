<script setup>
  import { ref } from 'vue'
  import ChildE from '@/components/ChildE.vue'
  let name = ref('')
  let tab = ref('good')
  let page = ref(1)

  const submit = () => {
    const data = {
      name: name.value,
      tab: tab.value,
      page: page.value
    }
    console.log('------提交', data)
  }
</script>

<template>
  <h1>学习v-model指令</h1>
  <!-- vue2  v-model = v-bind:value + v-on:input -->

  <!-- 在vue3中，在非自定义组件上，v-model = v-bind:value + v-on:input -->
  <!-- <input type="text" v-model.trim='name' /> -->
  <input type="text" :value='name' @input='name=$event.target.value' />
  <hr>

  <!-- 在vue3中，自定义组件时，v-model = v-bind:modelValue + v-on:update:modelValue -->
  <!-- 在vue3中，自定义组件时， v-model:tab = :tab + @update:tab -->
  <!-- 在vue3中，自定义组件时， v-model:page = :page + @update:page -->
  <!-- 在vue3中，在同一个自定义组件上，可以同时使用多个v-model -->
  <!-- 在vue3中，可以给每个v-model分别自定义修饰符，在子组件中使用 defineProps接收 -->
  <ChildE v-model:tab.trim.upper.lower='tab' v-model:page.number.upper.abc='page' />

  <button @click='submit'>提交</button>
</template>

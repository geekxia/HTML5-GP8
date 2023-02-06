<script setup>
  import { defineProps, useAttrs } from 'vue'
  const attrs = useAttrs()
  console.log('---child b attrs', attrs)

  // const props = defineProps({
  //   name: { type: String, default: '' },
  //   class: { type: String, default: '' },
  //   style: { type: Object, default: () => ({}) }
  // })
  // console.log('---child b props', props)
</script>



<template>
  <h1>我是ChilldB</h1>
</template>

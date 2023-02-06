<script setup>
  import { useRoute, useRouter, useLink } from 'vue-router'
  import { defineProps } from 'vue'

  const props = defineProps({
    id: { type: String, default: '' }
  })

  console.log('---props', props)

  const route = useRoute()
  const router = useRouter()
  console.log('---route', route)
  console.log('---router', router)
</script>

<template>
  <h1>学习路由</h1>
</template>

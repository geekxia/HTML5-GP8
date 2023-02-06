<template>
  <h1>页面组件B</h1>
  <h1 v-text='num'></h1>
  <button @click='add'>自增</button>
  <button @click='sub'>自减</button>
</template>

<script>
import { ref } from 'vue'
export default {
  setup (props, context) {
    console.log('----setup', props, context)
    const num = ref(1)
    const add = () => {
      num.value++
    }
    return {
      num,
      add
    }
  },
  methods: {
    sub () {
      this.num--
    }
  },
  mounted () {
    console.log('---mounted')
  }
}
</script>

<style lang="css" scoped>
</style>

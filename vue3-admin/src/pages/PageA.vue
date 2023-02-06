<template>
  <h1>页面组件A</h1>
  <h1 v-text='num'></h1>
  <button @click='add'>自增</button>
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  },
  methods: {
    add () {
      this.num++
    }
  },
  mounted () {
    console.log('---mounted')
  }
}
</script>

<style lang="css" scoped>
</style>

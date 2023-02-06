<template>
  <div>
    <h1>我是B组件</h1>

  </div>
</template>

<script>
import bus from '@/utils/bus'
export default {
  mounted () {
    bus.$on('gp', msg=>{
      console.log('---B 消息来了', msg)
    })
  }
}
</script>

<style lang="css" scoped>
</style>

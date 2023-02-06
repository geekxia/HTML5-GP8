<template>
  <div>
    <h1>我是A组件</h1>
    <input type="text" v-model='msg' @keyup.enter='send' />
  </div>
</template>

<script>
import bus from '@/utils/bus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    send () {
      // 发消息
      bus.$emit('gp', this.msg)
    }
  },
  mounted () {
    console.log('xx', this.$parent.$parent.xx)
    this.$parent.$parent.changeXX(200000)
    console.log('$attrs', this.$attrs)
    console.log('$listeners', this.$listeners)

  }

}
</script>

<style lang="css" scoped>
</style>

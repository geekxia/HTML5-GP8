<template>
  <div class='top' v-show='show' @click='$emit("back")'>
    <!-- 在这里用<slot>让用户可以定制回到顶部的icon -->
    <!-- <slot>内部所嵌套的节点，是当前插槽的默认内容 -->
    <slot>
      <img :src='top' />
    </slot>
  </div>
</template>

<script>
  import top from '@/assets/top.png'
  export default {
    props: {
      show: { type: Boolean, default: false }
    },
    data () {
      return { top }
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    position: fixed;
    right: .33rem;
    bottom: 2.67rem;
    width: 1.01rem;
    height: 1.01rem;
    z-index: 9999;
    &>img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>

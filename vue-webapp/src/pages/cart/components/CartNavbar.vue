<template>
  <van-nav-bar
    title='购物车'
    right-text="筛选"
    left-arrow
    @click-left='$router.back()'
  >
  <template #right>
    <img
      class='home'
      src="/icon/index.png"
      @click='$router.replace("/home")'
    />
  </template>
  </van-nav-bar>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .home {
    display: inline-block;
    width: .53rem;
    height: .53rem;
  }
</style>
<style>
  .van-nav-bar__text {
    color: #323232;
  }
  .van-nav-bar .van-icon {
    color: #323232;
  }
</style>

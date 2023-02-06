<template>
  <!-- 导航栏 -->
  <van-nav-bar
    title="标题"
    right-text="按钮"
    left-arrow
  >
    <template #right>
      <div class='menu2'>
        <img src="/icon/menu2.png" />
      </div>
    </template>
    <template #title>
      <van-search placeholder="搜索" shape='round' />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
}
</script>

<style lang='scss'>
  .van-nav-bar__title {
    max-width: 100%;
  }
  .van-nav-bar .van-icon {
    color: #8b8b8b;
  }
</style>

<style lang='scss' scoped>
  .van-search {
    width: 7.47rem;
    padding-left: 0;
    padding-right: 0;
    height: .8rem;
  }
  .van-nav-bar__right {
    width: 1.39rem;
    box-sizing: border-box;
  }
  .menu2 {
    text-align: center;
    img {
      width: .53rem;
      height: .53rem;
      display: inline-block;
    }
  }
</style>

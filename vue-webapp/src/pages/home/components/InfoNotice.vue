<template>
  <!-- 通知栏 -->
  <van-notice-bar v-if='value'>
    <template #right-icon>
      <div class='open'>立即打开</div>
    </template>
    <template #left-icon>
      <div class='close' @click='$emit("input", false)'>X</div>
    </template>
    <div class='middle'>
      <img src="/logo.png" />
      <div>打开京东App，购物更轻松</div>
    </div>
  </van-notice-bar>
</template>

<script>
export default {
  props: {
    value: { type:Boolean, default:true }
  }
}
</script>

<style lang='scss'>
  .van-notice-bar__content {
    width: 100%;
    display: block;
  }
</style>

<style lang="scss" scoped>
.van-notice-bar {
  height: 1.2rem;
  line-height: 1.2rem;
  padding-right: 0;
  padding-left: 0;
}
.open {
  background-color: #f63515;
  color: white;
  font-size: .37rem;
  width: 2.51rem;
  text-align: center;
}
.close {
  background-color: rgba(51, 51, 51, 1);
  color: #cccccc;
  font-size: .37rem;
  width: .8rem;
  text-align: center;
}
.middle {
  background-color: rgba(51, 51, 51, 1);
  font-size: .37rem;
  color: white;
  width: 100%;
  height: 100%;
  // position: relative;
  overflow: hidden;
  &>img {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    float: left;
    margin-left: .03rem;
    margin-top: .2rem;
  }
  &>div {
    float: left;
    margin-left:.03rem;
    width: 5.81rem;
    text-align: center;
  }
}
</style>

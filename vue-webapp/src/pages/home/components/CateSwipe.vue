<template>
  <!-- 品类轮播 -->
  <div class='cate-swipe'>
    <van-swipe
      indicator-color='#f63515'
      :loop='false'
    >
      <van-swipe-item
        v-for='i in 2'
        :key='i'
      >
        <van-grid column-num='5' :border='false'>
          <van-grid-item
            v-for='j in 10'
            :key='j'
            icon="photo-o"
            text="文字"
          >
            <div class='cate'>
              <img src="https://m15.360buyimg.com/mobilecms/jfs/t1/186882/8/12149/5894/60ec1250E9335241a/b22054613aa8ae75.png!q70.jpg" />
              <div>京东拍卖</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='scss'>
  // 修改Grid背景色
  .van-grid-item {
    height: 2rem;
    .van-grid-item__content.van-grid-item__content--center {
      background-color: rgba(246,246,246,1);
      padding: 0;
    }
  }
</style>

<style lang="scss" scoped>
  .cate-swipe {
    .cate {
      font-size: .32rem;
      color: #666666;
      img {
        width: 1.07rem;
        height: 1.07rem;
      }
    }
    .van-swipe {
      height: 4.53rem;
    }
  }
</style>

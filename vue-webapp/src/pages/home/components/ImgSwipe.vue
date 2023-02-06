<template>
  <!-- 轮播图 -->
  <div class='img-swipe'>
    <van-swipe
      :autoplay="3000"
      indicator-color='#f63515'
    >
      <van-swipe-item
        v-for='item in images'
        :key='item.id'
      >
        <img v-lazy='item.src' />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
        { id:1, src:'https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/196922/2/16761/169136/618b5f13Eb04e8241/cdcf5455d20035c3.jpg!cr_1053x420_4_0!q70.jpg' },
        { id:2, src:'https://m15.360buyimg.com/mobilecms/jfs/t1/124999/21/26140/151999/62371982Eac49e0be/c81c8a741275d11f.jpg!cr_1053x420_4_0!q70.jpg' },
        { id:3, src:'https://m15.360buyimg.com/mobilecms/jfs/t1/158021/22/25508/147314/61dba060E59f423d1/767394e105d0e9bf.jpg!cr_1053x420_4_0!q70.jpg' }
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-swipe {
    .van-swipe {
      // width: 9.33rem;
      height: 3.73rem;
      text-align: center;
      .van-swipe-item {
        text-align: center;
        &>img {
          display: inline-block;
          width: 9.33rem;
          height: 3.73rem;
          border-radius: .08rem;
        }
      }
    }
  }
</style>

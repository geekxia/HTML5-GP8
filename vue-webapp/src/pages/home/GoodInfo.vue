<template>
  <div class='info'>
    <div class='swipe'>
      <van-image :src="($cdn + info.img)" />
      <img @click='$router.back()' src='/icon/back.png' />
    </div>
    <div class='price'>
      <span>￥</span>
      <span v-text='info.price'>99.9</span>
    </div>
    <div class='name' v-text='info.desc'></div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        v-login
        @click='addToCart'
      />
      <van-goods-action-button type="danger" text="立即购买" v-login />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'GoodInfo',
  props: {
    // 开启了 props接收动态路由参数
    id: { type: String, required: true }
  },
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    // 接收query查询参数
    // console.log('--$route', this.$route.query)
    // 接收动态路由参数
    // console.log('--$route', this.$route.params)
    // 使用props来接收动态路由参数
    console.log('--id', this.id)
    this.$http.fetchInfo(this.id).then(res=>{
      console.log('商品详情', res)
      this.info = res.info
    })
  },
  methods: {
    addToCart () {
      console.log('调接口添加购物车')
      const data = {
        good_id: this.info._id,
        num: 1
      }
      this.$http.fetchCartAdd(data).then(res=>{
        if (res) {
          console.log('add cart', res)
          this.$router.push('/cart')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .info {
    .price {
      color: #f63515;
      box-sizing: border-box;
      padding: .27rem .4rem;
    }
    .name {
      font-size: .4rem;
      font-weight: bold;
      box-sizing: border-box;
      padding: .27rem .4rem;
    }
  }
  .swipe {
    position: relative;
    .van-image {
      width: 10rem;
      height: 10rem;
    }
    &>img {
      position: absolute;
      top: .27rem;
      left: .27rem;
      width: .8rem;
      height: .8rem;
    }
  }
</style>

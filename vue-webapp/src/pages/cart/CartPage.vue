<template>
  <div class="cart">

    <CartNavbar />

    <NotData :show='show' />

    <!-- 滑动单元格（用它的左滑删除这个交互） -->
    <van-swipe-cell v-for='(row,idx) in list' :key='row._id'>
      <!-- 删格（实现左右布局） -->
      <van-row type='flex' align='center'>
        <van-col span="3">
          <van-checkbox v-model='row.checked' @click='rowClick' />
        </van-col>
        <van-col span="21">
          <van-card
            class="goods-card"
            :num="row.num"
            :price="(row && row.good_info.price)|rmb"
            :desc="(row && row.good_info.desc)"
            :title="(row && row.good_info.name)"
            :thumb="(row && ($cdn + row.good_info.img))"
          >
            <template #footer>
              <van-button
                size="mini"
                @click='rowUpdate(row,idx,-1)'>
                -
              </van-button>
              <van-button
                size="mini"
                @click='rowUpdate(row,idx,1)'>
                +
              </van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class='del'
          @click='rowDelete(row,idx)'
        />
      </template>
    </van-swipe-cell>

    <van-submit-bar
      :price='total'
      button-text="提交订单"
      @submit="submit"
    >
      <van-checkbox v-model="full" @click='fullClick'>全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span style='color:blue;'>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
  import CartNavbar from './components/CartNavbar.vue'
  import { NotData } from '@/components'

  export default {
    name: 'CartPage',
    components: {
      CartNavbar,
      NotData
    },
    data () {
      return {
        list: [],   // 购物车列表
        full: false,
        show: false
      }
    },
    computed: {
      total () {
        let t = 0
        this.list.forEach(ele=>{
          if (ele.checked) t += ele.num * ele.good_info.price
        })
        return 100*t  // 单位：分
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.$http.fetchCartList().then(res=>{
          console.log('购物车列表', res)
          if (res) {
            this.list = res.list
            // 调完列表接口之后，我才能知道有没有数据
            if (this.list.length === 0) {
              this.show = true
            }
            this.isFull()
          }
        })
      },
      // 封装方法，用于判断是否全选了
      isFull () {
        const arr = this.list.filter(ele=>ele.checked)
        this.full = (arr.length > 0) && (arr.length === this.list.length)
      },
      rowClick () {
        // console.log('checkbox clicked', row)
        this.isFull()
      },
      fullClick () {
        this.list.forEach((ele,idx)=>{
          this.list[idx].checked = this.full
        })
        this.list = JSON.parse(JSON.stringify(this.list))
      },
      rowDelete (row,idx) {
        // console.log('当前行', row)
        this.$dialog.confirm({
          title: '警告',
          message: `你确定要删除 ${row.good_info.name} 吗？`,
        }).then(() => {
          this.$http.fetchCartDel(row._id).then(res=>{
            if (res) {
              this.list.splice(idx, 1)
              this.isFull()
              if (this.list.length===0) {
                this.show = true
              }
            }
          })
        })
      },
      rowUpdate (row, idx, step) {
        const params = {
          cart_id: row._id,
          new_num: row.num + step
        }
        if (params.new_num<=0) {
          return this.$toast('商品数量不能小于1')
        }
        this.$http.fetchCartUpd(params).then(res=>{
          if (res) {
            this.list[idx].num = params.new_num
            // this.$forceUpdate()
            // 什么场景下会用到 $forceUpdate()？
          }
        })
      },
      submit () {
        console.log('提交购物车')
        // 判断有没有选择商品、收货地址等
        // 什么是ids？当客户端向服务端传递多个元素时，不能用数组类型，要拼接成字符串进行传递。
        let ids = ''
        this.list.forEach(ele=>{
          if (ele.checked) ids += `;${ele._id}`
        })
        if (!ids) {
          return this.$toast('请选择要提交的商品')
        }
        this.$http.fetchCartSubmit(ids).then(res=>{
          if (res) {
            // 提交成功，调接口刷新购买车列表
            // 还可以怎样？提交成功，跳转抽奖页面
            this.init()
          }
        })
      }
    }
  }
</script>

<style lang='scss'>
  .van-card {
    background-color: white;
    padding-left: 0;
    .van-button {
      padding: 0 .19rem;
      margin-left: .27rem;
    }
  }
  .van-swipe-cell {
    border-bottom: 1px solid #eee;
  }
  .van-checkbox__icon {
    margin: 0 auto;
  }
</style>

<style lang="scss" scoped>
  .cart { padding-bottom: 2.4rem; }
  .del { height: 100%; }
</style>

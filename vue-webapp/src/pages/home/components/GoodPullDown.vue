<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <slot></slot>
    <!-- onLoad，当页面滚动条小于offset时，触发该事件 -->
    <!-- 当onLoad事件被触发时，loading会自动变成true -->
    <!-- 如果loading=true，表示当前加载未完成，所以List无法再检测下一次触底的 -->
    <!-- finished-text，指的是，没有数据时的交互提示 -->
    <!-- finished，表示是否还有数据。它为true时，表示没有数据了 -->
    <van-list
      v-model='loading'
      :finished="finished"
      finished-text="没有更多了"
      @load="page++"
      offset='50'
      :immediate-check='false'
    >
      <!-- <div class='row' v-for='item in n' :key="item" v-text='item'></div> -->
      <GoodList :list='list' />
    </van-list>
  </van-pull-refresh>
</template>

<script>
  import GoodList from './GoodList.vue'
  export default {
    components: { GoodList },
    data () {
      return {
        loading: false,
        finished: false,
        refreshing: false,
        // n: 0,
        list: [],  // 商品列表数据
        page: 1,
        count: 0
      }
    },
    watch: {
      // 当page变化时触发，在这里就onLoad()执行
      page () {
        this.getList()
      },
      count () {
        this.getList()
      }
    },
    mounted () {
      // setTimeout(()=>{
      //   this.n = 5
      // }, 500)
      this.getList()
    },
    methods: {
      getList () {
        const params = { page: this.page, size: 6 }
        this.$http.fetchList(params).then(res=>{
          // console.log('商品列表', res)
          if (this.loading) {
            // onLoad 触底，向list中追加分页数据
            this.list = [...this.list, ...res.list]
            // 保证下一次触底功能是正常的
            this.loading = false
            // 判断还有没有数据
            this.finished = (this.list.length === res.total)
          } else {
            // onRefresh 下拉，重置list列表
            // 或者初始化时
            this.list = res.list
            this.refreshing = false
            this.finished = false
          }
        })
      },
      // onLoad () {
        // console.log('滚动条距离底部小200px了，准备调接口')
        // this.page++
        // setTimeout(()=>{
        //   this.n += 5  // 数组合并
        //   this.loading = false
        //   // 判断还有没有数据
        //   this.finished = (this.n >= 50)
        // }, 300)
      // },
      onRefresh () {
        // console.log('用户正在用手势下拉，将要调接口重置数据')
        if (this.page !== 1) {
          this.page = 1
        } else {
          // 每次下拉都调接口
          this.count++
        }
        // setTimeout(()=>{
        //   this.n = 5
        //   this.refreshing = false
        //   this.finished = false
        // }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    height: 6.67rem;
    border: 1px solid red;
    line-height: 6.67rem;
    text-align: center;
  }
</style>

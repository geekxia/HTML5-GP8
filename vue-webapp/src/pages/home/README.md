<template>
  <div class='home'>

    <h1 v-text='count'></h1>
    <h1 v-text='total'></h1>
    <van-button type="primary" @click='change(2)'>自增</van-button>
    <van-button type="info" @click='change(-1)'>自减</van-button>

    <div v-for='item in list' :key='item.n' class='row'>
      <span v-text='item.k'></span>
      --
      <span v-text='item.n'></span>
    </div>

    <!-- <h1>商品列表</h1>
    <div class='row' v-for='n in 5' :key='n'>
      <div v-text='2*n-1' @click='skip(2*n-1)'></div>
      <div v-text='2*n' @click='skip(2*n)'></div>
    </div> -->
  </div>
</template>

<script>
  // import { Button } from 'vant'
  // console.log('Button', Button)
  // 这里一定要抛出Vue选项们
  // import { fetchQQ } from '@/utils/api'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    // 用于指定当前组件的名字，在devtools中方便查看组件树结构
    name: 'HomePage',
    // 局部注册
    components: {
      // [Button.name]: Button
    },
    computed: {
      // 注意：mapState和mapGetters只能写在computed中
      // 作用：简化组件中使用state和getters的写法
      // 映射成功后，在代码中可以用this来访问它们。
      ...mapState('music', {
        count: state => state.count,
        list: state => state.list
      }),
      ...mapGetters('music', ['total']),
      // cc () {
      //   return this.$store.state.music.count
      // },
      // tt () {
      //   return this.$store.getters['music/total']
      // },
      // ll () {
      //   return this.$store.state.music.list
      // }
    },
    mounted () {
      console.log('home this $store', this.$store)
      const str = '_=1647935755189&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=1&uin=1152921504635192377&g_tk_new_20200303=1546441770&g_tk=1546441770&hostUin=0'
      const params = {}
      str.split('&').forEach(kv=>{
        const arr = kv.split('=')
        params[arr[0]] = arr[1]
      })
      // fetchQQ(params).then(res=>{
      //   console.log('后端数据', res)
      // })
      // 派发并执行一个叫getList的action方法
      // this.$store.dispatch('music/getList', params)
      this.getList(params)
    },
    methods: {
      // 注意：mapMutations、mapActions只能写在methods中。
      // 映射成功后，在代码中可以用this来访问它们。
      ...mapMutations('music', ['updateCount']),
      ...mapActions('music', ['getList']),
      skip (id) {
        console.log('-- skip')
        // query跳转
        // this.$router.push(`/detail?id=${id}`)
        // 动态路由跳转
        this.$router.push(`/detail/${id}`)
      },
      change (arg) {
        // 修改Vuex中的state数据（不推荐）
        // 这会绕过mutations，那么devtools中就没有记录了，给调试带来了不确定性。
        // 状态管理：可预测的数据流。
        // this.$store.state.music.count += arg
        // this.$store.commit('music/updateCount', arg)
        this.updateCount(arg)

      }
    }
  }
</script>

<style lang='scss'>
  .row {
    display: flex;
    &>div {
      flex: 1;
      border: 1px solid #ccc;
      height: 2.67rem;
      text-align: center;
      line-height: 2.67rem;
      font-size: .8rem;
    }
  }
  .row {
    font-size: .43rem;
    line-height: .53rem;
  }
</style>

<template>
  <div
    class='scroll'
    v-scroll='[0,"1.2rem","7.73rem","1.33rem"]'
  >
    <van-sidebar v-model='activeKey'>
      <van-sidebar-item
        v-for='row in cates'
        :key='row._id'
        :title='row.cate_zh'
      />
    </van-sidebar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState('good', ['cates']),
      // 如何把Vuex中的state数据双向绑定到v-model上？
      activeKey: {
        get () {
          return this.$store.state.good.activeKey
        },
        set (newVal) {
          this.$store.commit('good/setActiveKey', newVal)
        }
      }
    }
  }
</script>

<style lang='scss'>
  .van-sidebar-item {
    height: 1.23rem;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 1.23rem;
  }
</style>
<style lang='scss' scoped>
  .van-sidebar-item--select::before {
    display: none;
  }
  .van-sidebar-item--select {
    color: #e93b3d;
  }
</style>

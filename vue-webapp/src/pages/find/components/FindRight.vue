<template>
  <div
    class='scroll'
    v-scroll='["2.27rem","1.2rem",0,"1.33rem"]'
  >
    <van-grid column-num='3' :border='false'>
      <van-grid-item
        v-for='grid in subCates'
        :key='grid._id'
      >
        <div class='cate'>
          <img :src='($cdn + grid.img)' />
          <div v-text='grid.name'></div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState('good', ['cates','activeKey', 'cache']),
      ...mapGetters('good', ['subCates'])
    },
    watch: {
      // 监听Vuex中的cates变化：fetchCates已经完成了
      // 初始化时，调接口获取右侧的二级品类列表
      cates () {
        // this.getSubCates(this.cates[0].cate)
        this.getSubCates()
      },
      // 当你切换左右菜单时，调接口获取右侧对应的二级列表
      activeKey () {
        // this.getSubCates(this.cates[this.activeKey].cate)
        // 每次activeKey变化时，先判断 cache[activeKey] 是否有数据
        // 如果有数据，直接使用，渲染右侧二级品类
        // 如果没有，触发调接口，进一步缓存
        if (!this.cache[this.activeKey]) {
          this.getSubCates()
        }

      }
    },
    methods: {
      ...mapActions('good', ['getSubCates']),
      ...mapMutations('good', ['cleanCache'])
    },
    beforeDestroy () {
      this.cleanCache()
      // this.$store.commit('good/cleanCache')
    }
  }
</script>

<style lang="scss" scoped>
  .van-grid {
    .cate {
      img {
        display: inline-block;
        width: 1.87rem;
        height: 1.87rem;
      }
      font-size: .32rem;
      color: #333333;
      text-align: center;
    }
  }
</style>

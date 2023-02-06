<template>
  <div
    class='home'
    ref='home'
    v-scroll
    @scroll='top=$event.srcElement.scrollTop'
  >
    <GoodPullDown>
      <InfoNotice v-model='show' />
      <GoodSearch />
      <ImgSwipe />
      <CateSwipe />
    </GoodPullDown>
    <QfTabbar />
    <BackTop :show='(top>800)' @back='$refs["home"].scrollTop=0'/>
  </div>
</template>

<script>
  import { QfTabbar, BackTop } from '@/components'
  import GoodPullDown from './components/GoodPullDown.vue'
  import InfoNotice from './components/InfoNotice.vue'
  import GoodSearch from './components/GoodSearch.vue'
  import ImgSwipe from './components/ImgSwipe.vue'
  import CateSwipe from './components/CateSwipe.vue'

  export default {
    name: 'HomePage',
    components: {
      QfTabbar,
      ImgSwipe,
      CateSwipe,
      InfoNotice,
      GoodSearch,
      GoodPullDown,
      BackTop
    },
    data () {
      // 当前组件被keep-alive包裹了，data不会重置
      return {
        show: true,
        top: 0,   // 记录滚动条的位置
      }
    },
    methods: {
      // scroll (ev) {
      //   console.log('滚动', ev.srcElement.scrollTop)
      //   this.top = ev.srcElement.scrollTop
      // }
    },
    // 当返回当前组件（再次激活时）
    // 手动滚动到离开时的那个位置
    activated () {
      this.$refs.home.scrollTop = this.top
      console.log('我执行了')
    }
  }
</script>

<style lang='scss' scoped>
  .home {
    background-color: rgba(246,246,246,1);
    padding-bottom: 2rem;
  }
</style>

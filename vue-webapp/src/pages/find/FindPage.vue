<template>
  <div class='find'>
    <FindNavbar />
    <FindLeft />
    <FindRight />
    <QfTabbar />
  </div>
</template>

<script>
  import { QfTabbar } from '@/components'
  import FindNavbar from './components/FindNavbar.vue'
  import FindLeft from './components/FindLeft.vue'
  import FindRight from './components/FindRight.vue'
  import { mapActions } from 'vuex'
  export default {
    components: { FindNavbar, FindRight, FindLeft, QfTabbar },
    mounted () {
      // 先调接口
      this.getCates()
    },
    methods: {
      ...mapActions('good',['getCates'])
    }
  }
</script>

<style lang="scss" scoped>
  .scroll::-webkit-scrollbar {
    display: none;
  }
</style>

<style>
  .van-grid { background-color: white; }
  .van-grid-item__content.van-grid-item__content--center {
    background-color: white;
  }
</style>

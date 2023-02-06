<template>
  <div class='not-data' v-if='show'>
    <img :src='not' alt="暂无数据" />
    <div>暂无数据</div>
  </div>
</template>

<script>
  import not from '@/assets/not.png'
  export default {
    props: {
      show: { type: Boolean, default: false }
    },
    data () {
      return {
        not
      }
    }
  }
</script>

<style lang="scss" scoped>
  .not-data {
    img {
      display: block;
      width: 4.67rem;
      height: 4.67rem;
      margin: .4rem auto;
    }
    font-size: .45rem;
    color: #aaaaaa;
    text-align: center;
  }
</style>

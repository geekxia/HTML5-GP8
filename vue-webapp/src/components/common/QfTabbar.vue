<template>
  <van-tabbar active-color='#ff0000' inactive-color='#8b8b8b' route>
    <van-tabbar-item to='/home'>
      <template #icon='scope'>
        <img :src='`/icon/home${scope.active?"-on":""}.png`' />
      </template>
      首页
    </van-tabbar-item>
    <van-tabbar-item to='/find'>
      <template #icon='scope'>
        <img :src='`/icon/find${scope.active?"-on":""}.png`' />
      </template>
      分类
    </van-tabbar-item>
    <van-tabbar-item to='/cart'>
      <template #icon='scope'>
        <img :src='`/icon/cart${scope.active?"-on":""}.png`' />
      </template>
      购物车
    </van-tabbar-item>
    <van-tabbar-item to='/user' dot>
      <template #icon='scope'>
        <img :src='`/icon/user${scope.active?"-on":""}.png`' />
      </template>
      <div v-text='(isLogin?"我的":"未登录")'></div>
    </van-tabbar-item>
  </van-tabbar>

  <!-- <router-link to='/home' active-class='on'>首页</router-link> -->
  <!-- to跳转到名字叫index的那条路由规则中去 -->
  <!-- <div class='tabbar'>
    <router-link :to='{ name: "index" }' active-class='on'>首页</router-link>
    <router-link to='/find' active-class='on'>品类</router-link>
    <router-link to='/user' active-class='on'>我的</router-link>
  </div> -->
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('user', ['isLogin'])
    }
  }
</script>

<style lang="scss" scoped>
</style>

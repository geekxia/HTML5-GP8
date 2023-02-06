<template>
  <div class='login'>
    <van-nav-bar
      :title='`京东${isLogin?"登录":"注册"}`'
      left-arrow
      @click-left='$router.back()'
    />

    <LoginForm />
    <span
      class='tip'
      v-if='isLogin'
      @click='$router.replace("/regist")'>
      没有账号？立即注册
    </span>
    <span
      class='tip'
      v-else
      @click='$router.replace("/login")'>
      已有账号，立即登录
    </span>
  </div>
</template>

<script>
  import LoginForm from './components/LoginForm.vue'
  export default {
    components: {
      LoginForm
    },
    computed: {
      // 用于判断是不是登录页
      isLogin () {
        return this.$route.path === '/login'
      }
    },
    mounted () {
      console.log('--$route', this.$route)
    }
  }
</script>

<style lang='scss' scoped>
  .tip {
    display: block;
    font-size: .37rem;
    box-sizing: border-box;
    padding: .4rem .4rem;
  }
</style>

<template>
  <div class='login-form'>
    <div>
      <input
        type="text"
        placeholder='用户名/手机/邮箱'
        @blur='uClear=false'
        @focus='uClear=true'
        v-model.trim='username'
      />
      <img
        class='clear'
        v-show='uClear'
        src="/icon/clear.png"
      />
    </div>
    <div>
      <input
        type='password'
        placeholder='请输入密码'
        v-model.trim='password'
      />
      <span v-if='isLogin' class='forget'>忘记密码</span>
    </div>
    <div v-if='!isLogin'>
      <input
        type='password'
        placeholder='请确认密码'
        v-model.trim='password2'
      />
    </div>
    <span
      class='button'
      v-text='`${isLogin?"登录":"注册"}`'
      @click='submit'
    >
    </span>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        uClear: false,
        username: '',
        password: '',
        password2: ''
      }
    },
    computed: {
      // 用于判断是不是登录页
      isLogin () {
        return this.$route.path==='/login'
      }
    },
    methods: {
      ...mapActions('user', ['regist', 'login']),
      submit () {
        const data = {
          username: this.username,
          password: this.password
        }
        // 用户业务逻辑：表单校验
        if (!this.isLogin) {
          if (this.password === this.password2) {
            this.regist(data) // 提交注册接口
          }
        } else {
          this.login(data) // 提交注册接口
        }
      }
    }
  }
</script>

<style lang='scss'>
  // 去掉navbar的border样式
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
</style>

<style lang="scss" scoped>
  .login-form {
    &>div {
      height: 1.6rem;
      border-bottom: .03rem solid #eee;
      width: 9.33rem;
      margin: 0 auto;
      position: relative;
      &>input {
        border: none;
        font-size: .4rem;
        padding-left: .27rem;
      }
      .clear {
        position: absolute;
        top: .53rem;
        right: .13rem;
        width: .53rem;
        height: .53rem;
      }
      .forget {
        font-size: .37rem;
        color: #dddddd;
        position: absolute;
        top: .53rem;
        right: 0;
        line-height: .53rem;
        padding: 0 .4rem;
        border-left: .05rem solid #dddddd;
      }
    }
    .button {
      display: block;
      height: 1.33rem;
      width: 9.33rem;
      margin: auto;
      border-radius: .67rem;
      background-color: #f63515;
      color: white;
      text-align: center;
      line-height: 1.33rem;
      font-size: .43rem;
      margin-top: .53rem;
    }
  }
</style>

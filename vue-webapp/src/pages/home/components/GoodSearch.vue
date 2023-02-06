<template>
  <!-- 搜索框 -->
  <van-search
    shape="round"
    background="#f63515"
    :placeholder='hot'
    show-action
    disabled
  >
    <template #action>
      <div
        v-if='!isLogin'
        @click='$router.push("/login")'
        style='color:white;'>
        登录
      </div>
    </template>
    <template #left>
      <img class='menu' src="/icon/menu.png" />
    </template>
  </van-search>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('user', ['isLogin']),
      // 这个热销推荐算法，研究公司需求
      hot () {
        const arr = ['古筝','鲁花花生油','欧普照明']
        return arr[Math.floor(Math.random()*arr.length)]
      }
    }
  }
</script>

<style lang="scss" scoped>
.menu {
  display: inline-block;
  width: .67rem;
  height: .67rem;
  padding-right: .33rem;
}
</style>

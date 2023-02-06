<template>
  <div>
    <h1>个人主页</h1>

    <!-- 二级菜单 -->
    <router-link to='/user/ask'>问答</router-link>
    <router-link to='/user/article'>文章</router-link>
    <router-link to='/user/video'>视频</router-link>

    <!-- 显示二级菜单URL所匹配成功的组件 -->
    <router-view></router-view>

    <QfTabbar />
  </div>
</template>

<script>
  import { QfTabbar } from '@/components'

  export default {
    components: {
      QfTabbar
    }
  }
</script>

<style lang="css" scoped>
</style>

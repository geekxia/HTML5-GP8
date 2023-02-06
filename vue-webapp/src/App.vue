<template>
  <div id="app">
    <!-- 视图容器，是vue-router这个插件给的 -->
    <!-- 当url满足某一条路由规则时，那个对应的组件就会在这里显示 -->
    <router-view name='default'></router-view>
    <router-view name='ningyu'></router-view>
    <keep-alive>
      <router-view name='alive'></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    watch: {
      // $route (to, from) {
      //   console.log('from', from)
      //   console.log('to', to)
      // }
    },
    mounted () {
      console.log('--app $route', this.$route)
      console.log('--app $router', this.$router)
    }
  }
</script>

<style lang='scss'>
  html, body { padding: 0; margin: 0; }
  .tabbar {
    position: fixed; bottom: 0;
    &>a {
      text-decoration: none;
      color: black;
      display: inline-block;
      padding: 5px 15px;
    }
    &>a.on { color: red; }
  }
</style>

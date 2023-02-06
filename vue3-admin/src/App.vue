<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        active-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>商品管理</span>
          </template>

          <el-menu-item v-for='item in routes' :key='item.id' :index='item.id+""'>
            <router-link :to='item.path' custom v-slot="{ navigate}">
              <span @click='navigate'>{{item.text}}</span>
            </router-link>
          </el-menu-item>

        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import { routes } from '@/router'
  import { reactive } from 'vue'
  const locale = reactive({
    name: 'zh-cn',
    el: {}
  })
</script>

<style lang="scss">
html, body {
  height: 100%; width: 100%; overflow: hidden;
  padding: 0; margin: 0;
}
#app {
  width: 100%; height: 100%;
  &>.el-container {
    height: 100%;
  }
  .el-aside {
    .el-menu {
      height: 100%;
      overflow: scroll-y;
    }
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
  }
  .el-main {
    width: 100%;
    height: 100%;
    &>div {
      // 页面
      min-width: 1000px;
    }
  }
}

</style>

<script setup>
  import { ref } from 'vue'
  import ChildC from '@/components/ChildC.vue'
  let bol = ref(true)
  let day = ref(true)
  let bol2 = ref(true)
  let bol3 = ref(true)
</script>

<template>

  <!-- 单一元素执行动画 -->
  <transition name='gp'>
    <h1 v-if='bol'>我是可有可无的人</h1>
  </transition>
  <button @click='bol=!bol'>切换</button>
  <hr>

  <!-- 对多节点执行动画，不用加key了 -->
  <transition name='gp' mode='out-in'>
    <h1 v-if='day'>我是白天</h1>
    <h1 v-else>我是黑夜</h1>
  </transition>
  <button @click='day=!day'>切换</button>
  <hr>

  <!-- 对自定义组件执行动画 -->
  <!-- 在vue3中，对一个子组件（子组件的根节点就是transition）进行显示与隐藏，不要使用v-if了，要用自定义属性实现。 -->
  <ChildC :show='bol2' />
  <button @click='bol2=!bol2'>切换</button>

  <!-- 穿梭框：把样式、视图结构、组件，向父组件视图中穿梭 -->
  <teleport to='head'>
    <!-- <link rel="stylesheet" href="https://unpkg.com/browse/animate.css@4.1.1/source/animate.css"> -->
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css"
  />

  </teleport>
  <!-- 使用第三方css动画库 -->
  <transition
    enter-active-class='animate__animated animate__backInDown'
    leave-active-class='animate__animated animate__backOutLeft'
    mode='out-in'
  >
    <h1 v-if='bol3'>我是太阳</h1>
    <h1 v-else>我是月亮</h1>
  </transition>
  <button @click='bol3=!bol3'>切换</button>

  <teleport to='#hehe'>
    <div>插入到App视图中</div>
  </teleport>

</template>


<style>
  .gp-enter-from {
    color: red;
    opacity: 0;
  }
  .gp-enter-active {
    transition: all 2s ease;
  }
  .gp-enter-to {
    color: blue;
    opacity: 1;
  }

  .gp-leave-from {
    color: blue;
    opacity: 1;
  }
  .gp-leave-active {
    transition: all 2s ease;
  }
  .gp-leave-to {
    color: red;
    opacity: 0;
  }
</style>

<script setup>
  import { ref, reactive } from 'vue'
  import ChildA from '@/components/ChildA.vue'
  const box = ref(1212)
  const child = ref(null)
  const arr = reactive([1,2,3,4])

  const changeColor = () => {
    box.value.style.color = 'red'
  }

  const visitChild = () => {
    console.log('----child', child.value)
  }

  const refs = []
  const collectRef = ref => {
    if (ref) refs.push(ref)
  }
  const visitRefs = () => {
    console.log('---循环手动收到的ref对象', refs)
  }

</script>

<template>

  <h1>测试ref变化</h1>
  <div ref='box'>一行文字</div>
  <button @click='changeColor'>修改</button>
  <hr>

  <ChildA ref='child' />
  <button @click='visitChild'>访问孩子</button>
  <hr>

  <div v-for='item in arr' v-text='item' :ref='collectRef'></div>
  <button @click='visitRefs'>访问循环中的ref们</button>

</template>

<style lang="css" scoped>
</style>

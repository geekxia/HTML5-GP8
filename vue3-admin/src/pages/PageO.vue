<script setup>
  import { ref, reactive, useCssModule } from 'vue'
  let num = ref(100)
  let abc = ref(true)
  let cc = ref('red')
  let theme = reactive({
    color: 'green',
    fontSize: '50px'
  })

  const $style2 = useCssModule()  // 返回module=default那个style中的class类名
  const qf2 = useCssModule('qf')
  console.log('----$style2', $style2)
  console.log('----qf2', qf2)

  const add = () => {
    num.value++
  }
  const changeColor = () => {
    // cc.value = 'blue'
    theme.color = 'blue'
    theme.fontSize = '60px'
  }
</script>

<template>
  <!-- 用响应式变量控制一段视图结构是否参与更新阶段 -->
  <div v-memo='[abc]'>
    <h1 v-text='num'></h1>
  </div>

  <h1 v-text='num'></h1>

  <button @click='add'>自增</button>
  <button @click='abc=!abc'>切换</button>
  <hr>

  <h1 class='box'>使用v-bind实现动态样式</h1>
  <button @click='changeColor'>改变</button>
  <hr>

  <!-- 这些样式来 module='default'那个style标签 -->
  <h1 :class='$style.aa'>第一行文字</h1>
  <h1 :class='$style.bb'>第二行文字</h1>
  <h1 :class='$style.cc'>第三行文字</h1>
  <h1 :id='$style.dd'>第四行文字</h1>
  <hr>

  <h1 :class='qf.aa'>第一行文字</h1>
  <h1 :class='qf.bb'>第二行文字</h1>
  <h1 :class='qf.cc'>第三行文字</h1>

</template>

<style scoped>
  .box {
    color: v-bind('theme.color');
    font-size: v-bind('theme.fontSize')
  }
</style>

<style module>
  .aa { color: red; }
  .bb { color: blue; }
  .cc { color: green; }
  #dd { color: red; }
</style>

<style module='qf'>
  .aa { color: purple; }
  .bb { color: pink; }
  .cc { color: yellow; }
</style>

<script setup>
  import ChildD from '@/components/ChildD.vue'
  const handle = (a,b,c,ev) => {
    console.log('---', a,b,c)
    console.log('---ev', ev)
  }
</script>

<template>
  <div id='red' :id='("blue")'>不负当下</div>
  <div :title='("hello")' title='world'>不畏未来</div>
  <button @click='handle(1,2,3,$event)'>点击</button>
  <hr>

  <ChildD :a='100' :b='[6,7,8]' :c='{id:1,age:20,name:"李四"}' />
</template>

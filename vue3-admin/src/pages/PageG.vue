<script setup>
  import { ref, isRef, unref, customRef, onRenderTracked, onRenderTriggered, reactive, toRef, toRefs, shallowRef, triggerRef, readonly, isReadonly, isReactive, isProxy, toRaw, markRaw, shallowReactive, shallowReadonly, computed, watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'
  let bol = ref(false)
  let num = ref(100)

  console.log('---bol', bol.value)
  console.log('---num', num.value)

  let a = 100

  const add = () => {
    num.value++
  }

  console.log('---bol is ref ', isRef(bol))
  console.log('---a is ref', isRef(a))

  console.log('---unref num', unref(num))
  console.log('---unref a', unref(a))

  const name = customRef((track, trigger)=>{
    let value = '张三'
    return {
      get () {
        track()  // 触发Vue3中 renderTracked()
        return value
      },
      set (newVal) {
        value = newVal
        trigger()  // 触发Vue3中 renderTriggered()
      }
    }
  })

  onRenderTracked(()=>{
    console.log('有变量被跟踪了')
  })

  onRenderTriggered(()=>{
    console.log('有变量变化了')
  })

  let user = reactive({ name:'张三',age:20, info: { city: '深圳'}})
  let userAge = toRef(user, 'age')
  let user2 = toRefs(user)
  console.log('---user age', user.age)
  console.log('---userAge age', userAge.value)
  console.log('---user2 age', user2.age.value)

  let aa = shallowRef({a:1,b:2,c:{d:{e:3}}})
  console.log('---aa', aa)
  const changeAA = () => {
    // aa.value = {a:100,b:200,c:{d:{e:300}}}  // 视图自动更新
    aa.value.c.d.e++
    triggerRef(aa)  // 强制更新shallowRef对应的视图
  }

  let list = reactive([
    { id: 1, name: '张三', age: 10 },
    { id: 2, name: '李四', age: 20 }
  ])
  const changeList = () => {
    // list[1].name = '李四四'
    list.push({id:Date.now(),name:'王五',age:30})
  }

  let bb = readonly(ref(100))
  const changeBB = () => {
    bb.value++
  }
  console.log('---bb is readonly', isReadonly(bb))

  console.log('---list is reactive', isReactive(list))
  console.log('---bb is readonly', isReactive(bb))

  console.log('---1', isProxy(reactive({a:1})))
  console.log('---2', isProxy(readonly({b:2})))

  let c1 = { a:1 }
  let c2 = reactive(c1)

  let d1 = { b: 2 }
  let d2 = readonly(d1)
  console.log('---is equal', c1 === toRaw(c2))
  console.log('---is equal', d1 === toRaw(d2))

  const changeCC = () => {
    c2.a++
  }

  let e1 = markRaw({ e: 100 })
  let e2 = reactive(e1)
  const changeEE = () => {
    e2.e++
  }

  let ff = shallowReactive({ a: { b: { c: 1 }}, e: 2 })
  const changeFF = () => {
    ff.e++
    ff.a.b.c++
  }

  let gg = ref(100)
  const ggTotal1 = computed(()=>{
    // do something
    return gg.value * 100
  })
  const ggTotal2 = computed({
    get () {
      // do something
      return gg.value * 100
    },
    set (val) {
      gg.value = Number(val) / 100
    }
  })

  const stop1 = watch(gg, (newGG, oldGG)=>{
    console.log('---gg changed', newGG, oldGG)
  })
  const stop2 = watch([ggTotal1, ggTotal2], ([newGGT1, newGGT2], [oldGGT1, oldGGT2])=>{
    console.log('---total changed', [newGGT1, newGGT2], [oldGGT1, oldGGT2])
  })

  const hh = reactive({ a:1, b:2 })
  const stop3 = watch(()=>hh.a, (newA, oldA)=>{
    console.log('---hh a changed', newA, oldA)
  })

  const stopAll = () => {
    stop1()
    stop2()
    stop3()
  }

  let ii = ref(100)
  const stop4 = watchEffect(()=>{
    console.log('---watch effect post', ii.value)
  }, {flush:'post'})
  const stop5 = watchEffect(()=>{
    console.log('---watch effect sync', ii.value)
  }, {flush:'sync'})
  const stop6 = watchEffect(()=>{
    console.log('---watch effect pre', ii.value)
  })

  const stopWatchEffect = () => {
    stop4()
    stop5()
    stop6()
  }




</script>

<template>
  <h1>学习组合API</h1>

  <hr>
  <h1 v-text='num'></h1>
  <button @click='add'>自增</button>

  <hr>
  <h1 v-if='bol'>我是一个可有可无的人</h1>
  <button @click='bol=!bol'>显示与隐藏</button>

  <hr>
  <h1 v-text='name'></h1>
  <button @click='name="李四"'>改名</button>

  <hr>
  <h1 v-text='user.age'></h1>
  <h1 v-text='userAge'></h1>
  <h1 v-text='user2.age'></h1>

  <hr>
  <h1 v-text='aa.a'></h1>
  <h1 v-text='aa.b'></h1>
  <h1 v-text='aa.c.d.e'></h1>
  <button @click='changeAA'>更新</button>

  <hr>
  <div v-for='item in list'>
    <h1 v-text='item.name'></h1>
  </div>
  <button @click='changeList'>更新</button>

  <hr>
  <h1 v-text='bb'></h1>
  <button @click='changeBB'>更新</button>

  <hr>
  <h1 v-text='c1.a'></h1>
  <h1 v-text='c2.a'></h1>
  <button @click='changeCC'>更新</button>

  <hr>
  <h1 v-text='e2.e'></h1>
  <button @click='changeEE'>更新</button>

  <hr>
  <h1 v-text='ff.a.b.c'></h1>
  <h1 v-text='ff.e'></h1>
  <button @click='changeFF'>更新</button>

  <hr>
  <input type="text" v-model='gg' />
  <h1 v-text='ggTotal1'></h1>
  <input type="text" v-model='ggTotal2' />

  <hr>
  <input type="text" v-model.number='hh.a' />
  <hr>

  <button @click='stopAll'>停止掉所有的Watch监听</button>
  <hr>

  <h1 v-text='ii'></h1>
  <button @click='ii++'>自增</button>
  <button @click='stopWatchEffect'>停止所有的WatchEffect</button>

</template>

<style lang="css" scoped>
</style>

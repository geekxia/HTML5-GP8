import { defineComponent, ref, computed, watch } from 'vue'

// 参考文档：https://github.com/vuejs/babel-plugin-jsx#installation
export default defineComponent((props) => {

  const num = ref(1)
  const add = () => {
    num.value++
  }

  // 监听器
  watch(num, ()=>{
    console.log('---num changed', num.value)
  })

  // 计算属性
  const total = computed(()=>(num.value*1000))

  return () => (
    <div>
      <h1>页面组件C</h1>
      <h1>{ num.value }</h1>
      <button onClick={add}>自增</button>
      <h1>{ total.value }</h1>
    </div>
  )
})

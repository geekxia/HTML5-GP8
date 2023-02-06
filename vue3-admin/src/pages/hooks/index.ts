import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue'

function fetchList(query='') {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const response = [
        { id: 1, name: '张三', age: 10 },
        { id: 2, name: '李四', age: 20 },
        { id: 3, name: '王五', age: 30 },
        { id: 4, name: '赵六', age: 40 }
      ]
      if (query) {
        resolve(response.filter(ele=>ele.name===query))
      } else {
        resolve(response)
      }
    },200)
  })
}

export function useList () {
  let list = ref([])
  onMounted(()=>{
    fetchList().then(res=>{
      console.log('---res', res)
      list.value = res
    })
  })
  return list
}

export function useFilter(list) {
  let sort = ref(false)

  const filter = () => {
    sort.value = true
  }

  const list2 = computed(()=>{
    if (sort.value) {
      return list.value.filter(ele=>ele.age>10)
    } else {
      return list.value
    }
  })
  return [list2, filter]
}

export function useQuery(list) {
  let query = ref('')
  let list2 = ref([])
  const search = () => {
    query.value = '张三'
  }
  watch(query, ()=>{
    fetchList(query.value).then(res=>{
      console.log('---res', res)
      list2.value = res
    })
  })
  return [list2, search]
}

export function useCounter (arg=0) {
  let num = ref(arg)
  const add = () => {
    num.value++
  }
  return [num, add]
}

export function useTodo(arg=[]) {
  let todo = ref(arg)
  let list = ref([])
  const confirm = () => {
    list.value.push({id:Date.now(), task:todo.value})
    todo.value = ''
  }
  return { todo, list, confirm }
}

export function useGlobal (key) {
  const app = getCurrentInstance()
  return app.appContext.config.globalProperties[key]
}

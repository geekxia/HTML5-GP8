// 学习目标：熟练使用所有的Hooks，掌握Hooks编程技巧。

// 1、关于React(v16.8)之后，你完全可以不再使用类组件了。
  // - 关于类组件：你可以不用，React官方并非打算废弃类组件。
  // - Hooks API 只能用到函数式组件中，不能在类组件中使用。
  // - 函数式组件除了有props以外，其它特性都没有。自React(16.8)后，使用Hooks可以模拟这些缺失的特性。


// 2、useState()

  // - 作用：用于定义声明式变量。
  // - 特点：这些被useState()定义的变量，当它们被set*时，这会触发整个函数式组件重新执行。
  // - 理解：当`const [num, setNum] =useState()`工作时，向React底层中访问num，如果有值就返回num最新值，如果没有就在React底层声明一个num并赋初始值。

  // - 语法：const [xx, setXx] = useState(1)
  // - 语法细节1：声明式变量命名只要符合JS变量规则即可，后边这个set方法建议用set开头。setXx是修改xx的专属方法。
  // - 语法细节2：使用数组解析。为什么使用数组解构而不是对象解构？因为数组解析通过下标索引来实现的。
  // - 语法细节3：定义声明式变量建议用const关键字，不要用var/let。
  // - 语法细节4：useState(initValue)一定要给初始值。
  // - 语法细节5：setXx是修改xx的专属方法，但它没有callback回调函数。它的标准语法有两种：setXx(新值)、setXx(xx=>(新值))。setXx()是React18中永远都是异步的；如果是React17，在合成事件中是异步的，在宏任务或.then()是同步的。在同一个局部作用域中，如果出现多次set*，也遵从合并性，只触发一次重新执行。

// 2、useEffect()

// - 作用：用于执行副作用（定时器、调接口、DOM操作、BOM操作、表单初始化、订阅）。
// - 特点：相当于类组件中的componentDidMount()/componentDidUpdate()/componentWillUnmount()
// - 语法：useEffect(()=>{ return ()=>{}}, [依赖数组])
// - useEffect(()=>{ fn1(); return ()=>{ fn2();}}, [依赖])。
  // - 当没有依赖数据时。初始化时，只执行fn1()；当set*操作时，fn2()先执行，fn1()后执行，如此循环；当路由切换时，只执行fn2()。
  // - 当依赖数组为空数组时。初始化时，只执行fn1()；当set*操作时，fn1()和fn2()都不执行；当路由切换时，只执行fn2()。
  // - 当依赖数组中有依赖时。初始化时，只执行fn1()；当set*操作与依赖有关时，先执行fn2()，再执行fn1()；当set*操作与依赖完全无关时，fn1()和fn2()都不执行；当路由切换时，只执行fn2()。
// - 两个使用原则：原则上一个useEffect只做一件事, 在同一个函数式组件中可以同时使用多个useEffect, 灵活地使用依赖数组。
// - 关于副作用：副作用又分为两种, 一种是需要清除的,一种是不需要清除。需要清除的副作用一定要手动清除。

// 3、useContext()
// - 作用: 在函数式组件使用上下文数据.
// - 语法: const theme = useContext(ThemeContext)  这个参数是上下文对象,不是Consumer.

// 4、useMemo()
// - 作用: useMemo() 相当于Vue中的计算属性, 专门用于缓存一些复杂运算的, 为了性能优化.
// - 语法: const result = useMemo(computeExpensiveValue, [依赖数组])
// - 理解: useMemo()最重要的目标是为了优化复杂运算, 不是为了简化JSX表达式的写法.
// - 它的"依赖数组"的特点和useEffect完全一致.

// 5、useCallback()
// - 作用: 用于缓存一个函数声明.
// - 语法: const fn = useCallback(fn, [依赖数组])
// - 可以用useMemo()替代: const fn = useMemo(()=>{ fn }, [依赖数组])
// - 注意: 事实上, 工作中useCallback()很少用.

// 6、useLayoutEffect()
  // - 作用：和useEffect一样，用于执行各种副作用。
  // - 区别：比useEffect()执行时机更早，它是同步执行的。
  // - 语法：useLayoutEffect(()=>{fn1();return{ fn2();}}, []) 它的执行流程和useEffect()
  // - useLayoutEffect()同步执行，在useEffect()之前，在DOM渲染完成之后。

// 7、useRef()
  // - 作用：在函数式组件中创建一个引用，它可以引用一个DOM，也可以引用一个变量。
  // - 语法：const ref = useRef(null)  创建一个引用。那该怎么方法这个被引用的对象呢？用ref.current访问。
  // - 与ref相关的“坑”：高阶组件、类组件、ref转发、useImperativeHandle()。

// 8、useReducer()
// - 作用：在函数式组件中模拟Redux数据流，完全替代useState()。
// - 语法：const [state, dispatch] = useReducer(reducer, initState)
// - 在实际开发中很少使用useReducer()，用得最多的是它的第二个参数dispatch()，这个dispatch()相当于forceUpdate()。

// 9、useId()
// - 作用：用于创建一个唯一标识。这个标识在整个函数式组件运行过程中，都不会发生变化。
// - 语法：const id = useId()
// - 这个useId()用于生成唯一标识，不要用它做一些不擅长的事。

// 10、useDeferredValue
// - 作用：实现类似防抖节流的功能。
// - 它与防抖节流的区别在于：它会看浏览器的“脸色”，延迟时间是不确定的；而防抖节流的延迟时间是固定的。

// 11、useTransition()
// - 作用：用于标记可以中断的commit行为。在V17中，commit提交DOM更新是一次性、是不可中断的；在V18中，commit提交默认是一次的，也是不中断的，但是我们可以使用startTranstion人为地添加“中断标记”，当commit阶段比较忙时，可以优先中断这些被添加过“标记”的行为。

// 12、自定义Hooks
// - 在React中支持用户自己封装Hooks。自定义Hooks本质上是一种逻辑的复用，在某种程序上自定义封装Hooks可以代替传统高阶的作用。
// - 语法：自定义Hooks本质就是一个函数，使用已有Hooks封装可复用的功能逻辑。
// - 原则1：自定义Hooks的函数名必须以use*开头。
// - 原则2：自定义可复用，并且彼此之间是完全独立的。
// - 原则3：自定义Hooks和已有的Hooks一样，都只能用函数式组件的顶层作用域。
// - 第三方库：react-use、ahooks

// 13、React(V18)和React(V17)的变化
// （1）并发模式变化：在V17时，提交更新是不可中断的、同步的；在V18中，提交更新可以人为地使用startTransition把一个更新行为标记为可中断的，当浏览器比较忙，提交更新就可以被中断的。
// （2）batch变化：在v17中，setState()在合成事件是异步的，在宏任务和.then中是同步；在V18中，无论在哪里都是异步的，在同一个作用域调用set*操作，只触发一次re-render。
// （3）新增了Transtion：提供了startTranstion、useTransition这两个API，支持用户自主标记“可中断的”更新行为。
// （4）<Suspense>在客户端和服务端渲染中，更加健状了。
// （5）在V18中，挂载React组件的方式及其API发生了变化。
// （6）React(v18)在SSR服务端渲染（Next.js）这一块下了功夫，预示着SSR会比较重要。
//  (7) React(V18)严格模式发生了一些变化。

import { useState, useReducer, useEffect, useContext, useMemo, useCallback, useLayoutEffect, useRef, useId, useDeferredValue, useTransition } from 'react'
import ThemeContext from '@/utils/theme'

/* 用useReducer实现TodoList --start */
const initState = {
  todo: '',
  list: []
}
const reducer = (state, {type,payload}) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (type) {
    case 'todo':
      newState.todo = payload
      break
    case 'add':
      newState.list.push({id:Date.now(),task:newState.todo})
      newState.todo = ''
      break
    default:
  }
  return newState
}
const TodoList = props => {
  const [state, dispatch] = useReducer(reducer, initState)
  const confirm = (ev) => {
    // 监听键盘enter事件
    if (ev.keyCode === 13) {
      dispatch({type:'add',payload:''})
    }
  }
  return (
    <>
      <input
        type="text"
        placeholder='请输入任务'
        value={state.todo}
        onChange={ev=>dispatch({type:'todo',payload:ev.target.value})}
        onKeyUp={confirm}
      /><br/>
      <div>
        {
          state.list.map(ele=>(
            <div key={ele.id}>{ ele.id } - { ele.task }</div>
          ))
        }
      </div>
    </>
  )
}
/* 用useReducer实现TodoList --end */

const StudyHooks = React.memo(
    props => {

    // console.log('---start')

    const [num, setNum] = useState(0)
    const [bol, setBol] = useState(true)
    const [name, setName] = useState('')
    const [list, setList] = useState([])
    const [user, setUser] = useState(null)

    const [text, setText] = useState('')
    const deferredText = useDeferredValue(text)

    const [isPending, startTransition] = useTransition()

    const theme = useContext(ThemeContext)
    // console.log('---theme', theme)

    const box = useRef(null)
    const foo = useRef([1,2,3,4])

    const id1 = useId()
    const id2 = useId()
    // console.log('---ids', id1, id2)

    // 测试useState()流程
    // const add = useCallback(
    //   () => {
    //     setNum(num+1)
    //   },
    //   [num]
    // )

    const add = useMemo(() => {
      return () => {
        setNum(num+1)
        console.log('---box', box)
        console.log('---foo', foo)
      }
    }, [num])

    useEffect(() => {
      // do something
      // 相当于类组件中的componentDidMount()
      // 在这里用于执行各种副作用
      console.log('1----', num)

      return () => {
        // do something
        // 相当于类组件中的componentWillUnmount()
        console.log('2----', num)
      }
    }, [num]) // 相当于类组件中的componentDidUpdate()

    useLayoutEffect(() => {
      console.log('3----', num)
      return () => {
        console.log('4----', num)
      }
    }, [num])

    // useEffect(() => {
    //   console.log('---timer start')
    //   const timer = setInterval(() => {
    //     console.log('------timer num', num)
    //     setNum(num=>(num+1))
    //   }, 1000)
    //   return () => {
    //     clearInterval(timer)
    //   }
    // }, [])

    // useEffect(() => {
    //   console.log('---timer start')
    //   const timer = setTimeout(() => {
    //     setNum(num+1)
    //   }, 1000)
    //   return () => {
    //     console.log('---timer end')
    //     clearTimeout(timer)
    //   }
    // }, [num])

    const total = useMemo(() => {
      // do something
      console.log('---重新执行了')
      return num * 10 + 1 + 1 // 图表 echarts bizchart
    }, [num])

    useEffect(() => {
      console.log('---异步调接口', deferredText)
    }, [deferredText])

    const search = (ev) => {
      console.log('-----text change')
      setText(ev.target.value)
    }

    const addLargeList = () => {
      startTransition(() => {
        setList(Array(30).fill(1))
      })
    }

    // console.log('---end')

    return (
      <div>
        <h1 id='box'>学习 Hooks API</h1>
        <h1 ref={box}>{ num }</h1>
        <button onClick={add}>自增</button>
        <hr/>
        <h1>{ total }</h1>
        <hr/>
        <TodoList />
        <hr/>

        搜索：<input type="text" value={text} onChange={search} />
        <hr/>

        <button onClick={addLargeList}>添加大的DOM列表</button>
        <h1>{ isPending ? '等待' : '完成'}</h1>

        <div>
        {
          list.map(ele=>(
            <h1 key={Math.random()}>{ele}</h1>
          ))
        }
        </div>
        <hr/>

        <h1>{ name }</h1>
        <input type="text" value={name} onInput={ev=>setName(ev.target.value)} />
      </div>
    )
  }
)


export default StudyHooks

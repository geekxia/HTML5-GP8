// 学习目标：学习类组件的生命周期流程、以及生命周期背后的渲染流程、Fiber架构。

// 1、常用生命周期钩子
  // - 常识：生命周期钩子也算是合成事件。
  // - 生命周期的三个阶段
    // - 装载阶段[3]：constructor() / render() / componentDidMount()
    // - 更新阶段[2]：shouldComponentUpdate() / render() / componentDidUpdate()
    // - 卸载阶段[1]：componentWillUnmount()

// 2、render()
  // - 所有类组件都必须要用这个钩子，它可以返回JSX，也可以返回null/undefined
  // - 执行它可以生成Fiber，在装载阶段和更新阶段都有

// 3、shouldComponentUpdate(_, newState)
  // - 面试官爱问，它返回true，正常更新；返回false，停止更新。
  // - forceUpdate()越过这个“开头”，这会导致你在这里做的优化白做的。
  // - 因为这个优化比较，工作中很少用，后来React新增了PureComponent解决类似的优化问题。
  // - PureComponent用在类组件中，函数式组件中新增了React.meno()来解决类似的优化问题。
  // - 总结：以上讨论的这些技术点，都是为了减少没有必要的re-render

// 4、componentDidUpdate()
  // - 它相当于this.setState()的callback
  // - 它相当于vue的watch
  // - 这个生命在React类组件开发中用得非常多

// 5、组件渲染的两个阶段
  // - render阶段：工作目标是根据JSX生成一棵Fiber树，这个过程是异步的，是没有副作用的。它随时可以被停止、中断和重启。这个工作要看浏览器主线程的“脸色”，当浏览器比较忙时，render阶段就暂停；当浏览器主线程空闲时，render阶段继续执行。直到生成一棵完整的Fiber。
  // - commit阶段：工作目标是提交Fiber树，生成真实的DOM结构，这个过程在V17中是同步的、不可中断的；在V18中默认也是同步的、默认也是不中断的，但是在V18中我们使用starTransition打标记，在commit提交更新DOM时，如果遇到浏览器主线程比较忙时，这个被标记的业务可被优先停止掉。

// 6、Fiber架构
  // - 自React(V16)集成了Fiber架构（花了两年时间）
  // - 协调运算

export default class Modal extends React.Component {
  // constructor()
  // 这是构造器函数（<Home/>、继承时给子组件用的）
  // super(props)  // 调用父类的构造器函数（面向对象）
  // super() 这行代码约定是constructor的第一行
  // 在constructor可以做哪些事儿？定义state、初始化工作
  // 在constructor不建议做哪些事儿？不要调用this.setState()、也不要做各种副作用（业务逻辑）
  // 不要修改props，不要把props和state交叉赋值
  constructor (props) {
    super(props)
    this.state = {
      num: 1,
      count: 1
    }
    this.apply = this.apply.bind(this)
    console.log('----constructor')
  }

  // componentDidMount()
  // 表示组件第一次渲染完成，相当于Vue中的mounted()
  // 在这里可以编写各种业务逻辑（DOM、BOM、调接口。。）
  // 在这里也可以使用this.setState()
  componentDidMount () {
    console.log('----componentDidMount')
    this.apply()
    setInterval(()=>{
      // console.log('----timer')
    }, 1000)
  }

  // shouldComponentUpdate()
  // 在类组件的更新流程中，是一个开发，当它返回true时正常执行更新阶段，当它返回false时停止更新。
  // 作用：用于性能优化。当state上有10个声明式变量时，其中有一个变量完全不参与视图渲染，当这个变量被this.setState()时，我们就应该在这里阻止掉更新阶段。
  // 如果不定义这个生命周期，它默认是返回true。
  // 实际在类组件开发中，这个钩子很少用，因为它比较复杂。所以后来React新增了一个PureComponent做了类似的优化，淘汰了shouldComponentUpdate。
  // 这是一个面试题，所以很重要。
  shouldComponentUpdate (_, state) {
    console.log('----shouldComponentUpdate')
    console.log('----new state', state)
    console.log('----old state', this.state)
    if (state.count !== this.state.count) {
      return false
    } else {
      return true
    }
  }

  // componentDidUpdate()
  // 它表示更新已完成，相当于Vue中的updated()
  // 它还相当于 this.setState({}/fn, callback)的callback
  // 原则：在类组件开发中，很少使用this.setState()的callback，建议使用这个生命周期替代。
  // 理解：相当于vue中watch
  // 在这里是可以使用this.setState()进行声明式操作的，但必须有终止条件。
  componentDidUpdate (_, state) {
    console.log('----componentDidUpdate')
    console.log('----old state', state)
    console.log('----new state', this.state)
    // if (Math.random() < 0.1) {
    //   this.setState(state=>({num: state.num + 1}))
    // }
    if (state.num !== this.state.num) {
      console.log('-----当num变化，我们做另一个事')
      this.setState({age})
    }
    if (state.age !== this.state.age) {
      console.log('-----当age变化，我们做另一个事')
    }
  }

  // componentWillUnmount()
  // 表示当前组件即将被销毁，相当于Vue中的beforeDestroy()
  // 在这里一般用于清除定时器、清除缓存、关闭长连接。。。
  // 在这里不使用this.setState()方法
  componentWillUnmount () {
    console.log('----componentWillUnmount')
  }

  // 业务方法（成员方法）
  apply () {
    console.log('---订阅websocket服务')
  }

  // render()
  // 这个钩子函数，必须要有return(jsx/null/undefined)
  // 无论是直接，还是间接，在render中都不能调用this.setState()
  // 每次执行render()都会重新生成一个Fiber树（双向链表结构）
  // 在render中return之前，理论可以做很多事，因为render会反复执行，所以在这里不建议写复杂的耗费性能的逻辑。
  // 有个习惯，一般我们习惯把render放在组件成员的最后一个。

  render () {
    console.log('----render')
    // do something 简单的数据处理
    const { num } = this.state
    return (
      <div>
        <h1>学习生命周期</h1>
        <h1>{ num }</h1>
        <button onClick={()=>this.setState(_=>({num:_.num+1}))}>自增</button>
        <div
          onMouseEnter={()=>this.setState(_=>({count:_.count+1}))}
          style={{height:'30px',border:'1px solid #ccc'}}
        />
      </div>
    )
  }
}

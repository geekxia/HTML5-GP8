// 学习目标：state特点、正确地操作state。

// 1、什么是state？
  // - 默认只有在类组件中才有state，函数式组件要使用Hooks来“模拟”state
  // - 特点：state变量被setState()修改时，组件会自动更新，这就是声明式

// 2、如何定义state？
  // - 在类组件中，使用成员属性 state = {} 来定义（不推荐，但是很多组件库文档是这么写的）
  // - 在类组件中，在contructor()这个生命周期中，使用 this.state = {} 来定义（推荐）

// 3、如何访问state？
  // - 在类组件中，使用this.state来访问这些声明式变量

// 4、如何修改state？
  // - 注意：不要直接修改state。因为你直接修改state，不会触发re-render，所以视图是不更新的。
  // - 原则：在React中，建议使用this.setState()这个专属方法来修改state。因为这个专属方法默认能够触发re-render。

// - 5、this.setState()两种语法
  // - this.setState({}, callback)  当新state与旧state无关时，新state不是由旧state计算而来时，建议用这种语法。
  // - this.setState((state,props)=>{return{}}, callback)  当新state是由旧state计算而来时，建议用这种语法。

// 6、this.setState()异步性
// - 在ReactV18中，任何情况下，this.setState()都是异步的。
// - 在ReactV17中，在合成事件（on*事件、生命周期钩子）中，this.setState()是异步的；在非合成事件（宏任务、.then()）是同步的。

// 7、关于this.setState()的自动合并问题
// - 在V17的合成事件、V18中，this.setState()是异步的，同一个函数域中出现多次this.setState()会自动合并，只执行一次re-render。
// - 在V17的非合成事件（宏任务、.then()），多个this.setState()都是同步的，React不会自动合并它们，这会触发多次re-render。
// - 注意：多个this.setState()自动合并，从上到下，进行浅合并（下面覆盖上面）。
// - 思考：为什么React存在“合成事件”这个说法？（其实就是为了解决多个this.setState()自动合并的问题）

// 8、关于state小结
  // - 修改state一定要用专属方法this.setState(两种语法)
  // - 注意this.setState()的异步性
  // - 要知道多个this.setState()是如何自动合并的

// 9、在函数中使用useState模拟State，它的相关玩法后面再说。

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      msg: 'Hello QF',
      count: 1000,
      list: [],
      num: 2000
    }
  }

  componentDidMount () {
    (new Promise(resolve=>{
      setTimeout(()=>{
        resolve('Hello GP9')
      }, 1000)
    })).then(msg => {
      console.log('----1',this.state.msg)
      this.setState({msg}, ()=>console.log('----2', this.state.msg))
      console.log('----3', this.state.msg)
    })
  }

  add () {
    // this.state.count++
    // console.log('---new count', this.state.count)
    // this.forceUpdate()

    console.log('----1', this.state.count)

    // this.setState((state,props) => {
    //   const newCount = (state.count + 1)
    //   return {
    //     count: newCount,
    //   }
    // }, ()=>console.log('----3', this.state.count))

    this.setState(state => ({
      count: state.count + 1
    }), ()=>console.log('----3', this.state.count))

    console.log('----2', this.state.count)
  }

  hello () {
    console.log('----1', this.state.msg)

    this.setState({
      msg: 'Hello World'
    }, ()=>console.log('----3', this.state.msg))

    console.log('----2', this.state.msg)
  }

  asyncAdd () {
    setTimeout(() => {
      console.log('----1', this.state.num)

      this.setState(state=>({
        num: state.num + 1
      }), ()=>console.log('----2', this.state.num))

      this.setState(
        {msg: 'Hello GP8'},
        ()=>console.log('----3', this.state.num)
      )

      console.log('----4', this.state.num)
    }, 2000)
  }

  combine () {
    console.log('----1')
    this.setState({
      msg: 'Hello GP10'
    }, ()=>console.log('----end state', this.state))
    console.log('----2')
    this.setState({
      msg: 'Hello GP11',
      count: 3000,
      list: [1,2]
    })
    console.log('----3')
    this.setState(state=>({
      num: 4000,
      count: 5000,
      list: [3,4]
    }))
    console.log('----4')
  }

  render () {
    console.log('----render')
    const { msg, count, num } = this.state
    return (
      <div>
        <h1>学习State</h1>
        <h1>{ count }</h1>
        <button onClick={()=>this.add()}>自增</button>
        <hr/>
        <h1>{ msg }</h1>
        <button onClick={()=>this.hello()}>问好</button>
        <hr/>

        <h1>{ num }</h1>
        <button onClick={()=>this.asyncAdd()}>异步自增</button>
        <hr/>

        <button onClick={()=>this.combine()}>合并</button>
      </div>
    )
  }
}

// 学习目标：灵活地给元素绑定事件、灵活使用事件对象、事件传参、事件委托等。

// 1、有哪些JS事件？
//   - 约定：在React不谈JS事件，我们谈合成事件。
//   - 什么是合成事件？包括生命生命周期钩子、以on*开头的系列事件属性。
//   - 原则：我们在绑定元素事件时，尽可能地使用React官方封装过的合成事件。

// 2、在类组件中使用ES5的方式绑定事件
  // - <div onClick={this.handler.bind(this, arg)} />
  // - 事件对象，永远都是事件处理器函数的最后一个参数
  // - 注意：不建议使用了。

// 3、在类组件中使用箭头函数的方式绑定事件
  // - <div onClick={(ev)=>this.handler(arg, ev)} />
  // - 一个待研究的问题：在React18中，用箭头函数绑定事件时，传递的事件对象如果不是最后一个参数，那么在handler中是取不到事件对象的。
  // - 约定：为了避免出现“取不到事件对象”的问题发生，咱们在传递事件对象时，建议把事件对象总是做为最后一个参数。

// 4、在函数式组件中绑定事件
  // - 在不需要用到自定义事件传参数时  <div onClick={handler} />
  // - 当你需要用到自定义参数时，<div onClick={(ev)=>handler(arg,ev)} />
  // - 注意：在函数式组件中，绑定事件没有ES5的说法，因为没有this

// 5、关于事件绑定的小结
  // - 无论是类组件、还是函数式组件，绑定事件都建议使用箭头函数的方式绑定
  // - 如果需要传递事件对象，都放在最后一个参数位置上
  // - 在事件处理器的业务逻辑中，如果需要阻止冒泡、阻止默认事件、事件委托等，都一律参考JS原生中事件对象API。

const Child = () => {
  const handler1 = (flag, ev) => {
    console.log('---4', flag)
    console.log('---4', ev)
  }
  const handler2 = () => {
    console.log('---5')
  }
  return (
    <div>
      <h1>我是函数式组件</h1>
      <button onClick={(ev)=>handler1(4, ev)}>点击4</button>
      <button onClick={handler2}>点击5</button>
    </div>
  )
}


export default class extends React.Component {

  constructor (props) {
    super(props)
    // 修改事件处理器的this指向
    // this.handler1 = this.handler1.bind(this)
  }

  handler1 (flag, ev) {
    console.log('---1', flag)
    console.log('---1', this)
    console.log('---1', ev)
  }

  handler2 (ev, flag) {
    console.log('---2', flag)
    console.log('---2', this)
    console.log('---2', ev)
  }

  handler3 (ev) {
    console.log('---list', ev.target.dataset)
  }

  render () {


    return (
      <div>
        <h1>学习事件绑定</h1>
        {/* 使用ES5的方式绑定事件 */}
        {/* <button onClick={this.handler1}>点击</button> */}
        <button onClick={this.handler1.bind(this, 1)}>点击1</button>
        <button onClick={this.handler1.bind(this, 2)}>点击2</button>
        <hr/>

        <button onClick={(ev)=>this.handler2(ev, 3)}>点击3</button>
        <hr/>
        <Child />
        <hr/>

        <div onClick={(ev)=>this.handler3(ev)}>
          <div data-row='1'>第一行</div>
          <div data-row='2'>第二行</div>
          <div data-row='3'>第三行</div>
        </div>

      </div>
    )
  }
}

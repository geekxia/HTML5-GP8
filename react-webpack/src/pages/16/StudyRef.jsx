// 学习目标：理解什么是Ref，掌握ref转发语法，配合高阶组件如何使用ref。

// 1、什么ref？
  // - 在Vue中，使用ref可以快速地访问DOM对象，还可以快捷地访问组件实例。
  // - 所以在vue中，ref不仅可以访问DOM，还是常见的组件间的通信方案。
  // - 在react中ref有两个作用。用于快速地访问DOM，用于引用一个自定义组件内部的东西（数据、DOM）。

// 2、如何使用ref？
//   - 在类组件中，使用 <div ref='box' />，在this.refs访问。
//   - 在函数式组件中，使用 createRef() 创建一个引用，再使用 ref属性进行。

// 3、什么ref转发？
  // - 使用 React.forwardRef((props,ref)=>(<jsx/>)) 创建组件，暴露出一个ref属性给父组件来引用。这个引用不是整个组件实例，而是组件中的一个具体的DOM节点或变量。
  // - 一般是第三方的库作者用得比较多。我们平时开发很少用。

import { qf } from '@/utils/hoc'

@qf
class ChildA extends React.PureComponent {
  render () {
    // console.log('---- this.props', this.props)
    const { forwardRef } = this.props
    return (
      <div>
        <h2 ref={forwardRef}>我是ChildA组件</h2>
      </div>
    )
  }
}

const ChildB = React.forwardRef((props, ref)=>{
  return (
    <div>
      <h2 ref={ref}>我是ChildB组件</h2>
      <button>点击</button>
    </div>
  )
})

// ChildC支持高阶组件修饰，还要支持ref转发
const ChildC = qf(
  ({forwardRef, ...props}) => {
    console.log('---props', props)
    return (
      <div>
        <h2 ref={forwardRef}>我是ChildC组件</h2>
      </div>
    )
  }
)

export default class StudyRef extends React.PureComponent {

  constructor (props) {
    super(props)
  }

  submit () {
    console.log('---refs', this.refs)
  }

  render () {
    return (
      <div>
        <h1>学习ref和高阶组件</h1>
        <hr/>
        <div ref='row'>高薪就业</div>
        <hr/>
        <input ref='name' type="text"/><br/>
        <hr/>
        <ChildA ref='childa' />
        <hr/>
        <ChildB ref='childb' />
        <hr/>
        <ChildC ref='childc' />
        <hr/>
        <button onClick={()=>this.submit()}>提交</button>
      </div>
    )
  }
}

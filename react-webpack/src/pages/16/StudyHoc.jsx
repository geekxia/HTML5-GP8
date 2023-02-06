// 学习目标：理解什么是高阶组件，熟练识别并掌握高阶组件的用法。

// 1、什么是高阶组件？
  // - Higher Order Component，高阶组件也高阶函数（纯函数），它本质上就是一个函数。
  // - 高阶组件（高阶函数）它接收一个React组件作为入参，经过一番修饰，最后返回一个全新的React组件。
  // - 这个入参被称之为“UI组件”，这个高阶组件被称之为“容器组件”。

// 2、高阶组件有什么用？
  // - 高阶组件是一种具有修饰功能的函数，可以实现代码逻辑的复用。
  // - 当高阶组件对某个UI组件进行修饰，这个UI组件就能获得这个高阶组件给的功能。

// 3、如何封装高阶组件？
  // - 语法1：const hoc = W = > props = > <W />
  // - 语法2：const hoc = arg = > W => props => <W />
  // - 特别注意：封装高阶组件时，一定要考虑props丢失问题；建议使用props穿透实现属性继承。

// 4、在业务组件中如何使用高阶组件呢？
  // - 函数调用的写法：const NewCom = hoc(UI)  注意：这种写法不要发生render()里面。
  // - 在类组件上：推荐使用ES6装饰器语法来使用高阶组件
  // - 在函数组件上：推荐这样写 const Child = hoc(props => (<jsx/>))

import { study, role, theme, meta } from '@/utils/hoc'

// 使用高阶组件时，有顺序讲究的。
@theme
@role
@study
@meta(['editor'])
class ChildA extends React.PureComponent {
  render () {
    console.log('--ChildA props', this.props)
    return (
      <div>
        <h2>我是ChildA组件</h2>
        <button>权限按钮</button>
      </div>
    )
  }
}

const ChildB = meta(['teacher'])(
  theme(
    study(
      role(
        props => {
          console.log('--ChildB props', props)
          return (
            <div>
              <h2>我是ChildB组件</h2>
            </div>
          )
        }
      )
    )
  )
)

export default class StudyHoc extends React.PureComponent {
  render () {
    return (
      <div>
        <h1>学习高阶组件</h1><hr/>
        <ChildA />
        <hr/>
        <ChildB />
      </div>
    )
  }
}

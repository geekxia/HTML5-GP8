// 学习目标：熟练掌握上下文的使用方法，了解上下文的特点。

// 1、什么是React上下文？
  // - 是由React.createContext()创建的，用在组件树自上而下地传递数据。这个特性就是上下文。
  // - 特点：只能自上而下；上下文具有响应式（如果上下文发生了变化，后代组件会更新视图的）；在组件树中可以同时使用多个上下文，这多个上下文彼此是独立的。
  // - 意义：它是一种非常重要的通信方案。

// 2、上下文语法
  // - const AbcContext = React.createContext()
  // - const { Provider, Consumer } = AbcContext
  // - <Provider value={}> 向组件树中注入提供数据
  // - <Consumer>{ ctx => (<jsx/>) }</Consumer>

// 3、在组件中如何访问上下文数据？
  // - 在类组件中，使用contextType或者<Consumer>访问
  // - 在函数式组件中，使用useContext()或<Consumer>访问

// 4、上下文在React开发中到底有多重要呢？
  // - react-router-dom 离不开上下文
  // - mobx离不开上下文
  // - redux离不开上下文
  // - antd国际化、react-intl国际化都离不开上下文
  // - antd换肤功能也离不开上下文

// 5、Vue中哪种通信方案与React上下文很相似？
//   - Vue中的 provide/inject
//   - 区别：provide/inject无论注入的数据是声明式变量还是普通数据，在组件树中都没有响应式。React上下文如果受控了一定有响应式。


import ThemeContext from '@/utils/theme'

class ChildA extends React.PureComponent {
  render () {
    return (
      <div style={ this.context }>
        <h2>我是ChildA组件</h2>
      </div>
    )
  }
}
ChildA.contextType = ThemeContext
// ChildA.defaultProps = {}
// ChildA.displayName = 'ChildA'

import { ThemeConsumer } from '@/utils/theme'
class ChildB extends React.PureComponent {
  render () {
    return (
      <ThemeConsumer>
      {
        theme => {
          return (
            <div style={ theme }>
              <h2>我是ChildB组件</h2>
            </div>
          )
        }
      }
      </ThemeConsumer>
    )
  }
}

// 注意：在函数式中除了使用useContext()访问上下文数据外，还像这样访问。
const ChildC = props => {
  return (
    <ThemeConsumer>
    {
      theme => {
        return (
          <div style={ theme }>
            <h2>我是ChildC组件</h2>
          </div>
        )
      }
    }
    </ThemeConsumer>
  )
}

export default class StudyContext extends React.PureComponent {

  render () {
    return (
      <div>
        <h1>学习上下文</h1>
        <ChildA />
        <hr/>
        <ChildB />
        <hr/>
        <ChildC />
      </div>
    )
  }
}

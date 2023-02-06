// 学习目标：什么是JSX？浏览器为什么可以读懂JSX？JSX语法和createElement()随意切换。

// 1、文件命名（组件名遵从大驼峰命名、后缀.js/.jsx/.ts/.tsx）
// 2、关于组件，一种类组件、一种函数式组件。
// 3、什么JSX？这是React团队开源的一种JS语法（JavaScript XML），用于定义React视图结构。
// 4、JSX是可选的，也就是你在编写React组件时，可以不使用JSX，那就使用React.createElement(type,props,children)。不使用JSX，视图代码比较难易阅读，官方建议使用JSX语法。
// 5、如果你编写React组件用到了JSX语法，一定要安装@babe/preset-react支持编译。那些JSX语法，最终会被Babel编译成React.createElement()语法。
// 6、JSX是对象、也是变量，也可以认为是表达式。

export default class StudyHello extends React.Component {

  render () {
    return (
      <div>
        {
          React.createElement(
            'div',
            {id:'box',title:'你好'},
            [
              React.createElement('h1',{key:1},'Hello React')
            ]
          )
        }
        <hr/>
        { <h1>我是JSX语法</h1> }
      </div>
    )
  }
}

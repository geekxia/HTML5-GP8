// 学习目标：熟练使用props实现组件通信。

// 1、在React中定义组件有两种方式
  // - class类组件：有this、有state、有生命周期、有上下文、有ref等，也有props。
  // - 函数式组件：没有this、没有state、没有生命周期、没有上下文、没有ref，同样有props。
  // - 常识：函数式组件一直都存在的，与Hooks诞生是无关的。
  // - 这两种组件有什么本质性区别：类组件性能较差，函数式组件性能更好。在V16.8以前，是没有Hooks的，当我们使用函数式组件时，如果想要使用一些非props特性，就必须把函数式组件改写类组件。自V16.8以后，可以不再使用类组件了，只使用函数式组件，如果希望用到非props特性，使用Hooks实现。

// 2、什么是props？
  // - props，代表是父组件传递给子组件的数据。
  // - props是父子通信的纽带，组件之间的关系由props决定。
  // - props是从父组件那里传递过来的，在类组件使用this.props接收，对函数式组件讲其入参就是props

// 3、props是只读的，因为props是父组件传递过来的，不能直接修改。
  // - 单向数据流，props数据只能自上而下地传递。
  // - 经常容易犯错的地方是，先对props解构，再间接地修改了props。
  // - 进一步理解：state是当前组件自有数据，props是父组件传递过来的数据，这两股数据流不要交叉赋值。
  // - 原则：保证所有的函数式组件都是纯函数（在函数业务逻辑中不会set入参，相同入参永远得到相同返回值）

// 4、props用于向子组件传数据，能传递哪些东西？
  // - 数值、字符串
  // - 布尔值
  // - undefined / null  【一般没有什么意义】
  // - object对象
  // - array数组
  // - function函数（具有通信性质的） 约定这个自定义属性以on*开头，比如onRun
  // - function函数（具有渲染性质的） 约定这个自定义属性不要以on*开头，最好命名为render，这个技术叫做“render props”。
  // - jsx变量

// 5、props.children
  // - 它表示是自定义组件内部所嵌套的其它节点们。
  // - 自定义属性命名时不使用‘children’关键字。
  // - props.children 可能是一个数组，也可能是一个函数。

// 6、props是组件化的基础，如何做属性校验？
  // - 属性类型及必填校验，使用 prop-types 这个包来实现
  // - 添加属性默认值，使用内部属性 defaultProps 来实现
  // - 文档：https://www.npmjs.com/package/prop-types
  // - 做props验证只用考虑两个问题：数据类型、是否必填（如果是非必填要考虑默认值）

import PropTypes from 'prop-types'

class CountA extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  add () {
    this.setState(state=>({
      count: state.count + 1
    }))
  }

  render () {
    const { count } = this.state
    return (
      <div>
        <h1>{ count }</h1>
        <button onClick={this.add.bind(this)}>自增</button>
      </div>
    )
  }
}

const CountB = props => {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <h1>{ count }</h1>
      <button onClick={()=>setCount(count+1)}>自增</button>
    </div>
  )
}

const ChildA = props => {
  console.log('---child a props', props)
  // props.name = '无名'
  let { name, render, list } = props


  return (
    <div>
      <h1>我是ChildA { name }</h1>
      {
        render(list)
      }
    </div>
  )
}

const ChildB = props => {
  console.log('---child b props', props)
  return (
    <div>
      <h1>我是CHildB</h1>
    </div>
  )
}

const ChildC = props => {
  console.log('---child c props', props)
  return (
    <div>
      <h1>我是CHildC</h1>
    </div>
  )
}
// 配合prop-types这个包实现类型和必填校验
ChildC.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired,
  onEat: PropTypes.func,
  footer: PropTypes.element,
  header: PropTypes.node,
  height: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  gender: PropTypes.oneOf(['男','女'])
}
// 给非必填props添加默认值
ChildC.defaultProps = {
  name: '无名'
}

export default class extends React.Component {

  handler () {
    console.log('--handler')
  }

  render () {

    return (
      <div>
        <h1>学习组件和Props</h1>
        <hr/>
        <CountA />
        <hr/>
        <CountB />
        <hr/>
        <ChildA
          name='张三'
          age={ 18 }
          show={ false }
          a={ null }
          b={ undefined }
          info={ ({ a: 1, b: 2 }) }
          list={ [1,2,3,4] }
          c={ Math.random() }
          onRun={ this.handler }
          foot={ <footer>我是底部</footer> }
          render={
            list => (
              <ul>
                {
                  list.map(ele=>(
                    <li key={ele}>{ ele }</li>
                  ))
                }
              </ul>
            )
          }
        />
        <hr/>
        <ChildB>
          <div>你好</div>
          <div>世界</div>
          { 'Hello World' }
        </ChildB>

        <ChildB>
          { ()=>(<div>Hello World</div>) }
        </ChildB>
        <hr/>

        <ChildC
          name={'王五'}
          age={18}
          footer={ <div></div> }
          header={ 1000 }
          height={ 100 }
          gender='男'
        />
      </div>
    )
  }
}

// 学习目标：要熟练地使用状态提升，解决组件之间的通信问题。

// 1、状态提升：当多个组件需要共享一个数据时，我们具体的做法是找到它们共同的最近的父级组件，把这个变量定义这个父组件的state中，再使用props向下传递。

// 2、以后我们在谈论props时，我们只针对的是自定义封装的React元素。

// 3、父子组件通信
  // - 父传子，使用自定义的props属性
  // - 子传父，使用自定义的props事件

// 4、属性穿透：上游传递过来的props，直接使用 {...props} 把这些属性继续往后代传。
  // - 优点：用起来比较方便，还可以完整保留组件树中的props们。
  // - 缺点：组件树复杂了，props穿透复杂了，会导致props来历不明，代码臃肿。
  // - 原则：当组件层级复杂时，不建议使用props穿透，建议使用context上下文或者状态管理。

const Fahrenheit = props => {
  const { value, onChange } = props
  return (
    <div>
      <span>请输入摄氏温度：</span>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )
}

const Celsius = props => {
  const { value } = props
  return (
    <div>
      <span>转换结果：</span>
      <span>{ value * 1.8 + 32 }</span>
    </div>
  )
}

const Middle = props => {
  return (
    <div>
      <Fahrenheit {...props} />
      <div>计算方法是：摄氏温度 X 1.8 + 32 = 华氏温度</div>
    </div>
  )
}

// 这四个组件的关系
//   - StudyLift
//     - Middle
//       - Fahrenheit(**)
//     - Celsius(**)


export default class StudyLift extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      temper: 0  // 摄氏温度
    }
  }

  render () {
    const { temper } = this.state
    return (
      <div>
        <h1>学习状态提升</h1>
        <hr/>
        <Middle value={temper} onChange={ev=>this.setState({temper:Number(ev.target.value)})} />
        <hr/>
        <Celsius value={temper} />
      </div>
    )
  }
}

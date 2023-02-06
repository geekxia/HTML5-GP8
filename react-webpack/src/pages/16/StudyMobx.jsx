import { inject, observer } from 'mobx-react'

// 语法：inject(['子store名字'])(UI)
// 语法：observer(UI)

@inject(['study'])
@observer
class Child extends React.PureComponent {
  constructor (props) {
    super(props)
  }
  render () {
    const { study } = this.props
    return (
      <div>
        <h2>msg: { study.msg }</h2>
        <h2>count: { study.count }</h2>
        <h2>total: { study.total }</h2>
      </div>
    )
  }
}

export default inject(['study'])(
  observer(
    (props) => {

      const { study } = props

      console.log('----props', props)
      const change = () => {
        study.changeMsg('Hello World')
        console.log('----clicked')
      }

      return (
        <div>
          <h1>学习Mobx状态管理</h1>
          <hr/>
          <h1>{ study.msg }</h1>
          <button onClick={change}>问好</button>
          <hr/>
          <h1>{ study.count }</h1>
          <button onClick={()=>study.sub(5)}>自减</button>
          <button onClick={()=>study.add(10)}>自增</button>
          <hr/>
          <Child />
        </div>
      )
    }
  )
)

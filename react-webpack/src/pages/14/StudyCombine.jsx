// 学习目标：知道组合vs.继承在React组件化中的不同意义，灵活使用组合思想封装业务组件。

// 1、使用组合封装业务的一般思路
  // - 分析UI视图，根据你的理解把视图结构拆解成多个部分
  // - 分门别类地把这些“部分”封装成独立的组件
  // - 使用组合模式（props）把这个独立的部分组合成你要的业务组件

// 2、ReactDOM.createPortal(<jsx/>, el)
  // - 把<jsx/> 渲染到el这个父组件节点上
  // - 一般都在弹框组件的封装上

// 3、React组件化要用到哪些知识点
  // - props自定义属性、自定义事件
  // - props.children
  // - render props （只要一个属性等于JSX，都可以认为这是render props）
  // - {...props} 属性穿透
  // - .defaultProps 添加属性默认值
  // - prop-types 做属性类型、必填等校验
  // - 如果有数据交互，使用状态提升

// 4、如何用继承实现组件化？
  // - class Modal extends React.PureComponent {}
  // - class SmallModal extends Modal {}
  // - class InfoSmall extends SmallModal {}

// 5、什么是受控组件？
  // - 组件的props自定义属性由当前组件或上游组件的state所控制着。

// - Model
//   - Header （大弹框有，小弹框没有）
//   - Body （大弹框时由用户决定，小弹框时放Tip）
//     - Tip
//     - Button
//   - Footer (大弹框有，小弹框没有)
//     - Button

import { Profiler } from 'react'
import Modal from './components/modal'

export default class extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }

  cancel () {
    this.setState({show: false})
    console.log('------')
  }

  submit () {
    console.log('---调接口')
    this.setState({show: false})
  }

  // 测试性能（只对开发环境有用）
  test (id, phase, _a, _b, _c, commitTime) {
    console.log('--渲染性能测试', id, _c, commitTime)
  }

  render () {
    const { show } = this.state
    return (
      <div>
        <h1>学习组合</h1>
        <button onClick={()=>this.setState({show:true})}>点击</button>
        <Profiler id='modal' onRender={this.test.bind(this)}>
          <Modal
            visible={show}
            onCancel={()=>this.cancel()}
            title={<div>自定义标题</div>}
            onOk={()=>this.submit()}
            type='error'
            tipTitle='Use Hooks'
          >
            <div>表单</div>
            <div>表单</div>
          </Modal>
        </Profiler>
      </div>
    )
  }
}

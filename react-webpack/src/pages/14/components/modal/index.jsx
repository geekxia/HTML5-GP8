import './style.scss'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

class Modal extends React.PureComponent {

  constructor (props) {
    super(props)
    this.container = document.createElement('div')
  }

  componentDidMount () {
    // 手动创建一节点，用于挂载弹框
    document.body.appendChild(this.container)
  }

  componentWillUnmount () {
    document.body.removeChild(this.container)
  }

  render () {
    const { visible, footer, type } = this.props

    console.log('--Model props', this.props)

    return ReactDOM.createPortal(
      (
        visible ? (
          <div className='layer'>
            <div
              className='wrap'
              style={{
                width: (type ? '420px' : '520px'),
                marginLeft: (type ? '-210px' : '-260px')
              }}
            >
              { !type && <Header {...this.props} /> }
              <Body {...this.props}  />
              { (!type && footer===undefined) && <Footer {...this.props} /> }
            </div>
          </div>
        ) : null
      ),
      this.container
    )
  }
}

// 添加属性默认值
Modal.defaultProps = {
  visible: false,
  closable: true,
  title: '标题'
}

// 属性验证
Modal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  title: PropTypes.node,
  onOk: PropTypes.func,
  type: PropTypes.oneOf(['info','warn','error','primary']),
  tipTitle: PropTypes.string
}

export default Modal

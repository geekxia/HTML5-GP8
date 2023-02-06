import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Row, Col, Switch, Input } from 'antd'
import { TwitterPicker } from 'react-color'
import { toggleSiderLogo, togglePrimaryColor } from '@/store/actions'


export default props => {

  const { show, onShow } = props
  const dispatch = useDispatch()
  const { fixedLogo, primaryColor } = useSelector(state=>state.app)


  const chanageColor = ({hex}) => {
    // console.log('---color', color.hex)
    // console.log('---ev', ev)
    // setColor(hex)
    dispatch(togglePrimaryColor(hex))
  }

  return (
    <div>
      <Drawer
        title="页面设置"
        placement='right'
        visible={show}
        onClose={onShow}
        width='300'
      >
        <Row>
          <Col span={8}>
            侧边栏 Logo
          </Col>
          <Col span={16}>
            <Switch checked={fixedLogo} onClick={()=>dispatch(toggleSiderLogo())} />
          </Col>
        </Row>
        <Row style={{marginTop:'20px'}}>
          <Col span={8}>
            主题色
          </Col>
        </Row>
        <Row style={{marginTop:'20px'}}>
          <Col span={24}>
            {/*<Input type='color' value='#1890ff' />*/}
            <TwitterPicker color={primaryColor} onChange={chanageColor}/>
          </Col>
        </Row>
      </Drawer>
    </div>
  )
}

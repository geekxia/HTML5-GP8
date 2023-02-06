import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import QfDrawer from './QfDrawer'
import { SettingOutlined } from '@ant-design/icons'

export default () => {

  const [show, setShow] = useState(false)

  return (
    <div className="qf-content">
      {/* 用于显示父级路由规则所对应的子路由规则们 */}
      <Outlet />
      <div className='setting' onClick={()=>setShow(true)} style={{background:'var(--ant-primary-color)'}}>
        <SettingOutlined />
      </div>
      <QfDrawer show={show} onShow={()=>setShow(false)} />
    </div>
  )
}

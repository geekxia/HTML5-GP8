import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import { useMenu } from '@/hooks'

import logo from '@/assets/logo.png'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// 渲染Menu菜单
function createItems (routes) {
  const result = routes.map(ele => {
    if (ele.path) {
      if (!ele.hidden) {
        return getItem(
          <Link to={ele.path}>{ ele.label }</Link>
          ,ele.key, ele.icon)
      }
    } else {
      return getItem(
        ele.label,
        ele.key, ele.icon, createItems(ele.children))
    }
  })
  return result
}

const Logo = props => {
  const { collapsed } = props
  return (
    <div className={!collapsed?'logo2':'logo1'}>
      <img src={logo} alt="qf"/>
    </div>
  )
}

export default props => {

  const [selectedKey, openKey] = useMenu()
  // console.log('---useMenu', selectedKey, openKey)
  const { fixedLogo } = useSelector(state=>state.app)
  const { accessRoutes } = useSelector(state=>state.user)

  return (
    <div className="qf-sider">
      {
        fixedLogo && <Logo {...props} />
      }
      {/* 菜单渲染 */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[openKey]}
        items={createItems(accessRoutes)}
      />
    </div>
  )
}

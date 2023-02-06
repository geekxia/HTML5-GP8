import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Row, Col, Dropdown, Menu, Breadcrumb, Avatar } from 'antd'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FontSizeOutlined,
  TranslationOutlined
} from '@ant-design/icons'

import screenfull from 'screenfull'

import { toggleAntdSize, toggleAntdLang, resetUser } from '@/store/actions'
import { useBreadcrumb } from '@/hooks'

const sizes = [
  { key: 'small', label: 'Small' },
  { key: 'middle', label: 'Middle' },
  { key: 'large', label: 'Large' }
]

const langs = [
  { key: 'zh', label: '中文' },
  { key: 'en', label: 'English' }
]

export default (props) => {

  const { collapsed, onCollapsed } = props
  const dispatch = useDispatch()
  const { antdSize, lang } = useSelector(state=>state.app)
  const { userinfo } = useSelector(state=>state.user)
  const breads = useBreadcrumb()
  const navigate = useNavigate()
  console.log('---breads', breads)

  const toggleFull = () => {
    if (screenfull.isEnabled ) {
      // 全屏
      screenfull.request()
    }
  }

  const toggleSize = (size) => {
    console.log('---size', size)
    dispatch(toggleAntdSize(size))
  }

  const toggleLang = lang => {
    dispatch(toggleAntdLang(lang))
  }

  const skipBreak = ele => {
    if (ele.path) {
      navigate(ele.path, {replace: true})
    }
  }

  const logout = () => {
    dispatch(resetUser())
  }

  return (
    <div className="qf-header">

      <Row>
        <Col span={16}>
          {/* 菜单收缩与展开 */}
          <div className='toggle' onClick={onCollapsed}>
            {
              collapsed ?
              <MenuUnfoldOutlined />
              : <MenuFoldOutlined />
            }
          </div>
          {/* 面包屑 */}
          <Breadcrumb style={{display:'inline-block', marginLeft:'30px'}} separator='/'>
          {
            breads.map(ele=>(
              <Breadcrumb.Item key={ele.key} onClick={()=>skipBreak(ele)}>
                { ele.label }
              </Breadcrumb.Item>
            ))
          }
          </Breadcrumb>
        </Col>
        <Col span={8} style={{textAlign:'right'}}>
          <div className='icons'>
            <FullscreenOutlined onClick={toggleFull} />

            <Dropdown
              overlay={<Menu items={
                sizes.map(ele=>({
                  key: ele.key,
                  label: (
                    <div
                      style={{color: antdSize===ele.key ? 'var(--ant-primary-color)' : 'black'}}
                      onClick={()=>toggleSize(ele.key)}>
                      {ele.label}
                    </div>
                  )
                }))
              } />}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <FontSizeOutlined />
            </Dropdown>

            <Dropdown
              overlay={(
                <Menu
                  items={
                    langs.map(ele=>({
                      key: ele.key,
                      label: (
                        <div
                          style={{color: lang===ele.key ? 'var(--ant-primary-color)' : 'black'}}
                          onClick={()=>toggleLang(ele.key)}>
                          {ele.label}
                        </div>
                      )
                    }))
                  }
                />
              )}
              placement="bottomRight"
              arrow={{pointAtCenter: true}}
            >
              <TranslationOutlined />
            </Dropdown>

            <Dropdown
              overlay={(
                <Menu
                  items={[
                    {
                      key: 'avatar',
                      label: <div onClick={logout}>退出登录</div>
                    }
                  ]}
                />
              )}
              placement="bottomRight"
              arrow={{pointAtCenter: true}}
            >
              <div style={{display:'inline-block',cursor:'pointer',paddingRight:'20px'}}>
                <Avatar src={userinfo.avatar} />
              </div>
            </Dropdown>
          </div>

        </Col>

      </Row>

    </div>
  )
}

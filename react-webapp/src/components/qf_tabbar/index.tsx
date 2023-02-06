import { tabRoutes } from '@/pages'
import { useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile'

import './style.scss'

export default () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className='qf-tabbar'>
        <TabBar activeKey={pathname}>
          { tabRoutes.map(item => (
            <TabBar.Item
              key={item.key}
              icon={(act)=>(
                <span 
                  className={act?'on':''} 
                  onClick={()=>navigate(item.key)}
                >
                  {item.icon}
                </span>
              )}
              title={(act)=>(
                <span 
                  className={act?'on':''}
                >
                  {item.title}
                </span>
              )}   
            />
          )) }
        </TabBar>
      </div>
  )
}
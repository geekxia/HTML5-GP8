import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Layout, ConfigProvider } from 'antd'
import './style.scss'

import QfSider from './QfSider'
import QfHeader from './QfHeader'
import QfContent from './QfContent'

// Antd国际化
import zhCN from 'antd/lib/locale/zh_CN'
import enGB from 'antd/lib/locale/en_GB'

// moment国际化
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'

// 前端业务国际化
import { IntlProvider } from 'react-intl'
import zh from '@/locales/zh'
import en from '@/locales/en'

const antdLangs = {
  zh: zhCN,
  en: enGB
}

const intlLangs = {
  zh: zh,
  en: en
}

const { Header, Sider, Content } = Layout

export default () => {

  const [collapsed, setCollapsed] = useState(false)
  const { primaryColor, antdSize, lang } = useSelector(state=>state.app)

  console.log('-----layout primaryColor', primaryColor)

  useEffect(()=>{
    // 切换组件库的主题色
    ConfigProvider.config({
      theme: {
        primaryColor,   // 切换主题色
      },
    })
  }, [primaryColor])

  useEffect(()=>{
    moment.locale(lang)
  }, [lang])

  return (
    <ConfigProvider
      componentSize={antdSize}
      pageHeader={{ ghost: true }}
      locale={antdLangs[lang]}
    >
      <IntlProvider messages={intlLangs[lang]} locale={lang}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <QfSider collapsed={collapsed} />
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }}>
              <QfHeader collapsed={collapsed} onCollapsed={()=>setCollapsed(!collapsed)} />
            </Header>
            <Content>
              <QfContent />
            </Content>
          </Layout>
        </Layout>
      </IntlProvider>
    </ConfigProvider>
  )
}

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'

import styles from '@styles/layout.module.scss'

const navs = [
  { path: '/', text: '首页' },
  { path: '/user/me', text: '个人中心' },
  { path: '/user/about', text: '关于我' },
  { path: '/ssg/list', text: 'SSG' },
  { path: '/ssr/cnode', text: 'SSR' },
  { path: '/csr/cnode', text: 'CSR' }
]

const Header = () => {
  const { pathname } = useRouter()
  // console.log('---router', pathname)
  return (
    <div className={styles.nav}>
      {
        navs.map((ele:any)=>(
          <Link key={ele.path} href={ele.path}>
            <span className={cn({[styles.on]: pathname===ele.path})}>{ele.text}</span>
          </Link>
        ))
      }
    </div>
  )
}

const Footer = () => {
  return null
}


const Layout: NextPage<any> = ({children}) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{ children }</main>
      <Footer />
    </div>
  )
}

export default Layout
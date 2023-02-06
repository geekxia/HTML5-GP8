import { useEffect, useState } from 'react'
import { observer, inject } from 'mobx-react'

import { Button, Table } from 'antd'
import './style.scss'

const columns = [
  {
    title: '作者',
    dataIndex: 'author',
    align: 'center',
    key: 'name',
    render: (_, row) => (
      <div className='author'>
        <img src={ row.author.avatar_url } />
        <div>{ row.author.loginname }</div>
      </div>
    )
  },
  {
    title: '访问量',
    dataIndex: 'reply_count',
    key: 'reply_count',
    align: 'center',
    render: (_, row) => (
      <div>{ row.reply_count } / { row.visit_count }</div>
    )
  },
  {
    title: '分类',
    dataIndex: 'tab',
    align: 'center',
    key: 'tab'
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    key: 'title',
    width: 200
  },
  {
    title: '时间',
    dataIndex: 'last_reply_at',
    key: 'last_reply_at',
    align: 'center',
    render: (time) => (
      <div>{ Date.parse(time) }</div>
    ),
  },
];

import CnTab from './components/CnTab'
import CnPage from './components/CnPage'

export default inject(['cnode'])(
  observer(
    ({ cnode }) => {

      const [page, setPage] = useState(1)
      const [tab, setTab] = useState('')

      console.log('--cnode', cnode.list)

      useEffect(() => {
        cnode.getList3({limit:2,page,tab})
      }, [page, tab])

      const tabClick = (tab) => {
        setTab(tab)
        setPage(1)
      }

      return (
        <div className='cnode'>
          <CnTab value={tab} onChange={tabClick} />
          <Table
            rowKey='id'
            columns={ columns }
            dataSource={ cnode.list }
            pagination={ false }
          />
          <CnPage value={page} onChange={ev=>setPage(ev)} />

        </div>
      )
    }
  )
)

import { QfTabbar } from "@/components"

import { InfiniteScroll, List, PullToRefresh } from 'antd-mobile'
import { useState, useEffect } from "react"
import './style.scss'

const data = [
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
  { id: 1, name: '小米手机', img: '' },
]

export default () => {

  const [list, setList] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setList(data)
      console.log('---调接口')
    }, 200)
    return () => {}
  }, [])


  async function loadMore() {
    // setData(val => [...val, ...append])
    console.log('----调接口')
    setList([...list, ...data])
    // setPage(page+1)
    if (list.length > 30) {
      setHasMore(false)
    }    
  }

  async function refresh () {
    setList(data)
    console.log('---下拉')
  }

  return (
    <div className="qf-home">
      <PullToRefresh onRefresh={refresh}>      
        <List>
          {list.map((item, index) => (
            <List.Item key={index}>
              <div style={{height:'200px',border:'1px solid red'}}>{item.name}</div>
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          <div>没了</div>
        </InfiniteScroll>
      </PullToRefresh>
      <QfTabbar />
    </div>
  )
}

import React, { useEffect, useState } from 'react'

import { fetchCnodeList } from '@/services/article'
import ArticleRow from './components/ArticleRow'

export default () => {

  const [list, setList] = useState<Array<API.Article>>([])


  useEffect(()=>{
    const params = {
      tab: 'ask',
      limit: 5,
      page: 1
    }
    fetchCnodeList(params).then((res:any)=>{
      console.log('----res', res)
      const arr: Array<API.Article> = res.data
      setList(arr)
    })
  }, [])

 

  return (
    <div>
      {
        list.map(ele=>(
          <ArticleRow key={ele.id} row={ele} />
        ))
      }
    </div>
  )
}

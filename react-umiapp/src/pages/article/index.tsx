import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'umi'

import ArticleRow from './components/ArticleRow'

export default () => {

  const { list }: any = useSelector<any>(state=>state.article)
  const dispatch = useDispatch()

  useEffect(()=>{
    const params = {
      tab: 'ask',
      limit: 5,
      page: 1
    }
    dispatch({type:'article/getCnodeList',payload:params})
  }, [])

  return (
    <div>
      {
        list.map((ele: API.Article)=>(
          <ArticleRow key={ele.id} row={ele} />
        ))
      }
    </div>
  )
}

import { NextPage } from 'next'
import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

import useSWR from 'swr'

const CnodeDetail: NextPage<any> = () => {
  const router = useRouter()
  const id = router.query.id

  const { data, error } = useSWR(
    `https://cnodejs.org/api/v1/topic/${id}`, 
    (url)=>{
      if (id) {
        return fetch(url).then(res=>res.json())
      }
    }
  )
  if (error) return <h1>网络异常，稍后再试</h1>
  if (!data) return <h1>Loading...</h1>

  // const [info, setInfo] = useState<any>({})  
  // useEffect(()=>{
  //   const id = router.query.id
  //   if (id) {
  //     fetch(`https://cnodejs.org/api/v1/topic/${id}`)
  //     .then(res=>res.json())
  //     .then(resJSON=>{
  //       setInfo(resJSON.data)
  //     })
  //   }    
  // }, [router])

  return (
    <div>
      <h1>文章详情</h1>
      
      {/* <h2>{ info?.title }</h2>
      <div dangerouslySetInnerHTML={{__html:info?.content}}></div> */}

      <h2>{ data.data?.title }</h2>
      <div dangerouslySetInnerHTML={{__html:data.data?.content}}></div>
    </div>
  )
}

export default CnodeDetail
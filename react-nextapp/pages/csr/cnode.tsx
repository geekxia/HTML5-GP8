import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Cnode: NextPage<any> = () => {

  const [list, setList] = useState([])
  const router = useRouter()

  useEffect(()=>{
    fetch('https://cnodejs.org/api/v1/topics?limit=5')
      .then(res=>res.json())
      .then(resJSON=>{
        console.log('----文章列表', resJSON)
        setList(resJSON.data)
      })
  }, [])

  return (
    <div>
      <h1>文章列表</h1>
      {
        list.map((ele:any)=>(
          <div key={ele.id}>
            <h2 onClick={()=>router.push(`/csr/${ele.id}`)}>{ele.title}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default Cnode
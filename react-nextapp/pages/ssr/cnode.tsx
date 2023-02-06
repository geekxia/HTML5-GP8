import { NextPage } from 'next'
import { useRouter } from 'next/router'

export async function getServerSideProps () {
  // 每次有人访问访问路由，都要调接口
  const res = await fetch(`https://cnodejs.org/api/v1/topics?limit=2&page=1`)
  const resJson = await res.json()
  // console.log('---文章列表', resJson)
  return {
    props: {
      list: resJson.data
    }
  }
}

const Cnode: NextPage<any> = ({ list }) => {

  const router = useRouter()

  return (
    <div>
      <h1>文章列表</h1>
      {
        list.map((ele:any)=>(
          <div key={ele.id}>
            <h2 onClick={()=>router.push(`/ssr/${ele.id}`)}>{ele.title}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default Cnode
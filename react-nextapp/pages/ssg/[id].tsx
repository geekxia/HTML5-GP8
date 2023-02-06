import { NextPage } from 'next'

// 以下代码都在npm run build时执行
export async function getStaticPaths () {
  // 调接口获取SSG假动态数据生成的列表页面的列表数据
  const res = await fetch('http://localhost:3000/api/v1/qflist')
  const resJSON = await res.json()

  return {
    // 生成paths（SSG列表项所对应的那些详情页路径）
    paths: resJSON.data.list.map((ele:any)=>({ params: { id: ele.name } })),
    fallback: false  // 当访问一个不存在的“列表项”时出现404
  }
}

// 以下代码都在npm run build时执行
export async function getStaticProps({params}:any) {
  // 有了id，我们调接口获取它的详情数据
  const res = await fetch(`http://localhost:3000/api/v1/qfinfo?name=${params.id}`)
  const resJSON = await res.json()
  console.log('---学科详情', resJSON)
  return {
    props: {
      info: resJSON.data.info
    }
  }
}

const QfDetail: NextPage<any> = ({info}) => {
  return (
    <div>
      <h1>千锋学科详情</h1>
      <h1>{info.name}</h1>
      <h1>{info.content}</h1>
    </div>
  )
}

export default QfDetail
import { NextPage } from 'next'

export async function getServerSideProps (ctx: any) {
  console.log('----cnode detail ctx', ctx.params)
  // 从ctx中接收动态路由的ID，再根据ID在这里调接口，拿到详情数据
  const res = await fetch(`https://cnodejs.org/api/v1/topic/${ctx.params.id}`)
  const resJson = await res.json()
  console.log('----文章详情', resJson)
  return {
    props: {
      info: resJson.data
    }
  }
}

const CnodeDetail: NextPage<any> = ({info}) => {
  return (
    <div>
      <h1>文章详情</h1>
      <h2>{ info.id }</h2>
      <div dangerouslySetInnerHTML={{__html: info.content}} />
    </div>
  )
}

export default CnodeDetail
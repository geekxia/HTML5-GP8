import { NextPage } from 'next'
import Link from 'next/link'

// 这段代码，在npm run build时执行
export async function getStaticProps () {
  // 在这里编写调接口的逻辑，拿到后端数据

  const res = await fetch('http://localhost:3000/api/v1/qflist')
  const resJSON = await res.json()

  // console.log('---千锋学科列表', resJSON)  
  return {
    props: {
      list: resJSON.data.list
    }
  }
}

// 这段代码，也是在npm run build时执行并渲染，得到静态HTML
const List: NextPage<any> = (props) => {
  console.log('--demo2 props', props)
  const { list } = props
  return (
    <div>
      <h1>千锋学科介绍</h1>
      {
        list.map((ele:any)=>{
          return (
            <Link key={ele.id} href={`/ssg/${ele.name}`}>
              <h2>{ele.name}</h2>
            </Link>
          )
        })
      }
    </div>
  )
}

export default List
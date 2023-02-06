
import { request } from 'umi'

// 检测入参类型、出参类型
export function fetchCnodeList (params: {tab:string,page:number,limit:number}) : any {
  return request<{data: Array<API.Article>}>(
    'https://cnodejs.org/api/v1/topics',
    {
      method: 'GET',
      params
    }
  )
}

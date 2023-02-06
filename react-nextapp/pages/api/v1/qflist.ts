// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  err: 0 | 1 | 2 | -1,
  msg: string,
  data: {
    list: Array<any>,
    total?: number
  }
}

// 动态接口
// req 表示请求体对象，拿到入参（req.query/req.body），拿到请求方法（req.method）
// res 表示响应体对象，res.send()/res.json()...
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 接入入参、入参验证、非必填参数处理
  // 增删改查
  const qfList = [
    { id: 1, name: 'HTML5' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Test' }
  ]
  // 响应请示方
  res.status(200).json({ err: 0, msg: 'success', data: { list: qfList } })
}

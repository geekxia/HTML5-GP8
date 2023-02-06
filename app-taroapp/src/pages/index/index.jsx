import { useState } from 'react'
import { View, Button, Input } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.scss'

import { useReady } from '@tarojs/taro'

const Index = ({ counter }) => {

  const [foo, setFoo] = useState('')

  // useEffect (()=>{
  //   counter.getList({tab:'ask', page: 1, limit: 5})
  // }, [])

  useReady(()=>{
    counter.getList({tab:'ask', page: 1, limit: 5})
  })

  const submit = () => {
    console.log('----foo', foo)
  }

  return (
    <View className='index'>
      <View>{ counter.counter }</View>
      <Button onClick={()=>counter.increment()}>自增</Button>
      {
        counter.list.map(ele=>(
          <View key={ele.id}>{ele.title}</View>
        ))
      }
      <Input style={{border:'1rpx solid #ccc'}} value={foo} onInput={ev=>setFoo(ev.detail.value)} />
      <Button onClick={submit}>提交</Button>
    </View>
  )
}

export default inject(['counter'])(observer(Index))

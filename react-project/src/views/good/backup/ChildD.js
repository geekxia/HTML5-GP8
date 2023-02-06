import { useSelector, useDispatch } from 'react-redux'

import { useSelector1, useSelector2, useQfDispatch } from '@/utils/qf'
import { addCount, subCount } from '@/store/actions'

export default () => {

  const dispatch = useQfDispatch()
  const { count } = useSelector2(state=>state.study)

  console.log('----ChildD count', count)
  return (
    <div>
      <h1>我是ChildD</h1>
      <h1>{ count }</h1>
      <button onClick={()=>dispatch(addCount(100))}>自增</button>
      <button onClick={()=>dispatch(subCount(50))}>自减</button>
    </div>
  )
}

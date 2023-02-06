import { Link, withRouter, useHistory } from 'react-router-dom'
import routes from '@/pages'
import { useSearch } from '@/hooks'

export default props => {

  console.log('navbar---props', props)

  const { id } = useSearch()

  const history = useHistory()
  console.log('----history', history)

  // 点击一级菜单
  const navClick = (idx) => {
    console.log('---idx', idx)


    history.replace(`${routes[idx].routes[0].path}?id=${idx}`)

  }

  return (
    <div className='navbar'>
      {
        routes.map((ele,idx)=>(
          <span key={ele.id} className={id==idx?'on':''} onClick={()=>navClick(idx)}>
            { ele.text }
          </span>
        ))
      }
    </div>
  )
}

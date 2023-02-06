import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import routes from '@/pages'
import { useSearch } from '@/hooks'

export default () => {

  // const location = useLocation()
  // const id = location.search.split('=')[1] || 0
  // console.log('second---location id', id)

  const search = useSearch()
  console.log('---search', search)
  const id = search.id || 0

  const arr = useMemo(()=>{
    return routes[id].routes
  }, [search])

  return (
    <div className='navbar2'>
    {
      arr.map(ele=>(
        <span key={ele.id}>
          <NavLink activeClassName='on' exact to={`${ele.path}?id=${id}`}>{ele.text}</NavLink>
        </span>
      ))
    }
    </div>
  )
}

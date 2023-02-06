import { useLocation } from 'react-router-dom'

// 自定义hooks
export const useSearch = () => {
  const location = useLocation()
  const arr = location.search.slice(1).split('&')
  let result = {}
  arr.forEach(ele=>{
    const arr = ele.split('=')
    result[arr[0]] = arr[1]
  })
  if (!result.id) result['id'] = 0
  return result
}

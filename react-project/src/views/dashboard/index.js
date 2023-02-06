import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import Admin from './Admin'
import Editor from './Editor'
import './style.scss'

// 不同角色的工作台
const d = {
  admin: Admin,
  editor: Editor
}

export default () => {


  const { userinfo } = useSelector(state=>state.user)
  const role = useMemo(()=>{
    if (userinfo.roles) {
      const role = userinfo.roles[0]
      console.log('----role', role)
      return role
    }
    return ''
  }, [userinfo])

  const Role = role ? d[role] : ()=>(null)


  return <Role />
}

import { useState, useEffect } from "react"

export default () => {
  
  const [num, setNum] = useState(1)
  useEffect(()=>{
   const timer = setInterval(()=>{
    setNum(num+1)
   }, 1000)
   return ()=>{
    clearInterval(timer)
   }
  }, [num])

  return (
    <div>
      <h1>个人中心</h1>
      <h1>{ num }</h1>
    </div>
  )
}
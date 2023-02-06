import { useMemo } from 'react'

export default ({value, onChange}) => {

  const pages = useMemo(()=>{
    if (value <=3) return [1,2,3,4,5]
    else return [value-2, value-1, value, value+1, value+2]
  }, [value])

  return (
    <div className='pages'>
    {
      pages.map(ele=>(
        <span
          key={ele}
          className={value===ele?'on':''}
          onClick={()=>onChange(ele)}>
          { ele }
        </span>
      ))
    }
    </div>
  )
}

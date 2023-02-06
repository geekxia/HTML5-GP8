const tabs = [
  { id: 1, tab: '', label: '全部' },
  { id: 2, tab: 'good', label: '精华' },
  { id: 3, tab: 'share', label: '分享' },
  { id: 4, tab: 'job', label: '招聘' },
  { id: 5, tab: 'ask', label: '问答' }
]

export default ({value, onChange}) => {
  return (
    <div className='tabs'>
      {
        tabs.map(ele=>(
          <span
            key={ele.id}
            onClick={()=>onChange(ele.tab)}
            className={value===ele.tab?'on':''}>
            {ele.label}
          </span>
        ))
      }
    </div>
  )
}

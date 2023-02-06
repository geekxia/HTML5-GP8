
import { Row, Col } from 'antd'
import { useEffect, useState } from 'react'

// import QfQuill from '@/components/QfQuill'
import QfList from '@/components/QfList'

export default () => {

  const [content, setContent] = useState('')

  const change = (ev) => {
    console.log('-ev', ev)
  }

  return (
    <div className="editor">
      { /*<QfQuill value={content} onChange={change} height='300' />*/ }
      <QfList />
    </div>
  )
}

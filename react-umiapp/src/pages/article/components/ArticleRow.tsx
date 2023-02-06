import React from 'react'

const ArticleRow: React.FC<{row: API.Article}> =  (
  { row }
)  => {
  return (
    <div>
      <span>{row.id}</span>
      <span>{row.title}</span>
      <span>{row.create_at}</span>
    </div>
  )
}

export default ArticleRow
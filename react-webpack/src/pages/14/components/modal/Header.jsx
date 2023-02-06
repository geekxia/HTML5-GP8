const Header = props => {
  console.log('---Header props', props)
  const { onCancel, closable, title } = props

  return (
    <div className='header'>
      <div className='title'>{ title }</div>
      {
        closable && <span className='close' onClick={onCancel}>X</span>
      }
    </div>
  )
}

export default Header

import Button from './Button'

const Footer = props => {
  const { footer, onOk, onCancel } = props
  console.log('---Footer props', props)
  return (
    <div className='footer'>
      {
        footer || (
          <>
            <Button type='primary' text='确定' onClick={onOk} />
            <Button type='cancel' text='取消' onClick={onCancel} />
          </>
        )
      }
    </div>
  )
}

export default Footer

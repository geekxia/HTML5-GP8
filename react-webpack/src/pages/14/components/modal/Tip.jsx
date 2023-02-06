import Button from './Button'

const Tip = props => {
  const { type, tipTitle, children, onOk } = props
  return (
    <div>
      <div>{type}</div>
      <div>
        <h6>{ tipTitle }</h6>
        <div>
          { children }
        </div>
      </div>
      <div>
        <Button type='primary' text='知道了' onClick={onOk} />
      </div>
    </div>
  )
}

export default Tip

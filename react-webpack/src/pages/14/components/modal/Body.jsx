import Tip from './Tip'
import Button from './Button'

const Body = props => {
  const { children, type } = props
  return (
    <div className='body'>
      {
        type
        ? <Tip {...props}>
            { children }
          </Tip>
        : children
      }
    </div>
  )
}

export default Body

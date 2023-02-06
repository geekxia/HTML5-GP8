import PropTypes from 'prop-types'

const Button = props => {
  const { type, text, onClick } = props
  return (
    <span className={`button ${type}`} onClick={onClick}>{ text || '点击' }</span>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary','danger','cancel'])
}


export default Button

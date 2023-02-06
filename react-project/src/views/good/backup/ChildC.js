import { connect } from 'react-redux'
import { addCount, subCount } from '@/store/actions'

export default connect(
  state => ({
    count: state.study.count
  }),
  dispatch => ({
    add: payload => dispatch(addCount(payload)),
    sub: payload => dispatch(subCount(payload))
  })
)(
  props => {
    console.log('----ChildC props', props)
    return (
      <div>
        <h1>我是ChildC</h1>
      </div>
    )
  }
)

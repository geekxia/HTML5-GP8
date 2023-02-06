import React from 'react'
import { connect } from 'react-redux'

import { addCount, subCount } from '@/store/actions'

class ChildB extends React.PureComponent {
  render () {
    console.log('----ChildB props', this.props)
    return (
      <div>
        <h1>我是ChildB</h1>
      </div>
    )
  }
}

export default connect(
  state => ({
    count: state.study.count,
    list: state.study.list
  }),
  dispatch => ({
    add (payload) {
      dispatch(addCount(payload))
    },
    sub (payload) {
      // dispatch({type:'study/sub',payload})
      dispatch(subCount(payload))
    }
  })
)(ChildB)

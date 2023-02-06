import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

import { getCates } from '@/store/actions'

const { Option } = Select

const CateSelect = props => {
  
  const { value, onChange, showAll, allowClear } = props

  const dispatch = useDispatch()
  const { cates } = useSelector(state=>state.good)
  console.log('----cates', cates)

  useEffect(()=>{
    dispatch(getCates())
  }, [])

  return (
    <Select
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      placeholder='选择品类'
      allowClear={allowClear}
    >
      { showAll && <Option value=''>全部</Option> }
      {
        cates.map(ele=>(
          <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
        ))
      }
    </Select>
  )
}

CateSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  showAll: PropTypes.bool,
  allowClear: PropTypes.bool
}

CateSelect.defaultProps = {
  value: '',
  onChange: () => {},
  showAll: true,
  allowClear: true
}

export default CateSelect

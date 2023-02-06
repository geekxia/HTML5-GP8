import { Button, DatePicker } from 'antd'
import { useIntl, FormattedMessage } from 'react-intl'

export default () => {
  const intl = useIntl()
  console.log('----', intl)
  return (
    <div>
      <Button type='primary'>
        { /*intl.formatMessage({id:'good.list.btn.test'}) */ }
        <FormattedMessage id='good.list.btn.test' />
      </Button>
      <DatePicker />
    </div>
  )
}

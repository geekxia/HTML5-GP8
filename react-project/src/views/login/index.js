import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '@/store/actions'

import './style.scss'

export default () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values)
    dispatch(login(values))  // 这是异步的
    // 不能直接跳转到系统首页，登录完成后，用Token换取用户信息，动态生成路由和菜单。
    // navigate('/dashboard', { replace: true })  // $router.replace()
  }

  return (
    <div className='login'>
      <div className='wrap'>
        <Form
          name="login"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { pattern: /[a-zA-Z]{4,12}/, message: '请输入4~12位由字母组成的用户名' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密 码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>记住用户名</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
               登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

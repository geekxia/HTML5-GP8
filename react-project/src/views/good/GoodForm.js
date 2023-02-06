
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  message
} from 'antd';

import CateSelect from './components/CateSelect'
import SingleUpload from './components/SingleUpload'
import './style.scss'

import { goodSubmit, goodDone, goodInfo } from '@/store/actions'

const { Option } = Select;

export default () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { done, info } = useSelector(state=>state.good)

  console.log('---id', id)

  useEffect(()=>{
    // 当有id时，表示是编辑，获取商品详情
    if (id) {
      dispatch(goodInfo(id))
    }
  }, [])

  useEffect(()=>{
    if (info._id) {
      // 使用异步数据填充表单初始值
      form.setFieldsValue(info)
    }
  }, [info])

  useEffect(()=>{
    if (done===1) {
      message.success(`${id?'修改成功':'添加成功'}`, 1, ()=>navigate(-1))
    }
    return () => {
      // 清缓存（重置good子store）
      dispatch(goodDone(0))
    }
  }, [done])

  const onFinish = values => {
    let data = {...values}
    if (id) {
      data.id = id
    }
    dispatch(goodSubmit(data))
  }

  return (
    <div className='goodform'>
      <div className='wrap'>
        <Form
          labelCol={{ span: 4}}
          wrapperCol={{ span: 10 }}
          onFinish={onFinish}
          form={form}
          initialValues={{
            img: '',
          }}
          scrollToFirstError
          validateTrigger={['onChange','onBlur']}
        >
          <Form.Item
            name='name'
            label='商品名称'
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '商品名称是必填信息' },
              { pattern: /[\u4e00-\u9fa5]{4,8}/, message:'商品名称只支持4~8个中文汉字' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='desc'
            label='商品描述'
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '商品描述是必填信息!' },
              { min: 20, max: 30, message: '商品描述在20~30个字之间' }
            ]}
            hasFeedback
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="cate"
            label="商品品类"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '请选择商品品类' }
            ]}
          >
            <CateSelect showAll={false} allowClear={false} />
          </Form.Item>

          <Form.Item
            name="price"
            label="商品价格"
            tooltip="What do you want others to call you?"
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '请输入商品价格' },
              {
                validator: (_, value) => {
                  if (value > 1) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('商品价格不能小于1元'))
                  }
                }
              }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="img"
            label="商品图片"
            rules={[
              { required: true, message: '商品图片是必填字段' },
            ]}
          >
            <SingleUpload />
          </Form.Item>

          <Form.Item
            label='是否热销'
            name="hot"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item wrapperCol={{offset:4}}>
            <Button type="primary" htmlType="submit">
              { id ? '修改' : '添加' }
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

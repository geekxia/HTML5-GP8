import { useEffect, useState, useMemo } from 'react'
import { useSelector, connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Row, Col, Input, Select, DatePicker, Table, Button, Modal } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { queryGoodList, goodDelete } from '@/store/actions'

import CateSelect from './components/CateSelect'
import './style.scss'

const { Option } = Select
const { confirm } = Modal
const { RangePicker } = DatePicker

// 商品列表组件
export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState(0)  // 触发搜索

  // 当filter变化，除page外，其它入参变化，都要把page=1
  const [filter, setFilter] = useState({
    cate: '',
    name: '',
    page: 1,
    size: 2
  })
  const [rowKeys, setRowKeys] = useState([])

  const { goodList, cates, total, done } = useSelector(state=>state.good)

  useEffect(()=>{
    dispatch(queryGoodList(filter))
  }, [count])

  useEffect(()=>{
    if (done===1) {
      let p = filter.page
      // 当是最后一页时，删除成功后回到前一页
      if (filter.page === Math.ceil(total / filter.size) && filter.page!==1) {
        p = filter.page - 1
      }
      dispatch(queryGoodList({...filter, page: p }))
      setFilter({...filter, page: p})
    }
  }, [done])

  useEffect(()=>{
    if (filter.name==='') {
      setCount(count+1)
    }
  }, [filter])


  const rowHandle = (flag, row) => {
    if (flag===2) {
      // 跳转编辑页
      navigate('/good/edit/'+row._id)
    }
    if (flag===1) {
      confirm({
        title: '危险',
        icon: <ExclamationCircleOutlined />,
        content: `你确定要删除 ${row.name} 这个商品吗？`,
        onOk() {
          dispatch(goodDelete(row._id))
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    }
  }

  const mulDelete = () => {
    console.log('---', rowKeys)
    let ids = rowKeys.reduce((prev, cur) => `${prev};${cur}`, '')
    console.log('---ids', ids)
    dispatch(goodDelete(ids))
  }

  const columns = useMemo(()=>{
    return (
      [
        {
          title: '商品',
          dataIndex: 'name',
          align: 'center',
          key: 'name',
          render: (text, row) => (
            <div className='good'>
              <img src={`http://localhost:9999${row.img}`} alt={text}/>
              <div>{ text }</div>
            </div>
          )
        },
        {
          title: '品类',
          dataIndex: 'cate',
          key: 'cate',
          align: 'center',
          render: (text) => {
            if (cates.length > 0) {
              const [ele] = cates.filter(ele=>ele.cate === text)
              return (<div>{ ele.cate_zh }</div>)
            }
          }
        },
        {
          title: '排名',
          dataIndex: 'rank',
          key: 'rank',
          align: 'center'
        },
        {
          title: '是否热销',
          dataIndex: 'hot',
          key: 'hot',
          align: 'center',
          render: hot => {
            return (<div>{ hot ? '是' : '否' }</div>)
          }
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align: 'center',
          render: price => (
            <div>{ '￥' + Number(price).toFixed(2) }</div>
          )
        },
        {
          title: '商品状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: status => {
            return (
              <div>{status ? '已上架' : '未上架' }</div>
            )
          }
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          render: (_, row) => (
            <>
              <Button
                danger
                onClick={()=>rowHandle(1, row)}>
                删除
              </Button>
              <Button
                type='primary'
                style={{marginLeft:'20px'}}
                onClick={()=>rowHandle(2, row)}>
                编辑
              </Button>
            </>
          ),
        }
      ]
    )
  }, [goodList, cates])

  return (
    <div className='goodlist'>
      <div className="filter">
        <Row align='middle'>
          <Col span={2}><div style={{textAlign:'right'}}>名称：</div></Col>
          <Col span={4}>
            <Input
              placeholder='请输入商品名称'
              value={filter.name}
              allowClear
              onChange={ev=>setFilter({...filter,name:ev.target.value})}
              onPressEnter={()=>{
                setFilter({...filter, page: 1})
                setCount(count+1)
              }}
            />
          </Col>
          <Col span={2}><div style={{textAlign:'right'}}>品类：</div></Col>
          <Col span={4}>
            <CateSelect
              value={filter.cate}
              onChange={val=>{
                setFilter({...filter, cate:val, page: 1})
                setCount(count+1)
              }}
            />
          </Col>
          <Col span={2}><div style={{textAlign:'right'}}>日期：</div></Col>
          <Col span={10}>
            <RangePicker />
          </Col>
        </Row>
        <Row align='middle' style={{marginTop:'20px'}}>
          <Col span={4} offset={2}>
            <Button type='primary' icon={<PlusOutlined />} onClick={()=>navigate('/good/add')}>新增</Button>
          </Col>
        </Row>

      </div>

      <div className='table'>
        <Table
          columns={columns}
          dataSource={goodList}
          rowKey='_id'
          rowSelection={{
            type: 'checkbox',
            columnWidth: '50px',
            onChange: (rowKeys, rows) => {
              console.log('--行选择', rowKeys, rows)
              setRowKeys(rowKeys)
            }
          }}
          footer={()=>{
            return (
              <Button danger disabled={rowKeys.length===0} onClick={mulDelete}>批量删除</Button>
            )
          }}
          title={()=>{
            return (
              <div>
                <span>商品列表</span>
              </div>
            )
          }}
          pagination={{
            total,
            current: filter.page,
            defaultPageSize: filter.size,
            pageSize: filter.size,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => {
              return `第${range[0]}-${range[1]}条 / 总共 ${total} 条`
            },
            pageSizeOptions: [2,5,10,20],
            onChange: (page, size) => {
              if (size === filter.size) {
                setFilter({...filter, page})
              } else {
                // 当size变化时，重置page=1
                setFilter({...filter, size, page:1})
              }
              setCount(count+1)
            }
          }}
        />
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, Modal, message } from 'antd'

export default props => {
  const { value, onChange } = props
  // Upload使用fileList进行受控，受控后会导致onChange只执行一次，参考#2423
  const [fileList, setFileList] = useState([])
  const [title, setTitle] = useState('')
  const [show, setShow] = useState(false)

  console.log('----value', value)

  useEffect(()=>{
    if (value) {
      setFileList([{
        thumbUrl: `http://localhost:9999${value}`
      }])
    }
  }, [value])

  // 当fileList变化（图片上传）时
  const imgChange = ({ file, fileList }) => {
    // 解决Upload受控后只触一次onChange的问题
    setFileList([...fileList])

    // console.log('---file', file)
    if (file.response) {
      const img = file.response.data.img
      onChange(img)
    }
  }

  // 删除一张图片，从fileList删除这张图片
  const imgRemove = () => {
    onChange('')
  }

  // 预览图片
  const imgPreview =  (file) => {
    console.log('----file', file)
    setShow(true)
    setTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  // 上传前检测
  const imgCheck = file => {
    const arr = ['image/png', 'image/jpg']
    if (!arr.includes(file.type)) {
      message.error('只支持 png / jpg 图片')
      return Promise.reject(file)
    }
    if (file.size/1024/1024 > 2) {
      message.error('图片不能大于 2M')
      return Promise.reject(file)
    }
    return Promise.resolve(file)
  }

  // 以后做上传时，上传地址是多少、后端用什么字段接收图片。
  // 有时候做上传也要加Token或其它Headers字段，这和axios封装没有关系，使用headers属性。
  return (
    <>
      <ImgCrop rotate>
        <Upload
          action='http://localhost:9090/api/v1/react/upload/img'
          name='good'
          headers={{
            Authorization: localStorage.getItem('token')
          }}
          maxCount={1}
          listType='picture-card'
          fileList={fileList}
          onChange={imgChange}
          onRemove={imgRemove}
          onPreview={imgPreview}
          beforeUpload={imgCheck}
        >
          { fileList.length === 0 && '+ Upload' }
        </Upload>
      </ImgCrop>
      <Modal visible={show} title={title} footer={null} onCancel={()=>setShow(false)}>
        <img
          alt="example"
          style={{ width: '100%' }}
          src={`http://localhost:9999${value}`}
        />
      </Modal>
    </>
  )
}

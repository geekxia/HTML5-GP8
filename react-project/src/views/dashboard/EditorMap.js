
import { Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import { Input } from 'antd'


console.log('BMapGL', window.BMapGL)
// console.log('BMap', window.BMap)
// const BMap = window.BMap
const BMapGL = window.BMapGL
let map = null  // 地图实例

export default () => {

  const [text, setText] = useState('')

  useEffect(()=>{
    // 创建地图实例
    map = new BMapGL.Map("container")

    // 创建一个点对象
    const point = new BMapGL.Point(116.404, 39.915)
    // 显示地图
    map.centerAndZoom(point, 15)

    console.log('--map', map)

    // 添加地图控件
    map.addControl(new BMapGL.ScaleControl())
    map.addControl(new BMapGL.ZoomControl());
    map.addControl(new BMapGL.CityListControl())

    // 使用自定义地图样式
    map.setMapStyleV2({
      styleId: '162b35e9852fa55baf63573878543520'
    })
    // 开启滚轮缩放
    map.enableScrollWheelZoom(true)
    // 添加地图事件
    map.addEventListener('click', ev => {
      console.log('---地图点击', ev.latlng)
    })

  }, [])

  const search = ev => {
    if (ev.keyCode===13) {
      // 创建地址解析器
      const geo = new BMapGL.Geocoder()
      geo.getPoint(text, point=>{
        console.log('---点对象', point)
        if (point) {
          // 把地图中心点移动这个点上
          map.centerAndZoom(point, 16)
          // 在这个点上添加一个Marker
          map.addOverlay(new BMapGL.Marker(point))
          // 再根据这个点得到更多信息
          geo.getLocation(point, ev=>{
            console.log('---地址信息', ev)
          })
        }
      })
    }
  }

  return (
    <div className="editor">
      <div className='map'>
        <div id="container" style={{width:'100%',height:'100%'}} />
      </div>

      <div className='search'>
        <Input value={text} onChange={ev=>setText(ev.target.value)} onKeyUp={search} />
      </div>
    </div>
  )
}

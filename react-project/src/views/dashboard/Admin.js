import { Row, Col } from 'antd'
import { useEffect, useState } from 'react'

import LineChart from './echarts/LineChart'
import RaddarChart from './echarts/RaddarChart'
import PieChart from './echarts/PieChart'
import BarChart from './echarts/BarChart'

const expectedData = [100, 120, 161, 134, 105, 160, 165]
const actualData = [120, 82, 91, 154, 162, 140, 100]

export default () => {

  const [expectedList, setExList] = useState([])
  const [actualList, setAcList] = useState([])

  useEffect(()=>{
    setTimeout(()=> {
      setExList(expectedData)
      setAcList(actualData)
    }, 200)
  }, [])

  return (
    <div className="admin">
      <Row>
        <Col span={24} style={{height:'300px'}}>
          <LineChart
            expectedList={expectedList}
            actualList={actualList}
          />
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={7} style={{height:'300px'}}>
          <RaddarChart />
        </Col>
        <Col span={7}style={{height:'300px'}}>
          <PieChart />
        </Col>
        <Col span={7}style={{height:'300px'}}>
          <BarChart />
        </Col>
      </Row>
    </div>
  )

}

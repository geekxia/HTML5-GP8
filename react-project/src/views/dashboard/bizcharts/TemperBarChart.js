import { useEffect } from 'react'
import { Chart, LineAdvance} from 'bizcharts'
import temperData from '../data/temper.js'

export default () => {

  const [temperList, setTemperList] = useState([])

  useEffect(()=>{
    setTimeout(()=>{
      setTemperList(temperData)
    }, 200)
  }, [])

  return (
    <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={temperList} >
      <LineAdvance
        shape="smooth"
        point
        area
        position="month*temperature"
        color="city"
      />
    </Chart>
  )
}

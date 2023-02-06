import { useEffect, useRef } from 'react'
const echarts = window.echarts

export default props => {

  const { actualList, expectedList } = props

  const ref = useRef(null)

  useEffect(()=>{
    // 创建一个echarts实例
    const chart = echarts.init(ref.current)
    // 设置它的配置选项
    chart.setOption({
      backgroundColor: '#ffffff',
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding: [5, 10]
      },
      yAxis: {
        axisTick: {
          show: false
        }
      },
      legend: {
        data: ['预期', '实际']
      },
      series: [
        {
          name: '预期', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#00ff00',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedList,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '实际',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualList,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
    })
    return () => {
      // 页面离开时销毁当前图表
      chart.dispose()
    }
  }, [actualList, expectedList])

  return (
    <div className="line" ref={ref} style={{width:'100%',height:'100%'}} />
  )
}

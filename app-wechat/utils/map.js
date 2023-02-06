const QQMapWX = require('./qqmap.js') // 引入SDK
const map = new QQMapWX({
  key: 'AHNBZ-OIZCD-WEK4D-HATSH-FK526-ZXFSD'
})
function calDistance (latLng, list) {
  console.log('---list', list)
  return new Promise(resolve=>{
    map.calculateDistance({
      mode: 'straight',
      from: latLng, // 用户当前位置
      to: list,   // 后端返回的商家列表
      success: res => {
        console.log('计算结果', res);
        let newList = []
        for (var i = 0; i < res.result.elements.length; i++) {
          let ele = {...list[i]}
          ele['distance'] = res.result.elements[i].distance
          newList.push(ele)
        }
        console.log('---newlist', newList)
        resolve(newList)
      },
      fail (err) {
        console.log('---计算失败', err)
      }
    })
  })
  
}

module.exports = {
  calDistance
}
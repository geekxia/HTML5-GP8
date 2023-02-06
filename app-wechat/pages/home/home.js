// pages/home/home.js
const { calDistance } = require('../../utils/map')
Page({
  data: {
    navId: 'n1',
    toView: 'n1',
    navs: [
      { id: 1, label: '酒店1' },
      { id: 2, label: '酒店2' },
      { id: 3, label: '酒店3' },
      { id: 4, label: '酒店4' },
      { id: 5, label: '酒店5' },
      { id: 6, label: '酒店6' },
      { id: 7, label: '酒店7' },
      { id: 8, label: '酒店8' },
      { id: 9, label: '酒店9' },
      { id: 10, label: '酒店10' },
      { id: 11, label: '酒店11' },
      { id: 12, label: '酒店12' }
    ],
    isPos: false,  // 标记，用户是否授权过地址信息
    list: [],
    latLng: {},
    region: ['', '', ''],
    markers: [
      {
        id: 10,
        latitude: 39.984060,
        longitude: 116.307520,
        iconPath: '/assets/pos.png',
        width: 20,
        height: 20
      }
    ]
  },
  goTo () {
    wx.openLocation({
      latitude: 39.984060,
      longitude: 116.307520,
      name: '千锋教育',
      address: '深圳宝安西部硅谷'
    })
  },
  call () {
    wx.makePhoneCall({
      phoneNumber: '0755-45680909',
    })
  },
  itemTap (ev) {
    // console.log('---ev', )
    const id = ev.target.dataset.id
    this.setData({
      navId: 'n'+id,
      toView: 'n' + (id-1)
    })
  },

  regionChange (ev) {
    console.log('---ev', ev)
    this.setData({region: ev.detail.value})
  },

  openSettingPage () {
    // 打开微信内置的授权页面
    wx.openSetting({
      success (res) {
        console.log('用户手动同意了位置信息', res)
      },
      fail (err) {
        console.log('用户仍然未同意位置信息', err)
      }
    })
  },
  onShow() {   
    // 查询用户的授权列表，给一个交互提示，让用户打开授权页面
    wx.getSetting({
      success: (res) => {
        this.setData({
          isPos: res.authSetting['scope.userLocation']
        })
      }
    })
    // 获取用户当前的经纬度
    wx.getLocation({
      success: res => {
        console.log('用户位置', res)
        this.setData({
          latLng: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
        // 获取商家列表
        this.getList()
      },
      fail (err) {
        console.log('获取用户失败', err)
      }
    })
    // 鉴别用户位置变化
    wx.onLocationChange(res=>{
      console.log('---用户位置变化', res)
    })
  },

  getList () {
    const params = {}
    const list = [
      { id: 1, name: 'AAAA', latitude: 39.984060, longitude: 116.307520 },
      { id: 2, name: 'BBBB', latitude: 39.984060, longitude: 116.307520 },
      { id: 3, name: 'CCCC', latitude: 39.984060, longitude: 116.307520 },
      { id: 4, name: 'DDDD', latitude: 39.984060, longitude: 116.307520 }
    ]
    calDistance(this.data.latLng, list).then(newList=>{
      // console.log('---page newList', newList)
      this.setData({
        list: [...this.data.list, ...newList]
      })
    })    
  },

  take () {
    wx.chooseMedia({
      mediaType: ['image', 'video'],
      success () {}
    })
  },

  getInfo () {
    wx.getUserProfile({
      desc: '为了更好的用户体验',
      success (res) {
        console.log('用户信息', res)
      }
    })
  },

  getMobile (res) {
    console.log('---手机信息', res)
  },

  onPullDownRefresh () {
    console.log('---下拉刷新')
    this.setData({list: []})
    this.getList()
  },

  onReachBottom () {
    console.log('---触发加载')
    this.getList()
  },

  onPageScroll (res) {
    // console.log('滚动位置', res)
  }
})
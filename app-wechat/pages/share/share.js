// pages/share/share.js
Page({
  data: {
    avatar: '/assets/avatar.png'
  },

  getAvatar (ev) {
    console.log('----', ev)
    this.setData({avatar: ev.detail.avatarUrl})
  },
  // 分享：胶囊按钮、open-type='share'
  onShareAppMessage(res) {
    console.log('---分享', res)
    if (res.from==='menu') {
      return {
        title: '发现一件宝贝',
        path: '/pages/share/share',
        imageUrl: 'https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/88254/19/18136/50005/614d6633E54863d28/6669cb5b1259ffd6.jpg.webp'
      }
    } else {
      return {
        title: '邀请你拼团',
        path: '/pages/index/index?id=100',
        imageUrl: 'https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/88254/19/18136/50005/614d6633E54863d28/6669cb5b1259ffd6.jpg.webp'
      }
    }
  }
})
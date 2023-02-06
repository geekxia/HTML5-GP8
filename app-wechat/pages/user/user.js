// pages/user/user.js
Page({
  rpx2px (arg) {
    const info = wx.getSystemInfoSync()
    const width = info.screenWidth
    return arg * width / 750
  },
  // 获取图片对象
  async getImage (url) {  
    const off = wx.createOffscreenCanvas({type:'2d'})
    const image = off.createImage()   
    await new Promise((resolve, reject)=>{      
      image.onload = resolve  // 绘制图片逻辑
      image.src = url
    })
    return image
  },

  onShow () {
    this.draw()
  },

  draw () {
    const $ = wx.createSelectorQuery()
    $.select('#canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        // Canvas 对象
        const canvas = res[0].node
        this.canvas = canvas
        // Canvas 画布的实际绘制宽高
        const width = res[0].width
        const height = res[0].height

        // 创建canvas渲染上下文
        const ctx = canvas.getContext('2d')
        const dpr = wx.getWindowInfo().pixelRatio
        console.log('---dpr', dpr)
        // 手动改变canvas的宽和高
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        // 以上代码都是基础工作，给canvas写css样式时可以使用rpx单位。

        ctx.fillStyle = 'orange'
        ctx.fillRect(0,0, this.rpx2px(750),  this.rpx2px(400))
        
        ctx.fillStyle = 'white'
        ctx.font = `bold ${this.rpx2px(80)}px serif`
        ctx.fillText('千锋教育', this.rpx2px(215), 50)

        this.getImage('https://img13.360buyimg.com/n7/jfs/t1/181359/12/16864/56754/6103c6b4Ec1bdb164/1fc0fe986e204797.jpg').then(image=>{
          console.log('---image', image)
          ctx.drawImage(
            image, 
            this.rpx2px(188), this.rpx2px(120),
            this.rpx2px(375), this.rpx2px(200)
          )
        })
    })
  },

  save () {
    // 第一步，把canvas画布转换成临时图片    
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.rpx2px(750),
      height: this.rpx2px(400),
      canvas: this.canvas,  // canvas实例对象
      destWidth: 1500,
      destHeight: 800,
      success (res) {
        // 第二步，把图片写入到相册（请求访问相册）
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }
    })
  }
})
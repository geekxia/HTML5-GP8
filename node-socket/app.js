const http = require('http')
const { Server } = require('socket.io')

const httpServer = http.createServer()

// 这个io就是socket服务器
const io = new Server(httpServer, {
  // 处理socket跨域问题
  cors: {
    origin: ['http://localhost:8888', 'http://localhost:9999']
  }
})

// 当有客户端连接成功时触发
// 这个回调函数中的socket

io.on('connection', socket => {
  io.emit('client', '恭喜你连接成功')
  socket.on('server', payload=>{
    console.log('---来自客户端发来的问候:', payload)
    const { user_id, msg } = payload
    // 在这里区分商家
    // io.emit('client', msg)
    io.emit(user_id, msg)    
  })
})

httpServer.listen(9090, ()=>console.log('socket server is running on 9090'))

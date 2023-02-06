/** @type {import('next').NextConfig} */

const path = require('path')

// 背后也是webpack
module.exports = {
  reactStrictMode: false,  // 关闭React.StrictMode严格模式
  webpack: (config) => {
    // Important: return the modified config
    config.resolve.alias = {      
      '@': path.resolve(__dirname),
      '@components': path.resolve(__dirname, './components'),
      '@styles': path.resolve(__dirname, './styles'),
      ...config.resolve.alias,
    }
    return config
  },
}

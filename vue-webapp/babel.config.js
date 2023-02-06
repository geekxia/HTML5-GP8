// Babel编译器的配置文件

module.exports = {
  // Babel的预设
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // Babel的插件
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}

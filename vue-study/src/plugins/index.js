import QfButton from './components/QfButton.vue'
import QfCheckbox from './components/QfCheckbox3.vue'


const QfPlugin = {
  install (Vue) {
    // do something

    Vue.filter('abc', val=>val)

    Vue.component('qf-button', QfButton)
    Vue.component('qf-checkbox', QfCheckbox)


    const isLogin = false  // 来自store
    Vue.directive('login', (el,binding) => {

      const oDiv = document.createElement('div')
      el.style.position = 'relative'
      oDiv.style.position = 'absolute'
      oDiv.style.top = 0
      oDiv.style.bottom = 0
      oDiv.style.left = 0
      oDiv.style.right = 0
      oDiv.style.zIndex = 9999

      if (!isLogin) {
        el.appendChild(oDiv)
        oDiv.addEventListener('click', ()=>{
          console.log('跳转登录页')
        })
      }
    })

    Vue.mixin({
      data () {
        return {
          url: 'http://mi.com',
          msg: '2022'
        }
      },
      methods: {
        cate2zh (val) {
          return val || ''
        }
      }
    })

    Vue.prototype.$message = (opt) => {
      alert(opt.msg)
    }

  }
}

export default QfPlugin

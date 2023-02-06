<template>
  <div>

    <ChildA a='11' class='box' style='color:red;' @bb='console.log(1)'></ChildA>
    <ChildB></ChildB>

    <hr>
    <h1>学习生命周期</h1>
    <h1 v-text='aa' @click='a++'></h1>
    <input type="text" v-model='aa' />
    <button @click='bye'>再见</button>
    <hr>

    <div v-login>
      <button @click='addToCart'>加入购物车</button>
    </div>
    <hr>


    <!-- <transition name='xxx'>
      <h1 v-if='toggle'>好程序员</h1>
    </transition> -->

    <!-- <transition
      enter-active-class='animate__animated animate__backInDown'
      leave-active-class='animate__animated animate__backOutDown'
      mode='in-out'
    >
      <h1 key='1' v-if='toggle'>好程序员8班</h1>
      <h1 key='2' v-else>好程序员9班</h1>
    </transition> -->

    <qf-model :visable='toggle' @close='toggle=false' title='你好' show-close>
      <template #zs='xxx'>
        <div :title="xxx.count">
          <input type="text" />
        </div>
      </template>
      <template #close>
        <div @click='toggle=false'>0</div>
      </template>
    </qf-model>

    <button @click='toggle=!toggle'>显示与隐藏</button>
    <hr>

    <h1 v-text='cate2zh("你好")'></h1>
    <button @click='qfalert(11)'>测试</button>

    <qf-button></qf-button>
    <hr>

    <h1 v-text='info.a.b[0].c.d'></h1>
    <button @click='add'>自增</button>
    <hr>

    <h1>请选择你的爱好：</h1>

    <qf-checkbox :data='list' label='name' v-model='fav' />
    <!-- <qf-checkbox :data='list' label='name' :value='fav' @input='fav=$event' /> -->




  </div>
</template>

<script>

import QfModel from '@/components/QfModel.vue'
import ChildA from './ChildA.vue'
import ChildB from './ChildB.vue'


import toast from '@/mixins/toast'

export default {
  mixins: [toast],
  components: {
    QfModel, ChildA, ChildB
  },
  data () {
    return {
      list: [
        { id: 1, name: '排球', value: 'a' },
        { id: 2, name: '足球', value: 'b' },
        { id: 3, name: '蓝球', value: 'c' },
      ],
      fav: [],  //
      bol: true,
      msg: '2024',
      a: 1,
      toggle: false,
      info: {
        a: {
          b: [
            { c: { d: 1000 }}
          ]
        }
      }
    }
  },
  computed: {
    aa : {
      get () {
        return this.a + 1+1+1
      },
      set (val) {
        this.a = val -1-1-1
      }
    }
  },
  methods: {
    add () {
      this.info.a.b[0].c.d++
      this.$nextTick(fn)
      // this.$forceUpdate()
      this.info = JSON.parse(JSON.stringify(this.info))
    },
    bye () {
      this.$destroy()
    },
    addToCart () {
      console.log('---调接口')
    }
  },
  beforeCreate () {
    console.log('---1')
  },
  created () {
    console.log('---2')
  },
  beforeMount () {
    console.log('---3')
  },
  mounted () {
    console.log('---4')
    // console.log('this', this.$message({msg:'你好'}))
  },
  beforeUpdate () {
    console.log('---5')
  },
  updated () {
    console.log('---6')
  },
  beforeDestroy () {
    console.log('---7')
  },
  destroyed () {
    console.log('--8')
  }
}
</script>

<style lang="css" scoped>

</style>

<style scoped>
  .xxx-enter {
    opacity: 0;
    color: red;
  }
  .xxx-enter-active {
    transition: all ease 2s;
  }
  .xxx-enter-to {
    opacity: 1;
    color: green;
  }

  .xxx-leave {
    opacity: 1;
    color: black;
  }
  .xxx-leave-active {
    transition: all ease 2s;
  }
  .xxx-leave-to {
    opacity: 0;
    color: blue;
  }
</style>

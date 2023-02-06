<template>
  <div id="app">
    <StudyLife></StudyLife>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import StudyLife from './study/StudyLife.vue'

export default {
  name: 'App',
  components: {
    StudyLife
  },
  data () {
    return {
      xx: 1000000
    }
  },
  methods: {
    changeXX (arg) {
      this.xx = arg
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div>
    <span v-for='(item,idx) in data' :key='idx'>
      <input type="checkbox" :value='item.value' v-model='arr[idx]' />
      <span v-text='item[label]'></span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array, default: [] },
    label: { type: String, default: 'label' },
    value: { type: Array, default: [] }
  },
  data () {
    return {
      arr: []
    }
  },
  mounted () {
    // console.log('---this props', this.props)
    this.arr = this.data.map(ele=>(
      this.value.includes(ele.value)
    ))
  },
  watch: {
    arr () {
      // console.log('change arr', this.arr)
      const result = this.data.map((ele,idx)=>{
        if (this.arr[idx]) return ele.value
        else return ''
      })
      this.$emit('input', result.filter(ele=>ele))
    }
  }
}
</script>

<style lang="css" scoped>
</style>

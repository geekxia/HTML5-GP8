<template>
  <div>
    <span v-for='(item,idx) in list' :key='idx'>
      <!-- <input type="checkbox" :value='item.value' :checked='value.includes(item.value)' @change='change' /> -->
      <input type="checkbox" :value='item.value' v-model='item.checked' @click='rowClick(idx)' />
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
    console.log('---this props', this.props)
    this.arr = this.data.map(ele=>(
      this.value.includes(ele.value)
    ))
  },
  computed: {
    list () {
      return this.data.map(ele=>{
        return { ...ele, checked: this.value.includes(ele.value) }
      })
    }
  },
  watch: {
    arr () {
      console.log('change arr', this.arr)
      const result = this.data.map((ele,idx)=>{
        if (this.arr[idx]) return ele.value
        else return ''
      })
      this.$emit('input', result.filter(ele=>ele))
    }
  },
  methods: {
    change (ev) {
      console.log('ev', ev.target.checked, ev.target.value)
      const { checked, value } = ev.target
      if (checked) {
        this.$emit('input', [...this.value, value])
      } else {
        this.$emit('input', this.value.filter(ele=>ele!==value))
      }
    },
    rowClick (idx) {
      console.log('idx', idx, this.list[idx].checked)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

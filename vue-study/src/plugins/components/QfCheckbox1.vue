<template>
  <div>
    <span v-for='(item,idx) in data' :key='idx'>
      <input type="checkbox" :value='item.value' :checked='value.includes(item.value)' @change='change' />
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
  methods: {
    change (ev) {
      // console.log('ev', ev.target.checked, ev.target.value)
      const { checked, value } = ev.target
      if (checked) {
        this.$emit('input', [...this.value, value])
      } else {
        this.$emit('input', this.value.filter(ele=>ele!==value))
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>

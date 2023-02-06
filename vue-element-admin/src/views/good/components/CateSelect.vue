<template>
  <div class='qf-good-select'>
    <el-select placeholder="请选择品类" :value='value' @change='$emit("input", $event)' :clearable='clearable'>
      <el-option
        v-for="item in cateList"
        :key="item._id"
        :label="item.cate_zh"
        :value="item.cate">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    value: { type: String, default: '' },
    clearable: { type: Boolean, default: false }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('good', ['cateList'])
  },
  mounted () {
    this.getCates()
  },
  methods: {
    ...mapActions('good', ['getCates'])
  }
}
</script>

<style lang="css" scoped>
</style>

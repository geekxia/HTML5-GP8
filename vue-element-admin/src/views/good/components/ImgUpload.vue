<template>
  <div class="qf-img-upload">
    <el-upload
      class="upload-demo"
      action="http://localhost:8888/api/v1/element/upload/img"
      name='good'
      drag
      :multiple='false'
      :show-file-list='false'
      :on-success='imgSuccess'
      :before-upload='imgCheck'
      :limit='1'
      :file-list='list'
    >
      <div v-if='value' class='good' @mouseenter='show=true' @mouseleave='show=false'>
        <img class='good-img' :src='`http://localhost:9999${value}`' alt=""/>
        <div class='good-layer' v-if='show'>
          <i class="el-icon-delete" @click.stop='imgRemove'></i>
        </div>
      </div>
      <div v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {
      show: false,
      list: []
    }
  },
  methods: {
    imgSuccess (response, file) {
      console.log('---response', response)
      console.log('---file', file)
      if (response.err===0) {
        const img = response.data.img
        this.$emit('input', img)
      }
    },
    // 上传之前，一般验证两个：大小、后缀
    imgCheck (file) {
      console.log('---上传之前', file)
      const arr = ['image/png', 'image/jpg']
      if (!arr.includes(file.type)) {
        this.$message.error('只能使用png或jpg图片')
        return false
      }
      if (file.size/1024/1024 >= 2) {
        this.$message.error('图片不能超过2M')
        return false
      }
    },
    imgRemove () {
      this.$emit('input', '')
      // console.log('---')
      this.list = []  // 清空file-list
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  position: relative;
  .good-img {
    display: block;
    height: 100%;
  }
  .good-layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 9999;
    color: rgba(255,255,255,0.8);
    font-size: 30px;
  }
}

</style>

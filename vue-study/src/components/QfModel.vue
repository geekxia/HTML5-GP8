<template>
  <div class='layer' v-show='visable'>
    <div class='modal'>
      <div class='header'>
        <div class='title' v-text='title'></div>
        <slot name='close'>
          <div class='close' v-show='showClose' @click='$emit("close")'>X</div>
        </slot>
      </div>
      <div class='body'>
        <slot name='zs' :count='count'>
          <div>10086</div>
        </slot>
      </div>
      <div class='footer'>
        <span v-if='type=="danger"' class='danger' @click='$emit("ok")'>删除</span>
        <span v-else class='primary' @click='$emit("ok")'>确定</span>
        <span @click='$emit("close")'>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false, default: '标题' },
    showClose: { type: Boolean, required: false, default: true },
    type: { type: String, required: false, default:'primary' },
    visable: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      count: Math.random()
    }
  }
}
</script>

<style lang="css" scoped>
.layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
}

.modal {
  width: 430px;
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -215px;
  background: white;
  border-radius: 2px;
}

.header {
  line-height: 50px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 14px;
  height: 51px;
  overflow: hidden;
}

.title {
  float: left;
}
.close {
  float: right;
  cursor: pointer;
}

.body {
  box-sizing: border-box;
  padding: 25px;
  font-size: 14px;
}

.footer {
  height: 51px;
  box-sizing: border-box;
  overflow: hidden;
  border-top: 1px solid #eee;
  padding: 0 15px;
}
.footer>span {
  float: right;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
  line-height: 28px;
  padding: 0 15px;
  font-size: 12px;
  border: 1px solid #eee;
  border-radius: 2px;
  margin-top: 10px;
  margin-left: 10px;
}
.footer>span.primary {
  background-color: blue;
  color: white;
  border-color: blue;
}
.footer>span.danger {
  background-color: red;
  color: white;
  border-color: red;
}
</style>

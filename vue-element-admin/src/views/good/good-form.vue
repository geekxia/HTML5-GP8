<template>
  <div class='good-form' style="width:500px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="img">
        <ImgUpload v-model='ruleForm.img' />
      </el-form-item>

      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item label="商品品类" prop="cate">
        <!-- <CateSelect :value='ruleForm.cate' @input='ruleForm.cate=$event' /> -->

        <CateSelect v-model='ruleForm.cate' />
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model="ruleForm.price" controls-position="right" :min="0"></el-input-number>
      </el-form-item>



      <el-form-item label="商品排名" prop="rank">
        <el-input-number v-model="ruleForm.rank" controls-position="right"  :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="是否热销" prop="hot">
        <el-switch v-model="ruleForm.hot"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import CateSelect from './components/CateSelect'
import ImgUpload from './components/ImgUpload'
import { fetchGoodForm, fetchGoodInfo } from '@/api/good'

export default {
  name: 'GoodForm',
  components: { CateSelect, ImgUpload },
  props: {
    id: { type: String, default: '' }
  },
  data () {

    var validatePrice = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('价格不能小于零'));
      } else {
        callback()
      }
    }

    return {
      ruleForm: {
          name: '',
          img: '',
          hot: false,
          desc: '',
          price: 0,
          cate: '',
          rank: 0
        },
        rules: {
          // 编写验证规则：要验证什么，如果违背规则给什么提示，触发机制
          name: [
            { required: true, message: '商品名称是必须字段', trigger: 'blur' },
            { pattern: /[\u4e00-\u9fa5]{4,6}/, message: '长度在 4 到 6 个字符', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '商品图片是必须字段', trigger: 'blur' },
          ],
          desc: [
            { pattern: /[\u4e00-\u9fa5]{20,24}/, message: '长度在 20到 24个字符', trigger: 'blur' }
          ],
          price: [
            { validator: validatePrice, trigger: 'blur' }
          ]
        }
    }
  },
  mounted () {
    console.log('---id', this.id)
    if (this.id) {
      fetchGoodInfo(this.id).then(res=>{
        console.log('商品详情', res)
        this.ruleForm = res.data.info
      })
    }
  },
  methods: {
    submit (form) {
      console.log('---form', form)
      const data = { ...this.ruleForm }
      if (this.id) data['id'] = this.id
      console.log('---data', data)
      // return false
      fetchGoodForm(data).then(res=>{
        this.$message({
          type: 'success',
          message: `${this.id?"修改成功":"添加成功"}`,
          duration: 1500,
          onClose: () => {
            console.log('msg消失')
            this.$router.replace('/good/list')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.good-form {
  box-sizing: border-box;
  margin: 25px;
}
</style>

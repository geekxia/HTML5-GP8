<template>
  <div class='good-cate'>
    <div class='filter'>
      <el-row>
        <el-col :span='4'>
          <el-button type='primary' @click='show=true'>新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table
       :data="tableData"
       style="width: 100%">
       <el-table-column
          label='序号'
          align='center'
          type='index'>
       </el-table-column>
       <el-table-column
         prop="cate_zh"
         label="品类名称"
         align='center'>
       </el-table-column>
       <el-table-column
         prop="cate"
         label="品类字段"
         align='center'>
       </el-table-column>
       <el-table-column
         prop="handle"
         label="操作"
         align='center'>
         <template>
           <el-button type='danger'>删除</el-button>
           <el-button type='primary'>编辑</el-button>
         </template>
       </el-table-column>
     </el-table>
    </div>

    <!-- 新增品类的弹框 -->
    <el-dialog title="收货地址" :visible.sync="show">
      <el-form :model="form">
        <el-form-item label="品类名称" :label-width='width'>
          <el-input v-model="form.cate_zh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品类字段" :label-width='width'>
          <el-input v-model="form.cate" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { fetchCateAdd, fetchCateAll } from '@/api/good'
export default {
  name: 'GoodCate',
  data () {
    return {
      show: false,
      form: {
        cate: '',
        cate_zh: ''
      },
      width: '80px',
      tableData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      fetchCateAll().then(res=>{
        console.log('----res', res)
        if (res.err === 0) {
          this.tableData = res.data.list
        }
      })
    },
    submit () {
      console.log('提交', this.form)
      // 自添加表单验证
      fetchCateAdd(this.form).then(res=>{
        console.log('---', res)
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 1000
        })
        this.show = false
        this.form = { cate: '', cate_zh: '' }
        this.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.good-cate {
  box-sizing: border-box;
  margin: 25px;
  filter: {
    margin-bottom: 25px;
  }
}
</style>

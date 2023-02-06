<template>
  <div class='check-good'>
    <div class='table'>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop='name'
          label="商品"
          align='center'>
        </el-table-column>
        <el-table-column
          prop='check_status'
          align='center'
          label="审核状态">
        </el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type='primary' @click="handleRow(scope.row, 1)">查看</el-button>
            <el-button type="primary" @click="handleRow(scope.row, 2)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 审核对话框 -->
    <el-dialog
      title="审核"
      :visible.sync="show"
      width="30%">
      <div>
        <div style='lineHeight:40px;'>如果你驳回，请输入驳回理由！</div>
        <el-input
          type="textarea"
          :rows="2"
          v-model.lazy.trim='content'
          placeholder="请输入审核信息">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type='danger' @click="submit(-1)">驳回</el-button>
        <el-button type="primary" @click="submit(1)">审核通过</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCheckGoodList , fetchCheckGood } from '@/api/check'
export default {
  name: 'CheckGood',
  data () {
    return {
      list: [],
      show: false,
      curRow: {},   // 表示用户正在操作的行
      content: ''
    }
  },
  methods: {
    init () {
      fetchCheckGoodList().then(res=>{
        console.log('--审核商品列表', res)
        this.list = res.data.list
      })
    },
    handleRow (row, flag) {
      if (flag === 2) {
        console.log('---审核')
        this.show = true
        this.curRow = row
      }
    },
    submit (check) {
      const data = {
        good_id: this.curRow._id,
        check,
        content: '你的图片有问题'
      }
      if (check == -1 && !this.content) return this.$message({
        message: '请输入驳回理由',
        type: 'warning'
      })
      fetchCheckGood(data).then(res=>{
        console.log('---审核完成', res)
        this.init()
        this.show = false
        this.content = ''
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .check-good {
    margin: 25px;
  }
</style>

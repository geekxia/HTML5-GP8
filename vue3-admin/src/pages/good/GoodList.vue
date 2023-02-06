<script setup>
  import { reactive, ref } from 'vue'
  const page = ref(1)
  const size = ref(5)

  const options = reactive([
    { id: 1, value: 'a', label: '已完成' },
    { id: 2, value: 'b', label: '已支付' },
    { id: 3, value: 'c', label: '已评价' },
    { id: 4, value: 'd', label: '已代理' }
  ])

  const list = reactive([
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ])
</script>

<template>
  <div class='good-list'>
    <div class="filter">
      <el-row>
        <el-col :span="24">
          <el-input style="width:180px;" placeholder='输入订单号' />
          <el-select style="width:180px;margin:0 12px;" placeholder='请选择订单状态'>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" icon="edit">配货完成</el-button>
          <el-button type="primary" icon="share">出库</el-button>
          <el-button type="danger" icon="delete">关闭订单</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="list"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" align='center' />
        <el-table-column label="日期" width="120" align='center' >
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="姓名" width="120" align='center' />
        <el-table-column property="address" label="地址" show-overflow-tooltip />
        <el-table-column label='操作' align='center'>
          <template #default='scope'>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div >
      <el-pagination
        v-model:currentPage="page"
        v-model:page-size="size"
        :page-sizes="[5, 10, 15, 20]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50"
      />
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .good-list {
    .filter {
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
    }
    .table {
      padding: 20px 0;
    }
    .el-pagination {
      justify-content: end;
    }
  }
</style>

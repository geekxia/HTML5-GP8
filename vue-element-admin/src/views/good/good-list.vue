<template>
  <div class='good-list'>
    <div class='filter'>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="商品名称" v-model='filter.name' clearable />
        </el-col>
        <el-col :span='3'>
          <CateSelect v-model='filter.cate' clearable />
        </el-col>
        <el-col :span='3'>
          <el-select placeholder="审核状态" v-model='check'>
            <el-option value='' label='全部'></el-option>
            <el-option value='1' label='待审核'></el-option>
            <el-option value='0' label='已审核'></el-option>
          </el-select>
        </el-col>
        <el-col :span='12'>
          <el-button icon='el-icon-search' type='primary' @click='search'>搜索</el-button>
          <el-button icon='el-icon-edit' type='primary' @click='skipToAdd'>新增</el-button>
          <el-button icon='el-icon-download' type='primary'>导出</el-button>
          <el-checkbox style='marginLeft:15px;' label="审核人"></el-checkbox>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">

        <el-table-column
          label='序号'
          align='center'
          width='100px'
          type="index">
        </el-table-column>

        <el-table-column
          prop="name"
          label="商品"
          align='center'
          width="180">
          <template slot-scope='scope'>
            <div class='good'>
              <img :src='`${$cdn}${scope.row.img}`' alt="" />
              <div v-text='scope.row.name'></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="cate"
          align='center'
          label="品类">
          <template slot-scope='scope'>
            <div v-text='cate2Zh(scope.row.cate)'></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="price"
          align='center'
          label="价格">
          <template slot-scope='scope'>
            <div v-cloak>{{scope.row.price | toRMB}}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="create_time"
          align='center'
          label="时间">
          <template slot-scope='scope'>
            <div v-cloak>{{scope.row.create_time | ymd}}</div>
            <div v-cloak>{{scope.row.create_time | hms}}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="hot"
          align='center'
          label="是否热销">
          <template slot-scope='scope'>
            <div v-text='(scope.row.hot?"是":"否")'></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="check_status"
          align='center'
          label="审核状态">
          <template slot-scope='scope'>
            <div v-text='check2ZH(scope.row.check_status)'></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="store_status"
          align='center'
          label="上架状态">
          <template slot-scope='scope'>
            <div v-text='(scope.row.store_status?"已上架":"未上架")'></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="handle"
          align='center'
          width='300'
          label="操作">
          <template slot-scope='scope'>
            <el-button type="danger" @click='rowHandle(scope.row, 2)'>删除</el-button>
            <el-button type="primary" @click='rowHandle(scope.row, 1)'>编辑</el-button>
            <el-button :disabled='!scope.row.store_status' type="primary" @click='rowHandle(scope.row, 3)'>
              {{(scope.row.store_status?"下架":"上架")}}
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class='page'>
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        background
        :current-page="filter.page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="filter.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CateSelect from './components/CateSelect'
import { fetchGoodList } from '@/api/good'
import { mapState } from 'vuex'
export default {
  name: 'GoodList',
  components: { CateSelect },
  data () {
    return {
      check: '',
      tableData: [],
      total: 0,
      filter: {
        page: 1,
        size: 2,
        name: '',
        cate: ''
      },
      count: 0
    }
  },
  computed: {
    ...mapState('good', ['cateList'])
  },
  watch: {
    count () {
      this.init()
    }
  },
  mounted () { this.init() },
  activated () { this.init() },
  methods: {
    init () {
      fetchGoodList(this.filter).then(res=>{
        console.log('---res', res)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    indexSort (a,b) {
      console.log('---', a, b)
      return 1
    },
    sizeChange (size) {
      console.log('--size', size)
      this.filter = { ...this.filter, size, page: 1 }
      this.count++
    },
    pageChange (page) {
      console.log('--page', page)
      this.filter = { ...this.filter, page }
      this.count++
    },
    skipToAdd () {
      this.$router.push({name:'GoodAdd'})
    },
    cate2Zh (cate) {
      if (this.cateList.length>0) {
        const arr = this.cateList.filter(ele=>ele.cate===cate)
        if (arr.length === 1) {
          return arr[0].cate_zh
        }
      }
      return ''
    },
    check2ZH (check) {
      return (check===0?'审核中':(check===1?'审核成功':'审核失败'))
    },
    search () {
      // console.log('---', this.filter)
      this.filter = { ...this.filter, page: 1 }
      this.count++
    },
    rowHandle (row, flag) {
      if (flag === 1) {
        this.$router.push(`/good/edit/${row._id}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good-list {
  box-sizing: border-box;
  margin: 25px;
  min-width: 1200px;
  .table {
    margin: 25px 0;
  }
  .good {
    text-align: center;
    img {
      display: inline-block;
      width: 60px;
      height: 60px;
    }
  }
}
</style>

<!-- 粗粒度权限（路由）
细粒度权限（元素） -->

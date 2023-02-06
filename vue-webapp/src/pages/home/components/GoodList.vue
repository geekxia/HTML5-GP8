<template>
<div>
  <div class="row" v-for='(_i, i) in row' :key='_i'>
    <!-- flex右一个右一个 -->
    <div class="row-wrap">
      <div v-for='(_j, j) in 2' :key='_j'>
        <div @click='skip(item(i,j))'>
          <img :src='($cdn + item(i,j).img)' />
          <div>
            <span v-text='item(i,j).name'></span>
            <span v-text='item(i,j).desc'></span>
          </div>
          <div>
            <span v-text='item(i,j).price'></span>
            <span>闪购</span>
            <span>看相似</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      list: { type: Array, required: true }
    },
    computed: {
      row () {
        // 把行数的处理方法封装起来
        return Math.floor(this.list.length / 2)
      }
    },
    methods: {
      // 为什么要把 item 封装成methods，而不是computed
      item (i, j) {
        return this.list[i*2+j]
      },
      skip (item) {
        // 路由路由跳转
        this.$router.push(`/detail/${item._id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
.row {
    box-sizing: border-box;
    padding: 0 .13rem;
    margin-top: .13rem;
    .row-wrap {
      width: 100%;
      display: flex;
      font-size: .37rem;
      &>div {
        flex: 1;
        text-align: center;
        background-color: white;
        &>div {
          width: 4.61rem;
          height: 6.93rem;
          display: inline-block;
          img {
            display: block;
            width: 4.61rem;
            height: 4.61rem;
          }
        }
      }
    }
  }
</style>

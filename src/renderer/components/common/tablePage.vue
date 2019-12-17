<template>
  <div class="table-page">
    <el-pagination layout="total, prev, pager, next, jumper"
      :total="total"
      :small="false"
      :current-page="pageNo"
      :page-size="pageSize"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'table-page',
  props: {
    //总数据量
    total: {
      type: Number,
      default: 0
    },
    //当前页
    pageNo: {
      type: Number,
      default: 1
    },
    //每页最多显示的数据量
    pageSize: {
      type: Number,
      default: 15
    },
  },
  methods: {
    /**
     * 分页切换
     */
    changePage(pageNo) {
      this.$emit('changePage', pageNo);
    }
  }
}
</script>
<style lang="scss">
.table-page {
  text-align: center;
  .el-pagination {
    .el-pager li,
    .el-pager li.active + li,
    .btn-prev,
    .btn-next,
    .el-pagination__editor {
      border-left: 1px solid #d1dbe5;
      border-right: 1px solid #d1dbe5;
      margin: 0 3px 0 3px;
      width: 38px;
      height: 38px;
      line-height: 38px;
    }
    .el-select .el-input input {
      height: 38px;
      line-height: 38px;
    }
    .el-pagination__total {
      margin-top: 5px;
    }
  }
}
</style>


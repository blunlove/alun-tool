<template>
  <div class="base-table">
    <el-table border
      ref="baseTable"
      :data="tableData"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName">
      <el-table-column
        v-if="selection"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="序号"
        width="70"
        align="center"
        header-align="center">
        <template slot-scope="scope">
          <span>{{pageSize * ( pageNo - 1 ) + Number(scope.$index) + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="col in columns"
        :key="col.label"
        v-bind="getColBind(col)"
        align="center"
        header-align="center"
        show-overflow-tooltip>
        <template slot-scope="scope"
          v-if="col.component">
          <component :is="col.component"
            v-bind="getCptBind(scope, col)">
          </component>
        </template>
      </el-table-column>
    </el-table>
    <table-page
      v-if="total > pageSize"
      :total="total"
      :pageNo="pageNo"
      :pageSize="pageSize"
      @changePage="changePage">
    </table-page>
  </div>
</template>
<script>
import tablePage from './tablePage.vue';
//为无component列创建一个component
function handleComponent(obj) {
  let {component, render} = obj;
  if (render) {
    return {
      functional: true,
      render
    };
  } else {
    return component;
  }
};

export default {
  name: 'base-table',
  props: {
    //是否有选择框
    selection: {
      type: Boolean,
      default: false
    },
    //表格数据
    tableData: {
      type: Array,
      default: []
    },
    //表格头部配置
    tableColumns: {
      type: Array,
      default: []
    },
    //数组条数
    total: {
      type: Number,
      default: 0
    },
    //当前页码
    pageNo: {
      type: Number,
      default: 1
    },
    //当前页数据最多展示数量
    pageSize: {
      type: Number,
      default: 15
    },
  },
  data() {
    return {
      //处理后的表头数据
      columns: []
    };
  },
  watch: {
    columns: {
      immediate: true,
      handler: function () {
        // 列改变后重新设置列相关配置，重新渲染普通列
        this.renderNormalColumns();
      }
    },
  },
  mounted() {
    //处理表头数据
    this.renderNormalColumns();
  },
  components: {
    tablePage
  },
  methods: {
    /**
     * 表格行不同颜色
     * @row 当前行
     * @index 当前行的索引
     */
    renderNormalColumns() {
      this.columns = this.tableColumns.map(col => {
        col.component = handleComponent(col);
        return col;
      });
    },
    tableRowClassName(row, index) {
      if (index % 2 == 1) {
        return 'gray-row';
      }
      return '';
    },
    /**
     * 绑定表格每列数据
     * @col 表格每列数据
     */
    getColBind(col) {
      const bind = Object.assign({}, col);
      delete bind.component;
      return bind;
    },
    /**
     * 绑定表格自定义列数据
     * @row 表格每行数据
     * @column 表格每列配置项
     * @$index 表格当前行数据索引
     * @col 表格每列数据
     */
    getCptBind({ row, column, $index }, col) {
      let index = $index;
      const props = { row, col, column, index };
      return props;
    },
    changePage(pageNo) {
      this.$refs.baseTable.clearSelection();
      this.$emit('change-page', pageNo)
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        let temp = val[val.length - 1];
        this.$refs.baseTable.clearSelection();
        this.$refs.baseTable.toggleRowSelection(temp);
        this.$emit('selection-change', temp);
      } else {
        this.$emit('selection-change', val[0]);
      }
    }
  }
}
</script>
<style lang="scss">
.base-table {
  el-table {
    width: 100%;
  }
  .gray-row {
    background-color: #f4f5fb;
  }
  .cell {
    input.special-input {
      width: 100%;
      height: 35px;
      border: 1px solid #c6c6c6;
      padding-left: 10px;
      border-radius: 4px;
      &:focus {
        border-color: #20a0ff;
      }
    }
  }
  thead th .cell .el-checkbox .el-checkbox__input {
    display: none;
  }
  .td-btn-group {
    display: block;
    & > span {
      display: inline-block;
      cursor: pointer;
      color: #20a0ff;
      &:hover {
        color: #4db3ff;
      }
      & > i {
        color: #333;
      }
    }
  }
}
</style>

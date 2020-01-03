<template>
  <div class="paging">
    <span class="datatotal">共{{tableList.length}}条数据</span>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
  },
  data () {
    return {
      currentPage: 1
    };
  },
  created () {
  },
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    tableList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.$emit("TogglePagingData", val);
    }
  },
};
</script>

<style scope lang="less">
.paging {
  text-align: center;
  margin-top: 3px;
  position: relative;
  .datatotal {
    width: 120px;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 300px;
  }
  .el-pagination {
    display: inline-block;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(236, 107, 106);
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #285b91;
  }
}
</style>

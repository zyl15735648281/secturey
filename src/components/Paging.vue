<template>
  <div class="paging">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
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
    };
  },
  created () {
  },
  methods: {
  },
};
</script>

<style scope lang="less">
.paging {
  text-align: center;
  margin-top: 3px;
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

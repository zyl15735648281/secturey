<template>
  <div class="group-list">
    <el-input
      placeholder="请搜索"
      class="mg-b"
      v-if="target === '添加'"
    >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
      ></i>
    </el-input>
    <el-table
      :data="userList"
      height="100%"
      style="width: 100%"
      border
      v-if="target === '添加'"
    >
      <el-table-column
        prop="Name"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="DefaultDepName"
        label="部门"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <a
            href="javascript:void(0)"
            @click="handleAdd(scope.row)"
          >添加</a>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="aleradyUserList"
      height="100%"
      style="width: 100%"
      border
      v-if="target === '删除'"
    >
      <el-table-column
        prop="UserName"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="GroupName"
        label="部门"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <a
            href="javascript:void(0)"
            @click="handleRemove(scope.row)"
          >删除</a>
        </template>
      </el-table-column>
    </el-table>
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
  props: {
    userList: {
      type: Array,
      default: () => []
    },
    target: {
      type: String,
      default: ""
    },
    aleradyUserList: {
      type: Array,
      default: () => []
    }

  },
  created () {
  },
  watch: {
    userList(val) {
      console.log(val);
    }
  },
  methods: {
    handleAdd(row) {
      this.$emit("addUser", row);
      console.log(row);
    },
    handleRemove(row) {
      this.$emit("removeUser", row);
      console.log(row);
    },
  },
};
</script>

<style scope lang="less">
.group-list {
  width: 48%;
  height: 140px;
  .el-input__inner {
    height: 35px;
    line-height: 35px;
  }
  .el-table td,
  .el-table th {
    padding: 2px 0;
    line-height: 10px;
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      height: 30px;
      line-height: 30px;
      span {
        text-align: center;
        width: 33%;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .gl {
    height: calc(100% - 50px);
    .glh {
      li:first-child span {
        border-top: 1px solid #e4e4e4;
      }
    }
    .glc {
      height: calc(100% - 30px);
      overflow: auto;
    }
  }
}
</style>

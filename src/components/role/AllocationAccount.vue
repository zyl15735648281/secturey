<template>
  <div class="acoAccStyle">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <div class="search">
        <!-- 搜索框 -->
        <el-input
          placeholder="输入姓名查询"
          class="fl s-input"
        ></el-input>
        <el-button class="fr">确定</el-button>
        <span class="fr s-span">已选{{checkedList.length}}个</span>
      </div>
      <div
        class="gp-table"
        v-if="mode === '分配用户'"
      >
        <el-table
          :data="tableList"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            width="120"
            align="center"
          >
            <template slot-scope="scope">{{scope.row.Name}}</template>
          </el-table-column>
          <el-table-column
            prop="EmployeeId"
            label="工号"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="DefaultDepName"
            label="部门"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>

      <div
        class="gp-table"
        v-if="mode === '分配部门'"
      >
        <el-table
          :data="tableList"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="部门名称"
            width="120"
            align="center"
          >
            <template slot-scope="scope">{{scope.row.Name}}</template>
          </el-table-column>
          <el-table-column
            prop="PinyinShort"
            label="部门简拼"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ParentName"
            label="上级部门"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClose"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      checkedList: []
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tableList: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: ""
    }
  },
  created() {},
  methods: {
    handleSelectionChange(e) {
      this.checkedList = e;
      console.log(e);
    },
    handleClose() {
      this.$emit("closed");
    }
  }
};
</script>

<style scope lang="less">
.acoAccStyle {
  .el-dialog__body {
    padding: 20px;
    height: 300px;
  }
  .search {
    width: 100%;
    height: 40px;
    padding: 0 0 10px 0;
    line-height: 40px;
    .s-input {
      width: 260px;
    }
    .s-span {
      font-weight: 600;
      margin-right: 10px;
      font-size: 16px;
      color: #fa9933;
    }
  }
  .gp-table {
    height: calc(100% - 50px);
    .el-table td,
    .el-table th {
      padding: 7px 0;
    }
  }
}
</style>

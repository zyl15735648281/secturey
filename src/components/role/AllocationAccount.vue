<template>
  <div class="acoAccStyle">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      width="60%"
    >
      <div class="search">
        <!-- 搜索框 -->
        <el-input
          placeholder="输入查询"
          class="fl s-input"
          style="height:30px"
          v-model="filterName"
          @input="filter"
        ></el-input>
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
          :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
          :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
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
          <el-table-column
            prop="DefaultDepName"
            label="请自行选择时间有效性"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template>
              <el-checkbox v-model="this.isEnable">永久有效</el-checkbox>
              <el-date-picker
                v-model="this.beginTime"
                type="date"
                placeholder="选择开始日期"
              >
              </el-date-picker>

              <el-date-picker
                v-model="this.endTime"
                type="date"
                placeholder="选择结束日期"
              >
              </el-date-picker>

            </template>
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
          :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
          :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
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
        <el-button
          @click="handleClose"
          class="cancle"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="handelConfirm"
          class="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { requestBaseUserRole } from "@/js/api";

export default {
  name: "",
  components: {},
  data() {
    return {
      checkedList: [],
      filterName: "",
      isEnable: false,
      beginTime: "",
      endTime: ""
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
    // 模糊查询
    filter(e) {
      if (this.filterName === "") {
        this.$emit("getalldata");
      } else {
        this.$emit("getdata", e);
      }
    },
    handleSelectionChange(e) {
      this.checkedList = e;
      // console.log(e);
    },
    handleClose() {
      this.$emit("closed");
    },
    // 点击确定
    async handelConfirm() {
      // 做一个验证，checkedlist是否有值
      if (this.checkedList.length === 0) {
        this.$message({
          type: "waring",
          message: "请选择您要分配的用户"
        });
      }

      const params = {
        userId: "",
        roleId: "",
        roleName: "",
        beginTime: "",
        endTime: "",
        positive: "",
        isEnable: "",
        createUserId: this.$store.state.userInfo.UserId,
        createUserName: this.$store.state.userInfo.Name,
        userName: "",
      };
      const res = await requestBaseUserRole(params);
      console.log(res);
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

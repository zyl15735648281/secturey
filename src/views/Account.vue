<template>
  <div class="information">
    <ul class="retrieval-header acc-header">
      <li>
        <span>姓名：</span>
        <el-input
          v-model="nameValue"
          @input="handleFilterName"
          style="width:calc(100% - 50px)"
        ></el-input>
      </li>

      <li>
        <State
          :value="status"
          @onChange="handleSwitchStatus"
        ></State>
      </li>
      <li>
        <el-button @click="handleSearch">查询</el-button>
      </li>
    </ul>
    <div class="info-table">
      <div class="ui-header">
        <h3>已有的用户列表</h3>
        <el-button
          class="fr add"
          @click="handleAddAccount"
        >新增用户</el-button>
      </div>
      <el-table
        :data="cacheAccountList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
        :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
        :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
      >
        <el-table-column
          label="姓名"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              placement="top"
            >
              <p>点我查看详情</p>
              <div
                slot="reference"
                class="name-wrapper"
              >
                <a
                  href="javascript:void(0);"
                  @click="SeeAccountDetail(scope.row)"
                >{{scope.row.Name}}</a>
                <a
                  href="javascript:void(0);"
                  @click="SeeAccountDetail(scope.row)"
                >{{scope.row.name}}</a>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="EmployeeId"
          label="工号"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="DefaultDepName"
          label="部门"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="Mobile"
          label="手机号"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="Email"
          label="Email"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- <el-table-column
          prop="baseUserRoleList"
          label="角色"
          width="130"
          align="center"
          :formatter="fmtRoleData"
        ></el-table-column>-->
        <el-table-column
          prop="IsEnable"
          label="状态"
          width="110"
          align="center"
          :formatter="fmtState"
        ></el-table-column>
        <el-table-column
          prop="Note"
          label="备注"
          width="160"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="CreateUserName"
          label="创建人"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="CreateTime"
          label="创建时间"
          width="150"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="220"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <a
              href="javascript:void(0);"
              @click="handleEditAccount(scope.row)"
              class="mg-r"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelAccount(scope.row)"
              class="mg-r"
            >删除</a>
            <a
              href="javascript:void(0);"
              @click="handleStartUsing(scope.row)"
              class="mg-r"
            >{{scope.row.IsEnable === true ? '禁用' : '启用'}}</a>

            <a
              href="javascript:void(0);"
              @click="resetPass(scope.row)"
            >重置密码</a>
          </template>
        </el-table-column>
      </el-table>

      <Paging
        :tableList="accountList"
        :currentPage="currentPage"
        :totalCount="accountList.length"
        @TogglePagingData="handleTogglePagingData"
      ></Paging>
    </div>

    <Edit
      :visible="visible"
      :mode="mode"
      :depList="depList"
      :accountInfo="accountInfo"
      :accountList="accountList"
      @closed="handleClose"
      @addAccount="handleAddAcc"
      @editAccount="handleEditAcc"
    ></Edit>
    <!-- <AccountDetail
      :visible="detailVisible"
      :detailInfo="detailInfo"
      @closed="handleCloseDetail"
    ></AccountDetail>-->
    <NewAccountDetail
      :visible="detailVisible"
      :detailInfo="detailInfo"
      @closed="handleCloseDetail"
    ></NewAccountDetail>
    <Dialog @userBehavior="handleRelDelAccount"></Dialog>
  </div>
</template>

<script>
import State from "@/components/State";
import Paging from "@/components/Paging";
import Edit from "@/components/account/Edit";
// import AccountDetail from "@/components/account/AccountDetail";
import { show } from "@/js/dialog";
import Dialog from "@/components/Dialog";
import {
  requestGetBaseUserList,
  requestDeleteBaseUser,
  requestGetBaseDepartmentList,
  requestGetBaseUser,
  requestModifiedIsEnable,
  requestModifiedPassword
} from "@/js/api.js";
import { fmtStatus, formatterDate } from "@/js/format.js";
import { pageData, frzzyQuery } from "@/js/utils.js";
import NewAccountDetail from "@/components/account/NewAccountDetail";

export default {
  name: "account",
  components: {
    State,
    Paging,
    Edit,
    // AccountDetail,
    Dialog,
    NewAccountDetail
  },
  data() {
    return {
      accountList: [],
      cacheAccountList: [],
      accountInfo: {},
      detailInfo: {},
      condition: "启用",
      nameValue: "", // 姓名
      status: "2", // 状态
      loading: false,
      visible: false,
      mode: "", // 新增/编辑
      detailVisible: false,
      perPage: 10,
      depList: [],
      currentPage: 1
    };
  },
  computed: {},
  mounted() {
    this.getAccountList();
  },
  methods: {
    // 姓名列表模糊查询
    handleFilterName() {
      if (this.nameValue === "") return this.getAccountList();
      this.cacheAccountList = frzzyQuery(this.nameValue, this.accountList);
    },
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheAccountList = pageData(
        this.accountList,
        this.cacheAccountList,
        e,
        this.perPage
      );
    },
    // 查询
    async handleSearch() {
      this.getAccountList();
    },
    // 获取组列表
    async getDepList() {
      const res = await requestGetBaseDepartmentList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        this.depList = res.data;
      }
    },
    // 获取用户管理列表
    async getAccountList() {
      const res = await requestGetBaseUserList({
        name: this.nameValue || "",
        state: this.status
      });
      this.accountList = res.data;
      this.cacheAccountList = this.accountList.slice(0, this.perPage);
    },
    // 查看明细
    SeeAccountDetail(row) {
      this.detailVisible = true;
      this.detailInfo = row;
    },
    // 关闭明细
    handleCloseDetail() {
      this.detailVisible = false;
    },
    // 新增用户
    handleAddAccount() {
      this.visible = true;
      this.mode = "新增用户";
      this.accountInfo = {};
      this.getDepList();
    },
    // 编辑用户
    async handleEditAccount(row) {
      this.visible = true;
      this.mode = "编辑用户";
      this.getDepList();
      const res = await requestGetBaseUser({ id: row.UserId });
      if (res.status === 200) {
        this.accountInfo = res.data;
      }
    },
    handleAddAcc() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      }
      this.getAccountList();
    },
    handleEditAcc() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      }
      this.getAccountList();
    },
    // 删除用户
    handleDelAccount(row) {
      show(
        "您确定要删除这个部门吗？",
        {
          type: "confirm",
          cancleText: "取消",
          confirmText: "确定",
          titleText: "删除提示",
          data: row
        },
        "del"
      );
    },
    // 真正的删除用户
    async handleRelDelAccount(type, data) {
      const res = await requestDeleteBaseUser({ id: data.UserId });
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "祝贺你，删除成功!"
        });
        if (this.currentPage !== 1) {
          this.currentPage = 1;
        }
        this.getAccountList();
      }
    },
    // 启用
    async handleStartUsing(row) {
      const res = await requestModifiedIsEnable({
        isEnable: !row.IsEnable,
        userId: row.UserId
      });
      if (res.status === 200) {
        row.IsEnable = res.data;
        this.$message({
          type: "success",
          message: "恭喜您，操作成功!"
        });
        this.getAccountList();
      }
    },
    // 重置密码
    async resetPass(row) {
      console.log(row);
      const res = await requestModifiedPassword({
        id: row.UserId
      });
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "祝贺您，重置密码成功"
        });
        this.getAccountList();
      }
    },
    // 关闭弹窗
    handleClose() {
      this.visible = false;
    },
    // 切换姓名
    handleSwitchName(e) {
      this.nameValue = e;
    },
    // 切换状态
    handleSwitchStatus(e) {
      this.status = e;
    },
    // 自定义stripe样式
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 === 0) {
        return "warning-row";
      }
    },
    // 格式化状态
    fmtState(row, coloum, cellValue) {
      return fmtStatus(cellValue);
    },
    // 格式化时间
    fmtDate(row, coloum, cellValue) {
      return formatterDate(cellValue);
    },
    // 格式化角色
    fmtRoleData(row, coloum, cellValue) {
      if (cellValue.length === 0) {
        return "无角色数据";
      } else {
        cellValue.forEach(element => {
          return element.RoleName + ",";
        });
      }
    }
  }
};
</script>

<style lang="less" scope>
@base: #4bc183;
p {
  text-align: center;
}
.name-wrapper {
  color: @base;
}
</style>

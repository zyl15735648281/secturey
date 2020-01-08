<template>
  <div class="information">
    <ul class="retrieval-header ro-header">
      <li>
        <span>角色名称：</span>
        <el-input v-model="roleName"></el-input>
      </li>

      <li>
        <State :value="status" @onChange="handleSwitchStatus"></State>
      </li>
      <li>
        <el-button>查询</el-button>
      </li>
    </ul>
    <div class="info-table">
      <div class="ui-header">
        <h3>已有的角色列表</h3>
        <el-button class="fr add" @click="handleAddRole">新增角色</el-button>
      </div>
      <el-table
        :data="cacheRoleList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
      >
        <el-table-column label="角色名称" width="120" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>点我查看角色详情</p>
              <div slot="reference" class="name-wrapper">
                <a href="javascript:void(0);" @click="SeeRoleDetail">{{scope.row.Name}}</a>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="IsEnable"
          label="状态"
          width="110"
          align="center"
          :formatter="fmtState"
        ></el-table-column>
        <el-table-column prop="CreateUserName" label="操作人" width="130" align="center"></el-table-column>
        <el-table-column prop="Description" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="name"
          label="操作时间"
          width="110"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template>
            <a href="javascript:void(0);" class="mg-r" @click="handleEditRole">编辑</a>
            <a href="javascript:void(0);" @click="handleDelRole" class="mg-r">删除</a>
            <a href="javascript:void(0);" @click="allocationAccount">分配用户</a>
          </template>
        </el-table-column>
      </el-table>
      <Paging></Paging>
    </div>
    <Edit :visible="roleVisible" :mode="mode" @closed="handleCloseRole"></Edit>
    <Dialog></Dialog>
    <RoleDetail :visible="roleDelVisible" @closed="handleCloseRoleDetail"></RoleDetail>
    <AllocationAccount :visible="aocAccVis" @closed="handleCloseAocAcc"></AllocationAccount>
  </div>
</template>

<script>
import State from "@/components/State";
import Paging from "@/components/Paging";
import Edit from "@/components/role/Edit";
import Dialog from "@/components/Dialog";
import { show } from "@/js/dialog";
import RoleDetail from "@/components/role/RoleDetail";
import AllocationAccount from "@/components/role/AllocationAccount";
import { requestGetBaseRoleList } from "@/js/api";
import { fmtStatus, formatterDate } from "@/js/format.js";

export default {
  name: "account",
  components: {
    State,
    Paging,
    Edit,
    Dialog,
    RoleDetail,
    AllocationAccount
  },
  data() {
    return {
      roleList: [],
      cacheRoleList: [],
      status: "2", // 状态
      loading: false,
      roleName: "", // 角色名称
      roleVisible: false,
      mode: "",
      roleDelVisible: false,
      aocAccVis: false,
      perPage: 1,
      currentPage: 1
    };
  },
  computed: {},
  mounted() {
    this.getRoleList();
  },
  methods: {
    // 获取角色数据列表
    async getRoleList() {
      const res = await requestGetBaseRoleList({
        name: this.roleName,
        state: this.status
      });
      if (res.status === 200) {
        this.roleList = res.data;
        this.cacheRoleList = this.roleList.slice(0, this.perPage);
      }
    },
    //   关闭分配用户
    handleCloseAocAcc() {
      this.aocAccVis = false;
    },
    //   分配用户
    allocationAccount() {
      this.aocAccVis = true;
    },
    // 查看角色详情
    SeeRoleDetail() {
      this.roleDelVisible = true;
    },
    // 关闭角色详情对话框
    handleCloseRoleDetail() {
      this.roleDelVisible = false;
    },
    // 新增角色
    handleAddRole() {
      this.roleVisible = true;
      this.mode = "新增角色";
    },
    // 编辑角色
    handleEditRole() {
      this.roleVisible = true;
      this.mode = "编辑角色";
    },
    // 删除角色
    handleDelRole() {
      show(
        "您确定要删除这个角色吗？",
        {
          type: "confirm",
          cancleText: "取消",
          confirmText: "确定",
          titleText: "删除提示",
          data: ""
        },
        "del"
      );
    },
    // 关闭编辑/新增弹框
    handleCloseRole() {
      this.roleVisible = false;
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
    }
  }
};
</script>

<style lang="less" scope>
.ro-header {
  li:first-child {
    .el-input {
      width: calc(100% - 80px);
    }
  }
}
</style>

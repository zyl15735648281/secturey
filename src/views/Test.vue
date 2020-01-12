<template>
  <div class="information">
    <ul class="retrieval-header ro-header">
      <li>
        <span>角色名称：</span>
        <el-input
          v-model="roleName"
          @input="handleFilterRoleName"
        ></el-input>
      </li>

      <li>
        <State
          :value="status"
          @onChange="handleSwitchStatus"
        ></State>
      </li>
      <li>
        <el-button>查询</el-button>
      </li>
    </ul>
    <div class="info-table">
      <div class="ui-header">
        <h3>已有的角色列表</h3>
        <el-button
          class="fr add"
          @click="handleAddRole"
        >新增角色</el-button>
      </div>
      <el-table
        :data="cacheRoleList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
        :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
        :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
      >
        <el-table-column
          label="角色名称"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              placement="top"
            >
              <p>点我查看角色详情</p>
              <div
                slot="reference"
                class="name-wrapper"
              >
                <a
                  href="javascript:void(0);"
                  @click="SeeRoleDetail(scope.row)"
                >{{scope.row.Name}}</a>
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
        <el-table-column
          prop="CreateUserName"
          label="操作人"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Description"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="CreateTime"
          label="操作时间"
          width="130"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="250"
          align="center"
        >
          <template slot-scope="scope">
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditRole(scope.row)"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelRole(scope.row)"
              class="mg-r"
            >删除</a>
            <a
              href="javascript:void(0);"
              @click="allocationAccount(scope.row)"
              class="mg-r"
            >分配用户</a>
            <a
              href="javascript:void(0);"
              @click="allocationAccount(scope.row)"
            >分配部门</a>
          </template>
        </el-table-column>
      </el-table>
      <Paging
        :tableList="roleList"
        :currentPage="currentPage"
        :totalCount="roleList.length"
        @TogglePagingData="handleTogglePagingData"
      ></Paging>
    </div>
    <Edit
      :visible="roleVisible"
      :mode="mode"
      :roleInfo="roleInfo"
      :dataPerList="dataPerList"
      :alreadyDataPerList="alreadyDataPerList"
      @closed="handleCloseRole"
      @addRole="handleAddRoleSuc"
      @editRole="handleEditRoleSuc"
    ></Edit>
    <Dialog @userBehavior="relDelRole"></Dialog>
    <RoleDetail
      :visible="roleDelVisible"
      :roleInfo="roleInfo"
      :alreadyRoleList="alreadyRoleList"
      @closed="handleCloseRoleDetail"
    ></RoleDetail>
    <AllocationAccount
      :visible="aocAccVis"
      @closed="handleCloseAocAcc"
    ></AllocationAccount>
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
import {
  requestGetBaseRoleList,
  requestDeleteBaseRole,
  requestGetBaseRole,
  requestGetBaseScopeList
} from "@/js/api";
import { fmtStatus, formatterDate } from "@/js/format.js";
import { pageData, frzzyQuery } from "@/js/utils.js";

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
      roleInfo: {},
      dataPerList: [],
      alreadyDataPerList: [],
      alreadyRoleList: [],
      status: "2", // 状态
      loading: false,
      roleName: "", // 角色名称
      roleVisible: false,
      mode: "",
      roleDelVisible: false,
      aocAccVis: false,
      perPage: 10,
      currentPage: 1
    };
  },
  computed: {},
  mounted() {
    this.getRoleList();
  },
  methods: {
    // 姓名列表模糊查询
    handleFilterRoleName() {
      if (this.roleName === "") return this.getRoleList();
      this.cacheRoleList = frzzyQuery(this.roleName, this.roleList);
    },
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheRoleList = pageData(
        this.roleList,
        this.cacheRoleList,
        e,
        this.perPage
      );
    },
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
    async getDataPerList() {
      const res = await requestGetBaseScopeList({
        name: "",
        state: 2
      });
      this.dataPerList = res.data;
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
    async SeeRoleDetail(row) {
      this.roleDelVisible = true;
      const res = await requestGetBaseRole({ id: row.Id });
      if (res.status === 200) {
        this.roleInfo = res.data;
      }
      this.alreadyRoleList = this.roleInfo.baseUserRoleModels;
    },
    // 关闭角色详情对话框
    handleCloseRoleDetail() {
      this.roleDelVisible = false;
    },
    // 新增角色
    handleAddRole() {
      this.roleVisible = true;
      this.mode = "新增角色";
      this.getDataPerList();
      this.alreadyDataPerList = [];
      this.roleInfo = {};
    },
    // 编辑角色
    async handleEditRole(row) {
      this.roleVisible = true;
      this.mode = "编辑角色";
      this.getDataPerList();
      const res = await requestGetBaseRole({ id: row.Id });
      if (res.status === 200) {
        this.roleInfo = res.data;
      }
      this.alreadyDataPerList = this.roleInfo.baseRoleScopeModels;
    },
    handleAddRoleSuc() {
      this.getRoleList();
    },
    handleEditRoleSuc() {
      this.getRoleList();
    },
    // 删除角色
    handleDelRole(row) {
      show(
        "您确定要删除这个角色吗？",
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
    // 真正的删除角色
    async relDelRole(type, data) {
      console.log(data);
      const res = await requestDeleteBaseRole({ id: data.Id });
      if (res.status === 200) {
        this.$message({
          type: "waring",
          message: "祝贺您，删除成功！"
        });
        this.getRoleList();
      }
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

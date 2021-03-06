<template>
  <div class="information">
    <ul class="retrieval-header gr-header">
      <li>
        <span>组名称：</span>
        <el-input v-model="groupName"></el-input>
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
        <h3>已存在的组</h3>
        <el-button
          class="fr add"
          @click="handleAddGroup"
        >新增组</el-button>
      </div>
      <el-table
        :data="cacheGroupList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
        :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
        :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
      >
        <el-table-column
          label="组名称"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              placement="top"
            >
              <p>点我查看分组详情</p>
              <div
                slot="reference"
                class="name-wrapper"
              >
                <a
                  href="javascript:void(0);"
                  @click="SeeGroup(scope.row)"
                >{{scope.row.Name}}</a>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="GroupUserCount"
          label="组成员"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="IsEnable"
          label="状态"
          width="120"
          align="center"
          :formatter="fmtState"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="CreateUserName"
          label="操作人"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="Memo"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="CreateTime"
          label="操作时间"
          width="150"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditGroup(scope.row)"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelGroup(scope.row)"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
      <Paging
        :tableList="groupList"
        :currentPage="currentPage"
        :totalCount="groupList.length"
        @TogglePagingData="handleTogglePagingData"
      ></Paging>
    </div>
    <Edit
      :visible="groupVisible"
      :mode="mode"
      :userList="userList"
      :groupInfo="groupInfo"
      :spTreeList="spTreeList"
      :alreadyGpList="alreadyGpList"
      :groupList="groupList"
      @closed="hadleCloseGroup"
      @addGp="handleAddGp"
      @editGp="handleRemoveGp"
    ></Edit>
    <Dialog @userBehavior="handleRelDelGroup"></Dialog>
    <GroupDetail
      :visible="groupDetailVisible"
      :gpDetailInfo="gpDetailInfo"
      :alreadyGpList="alreadyGpList"
      @closed="handleCloseGDetail"
    ></GroupDetail>
  </div>
</template>

<script>
import State from "@/components/State";
import Paging from "@/components/Paging";
import Edit from "@/components/group/Edit";
import { show } from "@/js/dialog";
import Dialog from "@/components/Dialog";
import GroupDetail from "@/components/group/GroupDetail";
import {
  requestGetBaseGroupList,
  requestDeleteBaseGroup,
  requestGetBaseUserList,
  requestGetDicBaseGroup,
  requestGetBaseGroup
} from "@/js/api.js";
import { fmtStatus, formatterDate } from "@/js/format.js";
import { pageData } from "@/js/utils.js";

export default {
  name: "account",
  components: {
    State,
    Paging,
    Edit,
    Dialog,
    GroupDetail
  },
  data() {
    return {
      groupList: [],
      cacheGroupList: [],
      userList: [],
      groupInfo: {},
      spTreeList: [],
      alreadyGpList: [],
      gpDetailInfo: {},
      status: "2", // 状态
      loading: false,
      groupName: "", // 组名称
      groupVisible: false,
      mode: "",
      groupDetailVisible: false,
      perPage: 10,
      currentPage: 1
    };
  },
  mounted() {
    this.getGroupList();
  },
  methods: {
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheGroupList = pageData(
        this.groupList,
        this.cacheGroupList,
        e,
        this.perPage
      );
    },
    // 获取上级组的字典数据
    async getSuperGroupList() {
      const res = await requestGetDicBaseGroup();
      if (res.status === 200) {
        this.spTreeList = res.data;
      }
    },
    // 获取用户数据
    async getUserList() {
      const res = await requestGetBaseUserList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        this.userList = res.data;
      }
    },
    // 获取组管理列表
    async getGroupList() {
      const res = await requestGetBaseGroupList({
        name: this.groupName,
        state: this.status
      });
      if (res.status === 200) {
        this.groupList = res.data;
        this.cacheGroupList = this.groupList.slice(0, this.perPage);
      }
    },
    // 查看详情
    async SeeGroup(row) {
      this.groupDetailVisible = true;
      const res = await requestGetBaseGroup({ id: row.Id });
      this.gpDetailInfo = res.data;
      this.alreadyGpList = this.gpDetailInfo.baseUserGroupModels;
    },
    // 关闭详情
    handleCloseGDetail() {
      this.groupDetailVisible = false;
    },
    // 新增组
    handleAddGroup() {
      this.groupVisible = true;
      this.mode = "新增组";
      this.groupInfo = {};
      this.alreadyGpList = [];
      this.getUserList();
      this.getSuperGroupList();
    },
    // 修改组
    async handleEditGroup(row) {
      this.groupVisible = true;
      this.mode = "编辑组";
      const res = await requestGetBaseGroup({ id: row.Id });
      this.groupInfo = res.data;
      this.alreadyGpList = this.groupInfo.baseUserGroupModels;
      this.getUserList();
      this.getSuperGroupList();
    },
    handleAddGp() {
      this.getGroupList();
    },
    handleRemoveGp() {
      this.getGroupList();
    },
    // 删除组
    handleDelGroup(row) {
      show(
        "您确定要删除这个分组吗？",
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
    // 真正的删除组
    async handleRelDelGroup(type, data) {
      const res = await requestDeleteBaseGroup({ id: data.Id });
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.getGroupList();
      }
    },
    hadleCloseGroup() {
      this.groupVisible = false;
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
.gr-header {
  li:first-child {
    .el-input {
      width: calc(100% - 70px);
    }
  }
}
</style>

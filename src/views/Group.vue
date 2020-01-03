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
      >
        <el-table-column
          label="组名称"
          width="130"
          align="center"
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
                  @click="SeeGroup"
                >{{scope.row.Name}}</a>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="baseUserGroupModels"
          label="组成员"
          width="280"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="baseGroupRoleModels"
          label="角色"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="IsEnable"
          label="状态"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="CreateUserName"
          label="操作人"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="Memo"
          label="备注"
          width="200"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="CreateTime"
          label="操作时间"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditGroup"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelGroup"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
      <Paging></Paging>
    </div>
    <Edit
      :visible="groupVisible"
      :mode="mode"
      @closed="hadleCloseGroup"
    ></Edit>
    <Dialog></Dialog>
    <GroupDetail
      :visible="groupDetailVisible"
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
import { requestGetBaseGroupList } from "@/js/api.js";

export default {
  name: "account",
  components: {
    State,
    Paging,
    Edit,
    Dialog,
    GroupDetail
  },
  data () {
    return {
      groupList: [],
      cacheGroupList: [],
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
    SeeGroup () {
      this.groupDetailVisible = true;
    },
    // 关闭详情
    handleCloseGDetail () {
      this.groupDetailVisible = false;
    },
    // 新增组
    handleAddGroup () {
      this.groupVisible = true;
      this.mode = "新增组";
    },
    // 修改组
    handleEditGroup () {
      this.groupVisible = true;
      this.mode = "删除组";
    },
    // 删除组
    handleDelGroup () {
      show("您确定要删除这个分组吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: ""
      }, "del");
    },
    hadleCloseGroup () {
      this.groupVisible = false;
    },
    // 切换状态
    handleSwitchStatus (e) {
      this.status = e;
    },
    // 自定义stripe样式
    tabRowClassName ({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 === 0) {
        return "warning-row";
      }
    },
  },
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

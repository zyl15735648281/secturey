<template>
  <div class="information">
    <ul class="retrieval-header acc-header">
      <li>
        <AccountNameList
          v-model="nameValue"
          @switchName="handleSwitchName"
        ></AccountNameList>
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
        <h3>已有的用户列表</h3>
        <el-button
          class="fr add"
          @click="handleAddAccount"
        >新增用户</el-button>
      </div>
      <el-table
        :data="tableData"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
      >
        <!-- prop="name" -->
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
                  @click="SeeAccountDetail"
                >{{scope.row.name}}</a>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="工号"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="部门"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属分组"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="组角色"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机号"
          width="130"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Email"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          width="160"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建人"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
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
              @click="handleEditAccount"
              class="mg-r"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelAccount"
              class="mg-r"
            >删除</a>
            <a href="javascript:void(0);">启用</a>
          </template>
        </el-table-column>
      </el-table>
      <Paging></Paging>
    </div>

    <Edit
      :visible="visible"
      :mode="mode"
      @closed="handleClose"
    ></Edit>
    <AccountDetail
      :visible="detailVisible"
      @closed="handleCloseDetail"
    ></AccountDetail>
    <Dialog></Dialog>
  </div>
</template>

<script>
import AccountNameList from "@/components/AccountNameList.vue";
import State from "@/components/State";
import { tableList } from "@/js/dataset";
import Paging from "@/components/Paging";
import Edit from "@/components/account/Edit";
import AccountDetail from "@/components/account/AccountDetail";
import { show } from "@/js/dialog";
import Dialog from "@/components/Dialog";

export default {
  name: "account",
  components: {
    AccountNameList,
    State,
    Paging,
    Edit,
    AccountDetail,
    Dialog
  },
  data () {
    return {
      nameValue: "", // 姓名
      status: "全部", // 状态
      loading: false,
      visible: false,
      mode: "", // 新增/编辑
      detailVisible: false
    };
  },
  computed: {
    tableData () {
      return tableList;
    }
  },
  methods: {
    // 查看明细
    SeeAccountDetail () {
      this.detailVisible = true;
    },
    // 关闭明细
    handleCloseDetail () {
      this.detailVisible = false;
    },
    // 新增用户
    handleAddAccount () {
      this.visible = true;
      this.mode = "新增用户";
    },
    // 编辑用户
    handleEditAccount () {
      this.visible = true;
      this.mode = "编辑用户";
    },
    // 删除用户
    handleDelAccount () {
      show("您确定要删除这个部门吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: ""
      }, "del");
    },
    // 关闭弹窗
    handleClose () {
      this.visible = false;
    },
    // 切换姓名
    handleSwitchName (e) {
      this.nameValue = e;
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
p {
  text-align: center;
}
.name-wrapper {
  color: #285b91;
}
</style>

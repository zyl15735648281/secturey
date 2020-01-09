<template>
  <div class="information">
    <ul class="retrieval-header mo-header">
      <li>
        <span>系统名称：</span>
        <SysNameList
          :value="system"
          @onChange="handleSwitchSys"
        ></SysNameList>
      </li>

      <li>
        <MenuNameList
          :value="menu"
          @onChange="handleSwitchMenu"
        ></MenuNameList>
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
        <h3>已有的系统项</h3>
        <el-button
          class="fr add"
          @click="handleAddMd"
        >新增菜单</el-button>
      </div>
      <el-table
        :data="cacheModuleList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
        row-key="id"
        lazy
        :tree-props="{children: 'treeChildren', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          label="系统名称"
          width="120"
          align="center"
          prop="SystemName"
        >
        </el-table-column>

        <el-table-column
          prop="name"
          label="菜单名称"
          width="120"
          align="left"
        >

          <template slot-scope="scope">
            {{scope.row.name}}
            <i class="el-icon-top"></i>
            <i class="el-icon-bottom"></i>
          </template>

        </el-table-column>
        <el-table-column
          prop=""
          label="层级"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Sort"
          label="排序"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Type"
          label="类型"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="IsEnable"
          label="状态"
          width="130"
          align="center"
          :formatter="fmtState"
        >
        </el-table-column>
        <el-table-column
          prop="CreateUserName"
          label="操作人"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Description"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="CreateTime"
          label="操作时间"
          width="150"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditMd(scope.row)"
            >编辑</a>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleDelMd(scope.row)"
            >删除</a>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleAddPeer(scope.row)"
            >新增平级</a>
            <a
              href="javascript:void(0);"
              @click="handleAddCollar(scope.row)"
            >新增子级</a>
          </template>
        </el-table-column>
      </el-table>

      <Edit
        :mode="mode"
        :visible="mdVisible"
        :mdInfo="mdInfo"
        @closed="handleCloseMd"
      ></Edit>
      <Paging></Paging>
      <Dialog @userBehavior="RelDelMd"></Dialog>
    </div>
  </div>
</template>

<script>
import State from "@/components/State";
import Paging from "@/components/Paging";
import SysNameList from "@/components/SysNameList";
import MenuNameList from "@/components/MenuNameList";
import Edit from "@/components/module/Edit";
import { show } from "@/js/dialog";
import Dialog from "@/components/Dialog";
import { requestGetBaseModuleList, requestGetBaseModule, requestDeleteBaseModule } from "@/js/api.js";
import { fmtStatus, formatterDate } from "@/js/format.js";

export default {
  name: "account",
  components: {
    State,
    Paging,
    SysNameList,
    MenuNameList,
    Edit,
    Dialog
  },
  data () {
    return {
      moudleList: [],
      cacheModuleList: [],
      mdInfo: {},
      perPage: 10,
      nameValue: "", // 姓名
      status: "2", // 状态
      loading: false,
      system: "",
      menu: "",
      mode: "",
      mdVisible: false,
      expands: []
    };
  },
  computed: {
  },
  mounted() {
    this.getModuleList();
  },

  methods: {
    // 获取模块数据列表
    async getModuleList() {
      const res = await requestGetBaseModuleList({
        name: this.nameValue,
        state: this.status
      });
      if (res.status === 200) {
        this.moudleList = res.data;
        this.cacheModuleList = this.moudleList.slice(0, this.perPage);
      }
    },
    // 新增模块
    handleAddMd () {
      this.mdVisible = true;
      this.mode = "新增模块";
    },
    // 编辑模块
    async handleEditMd (row) {
      // console.log(row);
      this.mdVisible = true;
      this.mode = "编辑模块";
      const res = await requestGetBaseModule({ id: row.id });
      if (res.status === 200) {
        this.mdInfo = res.data;
      }
    },
    // 删除模块
    handleDelMd (row) {
      show("您确定要删除这个模块吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: row
      }, "del");
    },
    // 真正的删除模块
    async RelDelMd(type, data) {
      const res = await requestDeleteBaseModule({ id: data.id });
      if (res.status === 200) {
        this.$message({
          type: "waring",
          message: "祝贺您，删除成功！"
        });
      }
    },
    // 新增平级
    handleAddPeer () {
      this.mdVisible = true;
      this.mode = "新增模块";
    },
    // 新增子级
    handleAddCollar () {
      this.mdVisible = true;
      this.mode = "新增模块";
    },
    handleCloseMd () {
      this.mdVisible = false;
    },
    // 切换姓名
    handleSwitchName (e) {
      this.nameValue = e;
    },
    // 切换状态
    handleSwitchStatus (e) {
      this.status = e;
    },
    handleSwitchSys (e) {
      this.system = e;
    },
    handleSwitchMenu (e) {
      this.menu = e;
    },
    // 自定义stripe样式
    tabRowClassName ({ row, rowIndex }) {
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
  },
};
</script>

<style lang="less" scope>
.el-table__row {
  position: relative;
  .el-table__expand-icon {
    position: absolute;
    left: 110px;
    bottom: 8px;
    z-index: 1999;
  }
}
</style>

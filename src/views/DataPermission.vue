<template>
  <div class="information">
    <ul class="retrieval-header dp-header">
      <li>
        <span>名称：</span>
        <el-input
          v-model="authorName"
          @input="filter"
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
        <h3>已有的数据权限列表</h3>
        <el-button
          class="fr add"
          @click="handleAddDp"
        >新增权限</el-button>
      </div>
      <el-table
        :data="cacheDperList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
        :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
        :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
      >
        <el-table-column
          label="名称"
          width="120"
          align="center"
          prop="Name"
        ></el-table-column>
        <el-table-column
          prop="Type"
          label="类型"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Value"
          label="值"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>

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
          prop="CreateTime"
          label="操作时间"
          width="150"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="Memo"
          label="备注"
          align="center"
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
              @click="handleEditDp(scope.row)"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelDp(scope.row)"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
      <Edit
        :mode="mode"
        :visible="dpVisible"
        :dperInfo="dperInfo"
        :dperList="dperList"
        @closed="handleCloseDp"
        @addDper="handleaddDper"
        @editDper="handleeditDper"
      ></Edit>

      <Dialog @userBehavior="handleRelDelDper"></Dialog>
      <Paging
        :tableList="dperList"
        :currentPage="currentPage"
        :totalCount="dperList.length"
        @TogglePagingData="handleTogglePagingData"
      ></Paging>
    </div>
  </div>
</template>

<script>
import State from "@/components/State";
import { tableList } from "@/js/dataset";
import Paging from "@/components/Paging";
import Edit from "@/components/dataPermission/Edit";
import { show } from "@/js/dialog";
import Dialog from "@/components/Dialog";
import { requestGetBaseScopeList, requestDeleteBaseScope } from "@/js/api";
import { fmtStatus, formatterDate } from "@/js/format.js";
import { pageData, frzzyQuery } from "@/js/utils.js";

export default {
  name: "account",
  components: {
    State,
    Paging,
    Edit,
    Dialog
  },
  data() {
    return {
      dperList: [],
      cacheDperList: [],
      dperInfo: {},
      status: "2", // 状态
      loading: false,
      authorName: "", // 权限名称
      dpVisible: false,
      mode: "",
      perPage: 10,
      currentPage: 1
    };
  },
  computed: {
    tableData() {
      return tableList;
    }
  },
  mounted() {
    this.getDperList();
  },
  methods: {
    // 点击查询
    handleSearch() {
      this.getDperList();
    },
    // 模糊查询
    filter() {
      if (this.authorName === "") return this.getDperList();
      this.cacheDperList = frzzyQuery(this.authorName, this.dperList);
    },
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheDperList = pageData(
        this.dperList,
        this.cacheDperList,
        e,
        this.perPage
      );
    },
    // 获取场景数据列表
    async getDperList() {
      const res = await requestGetBaseScopeList({
        name: this.authorName || "",
        state: this.status
      });
      if (res.status === 200) {
        this.dperList = res.data;
        this.cacheDperList = this.dperList.slice(0, this.perPage);
      }
    },
    // 新增数据权限
    handleAddDp() {
      this.dpVisible = true;
      this.mode = "新增数据权限";
      this.dperInfo = {};
    },
    // 编辑数据权限
    handleEditDp(row) {
      console.log(row);
      this.dpVisible = true;
      this.mode = "编辑数据权限";
      this.dperInfo = row;
      this.dperInfo.Type = this.dperInfo.Type.trim();
    },
    handleaddDper() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      }
      this.getDperList();
    },
    handleeditDper() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      }
      this.getDperList();
    },
    // 删除数据权限
    handleDelDp(row) {
      show(
        "您确定要删除这条数据吗？",
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
    // 真正的删除
    async handleRelDelDper(type, data) {
      const res = await requestDeleteBaseScope({ id: data.ScopeId });
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "祝贺你，删除成功!"
        });
        if (this.currentPage !== 1) {
          this.currentPage = 1;
        }
        this.getDperList();
      }
    },
    handleCloseDp() {
      this.dpVisible = false;
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
.dp-header {
  li:first-child {
    .el-input {
      width: calc(100% - 50px);
    }
  }
}
</style>

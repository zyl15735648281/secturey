<template>
  <div class="dep-all">
    <div class="dep-l fl">
      <h3>组织架构</h3>
      <el-input
        placeholder="请搜索"
        suffix-icon="el-icon-search"
        v-model="depValue"
        class="mg-b"
        @input="filterChange"
      >
      </el-input>

      <el-tree
        ref="depTree"
        :data="deepTreeList"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :filter-node-method="filter"
        @node-click="handleNodeClick"
      >
      </el-tree>

    </div>
    <div class="depInfo fr">
      <ul class="retrieval-header dep-header">
        <li>
          <span>部门名称：</span>
          <el-input
            v-model="depName"
            @input="handleFilter"
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
          <h3>已有的部门列表</h3>
          <el-button
            class="fr add"
            @click="handleAddDep"
          >新增部门</el-button>
        </div>
        <el-table
          :data="cacheDepList"
          :row-class-name="tabRowClassName"
          style="width: 100%"
          height="calc(100% - 70px)"
          v-loading="loading"
        >
          <el-table-column
            prop="Name"
            label="部门名称"
            width="150"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="PinyinShort"
            label="部门首字母"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ParentName"
            label="上级部门"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="IsEnable"
            label="状态"
            width="110"
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
            width="350"
            align="center"
          >
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                class="mg-r"
                @click="handleEditDep(scope.row)"
              >编辑</a>
              <a
                href="javascript:void(0);"
                class="mg-r"
                @click="handleDelDep(scope.row)"
              >删除</a>
              <a
                href="javascript:void(0);"
                class="mg-r"
                @click="handleAddPeers(scope.row)"
              >新增平级部门</a>
              <a
                href="javascript:void(0);"
                @click="handleCollarPeers(scope.row)"
              >新增下级部门</a>
            </template>
          </el-table-column>
        </el-table>
        <Paging
          :tableList="depList"
          :currentPage="currentPage"
          :totalCount="depList.length"
          @TogglePagingData="handleTogglePagingData"
        ></Paging>
      </div>
    </div>

    <Edit
      :title="mode"
      :visible="depEditVisible"
      :childDePInfo="childDePInfo"
      :depList="depList"
      :deepTreeList="deepTreeList"
      @addGp="handleAddGp"
      @editGp="handleEditGp"
      @closed="handleCloseEdit"
    ></Edit>
    <Dialog @userBehavior="handleRelDelDep"></Dialog>
  </div>

</template>

<script>
import State from "@/components/State";
import Paging from "@/components/Paging";
import Edit from "@/components/department/Edit";
import Dialog from "@/components/Dialog";
import { show } from "@/js/dialog";
import { requestGetBaseDepartmentList, requestDeleteBaseDepartment, requestGetDicDepartment, reqGetBaseDepartmentListByPid } from "@/js/api.js";
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
  data () {
    return {
      depList: [],
      cacheDepList: [],
      deepTreeList: [],
      childDePInfo: {},
      status: "2", // 状态
      loading: false,
      depName: "",
      depValue: "",
      depEditVisible: false,
      mode: "", // 新增部门 / 编辑部门
      perPage: 10,
      currentPage: 1,
      defaultProps: {
        label: "name",
        children: "treeChildren"
      },
      filterText: ""
    };
  },
  computed: {
  },
  watch: {
    depValue: function(val) {
      var arr = document.querySelectorAll(".el-tree-node .is-focusable .el-tree-node__content span:nth-child(2)");
      for (var i = 0; i < arr.length; i++) {
        var values = document.querySelector(arr[i]).html();
        document.querySelector(arr[i]).html(values.split("<span style=\"color: red;\">").join("").split("</span>").join(""));
        document.querySelector(arr[i]).html(values);
      }
      this.$refs.depTree.filter(val);
    }
  },
  mounted() {
    this.getBaseDepList();
    this.getDepLevelList();
  },
  methods: {
    filter(value, data) {
      console.log(data);
      if (!value) return true;
      return data.treeChildren.indexOf(value) !== -1;
    },
    filterChange() {
      setTimeout(() => {
        var val = this.filterText;
        if (val !== null && val !== "") {
          var arr = document.querySelectorAll(".el-tree-node .is-focusable .el-tree-node__content span:nth-child(2)");
          for (var i = 0; i < arr.length; i++) {
            var values = document.querySelector(arr[i]).html();
            var reg = new RegExp(val, "g");
            document.querySelector(arr[i]).html(values.replace(reg, "<span style=\"color: red;\">" + val + "</span>"));
          }
        }
      }, 100);
    },
    // 获取部门字典数据
    async getDepLevelList() {
      const res = await requestGetDicDepartment();
      if (res.status === 200) {
        this.deepTreeList = res.data;
      }
    },
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheDepList = pageData(this.depList, this.cacheDepList, e, this.perPage);
    },
    // 模糊查询
    handleFilter() {
      if (this.depName === "") return this.getBaseDepList();
      this.cacheDepList = frzzyQuery(this.depName, this.depList);
    },
    // 查询
    async handleSearch() {
      this.getBaseDepList();
    },
    // 获取部门数据列表
    async getBaseDepList() {
      const res = await requestGetBaseDepartmentList({
        name: this.depName || "",
        state: this.status
      });
      if (res.status === 200) {
        this.depList = res.data;
        this.cacheDepList = this.depList.slice(0, this.perPage);
      }
    },
    // 新增部门
    handleAddDep () {
      this.depEditVisible = true;
      this.mode = "新增部门";
      this.childDePInfo = {};
      this.getBaseDepList();
    },
    // 编辑部门
    handleEditDep (row) {
      this.depEditVisible = true;
      this.mode = "编辑部门";
      this.childDePInfo = row;
      this.getBaseDepList();
    },
    handleAddGp() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      }
      this.getBaseDepList();
      this.getDepLevelList();
    },
    handleEditGp() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      }
      this.getBaseDepList();
      this.getDepLevelList();
    },
    // 删除部门
    handleDelDep (row) {
      show("您确定要删除这个部门吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: row
      }, "del");
    },
    // 真正的删除
    async handleRelDelDep(type, data) {
      const res = await requestDeleteBaseDepartment({ id: data.Id });
      if (res.status === 200 && res.data === true) {
        this.$message({
          type: "success",
          message: "祝贺你，删除成功！"
        });
        if (this.currentPage !== 1) {
          this.currentPage = 1;
        }
        this.getBaseDepList();
        this.getDepLevelList();
      }
    },
    // 新增平级部门
    handleAddPeers (row) {
      this.depEditVisible = true;
      this.mode = "新增部门";
      this.childDePInfo = {};
      this.childDePInfo.ParentName = row.ParentName;
    },
    // 新增下级部门
    handleCollarPeers (row) {
      this.depEditVisible = true;
      this.mode = "新增部门";
      this.childDePInfo = {};
      this.childDePInfo.ParentName = row.Name;
    },
    handleCloseEdit () {
      this.depEditVisible = false;
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
    // 左侧节点数据
    async handleNodeClick (e) {
      const res = await reqGetBaseDepartmentListByPid({
        parentID: e.id
      });
      if (res.status === 200) {
        this.depList = res.data;
        this.cacheDepList = this.depList.slice(0, this.perPage);
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
.dep-all {
  height: 100%;
  .dep-l {
    width: 200px;
    height: calc(100% - 20px);
    box-shadow: 0 0px 3px #ccc;
    padding: 10px;
  }
  .depInfo {
    height: 100%;
    width: calc(100% - 230px);
    .dep-header {
      li:first-child {
        .el-input {
          width: calc(100% - 80px);
        }
      }
    }
  }
}
</style>

<template>
  <div class="dep-all">
    <div class="dep-l fl">
      <h3>组织架构</h3>
      <el-input
        placeholder="请搜索"
        suffix-icon="el-icon-search"
        v-model="depValue"
        class="mg-b"
      >
      </el-input>

      <el-tree
        :data="data"
        node-key="id"
        ref="tree"
        highlight-current
        @node-click="handleNodeClick"
      >
      </el-tree>

    </div>
    <div class="depInfo fr">
      <ul class="retrieval-header dep-header">
        <li>
          <span>部门名称：</span>
          <el-input v-model="depName"></el-input>
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
          <h3>已有的部门列表</h3>
          <el-button
            class="fr add"
            @click="handleAddDep"
          >新增部门</el-button>
        </div>
        <el-table
          :data="tableData"
          :row-class-name="tabRowClassName"
          style="width: 100%"
          height="calc(100% - 70px)"
          v-loading="loading"
        >
          <el-table-column
            prop="name"
            label="部门名称"
            width="150"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="部门首字母"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="上级部门"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="状态"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作人"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作时间"
            width="150"
            align="center"
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
                @click="handleEditDep"
              >编辑</a>
              <a
                href="javascript:void(0);"
                class="mg-r"
                @click="handleDelDep(scope.row)"
              >删除</a>
              <a
                href="javascript:void(0);"
                class="mg-r"
                @click="handleAddPeers"
              >新增平级部门</a>
              <a
                href="javascript:void(0);"
                @click="handleCollarPeers"
              >新增下级部门</a>
            </template>
          </el-table-column>
        </el-table>
        <Paging></Paging>
      </div>
    </div>

    <Edit
      :title="mode"
      :visible="depEditVisible"
      @closed="handleCloseEdit"
    ></Edit>
    <Dialog @userBehavior="handleRelDelDep"></Dialog>
  </div>

</template>

<script>
import State from "@/components/State";
import { tableList, dataList } from "@/js/dataset";
import Paging from "@/components/Paging";
import Edit from "@/components/department/Edit";
import Dialog from "@/components/Dialog";
import { show } from "@/js/dialog";

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
      nameValue: "", // 姓名
      status: "全部", // 状态
      loading: false,
      depName: "",
      depValue: "",
      depEditVisible: false,
      mode: "" // 新增部门 / 编辑部门
    };
  },
  computed: {
    tableData () {
      return tableList;
    },
    data () {
      return dataList;
    }
  },
  methods: {
    // 编辑部门
    handleEditDep () {
      this.depEditVisible = true;
      this.mode = "编辑部门";
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
      console.log(row);
    },
    // 真正的删除
    handleRelDelDep(type, data) {
      console.log(data);
      // if(res.status === 200){
      this.$message({
        type: "success",
        message: "祝贺你，删除成功！"
      });
      // }
    },
    // 新增部门
    handleAddDep () {
      this.depEditVisible = true;
      this.mode = "新增部门";
    },
    // 新增平级部门
    handleAddPeers () {
      this.depEditVisible = true;
      this.mode = "新增部门";
    },
    // 新增下级部门
    handleCollarPeers () {
      this.depEditVisible = true;
      this.mode = "新增部门";
    },
    handleCloseEdit () {
      this.depEditVisible = false;
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
    // 左侧节点
    handleNodeClick (e) {
      console.log(e);
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

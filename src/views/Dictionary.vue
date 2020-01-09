<template>
  <div class="information">
    <ul class="retrieval-header dic-header">
      <li>
        <span>类型：</span>
        <el-input
          v-model="typeName"
          @input="filter"
        ></el-input>
      </li>
      <li>
        <el-button @click="handleSearch">查询</el-button>
      </li>
    </ul>
    <div class="info-table">
      <div class="ui-header">
        <h3>已有的字典列表</h3>
        <el-button
          class="fr add"
          @click="handleAddDic"
        >新增字典</el-button>
      </div>
      <el-table
        :data="cacheDicList"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
      >
        <el-table-column
          label="类型"
          width="200"
          align="center"
          prop="Name"
        >
        </el-table-column>
        <el-table-column
          prop="Type"
          label="描述"
          width="280"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Value"
          label="值"
          width="200"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="IsEnable"
          label="备注"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditDic(scope.row)"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelDic(scope.row)"
            >删除</a>

          </template>
        </el-table-column>
      </el-table>
      <Edit
        :mode="mode"
        :visible="dicVisible"
        @closed="handleCloseDic"
      ></Edit>

      <Dialog @userBehavior="handleRelDelDic"></Dialog>

      <Paging
        :tableList="dicList"
        :currentPage="currentPage"
        :totalCount="dicList.length"
        @TogglePagingData="handleTogglePagingData"
      ></Paging>

    </div>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Edit from "@/components/dictionary/Edit";
import Paging from "@/components/Paging";
import { pageData } from "@/js/utils.js";

export default {
  name: "",
  components: {
    Dialog,
    Edit,
    Paging,
  },
  data() {
    return {
      cacheDicList: [],
      dicList: [],
      typeName: "",
      loading: false,
      perPage: 10,
      currentPage: 1,
      mode: "",
      dicVisible: false
    };
  },
  created() {
  },
  methods: {
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheDicList = pageData(
        this.dicList,
        this.cacheDicList,
        e,
        this.perPage
      );
    },
    getDicList() {
      // const res = await
    },
    filter() {},
    handleSearch() {},
    handleAddDic() {
      this.dicVisible = true;
    },
    handleEditDic(row) {
      this.dicVisible = true;
    },
    handleCloseDic() {
      this.dicVisible = false;
    },
    handleDelDic(row) {},
    // 真正的删除
    handleRelDelDic(type, data) {},
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

<style scope lang="less">
.dic-header {
  li:first-child {
    .el-input {
      width: calc(100% - 50px);
    }
  }
}
</style>

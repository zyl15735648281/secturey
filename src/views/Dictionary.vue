<template>
  <div class="information">
    <ul class="retrieval-header dic-header">
      <li>
        <span>名称：</span>
        <el-input
          v-model="dicValue"
          @input="filterDic"
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
        :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
        :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
      >
        <el-table-column
          prop="DicName"
          label="名称"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>

        <el-table-column
          label="类型"
          align="center"
          prop="DicType"
        ></el-table-column>

        <el-table-column
          prop="IsEnable"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Note"
          label="备注"
          align="center"
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
        :dicInfo="dicInfo"
        @closed="handleCloseDic"
        @addDic="handleAddDicChi"
        @editDic="handleEditDicChi"
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
import { pageData, frzzyQuery } from "@/js/utils.js";
import {
  requestGetBaseDictionaryList,
  requestGetBaseDictionary,
  requestDeleteBaseDictionary
} from "@/js/api";
import { show } from "@/js/dialog";
export default {
  name: "",
  components: {
    Dialog,
    Edit,
    Paging
  },
  data() {
    return {
      cacheDicList: [],
      dicList: [],
      dicInfo: {},
      dicValue: "",
      loading: false,
      perPage: 10,
      currentPage: 1,
      mode: "",
      dicVisible: false
    };
  },
  mounted() {
    this.getDicList();
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
    // 获取数据列表
    async getDicList() {
      const res = await requestGetBaseDictionaryList({
        dicType: "",
        dicName: this.dicValue || ""
      });
      if (res.status === 200) {
        this.dicList = res.data;
        this.cacheDicList = this.dicList.slice(0, this.perPage);
      }
    },
    filterDic() {
      if (this.dicValue === "") return this.getDicList();
      this.cacheDicList = frzzyQuery(this.dicValue, this.dicList, "dic");
    },
    handleSearch() {
      this.getDicList();
    },
    // 新增字典
    handleAddDic() {
      this.mode = "新增字典";
      this.dicVisible = true;
      this.dicInfo = {};
    },
    // 编辑字典
    async handleEditDic(row) {
      this.mode = "编辑字典";
      this.dicVisible = true;
      const res = await requestGetBaseDictionary({ id: row.Id });
      if (res.status === 200) {
        this.dicInfo = res.data;
      }
    },
    handleAddDicChi() {
      this.getDicList();
    },
    handleEditDicChi() {
      this.getDicList();
    },
    handleCloseDic() {
      this.dicVisible = false;
    },
    handleDelDic(row) {
      show(
        "您确定要删除这条字典信息吗？",
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
    async handleRelDelDic(type, data) {
      const res = await requestDeleteBaseDictionary({ id: data.Id });
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "祝贺你，删除成功!"
        });
        this.getDicList();
      }
    },
    // 自定义stripe样式
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 === 0) {
        return "warning-row";
      }
    }
  }
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

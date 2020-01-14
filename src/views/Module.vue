<template>
  <div class="information">
    <ul class="retrieval-header mo-header">
      <li>
        <span>系统名称：</span>
        <SysNameList
          v-model="system"
          :sysList="sysList"
        ></SysNameList>
      </li>

      <li>
        <MenuNameList
          :menuList="moudleList"
          v-model="menu"
        ></MenuNameList>
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
        :header-cell-style="{fontSize:'16px',color: '#111',fontWeight:600}"
        :cell-style="{fontSize:'14px',color: '#111',fontWeight:500}"
      >
        <el-table-column
          label="系统名称"
          width="150"
          align="center"
          prop="SystemName"
          :show-overflow-tooltip="true"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="菜单名称"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.name}}
            <i
              class="iconfont icon-jiantou_qiehuanxiangxia"
              @click="handleDownMove(scope.row)"
              v-if="scope.row.Sort !== max"
            ></i>
            <i
              class="iconfont icon-jiantou_qiehuanxiangshang"
              @click="handleUpMove(scope.row)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="Sort"
          label="排序"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Type"
          label="类型"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="IsEnable"
          label="状态"
          width="130"
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
          width="150"
          align="center"
          :formatter="fmtDate"
          :show-overflow-tooltip="true"
        ></el-table-column>
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
        :sysList="sysList"
        :moudleList="moudleList"
        :Icon="Icon"
        @closed="handleCloseMd"
        @addMd="handleAddMdSuc"
        @editMd="handleEditMdSuc"
      ></Edit>
      <Paging
        :tableList="moudleList"
        :currentPage="currentPage"
        :totalCount="moudleList.length"
        @TogglePagingData="handleTogglePagingData"
      ></Paging>
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
import {
  requestGetBaseModuleList,
  requestGetBaseModule,
  requestDeleteBaseModule,
  requestMoveBaseModule,
  requestGetTableSystemList
} from "@/js/api.js";
import { fmtStatus, formatterDate } from "@/js/format.js";
import { pageData } from "@/js/utils.js";

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
  data() {
    return {
      moudleList: [],
      cacheModuleList: [],
      mdInfo: {},
      sysList: [],
      Icon: "",
      perPage: 10,
      nameValue: "", // 姓名
      status: "2", // 状态
      loading: false,
      system: "",
      menu: "",
      mode: "",
      mdVisible: false,
      currentPage: 1,
      max: 0
    };
  },
  mounted() {
    this.getModuleList();
    this.getSysList();
  },
  methods: {
    // 查询
    handleSearch() {

    },
    // 分页数据
    handleTogglePagingData(e) {
      this.currentPage = e;
      this.cacheModuleList = pageData(
        this.moudleList,
        this.cacheModuleList,
        e,
        this.perPage
      );
    },
    // 获取系统名称列表
    async getSysList() {
      const res = await requestGetTableSystemList({
        name: "",
        environmentId: "",
        isEnable: 2
      });
      this.sysList = res.data;
    },
    // 获取模块数据列表
    async getModuleList() {
      const res = await requestGetBaseModuleList({
        name: this.nameValue,
        state: this.status
      });
      if (res.status === 200) {
        this.moudleList = res.data;
        this.cacheModuleList = this.moudleList.slice(0, this.perPage);
        // 遍历数组，找到其中modulist中最大值
        this.max = Math.max.apply(Math, this.moudleList.map(r => { return r.Sort; }));
      }
    },
    // 下移，
    async handleDownMove(row) {
      const res = await requestMoveBaseModule({
        currentId: row.id,
        type: row.Type,
        changId: row.changId
      });
      console.log(res);
    },
    // 上移
    async handleUpMove(row) {
      const res = await requestMoveBaseModule({
        currentId: row.id,
        type: row.Type,
        changId: row.changId
      });
      console.log(res);
    },
    // 新增模块
    handleAddMd() {
      this.mdVisible = true;
      this.mode = "新增模块";
      this.mdInfo = {};
      this.Icon = "";
    },
    // 编辑模块
    async handleEditMd(row) {
      console.log(row);
      this.mdVisible = true;
      this.mode = "编辑模块";
      const res = await requestGetBaseModule({ id: row.id });
      if (res.status === 200) {
        this.mdInfo = res.data;
        if (this.mdInfo.ParentId.trim() === "0") {
          this.mdInfo.parentName = "";
        } else {
          if (this.moudleList.length > 0) {
            this.moudleList.forEach(element => {
              if (element.id.trim() === this.mdInfo.ParentId.trim()) {
                this.mdInfo.parentName = element.name;
              }
            });
          }
        }
      }

      // var imgFile = this.base64ImgtoFile(this.mdInfo.Icon);
    },
    // base64编码转换成图片
    base64ImgtoFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      });
    },
    handleAddMdSuc() {
      this.getModuleList();
    },
    handleEditMdSuc() {
      this.getModuleList();
    },
    // 删除模块
    handleDelMd(row) {
      show(
        "您确定要删除这个模块吗？",
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
    // 真正的删除模块
    async RelDelMd(type, data) {
      const res = await requestDeleteBaseModule({ id: data.id });
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "祝贺您，删除成功！"
        });
        this.getModuleList();
      }
    },
    // 新增平级
    handleAddPeer() {
      this.mdVisible = true;
      this.mode = "新增平级";
      // this.mdInfo = {};
    },
    // 新增子级
    async handleAddCollar(row) {
      this.mdVisible = true;
      this.mode = "新增子级";
      const res = await requestGetBaseModule({ id: row.id });
      if (res.status === 200) {
        let tempInfo = res.data;
        console.log(tempInfo);
        this.mdInfo.parentName = tempInfo.Name;
      }
    },
    handleCloseMd() {
      this.mdVisible = false;
    },
    // 切换姓名
    handleSwitchName(e) {
      this.nameValue = e;
    },
    // 切换状态
    handleSwitchStatus(e) {
      this.status = e;
    },
    handleSwitchSys(e) {
      this.system = e;
    },
    handleSwitchMenu(e) {
      this.menu = e;
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
.el-table__row {
  position: relative;
  .el-table__expand-icon {
    position: absolute;
    left: 145px;
    bottom: 9px;
    z-index: 1999;
  }
  .iconfont {
    margin-right: -5px;
    cursor: pointer;
  }
  .iconfont:hover {
    color: #4bc183;
  }
}
</style>

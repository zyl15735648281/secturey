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
        :data="tableData"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
      >
        <el-table-column
          label="系统名称"
          width="120"
          align="center"
          prop="name"
        >
        </el-table-column>

        <el-table-column
          type="expand"
          align="right"
          width="20"
        >
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
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
          prop=""
          label="排序"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="状态"
          width="130"
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
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="name"
          label="操作时间"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          align="center"
        >
          <template>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditMd"
            >编辑</a>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleDelMd"
            >删除</a>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleAddPeer"
            >新增平级</a>
            <a
              href="javascript:void(0);"
              @click="handleAddCollar"
            >新增子级</a>
          </template>
        </el-table-column>
      </el-table>
      <Edit
        :mode="mode"
        :visible="mdVisible"
        @closed="handleCloseMd"
      ></Edit>
      <Paging></Paging>
      <Dialog></Dialog>
    </div>
  </div>
</template>

<script>
import State from "@/components/State";
import { tableList } from "@/js/dataset";
import Paging from "@/components/Paging";
import SysNameList from "@/components/SysNameList";
import MenuNameList from "@/components/MenuNameList";
import Edit from "@/components/module/Edit";
import { show } from "@/js/dialog";
import Dialog from "@/components/Dialog";

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
      nameValue: "", // 姓名
      status: "全部", // 状态
      loading: false,
      system: "",
      menu: "",
      mode: "",
      mdVisible: false,
      expands: []
    };
  },
  computed: {
    tableData () {
      return tableList;
    }
  },

  methods: {
    rowClick (row, event, column) { // 控制展开行
      var NoIndex = column.type.indexOf("expand");
      if (NoIndex === 0 && row.child.length <= 0) {
        this.expands = [];
        return;
      }
      if (row.child.length > 0) {
        // eslint-disable-next-line no-extend-native
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        if (this.expands.indexOf(row.id) < 0) { // 确保只展开一行
          this.expands.shift();
          this.expands.push(row.id);
        } else {
          this.expands.remove(row.id);
        }
      } else {
        console.log(111);
      }
    },
    isShowIcon () {},
    // 新增模块
    handleAddMd () {
      this.mdVisible = true;
      this.mode = "新增模块";
    },
    // 编辑模块
    handleEditMd () {
      this.mdVisible = true;
      this.mode = "编辑模块";
    },
    // 删除模块
    handleDelMd () {
      show("您确定要删除这个模块吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: ""
      }, "del");
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
  },
};
</script>

<style lang="less" scope>
</style>

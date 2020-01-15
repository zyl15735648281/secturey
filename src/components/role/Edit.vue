<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="roleStyle"
    >
      <el-form v-model="roleInfo">
        <el-form-item
          label="角色名称"
          class="require"
        >
          <el-input v-model="roleInfo.Name"></el-input>
        </el-form-item>
        <!-- tab切换s -->
        <SysMenu
          :sysList="sysList"
          :relMoudleList="relMoudleList"
          :alreadyMoudleList="alreadyMoudleList"
          @watchTab="handleWatchTab"
          @switchChecked="handleSwitchCheckedList"
        ></SysMenu>
        <CommonLimit></CommonLimit>
        <!-- tab切换e -->
        <el-form-item
          label="数据权限"
          class="norequire"
        >
          <DataPermission
            :dataPerList="dataPerList"
            v-model="dataPerValue"
            @removeDpList="handleRemoveDpList"
          ></DataPermission>
          <DpList
            :alreadyDataPerList="alreadyDataPerList"
            @removeADP="handleRemoveADP"
          ></DpList>
        </el-form-item>
        <el-form-item
          label="状态"
          class="require"
        >
          <el-radio
            :label="true"
            v-model="roleInfo.IsEnable"
          >正常</el-radio>
          <el-radio
            :label="false"
            v-model="roleInfo.IsEnable"
          >禁用</el-radio>
        </el-form-item>
        <el-form-item
          label="角色类型"
          class="require"
        >
          <TypeSelect v-model="roleInfo.TypeName"></TypeSelect>
        </el-form-item>
        <el-form-item
          label="备注"
          class="norequire"
        >
          <el-input
            type="textarea"
            maxlength="500"
            v-model="roleInfo.Description"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          class="cancle"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          class="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SysMenu from "@/components/role/SysMenu";
import DataPermission from "@/components/role/DataPermission";
import DpList from "@/components/role/DpList";
import { requestBaseRole, requestGetBaseModuleList } from "@/js/api.js";
import CommonLimit from "@/components/CommonLimit";
import { treeList } from "@/js/utils.js";
import TypeSelect from "@/components/role/TypeSelect";
import _ from "lodash";

export default {
  name: "",
  components: {
    SysMenu,
    DataPermission,
    DpList,
    CommonLimit,
    TypeSelect
  },
  data() {
    return {
      dataPerValue: "",
      commonIndex: "0",
      moudleList: [],
      relMoudleList: [],
      checkedList: [],
      typeValue: ""
    };
  },
  props: {
    mode: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    roleInfo: {
      type: Object,
      default: () => {}
    },
    dataPerList: {
      type: Array,
      default: () => []
    },
    alreadyDataPerList: {
      type: Array,
      default: () => []
    },
    sysList: {
      type: Array,
      default: () => []
    },
    alreadyMoudleList: {
      type: Array,
      default: () => []
    }
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("closed");
    },
    async handleWatchTab(e) {
      this.commonIndex = e.index;
      const res = await requestGetBaseModuleList({
        name: "",
        state: 2,
        systemName: ""
      });
      if (res.status === 200) {
        this.moudleList = res.data;
        this.relMoudleList = this.moudleList.filter(r => { return r.SystemName === e.label; });
        if (this.mode === "新增角色") {
          this.relMoudleList = treeList(this.relMoudleList);
        } else {
          // 循环遍历 alreadyMoudleList ，在alreadyMoudleList里面checked加入false
          // let arr = this.alreadyMoudleList.map(r => ({ checked: true, ...r }));
          // let arr1 = _.filter(this.moudleList, item => _.every(arr, ele => item.Id !== ele.Id));
          // let temp = arr1.map(r => ({ checked: false, ...r }));
          // this.relMoudleList = arr.concat(temp);
        }
      }
    },
    handleSwitchCheckedList(e) {
      e.checked = !e.checked;
      if (e.checked === false) {
        if (this.checkedList.length > 0) {
          // 找到这条数据并删除
          let idx = _.findIndex(this.checkList, { "id": e.id });
          this.checkedList.splice(idx, 1);
        }
      } else {
        // 是否 this.checkList 已经存在这条数据
        if (this.checkedList.length > 0) {
          let arr = this.checkedList.filter(r => { return r.id === e.id; });
          if (arr.length > 0) {

          } else {
            this.checkedList.push(e);
          }
        } else {
          this.checkedList.push(e);
        }
      }
      console.log(this.checkedList);
    },
    // 编辑/修改
    async handleConfirm() {
      if (!this.verify()) {
        return;
      }
      const params = {
        id: "",
        name: this.roleInfo.Name,
        isEnable: this.roleInfo.IsEnable,
        typeId: "",
        typeName: this.roleInfo.TypeName,
        description: this.roleInfo.Description,
        parentId: this.roleInfo.ParentId || 0,
        createUserId: this.$store.state.userInfo.UseId,
        createUserName: this.$store.state.userInfo.Name,
        baseDepartmentRoleModels: [],
        baseUserRoleModels: [],
        baseGroupRoleModels: []
      };

      let arr = [];
      let arr1 = [];
      this.checkedList.forEach(element => {
        arr.push({
          roleId: "",
          moduleId: element.id,
          moduleName: element.name,
          isEnable: false,
          createUserId: element.CreateUserId,
          createUserName: element.CreateUserName,
        });
      });
      params.baseRoleModuleModels = arr;

      this.alreadyDataPerList.forEach(element => {
        arr1.push({
          roleId: "",
          scopeId: element.ScopeId,
          scopeName: element.Name,
          isEnable: false,
          createUserId: element.CreateUserId,
          createUserName: element.CreateUserName,
        });
      });
      params.baseRoleScopeModels = arr1;

      if (this.mode === "编辑角色") {
        params.id = this.roleInfo.Id;
        params.typeId = this.roleInfo.TypeId;
      }
      console.log(params);
      const res = await requestBaseRole(params);
      if (this.mode === "新增角色") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addRole");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，修改成功"
          });
          this.$emit("editRole");
          this.handleClose();
        }
      }
    },
    verify() {
      if (this.roleInfo.Name === undefined || this.roleInfo.Name === "") {
        this.$message({
          type: "waring",
          message: "请输入角色名称"
        });
        return false;
      }

      if (this.roleInfo.Name === undefined || this.roleInfo.Name === "") {
        this.$message({
          type: "waring",
          message: "请输入角色名称"
        });
        return false;
      }

      if (this.roleInfo.TypeName === undefined || this.roleInfo.TypeName === "") {
        this.$message({
          type: "waring",
          message: "请选择状态"
        });
        return false;
      }
      return true;
    },
    handleRemoveDpList(row) {
      if (this.dataPerList.length > 0) {
        const idx = _.findIndex(this.dataPerList, { ScopeId: row.ScopeId });
        this.dataPerList.splice(idx, 1);
        this.alreadyDataPerList.unshift(row);
      }
    },
    handleRemoveADP(row) {
      if (this.alreadyDataPerList.length > 0) {
        const idx = _.findIndex(this.alreadyDataPerList, {
          ScopeId: row.ScopeId
        });
        this.alreadyDataPerList.splice(idx, 1);
        this.dataPerList.unshift(row);
      }
    }
  }
};
</script>

<style scope lang="less">
.roleStyle {
  .el-dialog__body {
    height: 350px;
    overflow: auto;
  }
}
.require {
  display: flex;

  .el-form-item__label {
    letter-spacing: 0.5px;
    text-align-last: justify;
    width: 110px;
  }

  .el-form-item__content {
    width: calc(100% - 110px);
    margin-left: 0;
  }
}
.require::before {
  content: "*";
  color: #ff4949;
  width: 14px;
  height: 40px;
  line-height: 40px;
}
</style>

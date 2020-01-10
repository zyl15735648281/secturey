<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form v-model="roleInfo">
        <el-form-item
          label="角色名称"
          class="require"
        >
          <el-input v-model="roleInfo.Name"></el-input>
        </el-form-item>
        <SysMenu></SysMenu>
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
import { requestBaseRole } from "@/js/api.js";
import _ from "lodash";

export default {
  name: "",
  components: {
    SysMenu,
    DataPermission,
    DpList
  },
  data () {
    return {
      dataPerValue: ""
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
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    },
    async handleConfirm() {
      const params = {
        id: "",
        name: this.roleInfo.Name,
        isEnable: this.roleInfo.IsEnable,
        description: this.roleInfo.Description,
        parentId: this.roleInfo.ParentId || 0,
        createUserId: "zyl",
        createUserName: "zyl",
        baseRoleModuleModels: [],
        baseRoleScopeModels: [],
        baseDepartmentRoleModels: [],
        baseUserRoleModels: [],
        baseGroupRoleModels: [],
      };
      if (this.mode === "编辑角色") {
        params.id = this.roleInfo.Id;
      }

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
    handleRemoveDpList(row) {
      if (this.dataPerList.length > 0) {
        const idx = _.findIndex(this.dataPerList, { "ScopeId": row.ScopeId });
        this.dataPerList.splice(idx, 1);
        this.alreadyDataPerList.unshift(row);
      }
    },
    handleRemoveADP(row) {
      if (this.alreadyDataPerList.length > 0) {
        const idx = _.findIndex(this.alreadyDataPerList, { "ScopeId": row.ScopeId });
        this.alreadyDataPerList.splice(idx, 1);
        this.dataPerList.unshift(row);
      }
    }
  },
};
</script>

<style scope lang="less">
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

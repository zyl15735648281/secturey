<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <el-form v-model="groupInfo">
        <el-form-item label="组名称">
          <el-input v-model="groupInfo.Name"></el-input>
        </el-form-item>
        <el-form-item
          label="上级组"
          id="group-norequired"
        >
          <el-input
            v-model="groupInfo.ParentId"
            style="width: 48%;"
          ></el-input>
          <SelectTree
            id="overgroup"
            :selectList="spTreeList"
            v-model="groupInfo.ParentId"
          ></SelectTree>
        </el-form-item>
        <el-form-item
          label="组成员"
          style="margin-bottom:10px;"
        >
          <OperateGroup
            class="fl"
            :userList="userList"
            target="添加"
            @addUser="handleAddUser"
          ></OperateGroup>
          <div class="rel-header">
            <h3>所属用户</h3>
            <span>已有{{alreadyGpList !== null && alreadyGpList !== undefined ? alreadyGpList.length : '0'}}个</span>
          </div>
          <OperateGroup
            class="fr"
            target="删除"
            :aleradyUserList="alreadyGpList"
            @removeUser="handleRemoveUser"
          ></OperateGroup>
        </el-form-item>
        <el-form-item
          label="角色"
          id="group-norequired"
          style="margin-bottom:10px;"
        >
          <a
            href="javascript:void(0);"
            @click="handleAddRole"
          >添加</a>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            :label="true"
            v-model="groupInfo.IsEnable"
          >正常</el-radio>
          <el-radio
            :label="false"
            v-model="groupInfo.IsEnable"
          >禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="500"
            v-model="groupInfo.Memo"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          id="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
    <RoleDialog @userBehavior="switchRoleValue"></RoleDialog>
  </div>
</template>

<script>
import OperateGroup from "@/components/group/OperateGroup";
import RoleDialog from "@/components/account/RoleDialog";
import { show } from "@/js/dialog";
import SelectTree from "@/components/SelectTree";
import _ from "lodash";
import { requestBaseGroup } from "@/js/api.js";

export default {
  name: "",
  components: {
    OperateGroup,
    RoleDialog,
    SelectTree
  },
  data () {
    return {
      overDepValue: "",
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
    userList: {
      type: Array,
      default: () => []
    },
    groupInfo: {
      type: Object,
      default: () => {}
    },
    spTreeList: {
      type: Array,
      default: () => []
    },
    alreadyGpList: {
      type: Array,
      default: () => []
    }
  },
  created () {
  },
  methods: {
    switchRoleValue () {

    },
    switchOverDep(e) {
      this.overDepValue = e;
    },
    handleClose () {
      this.$emit("closed");
    },
    // 修改/新增
    async handleConfirm() {
      // 必要的验证
      // this.verify()
      const params = {
        id: "",
        name: this.groupInfo.Name,
        parentId: this.groupInfo.parentId || 0,
        memo: this.groupInfo.Memo,
        isEnable: this.groupInfo.IsEnable,
        createUserId: "zyl",
        createUserName: "zyl",
        baseGroupRoleModels: [],
        baseUserGroupModels: this.alreadyGpList,
      };
      console.log(params);

      if (this.mode === "编辑组") {
        params.id = this.groupInfo.Id;
      }

      const res = await requestBaseGroup(params);
      if (this.mode === "新增组") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addGp");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，编辑成功"
          });
          this.$emit("editGp");
          this.handleClose();
        }
      }
    },
    handleAddRole () {
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "请为该用户添加/编辑角色"
      }, "role");
    },
    handleAddUser(row) {
      const idx = _.findIndex(this.userList, { "UserId": row.UserId });
      this.userList.splice(idx, 1);
      this.alreadyGpList.unshift(row);
    },
    handleRemoveUser(row) {
      const idx = _.findIndex(this.alreadyGpList, { "UserId": row.UserId });
      this.alreadyGpList.splice(idx, 1);
      this.userList.unshift(row);
    },
  },
};
</script>

<style scope lang="less">
.rel-header {
  margin-bottom: 10px;
  width: 48%;
  float: right;
  span {
    float: right;
    font-size: 16px;
    font-weight: 600;
    color: #fa9933;
  }
}
.re-list {
  width: 48%;
  .group-list {
    width: 100%;
  }
}
#overgroup {
  .el-select {
    width: 100%;
  }
}
#group-norequired {
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

#group-norequired::before {
  content: " ";
  width: 14px;
  height: 40px;
  line-height: 40px;
}
</style>

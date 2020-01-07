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
            <span>已有{{groupInfo.baseUserGroupModels !== null && groupInfo.baseUserGroupModels !== undefined ? groupInfo.baseUserGroupModels.length : '0'}}个</span>
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
          @click="handleClose"
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
    handleAddRole () {
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "请为该用户添加/编辑角色"
      }, "role");
    },
    handleAddUser(row) {
      this.$emit("addUsers", row);
    },
    handleRemoveUser(row) {
      this.$emit("removeUsers", row);
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

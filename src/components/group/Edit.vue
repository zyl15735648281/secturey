<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <el-form>
        <el-form-item label="组名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item
          label="上级组"
          id="group-norequired"
        >
          <SelectTree id="overgroup"></SelectTree>
        </el-form-item>
        <el-form-item
          label="组成员"
          style="margin-bottom:10px;"
        >
          <OperateGroup class="fl"></OperateGroup>
          <CommonGroupUser class="fr"></CommonGroupUser>

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
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="500"
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
import CommonGroupUser from "@/components/CommonGroupUser";

export default {
  name: "",
  components: {
    OperateGroup,
    RoleDialog,
    SelectTree,
    CommonGroupUser
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
    }
  },
};
</script>

<style scope lang="less">
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

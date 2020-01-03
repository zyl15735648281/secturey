<template>
  <div>
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <!-- <span>新增用户</span> -->
      <el-form :model="accountInfo">
        <el-form-item label="姓名">
          <el-input
            v-model="accountInfo.Name"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="accountInfo.UserName"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input
            v-model="accountInfo.EmployeeId"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
          <DepList
            :depList="depList"
            v-model="accountInfo.DefaultDepName"
            class="dep-sel"
          ></DepList>
        </el-form-item>
        <el-form-item
          label="角色"
          id="norequired"
        >
          <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
          <a
            href="javascript:void(0);"
            @click="handleAddRole"
          >添加</a>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="accountInfo.Mobile"></el-input>
        </el-form-item>
        <el-form-item
          label="Email"
          id="norequired"
        >
          <el-input v-model="accountInfo.Email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            label="true"
            v-model="accountInfo.IsEnable"
          >开启</el-radio>
          <el-radio
            label="false"
            v-model="accountInfo.IsEnable"
          >禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="500"
            v-model="accountInfo.Note"
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
import DepList from "@/components/DepList";
import RoleDialog from "@/components/account/RoleDialog";
import { show } from "@/js/dialog";
import { requestBaseScope } from "@/js/api";

export default {
  name: "",
  components: {
    DepList,
    RoleDialog
  },
  data () {
    return {
      depValue: ""
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "新增用户"
    },
    depList: {
      type: Array,
      default: () => []
    },
    accountInfo: {
      type: Object,
      default: () => {}
    }
  },
  created () {
  },
  watch: {
    accountInfo (val) {
      if (val.IsEnable === undefined) {
        return;
      }
      val.IsEnable = val.IsEnable.toString();
    }
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    },
    // 编辑/添加
    async handleConfirm () {
      const params = {
        userId: "",
        userCode: "",
        name: this.accountInfo.Name,
        userName: this.accountInfo.UserName,
        employeeId: this.accountInfo.EmployeeId,
        isEnable: this.accountInfo.IsEnable,
        email: this.accountInfo.Email,
        mobile: this.accountInfo.Mobile,
        note: this.accountInfo.Note,
        defaultDepName: this.accountInfo.DefaultDepName,
        createUserId: "",
        createUserName: "",
        baseUserRoleList: [],
      };

      this.depList.forEach(element => {
        if (this.accountInfo.DefaultDepName === element.Name) {
          params.DefaultDepCode = element.DepCode;
        }
      });

      if (this.mode === "编辑用户") {
        params.userId = this.accountInfo.UserId;
      }

      const res = await requestBaseScope(params);
      console.log(res);
      if (this.mode === "新增用户") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addAccount");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，编辑成功"
          });
          this.$emit("editAccount");
          this.handleClose();
        }
      }
    },
    switchDep (e) {
      this.depValue = e;
    },
    switchRoleValue (type, data) {
      // console.log(data);
    },
    // 添加角色
    handleAddRole () {
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "请为该用户添加/编辑角色",
        data: "woshi11"
      }, "role");
    }
  },
};
</script>

<style lang="less" scope>
#norequired {
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

#norequired::before {
  content: " ";
  width: 14px;
  height: 40px;
  line-height: 40px;
}
.dep-sel {
  .el-select {
    width: 100%;
  }
}
</style>

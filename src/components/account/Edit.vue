<template>
  <div>
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
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
          <div class="roleDiv">
            <ul>
              <li
                v-for="role in userRoleList"
                :key="role.RoleId"
              >{{role.CreateUserName}}<i
                  class="el-icon-circle-close fr"
                  style="margin-top:13px;margin-right:3px"
                ></i></li>
            </ul>
            <a
              href="javascript:void(0);"
              @click="handleAddRole"
              class="fr"
              v-if="mode === '新增用户'"
            >添加</a>
            <a
              href="javascript:void(0);"
              @click="handleEditRole"
              class="fr"
              v-if="mode === '编辑用户' "
            >修改</a>
          </div>

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
            v-model="accountInfo.IsEnable"
            :label="true"
          >正常</el-radio>
          <el-radio
            v-model="accountInfo.IsEnable"
            :label="false"
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
    <RoleDialog
      @userBehavior="switchRoleValue"
      :roleList="roleList"
    ></RoleDialog>
  </div>

</template>

<script>
import DepList from "@/components/DepList";
import RoleDialog from "@/components/account/RoleDialog";
import { show } from "@/js/dialog";
import { requestBaseUser } from "@/js/api";
import { requestGetBaseRoleList } from "@/js/api.js";

export default {
  name: "",
  components: {
    DepList,
    RoleDialog
  },
  data () {
    return {
      roleList: [],
      userRoleList: []
    };
  },
  watch: {
    accountInfo(val) {
      this.userRoleList = val.baseUserRoleList;
    }
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
        createUserId: "zyl",
        createUserName: "zyl",
        baseUserRoleList: this.userRoleList,
      };

      this.depList.forEach(element => {
        if (this.accountInfo.DefaultDepName === element.Name) {
          params.DefaultDepCode = element.DepCode;
        }
      });

      if (this.mode === "编辑用户") {
        params.userId = this.accountInfo.UserId;
      }

      const res = await requestBaseUser(params);
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
    switchRoleValue (type, data) {
      this.userRoleList = data;
    },
    async getRoleList() {
      const res = await requestGetBaseRoleList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        this.roleList = res.data;
      }
    },
    // 添加角色
    handleAddRole () {
      this.getRoleList();
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "请为该用户添加角色",
        data: ""
      }, "role");
    },
    // 修改角色
    handleEditRole() {
      this.getRoleList();
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "编辑该用户角色",
        data: ""
      }, "role");
    }
  },
};
</script>

<style lang="less" scope>
.roleDiv {
  // width: calc(100);
  ul {
    width: calc(100% - 40px);
    li {
      width: 70px;
      float: left;
      border: 1px solid #e4e4e4;
      margin-right: 6px;
      border-radius: 5px;
    }
  }
}
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

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
                v-for="(role,index) in userRoleList[0]"
                :key="role.Id"
              >{{role.Name}}<i
                  class="el-icon-circle-close fr icon"
                  style="margin-top:13px;margin-right:3px"
                  @click="handleDelRole(role,index)"
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
      :userRoleList="userRoleList"
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
  watch: {
    accountInfo(val) {
      if (this.mode === "编辑用户") {
        if (val.baseUserRoleList !== null && val.baseUserRoleList !== undefined) {
          if (val.baseUserRoleList.length > 0) {
            this.userRoleList = [[]];
            val.baseUserRoleList.forEach(element => {
              this.userRoleList[0].push({
                Id: element.RoleId,
                Name: element.RoleName,
                startTime: element.BeginTime,
                endTime: element.EndTime,
                isEver: element.IsEnable,
                CreateUserId: element.CreateUserId,
                CreateUserName: element.CreateUserName,
                CreateTime: element.CreateTime
              });
            });
          }
        }
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    },
    // 编辑/添加
    async handleConfirm () {
      let paUserRoleList = [];
      if (this.userRoleList[0] !== undefined || this.userRoleList[0] !== null) {
        if (this.userRoleList[0].length >= 1) {
          this.userRoleList[0].forEach(element => {
            paUserRoleList.push({
              RoleId: element.Id,
              RoleName: element.Name,
              BeginTime: element.startTime,
              EndTime: element.endTime,
              IsEnable: element.isEver,
              CreateUserId: element.CreateUserId,
              CreateUserName: element.CreateUserName,
              CreateTime: element.CreateTime,
            });
          });
        }
      }

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
        baseUserRoleList: paUserRoleList,
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
      this.userRoleList.push(data);
    },
    // 添加角色
    async handleAddRole () {
      const res = await requestGetBaseRoleList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        this.roleList = res.data.map(r => ({ checked: false, startTime: "", endTime: "", isEver: false, ...r }));
      }

      this.userRoleList = [];
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "请为该用户添加角色",
        data: ""
      }, "role");
    },
    // 修改角色
    async handleEditRole() {
      const res = await requestGetBaseRoleList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        // 循环res.data 如果res.data 的IsEnable 为true的时候，checked必定为true，
        let arr = [];
        let arr1 = [];
        this.userRoleList[0].forEach(element => {
          arr.push({ checked: true, startTime: element.BeginTime, endTime: element.EndTime, isEver: element.IsEnable, ...element });
        });
        this.roleList = res.data.map(r => ({ checked: false, startTime: "", endTime: "", isEver: false, ...r }));
        arr1 = res.data.map(r => ({ checked: false, startTime: "", endTime: "", isEver: false, ...r }));
        this.roleList = arr.concat(arr1);
      }
      show("", {
        type: "confirm",
        confirmText: "选好了",
        cancelText: "取消",
        titleText: "编辑该用户角色",
        data: ""
      }, "role");
    },
    handleDelRole(row) {
      const idx = this.userRoleList[0].forEach(element => {
        // eslint-disable-next-line no-unused-expressions
        element.Id === row.Id;
      });
      if (idx !== -1) {
        this.userRoleList[0].splice(idx, 1);
      }
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
      width: 100px;
      float: left;
      border: 1px solid #e4e4e4;
      margin-right: 6px;
      border-radius: 5px;
      padding-left: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

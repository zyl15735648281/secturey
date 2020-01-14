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
            @selectData="handleSelectData"
            @removeDep="handelRemoveGp"
            :groupSearchText="ParentGpName"
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

          <div class="roleDiv">
            <ul>
              <li
                v-for="(role,index) in userRoleList"
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
              v-if="mode === '新增组'"
            >添加</a>
            <a
              href="javascript:void(0);"
              @click="handleEditRole"
              class="fr"
              v-if="mode === '编辑组' "
            >修改</a>
          </div>
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

    <RoleDialog
      @userBehavior="switchRoleValue"
      :roleMode="roleMode"
      :roleList="roleList"
      :userRoleList="userRoleList"
    ></RoleDialog>
  </div>
</template>

<script>
import OperateGroup from "@/components/group/OperateGroup";
import RoleDialog from "@/components/account/RoleDialog";
import { show } from "@/js/dialog";
import SelectTree from "@/components/SelectTree";
import _ from "lodash";
import { requestBaseGroup, requestGetBaseRoleList } from "@/js/api.js";

export default {
  name: "",
  components: {
    OperateGroup,
    RoleDialog,
    SelectTree
  },
  data () {
    return {
      ParentGpName: "",
      ParentGpId: "0",
      roleList: [], // 所有角色列表
      roleMode: "",
      userRoleList: [] // 自定义角色列表
    };
  },
  watch: {
    groupInfo(val) {
      if (val.ParentId.trim() === "0") {
        this.ParentGpName = "";
        this.ParentGpId = "0";
      } else {
        let thisGpList = this.spTreeList.filter(r => { return r.id === val.ParentId; });
        if (thisGpList.length === 1) {
          let arr;
          arr = thisGpList.filter(r => {
            return r.id === val.ParentId;
          });

          if (arr.length === 0) {
            let tempInfo = thisGpList[0].treeChildren.find(r => {
              return r.id === val.ParentId;
            });
            arr.push(tempInfo);
          }

          this.groupInfo.ParentGpName = arr[0].name;
          this.groupInfo.ParentGpId = arr[0].id;
        }
      }
      this.userRoleList = val.baseGroupRoleModels;
    }
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
    },
    groupList: {
      type: Array,
      default: () => []
    }
  },
  created () {
  },
  methods: {
    // 真正的获取到数据做处理
    switchRoleValue (type, data) {
      console.log(data);
      if (data === null) {
        return;
      }
      if (data.length > 0) {
        data.filter(r => {
          this.userRoleList.filter(v => {
            return r.Id === v.Id;
          });
        });
      }
      this.userRoleList = data;
      console.log(this.userRoleList);
    },
    // 添加角色
    async handleAddRole() {
      // 获取到所有的角色
      this.roleMode = "添加";
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
      // 获取所有角色列表，并且将现有的数据列表和未选的角色列表拼接显示
      this.roleMode = "修改";
      const res = await requestGetBaseRoleList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        // 判断现有角色列表是否有数据
        let arr = [];
        let arr1 = [];
        if (this.userRoleList.length > 0) {
          this.userRoleList.forEach(element => {
            arr.push({ checked: true, startTime: element.BeginTime, endTime: element.EndTime, isEver: element.IsEnable, ...element });
          });
          let temp = _.filter(res.data, item => _.every(arr, ele => item.Id !== ele.Id));
          temp.forEach(element => {
            arr1.push({ checked: false, startTime: "", endTime: "", isEver: false, ...element });
          });
          this.roleList = arr.concat(arr1);
        } else {
          this.roleList = res.data.map(r => ({ checked: false, startTime: "", endTime: "", isEver: false, ...r }));
        }
        show("", {
          type: "confirm",
          confirmText: "选好了",
          cancelText: "取消",
          titleText: "编辑该用户角色",
          data: ""
        }, "role");
      }
    },
    // 删除角色
    handleDelRole(row) {
      const idx = _.findIndex(this.userRoleList, { "Id": row.Id });
      this.userRoleList.splice(idx, 1);
    },
    handleSelectData(e) {
      this.ParentGpName = e.name;
    },
    handelRemoveGp() {
      this.ParentGpName = "";
    },
    // 关闭弹窗
    handleClose () {
      this.$emit("closed");
    },
    // 修改/新增
    async handleConfirm() {
      // 必要的验证
      if (!this.verify()) {
        return;
      }
      const params = {
        id: "",
        name: this.groupInfo.Name,
        parentId: this.ParentGpId || 0,
        memo: this.groupInfo.Memo,
        isEnable: this.groupInfo.IsEnable,
        createUserId: this.$store.state.userInfo.UserId,
        createUserName: this.$store.state.userInfo.Name,
        baseGroupRoleModels: this.userRoleList || [],
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
    // 必要的验证
    verify() {
      if (this.groupInfo.Name === undefined || this.groupInfo.Name === "") {
        this.$message({
          type: "waring",
          message: "请输入分组名称"
        });
        return false;
      }
      // 判断分组名称是否合格
      if (this.mode === "新增组") {
        let arr = this.groupList.filter(r => {
          return r.Name === this.groupInfo.Name;
        });
        if (arr.length > 0) {
          this.$message({
            type: "waring",
            message: "组名称重复"
          });
          return false;
        }
      }

      if (this.alreadyGpList === null || this.alreadyGpList === [] || this.alreadyGpList === undefined) {
        this.$message({
          type: "waring",
          message: "请选择组成员"
        });
        return false;
      }

      if (this.groupInfo.IsEnable === undefined) {
        this.$message({
          type: "waring",
          message: "请选择状态"
        });
        return false;
      }
    },
    // 添加用户
    handleAddUser(row) {
      if (this.userList.length > 0) {
        const idx = _.findIndex(this.userList, { "UserId": row.UserId });
        this.userList.splice(idx, 1);
        this.alreadyGpList.unshift(row);
      }
    },
    // 移除用户
    handleRemoveUser(row) {
      if (this.alreadyGpList.length > 0) {
        const idx = _.findIndex(this.alreadyGpList, { "UserId": row.UserId });
        this.alreadyGpList.splice(idx, 1);
        this.userList.unshift(row);
      }
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

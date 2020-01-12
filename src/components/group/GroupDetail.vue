<template>
  <div>
    <el-dialog
      title="分组详情"
      :visible.sync="visible"
      :before-close="handleClose"
      width="50%"
    >
      <div class="item">
        <div class="header-info fl">
          <h3>分组信息</h3>
          <ul>
            <li>分组名称：{{gpDetailInfo.Name}}</li>
            <li>创建人：{{gpDetailInfo.CreateUserName}}</li>
            <li>创建时间：{{gpDetailInfo.CreateTime !== undefined ? gpDetailInfo.CreateTime.slice(0,10) : ''}}</li>
          </ul>
        </div>

        <div class="fr user-info">
          <h3>分组成员</h3>
          <OperateGroup
            :aleradyUserList="alreadyGpList"
            target="删除"
            @removeUser="handleRemoveUser"
            style="width:100%;height:calc(100% - 35px)"
          ></OperateGroup>
        </div>
      </div>
      <div class="info-relation">
        <h3>分组组织关系</h3>
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="handleGetDataPer"
        >
          <el-tab-pane
            v-for="(item) in gpDetailInfo.baseGroupRoleModels"
            :key="item.RoleId"
            :label="item.RoleName"
            :name="item.RoleName"
          >
            <CommonDataPer :dataPerList="dataPerList"></CommonDataPer>
          </el-tab-pane>
        </el-tabs>

      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleClose"
          class="confirm"
        >关 闭</el-button>
      </span>
    </el-dialog>

    <ChildDialog @userBehavior="handleRelDelGpRole"></ChildDialog>

    <ChildDialog @userBehavior="handleRelDelGpUser"></ChildDialog>
  </div>

</template>

<script>
import OperateGroup from "@/components/group/OperateGroup";
import ChildDialog from "@/components/account/ChildDialog";
import { show } from "@/js/dialog";
import { requestDeleteBaseGroupRole, requestDeleteBaseUserGroup, requestGetBaseRelationGroup } from "@/js/api.js";
import CommonDataPer from "@/components/CommonDataPer";

export default {
  name: "",
  components: {
    OperateGroup,
    ChildDialog,
    CommonDataPer
  },
  data () {
    return {
      editableTabsValue: "",
      dataPerList: [],

    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    gpDetailInfo: {
      type: Object,
      default: () => {}
    },
    alreadyGpList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    gpDetailInfo(val) {
      console.log(val);
    }
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    },
    handleRemoveUser(row) {
      show("您确定要删除这个角色吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: row
      }, "childDel");
    },
    // 真正的删除组用户
    async handleRelDelGpUser(type, data) {
      const res = await requestDeleteBaseUserGroup(
        {
          groupId: data.GroupId,
          userId: data.UserId,
        }
      );
      if (res.status === 200) {
        this.$message({
          type: "waring",
          success: "祝贺您，删除成功！"
        });
      }
    },
    removeTab(targetName) {
      show("您确定要删除这个角色吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: targetName
      }, "childDel");
    },
    // 真正的删除
    async handleRelDelGpRole(type, data) {
      console.log(data);
      let id;
      this.gpDetailInfo.baseGroupRoleModels.forEach(element => {
        if (element.RoleName === data) {
          id = element.RoleId;
        }
      });
      const res = await requestDeleteBaseGroupRole({ id: id });
      if (res.status === 200) {
        let tabs = this.gpDetailInfo.baseGroupRoleModels;
        let activeName = this.editableTabsValue;
        if (activeName === data) {
          tabs.forEach((tab, index) => {
            if (tab.RoleName === data) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.RoleName;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.gpDetailInfo.baseGroupRoleModels = tabs.filter(tab => tab.RoleName !== data);

        this.$message({
          type: "success",
          message: "祝贺你，删除成功！"
        });
      }
    },
    // 点击获取角色权限
    async handleGetDataPer(tab) {
      console.log(111);
      console.log(tab.label);
      let id;
      this.gpDetailInfo.baseGroupRoleModels.forEach(element => {
        if (element.RoleName === tab.label) {
          id = element.RoleId;
        }
      });
      const res = await requestGetBaseRelationGroup({
        id: id
      });
      if (res.status === 200) {
        if (res.data !== "") {
          this.dataPerList = res.data;
        }
      }
    }
  },
};
</script>

<style scope lang="less">
.item {
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
  .header-info {
    width: 49%;
    height: 100%;
    ul {
      border: 1px solid #e4e4e4;
      height: calc(100% - 35px);
      overflow: auto;
      li {
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px dashed #e4e4e4;
        list-style: none;
        font-size: 14px;
      }
    }
  }

  .user-info {
    width: 49%;
    height: 100%;
  }
}
</style>

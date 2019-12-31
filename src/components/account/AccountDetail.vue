<template>
  <div class="detailDialog">
    <el-dialog
      title="用户详细信息"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <div class="account-detail">
        <h3>用户详情</h3>
        <ul>
          <li>
            <span>姓名：</span>
            张艳丽
          </li>
          <li>
            <span>工号：</span>
            张艳丽
          </li>
          <li>
            <span>创建人：</span>
            张艳丽
          </li>
          <li>
            <span>创建时间：</span>
            张艳丽
          </li>
          <li>
            <span>上次登录时间：</span>
            张艳丽
          </li>
        </ul>
      </div>
      <div class="membership">
        <h3>组织关系</h3>
        <ul class="me-list">
          <li>
            <span>科室：</span>
            <div class="place">心内科</div>
          </li>
          <span class="role-span">所属角色：</span>
          <div class="get-role">
            <p
              v-for="item in roleList"
              :key="item.value"
            >
              <span>{{item.label}}</span>
              <a
                class="fr"
                @click="delRole(item)"
                href="javascript:void(0);"
              >删除</a>
              <a
                class="fr mg-r"
                @click="seeRoleDetail(item)"
                href="javascript:void(0);"
              >角色明细</a></p>
          </div>
          <li>
            <span>所属组：</span>
            <div class="place-group">编码组</div>
          </li>
          <span style="vertical-align: top;">组角色：</span>
          <div
            class="get-role"
            style="width: calc(100% - 56px);"
          >
            <p
              v-for="item in roleList"
              :key="item.value"
            >
              <span>{{item.label}}</span>
              <a
                class="fr"
                @click="delRole(item)"
                href="javascript:void(0);"
              >删除</a>
              <a
                class="fr mg-r"
                @click="seeRoleDetail(item)"
                href="javascript:void(0);"
              >角色明细</a>
            </p>
          </div>
        </ul>
      </div>
      <div class="info">
        <ul>
          <h3>个人信息</h3>
          <li class="mg-b">
            <span>手机号：</span>
            <div class=""></div>
          </li>
          <li>
            <span>Email：</span>
            <div style="width: calc(100% - 50px);"></div>
          </li>
        </ul>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">关 闭</el-button>
        <el-button
          @click="handleClose"
          id="confirm"
        >保 存</el-button>
      </span>
    </el-dialog>
    <RoleDetailDailog @userBehavior="handleInfo"></RoleDetailDailog>

    <ChildDialog @userBehavior="handleRelDelRole"></ChildDialog>

  </div>
</template>

<script>
import { roleDataset } from "@/js/dataset";
import RoleDetailDailog from "./RoleDetailDaliog";
import ChildDialog from "@/components/account/ChildDialog";
import { show } from "@/js/dialog";

export default {
  name: "",
  components: {
    RoleDetailDailog,
    ChildDialog
  },
  data () {
    return {
      codeGroup: "编码组"
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    roleList () {
      return roleDataset;
    }
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    },
    // 保存明细内容
    handleInfo (type, data) {
      // console.log(data);
    },
    // 查看明细
    seeRoleDetail () {
      show("", {
        type: "alert",
        confirmText: "关闭",
        titleText: "角色详情",
        data: "123"
      }, "roleDetail");
    },
    // 删除角色
    delRole () {
      show("您确定要删除这个角色吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: "row"
      }, "childDel");
    },
    // 真正的删除角色
    handleRelDelRole (type, data) {
      this.$message({
        type: "success",
        message: "祝贺你，删除成功！,哈哈,傻子，我成功l"
      });
    }
  },
};
</script>

<style scope lang="less">
.detailDialog {
  .el-dialog__body {
    padding: 20px;
    height: 400px;
    overflow: auto;
  }
  .account-detail {
    height: 125px;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      li {
        width: 28%;
        border: 2px solid #e4e4e4;
        margin-right: 10px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        padding: 0 10px;
      }
    }
  }
  .membership {
    height: 260px;
    .me-list {
      height: calc(100% - 35px);
      overflow: auto;
    }
    li {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
    }
    .place {
      display: inline-block;
      width: calc(100% - 68px);
      border: 2px solid #e4e4e4;
      padding: 0 10px;
    }
    .role-span {
      vertical-align: top;
    }
    .get-role {
      display: inline-block;
      width: calc(100% - 70px);
      height: 100px;
      overflow: auto;
      padding: 0 10px;
      border: 2px solid #e4e4e4;
      box-sizing: border-box;
      p {
        text-align: left;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px dashed #e4e4e4;
      }
    }
    .place-group {
      display: inline-block;
      width: calc(100% - 82px);
      border: 2px solid #e4e4e4;
      padding: 0 10px;
    }
  }
  .info {
    li {
      height: 30px;
      line-height: 30px;
      span {
        display: inline-block;
        vertical-align: middle;
        height: 30px;
        line-height: 30px;
        margin-top: -20px;
      }
      div {
        border: 2px solid #e4e4e4;
        display: inline-block;
        width: calc(100% - 56px);
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 10px;
      }
    }
  }
}
</style>

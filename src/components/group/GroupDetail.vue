<template>
  <div class="">
    <el-dialog
      title="分组详情"
      :visible.sync="visible"
      :before-close="handleClose"
      width="50%"
    >
      <div class="gpInfo">
        <div class="info-header">
          <div>
            <h3>分组信息</h3>
          </div>
          <div>
            <h3>分组成员</h3>
            <OperateGroup
              :data="gpDetailInfo.baseUserGroupModels"
              target="删除"
              @addUser="handleAddGpUser"
            ></OperateGroup>
          </div>
        </div>
        <div class="info-relation">
          <div>
            <h2>分组组织关系</h2>
          </div>
          <div>
            <h2>角色信息</h2>
            <ul>
              <li></li>
            </ul>
          </div>
          <div>
            <h2>权限信息</h2>
          </div>
        </div>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">关 闭</el-button>
        <el-button
          type="primary"
          @click="handleSave"
          id="confirm"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import OperateGroup from "@/components/group/OperateGroup";
export default {
  name: "",
  components: {
    OperateGroup
  },
  data () {
    return {
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
    gpDetailInfo: {
      type: Object,
      default: () => {}
    }
  },
  created () {
  },
  methods: {
    handleSave () {

    },
    handleClose () {
      this.$emit("closed");
    },
    handleAddGpUser() {

    }
  },
};
</script>

<style scope lang="less">
.ownerAccount {
  .group-list {
    width: 100%;
  }
}

.gpinfo {
  height: 115px;
  li {
    height: 30px;
    line-height: 30px;
    span {
      display: inline-block;
      vertical-align: middle;
      height: 30px;
      line-height: 30px;
      margin-top: -10px;
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
</style>

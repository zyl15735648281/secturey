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
            <li>分组名称：</li>
            <li>创建人：</li>
            <li>创建时间：</li>
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
        <div>
          <h3>分组组织关系</h3>
        </div>
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

    <ChildDialog @userBehavior="handleRelDelRole"></ChildDialog>
  </div>

</template>

<script>
import OperateGroup from "@/components/group/OperateGroup";
import ChildDialog from "@/components/account/ChildDialog";
// import { show } from "@/js/dialog";

export default {
  name: "",
  components: {
    OperateGroup,
    ChildDialog
  },
  data () {
    return {
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
    handleRemoveUser(row) {}
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

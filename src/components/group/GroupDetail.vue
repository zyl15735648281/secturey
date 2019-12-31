<template>
  <div class="">
    <el-dialog
      title="分组详情"
      :visible.sync="visible"
      :before-close="handleClose"
      width="35%"
    >
      <div class="gpinfo">
        <ul>
          <h3>编目组</h3>
          <li class="mg-b">
            <span>创建人：</span>
            <div class="">钱多多</div>
          </li>
          <li>
            <span>创建时间：</span>
            <div style="width: calc(100% - 70px);">2019年11月28日17:54</div>
          </li>
        </ul>
      </div>
      <div>
        <div class="ownerAccount">
          <OperateGroup mode="移除"></OperateGroup>
        </div>
      </div>
      <div>
        <h3>组织关系</h3>
        <div style="padding: 10px;text-align:left">
          <p>角色1</p>
          <div>
            <p>功能权限</p>
            <p>场景权限</p>
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
    }
  },
  created () {
  },
  methods: {
    handleSave () {

    },
    handleClose () {
      this.$emit("closed");
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

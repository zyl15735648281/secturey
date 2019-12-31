<template>
  <div class="">
    <el-dialog
      title="分组详情"
      :visible.sync="visible"
      :before-close="handleClose"
      width="35%"
    >
      <div>
        <h3>编目组</h3>
        <div style="padding: 10px">
          <p>创建人：钱多多</p>
          <p>创建时间：2019年11月28日17:54</p>
        </div>
      </div>
      <div>
        <h3>所属用户</h3>
        <div
          class="ownerAccount"
          style="padding: 10px"
        >
          <OperateGroup mode="移除"></OperateGroup>
        </div>
      </div>
      <div>
        <h3>组织关系</h3>
        <div style="padding: 10px">
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
          class="confirm"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import OperateGroup from '@/components/group/OperateGroup';
export default {
  name: '',
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
      default: ''
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
      this.$emit('closed');
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
</style>

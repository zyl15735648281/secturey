<template>
  <div class="">
    <el-dialog
      title="角色详情"
      :visible.sync="visible"
      :before-close="handleClose"
    >
        <div>
            <h3>角色名称</h3>
            <ul>
                <li>
                    <span>所属类型：</span>
                </li>
                <li>
                    <span>创建人：</span>
                </li>
                <li>
                    <span>创建时间：</span>
                </li>
            </ul>
        </div>
        <div>
            <h3>功能权限</h3>
            <ul>
                <li>
                    <p>示踪</p>
                    <span>住院病人登记：</span>
                    <i>查看列表，回收</i>
                </li>
            </ul>
        </div>
        <div>
            <h3>数据权限</h3>
            <ul>
                <li>场景名称1</li>
            </ul>
        </div>
        <div>
            <h3>所属组</h3>
            <ul>
                <li>编码组</li>
            </ul>
        </div>
        <div>
            <h3>所属用户</h3>
            <OperateGroup mode="selfRemove"></OperateGroup>
        </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClose"
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
    visible: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    }
  },
};
</script>

<style scope lang="less">
</style>

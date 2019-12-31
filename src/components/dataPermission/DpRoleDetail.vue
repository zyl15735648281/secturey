<template>
  <div class="">
    <el-dialog
      title="相关角色信息"
      :visible.sync="visible"
      :before-close="handleClose"
      width="30%"
      class="dpRoleStyle"
    >
      <ul>
        <li>角色一</li>
        <li>角色二</li>
        <li>角色三</li>
        <li>角色四</li>
        <li>角色五</li>
      </ul>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClose"
          id="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
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
.dpRoleStyle {
  ul {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: auto;
    li {
      border: 1px solid #e4e4e4;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 40px;
      width: 30%;
    }
  }
}
</style>

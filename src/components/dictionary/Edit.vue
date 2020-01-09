<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <h3>字典值</h3>
      <ul>
        <li>
          <span>字典描述：</span>
          <el-input></el-input>
        </li>
        <li>
          <span>字典值：</span>
          <el-input></el-input>
        </li>
        <li>
          <span>字典类型：</span>
          <el-input></el-input>
        </li>
        <li>
          <span>字典标注：</span>
          <el-input></el-input>
        </li>
      </ul>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
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
    handleClose () {
      this.$emit("closed");
    },
    handleConfirm() {}
  },
};
</script>

<style scope lang="less">
</style>

<template>
  <div class="state">
    <span>状态：</span>
    <el-select
      :value="value"
      placeholder="请选择"
      @change="handleChange"
    >
      <el-option
        v-for="item in statusList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { statusDataset } from "@/js/dataset";

export default {
  props: {
    value: {
      type: String,
      default: "2"
    }
  },
  computed: {
    statusList () {
      return statusDataset;
    }
  },
  methods: {
    handleChange (e) {
      this.$emit("onChange", e);
    }
  }
};
</script>

<style lang="less" scope>
.state {
  .el-select {
    width: calc(100% - 50px);
  }
}
</style>

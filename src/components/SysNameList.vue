<template>
  <div class="drop">
    <!-- <span>系统名称：</span> -->
    <el-select
      :value="value"
      placeholder="请选择"
      @change="handleChange"
      class="md-select"
    >
      <el-option
        v-for="item in sysList"
        :key="item.SystemId"
        :label="item.SystemName"
        :value="item.SystemName"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
// import { requestGetBaseModuleList } from "@/js/api.js";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    sysList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleChange (e) {
      this.$emit("input", e);
    }
  }
};
</script>

<style lang="less" scope>
.drop {
  width: 100%;
  display: inline-block;
  width: calc(100% - 80px);
  .md-select {
    width: 100%;
  }
}
</style>

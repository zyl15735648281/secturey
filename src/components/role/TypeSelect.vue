<template>
  <div class="typeStyle">
    <el-select
      :value="value"
      placeholder="请选择"
      @change="handleChangeType"
    >
      <el-option
        v-for="item in roleTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.name"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { roleType } from "@/js/dataset.js";

export default {
  name: "",
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    roleTypeList() {
      return roleType;
    }
  },
  created() {
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleChangeType(e) {
      this.$emit("input", e);
    }
  },
};
</script>

<style scope lang="less">
.typeStyle {
  .el-select {
    width: 100%;
  }
}
</style>

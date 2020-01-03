<template>
  <div class="dropDown">
    <el-select
      :value="value"
      placeholder="请选择"
      @change="handleChange"
      clearable
    >
      <el-option
        v-for="item in depList"
        :key="item.Id"
        :label="item.Name"
        :value="item.Name"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
// import { requestGetBaseDepartmentList } from "@/js/api";

export default {
  data() {
    return {
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    depList: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
  },
  methods: {
    handleChange (e) {
      this.$emit("input", e);
    }
  }
};
</script>

<style lang="less" scope>
</style>

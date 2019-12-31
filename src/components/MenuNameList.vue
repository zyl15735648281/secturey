<template>
  <div class="dropDown">
    <span>菜单名称：</span>
    <el-select
      :value="value"
      placeholder="请选择"
      @change="handleChange"
    >
      <el-option
        v-for="item in menuList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { menuDataset } from "@/js/dataset";

export default {
  props: {
    value: {
      type: String,
      default: "2"
    }
  },
  computed: {
    menuList () {
      return menuDataset;
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
.dropDown {
  .el-select {
    width: calc(100% - 80px);
  }
}
</style>

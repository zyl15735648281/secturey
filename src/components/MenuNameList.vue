<template>
  <div class="dropDown">
    <span>菜单名称：</span>
    <el-select
      :value="value"
      placeholder="请选择"
      @change="handleChange"
      filterable
      clearable
    >
      <el-option
        v-for="item in menuList"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: "2"
    },
    menuList: {
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
.dropDown {
  .el-select {
    width: calc(100% - 80px);
  }
}
</style>

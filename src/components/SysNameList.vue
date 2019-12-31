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
        v-for="item in systemList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { systemDataset } from '@/js/dataset';

export default {
  props: {
    value: {
      type: String,
      default: '2'
    }
  },
  computed: {
    systemList () {
      return systemDataset;
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('onChange', e);
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

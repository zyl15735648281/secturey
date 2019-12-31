<template>
  <div class="retrieval">
    <span>姓名：</span>
    <el-select
      v-model="nameValue"
      filterable
      clearable
      placeholder="请选择"
      @change="switchOptions"
    >
      <el-option
        v-for="item in nameList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { nameDataset } from '@/js/dataset.js';

export default {
  name: '',
  components: {
  },
  data () {
    return {
      nameValue: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    nameList () {
      return nameDataset;
    }
  },
  methods: {
    switchOptions () {
      this.$emit('switchName', this.nameValue);
    }
  },
  watch: {
    // 判断下拉框的值是否有改变
    value (val) {
      this.nameValue = val;
    },
    nameValue (val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', val);
      }
    }
  },
};
</script>

<style scope lang="less">
.retrieval {
  .el-select {
    width: calc(100% - 50px);
  }
}
</style>

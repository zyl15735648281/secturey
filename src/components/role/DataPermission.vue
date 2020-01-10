<template>
  <div class="datapermission">

    <el-select
      placeholder="请选择"
      :value="value"
      @change="handleChange"
    >
      <el-option
        v-for="item in dataPerList"
        :key="item.ScopeId"
        :label="item.Type"
        :value="item.Type"
      >
      </el-option>
    </el-select>
    <el-input
      placeholder="请输入名称检索"
      class="dp-input"
    ></el-input>
    <ul class="de-resource">
      <li
        v-for="item in dataPerList"
        :key="item.ScopeId"
      >{{item.Name}}
        <i
          class="el-icon-circle-close fr"
          @click="handleRemove(item)"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "",
  props: {
    value: {
      type: String,
      default: ""
    },
    dataPerList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e);
    },
    handleRemove(e) {
      this.$emit("removeDpList", e);
    }
  },
};
</script>

<style scope lang="less">
.datapermission {
  width: 48%;
  height: 150px;
  float: left;
  .el-select {
    display: inline-block;
    width: 130px;
    margin-right: 10px;
  }
  .dp-input {
    width: calc(100% - 140px);
  }
  .de-resource {
    width: 100%;
    border: 1px solid #e4e4e4;
    margin-top: 10px;
    height: calc(100% - 50px);
    overflow: auto;
    li {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border-bottom: 1px dashed #e4e4e4;
      color: #111;
      i {
        margin-top: 8px;
      }
    }
    li:hover {
      background-color: rgb(236, 107, 106);
      color: white;
    }
  }
}
</style>

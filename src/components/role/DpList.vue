<template>
  <div class="dp-list fr">
    <h3>已选资源项</h3>
    <span>已选{{alreadyDataPerList !== null && alreadyDataPerList !== undefined ? alreadyDataPerList.length : "0"}}个</span>
    <ul>
      <li
        v-for="item in alreadyDataPerList"
        :key="item.ScopeId"
      >
        {{item.Name}}
        <i
          class="el-icon-circle-close fr"
          @click="handleRemoveAleadyDP"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    alreadyDataPerList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleRemoveAleadyDP(row) {
      this.$emit("removeADP", row);
    }
  }
};
</script>

<style scoped lang="less">
.dp-list {
  width: 50%;
  height: 150px;
  span {
    color: #fa9933;
    font-weight: 600;
    float: right;
  }
  ul {
    width: 100%;
    border: 1px solid #e4e4e4;
    height: calc(100% - 40px);
    overflow: auto;
  }
  li {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border-bottom: 1px dashed #e4e4e4;
    color: #111;
    i {
      display: inline-block;
      margin-top: 8px;
    }
  }
  li:hover {
    background-color: rgb(236, 107, 106);
    color: white;
  }
}
</style>

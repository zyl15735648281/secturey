<template>
  <div class="group-dropDown">
    <el-input
      placeholder="请搜索相关组"
      v-model="groupSearchText"
      @blur="handleHidden"
      @focus="handleShow"
      class="group-search"
      id="search"
    ></el-input>
    <i class="el-icon-circle-close" v-show="groupSearchText !== ''" @click="handleRemove"></i>

    <div
      class="group-tree"
      v-if="gpVisbible === true"
      @mouseover="handelMouseover"
      @mouseleave="handleMouseLeave"
    >
      <el-tree
        class="filter-tree"
        :data="selectList"
        :props="defaultProps"
        expand-on-click-node
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gpVisbible: false,
      mouseover: false,
      groupSearchText: ""
    };
  },
  props: {
    selectList: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return { label: "name", children: "treeChildren" };
      }
    }
  },
  watch: {
    groupSearchText(val) {
      if (this.$refs.tree === undefined) {
        return;
      }
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handleRemove() {
      this.groupSearchText = "";
      this.gpVisbible = true;
    },
    handleHidden() {
      if (!this.mouseover) this.gpVisbible = false;
    },
    handleShow() {
      this.gpVisbible = true;
    },
    handelMouseover() {
      this.mouseover = !this.mouseover;
    },
    handleMouseLeave() {
      if (this.mouseover) {
        this.mouseover = false;
        if (!this.mouseover && this.gpVisbible) {
          this.gpVisbible = false;
        }
      }
    },
    handleChange(e) {
      this.$emit("onChange", e);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      document.querySelector("#search").focus();
      this.groupSearchText = data.name;
      this.gpVisbible = false;
      this.$emit("input", data.name);
    }
  }
};
</script>

<style lang="less" scope>
.group-dropDown {
  width: 50%;
  float: right;
  .group-search {
    position: relative;
  }
  .group-tree {
    overflow: auto;
    margin-top: 8px;
    position: absolute;
    top: 40px;
    width: 50%;
    height: 150px;
    z-index: 99999;
    border: 1px solid #e4e4e4;
  }
  .el-icon-circle-close {
    position: absolute;
    right: 0;
    top: 20px;
    transform: translate(-50%, -50%);
  }
  #search {
    position: relative;
  }
}
</style>

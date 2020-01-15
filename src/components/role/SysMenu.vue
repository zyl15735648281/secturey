<template>
  <div class="sysMenu">
    <el-tabs
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        :label="item.SystemName"
        v-for="item in sysList"
        :key="item.SystemId"
      >
        <el-tree
          :data="relMoudleList"
          node-key="id"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span style="width:50%">{{data.name}}</span>
            <span class="custom-tree-node-type">
              <el-checkbox
                @change="handleSwitchChecked(data)"
                :checked="data.checked"
              >{{data.Type}}</el-checkbox>
            </span>
          </span>
          <!-- <el-checkbox>{{sys.Type}}</el-checkbox> -->
        </el-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      defaultProps: {
        children: "treeChildren",
        label: "name"
      }
    };
  },
  props: {
    sysList: {
      type: Array,
      default: () => []
    },
    relMoudleList: {
      type: Array,
      default: () => []
    }
  },
  created() {},
  methods: {
    handleClick(tab, e) {
      this.$emit("watchTab", tab);
    },
    handleNodeClick(e) {
      // console.log(e);
    },
    handleSwitchChecked(e) {
      this.$emit("switchChecked", e);
    }
  }
};
</script>

<style scope lang="less">
.sysMenu {
  margin-bottom: 10px;
  .el-tabs--border-card > .el-tabs__header {
    // background-color: #5ed0b1;
    color: #111;
  }
  .el-tabs__content {
    height: 110px;
    overflow: auto;
    padding: 10px;
    .custom-tree-node {
      width: 100%;
      .custom-tree-node-type {
        // width: 100%;
        float: right;
      }
    }
  }
  ul {
    width: 100%;
    height: 100px;
    background-color: #a7d06c;
    overflow: auto;
    margin: 0;
    padding: 0;
    li {
      // float: left;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 600;
      color: #111;
    }
  }
  .sysm-content {
    width: 100%;
    padding: 10px;
    p {
      margin-bottom: 10px;
    }
  }
  .active {
    background-color: rgb(70, 68, 68);
  }
}
</style>

<template>
  <div class="group-list">
    <div class="rel-header">
      <h3>所属用户</h3>
      <span>已有3个</span>
    </div>
    <div class="gr">
      <ul class="grh">
        <li>
          <span style="border-left: 1px solid #e4e4e4;">姓名</span>
          <span>部门</span>
          <span>操作</span>
          <span style="width:20px;"></span>
        </li>
      </ul>
      <div class="grc">
        <ul>
          <!-- <li
            v-for="item in userList"
            :key="item.UserId"
          >
            <span>{{item.Name}}</span>
            <span>{{item.DefaultDepName}}</span>
            <span>
              <a
                href="javascript:void(0);"
                @click="handleAdd"
              >删除</a>
            </span>
          </li> -->
          <li>
            <span>qiandooo</span>
            <span>fdddd</span>
            <span>
              <a
                href="javascript:void(0);"
                @click="handleAdd"
              >删除</a>
            </span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "",
  components: {
  },
  data() {
    return {
    };
  },
  props: {
    removeList: {
      type: Array,
      default: () => []
    }
  },
  created() {
  },
  methods: {
  },
};
</script>

<style scope lang="less">
.rel-header {
  margin-bottom: 10px;
  span {
    float: right;
    font-size: 16px;
    font-weight: 600;
    color: #fa9933;
  }
}
.gr {
  height: calc(100% - 53px);
  .grh {
    li:first-child span {
      border-top: 1px solid #e4e4e4;
    }
  }
  .grc {
    height: calc(100% - 30px);
    border: 1px solid #e4e4e4;
    border-top: 0px solid #e4e4e4;
    overflow: auto;
  }
}
</style>

<template>
  <div class="group-list">
    <el-input
      placeholder="请搜索"
      class=" mg-b"
      v-if="mode === '添加'"
    >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
      ></i>
    </el-input>
    <div
      class="rel-header"
      v-if="mode === '移除'"
    >
      <h3>所属用户</h3>
      <span>已有3个</span>
    </div>
    <div
      class="gl"
      v-if="mode === '添加' || mode === '移除'"
    >
      <ul class="glh">
        <li>
          <span style="border-left: 1px solid #e4e4e4;">姓名</span>
          <span>部门</span>
          <span>操作</span>
        </li>
      </ul>
      <div class="glc">
        <ul>
          <li class="gl">
            <span style="border-left: 1px solid #e4e4e4;">钱多多</span>
            <span>耳鼻喉</span>
            <span>
              <a
                href="javascript:void(0);"
                v-if="mode === '添加'"
              >添加</a>
              <a
                href="javascript:void(0);"
                v-if="mode === '移除'"
              >移除</a>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="gl"
      v-if="mode === 'selfRemove'"
    >
      <ul class="glh">
        <li>
          <span style="border-left: 1px solid #e4e4e4;">姓名</span>
          <span>部门</span>
          <span>操作</span>
        </li>
      </ul>
      <div class="glc">
        <ul>
          <li class="gl">
            <span style="border-left: 1px solid #e4e4e4;">钱多多</span>
            <span>耳鼻喉</span>
            <span>
              <a href="javascript:void(0);">移除</a>
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
  data () {
    return {
    };
  },
  props: {
    mode: {
      type: String,
      default: "添加"
    }
  },
  created () {
  },
  methods: {
  },
};
</script>

<style scope lang="less">
.group-list {
  width: 48%;
  height: 120px;
  .rel-header {
    margin-bottom: 5px;
    span {
      float: right;
      font-size: 16px;
      font-weight: 600;
      color: #fa9933;
    }
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      height: 30px;
      line-height: 30px;
      span {
        text-align: center;
        width: 33%;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
  .gl {
    height: calc(100% - 50px);
    .glh {
      li:first-child span {
        border-top: 1px solid #e4e4e4;
      }
    }
    .glc {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>

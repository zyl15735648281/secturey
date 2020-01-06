<template>
  <div class="group-list">
    <el-input
      placeholder="请搜索"
      class=" mg-b"
    >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
      ></i>
    </el-input>
    <div class="gl">
      <ul class="glh">
        <li>
          <span style="border-left: 1px solid #e4e4e4;">姓名</span>
          <span>部门</span>
          <span>操作</span>
          <span style="width:17px"></span>
        </li>
      </ul>
      <div class="glc">
        <ul>
          <li
            class="gl"
            :key="item.UserId"
            v-for="item in userList"
          >
            <span style="border-left: 1px solid #e4e4e4;">{{item.Name}}</span>
            <span>{{item.DefaultDepName}}</span>
            <span>
              <a
                href="javascript:void(0);"
                @click="handleAdd"
              >添加</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { requestGetBaseUserList } from "@/js/api";

export default {
  name: "",
  components: {
  },
  data () {
    return {
      userList: []
    };
  },
  created () {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await requestGetBaseUserList({
        name: "",
        state: 2
      });
      if (res.status === 200) {
        this.userList = res.data;
      }
    },
    handleAdd(data) {
      console.log(data);
      this.$emit("addUsser", data);
    }
  },
};
</script>

<style scope lang="less">
.group-list {
  width: 48%;
  height: 140px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      height: calc(100% - 30px);
      overflow: auto;
    }
  }
}
</style>

<template>
  <div class="sysMenu">
    <ul>
      <li
        v-for="(item,index) in list"
        :key="item.id"
        @click="switchTab(index)"
        :class="{active: curtab === index}"
      >
        {{item.name}}
      </li>
    </ul>

    <template v-for="(item,index) in tabList">
      <div
        class="sysm-content"
        v-if="curtab === index"
        :key="item.id"
      >
        <p>{{item.title}}</p>
        <el-checkbox
          v-for="i in item.child"
          :key="i.id"
        >{{i.title}}</el-checkbox>

      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "",
  components: {
  },
  data () {
    return {
      list: [{
        id: "1",
        name: "示踪"
      }, {
        id: "2",
        name: "首页"
      }, {
        id: "3",
        name: "查询"
      }, {
        id: "4",
        name: "科研"
      }, {
        id: "5",
        name: "示踪"
      }, ],
      tabList: [{
        id: "500",
        title: "编码列表",
        child: [{
          id: "11",
          title: "加急",
        }, {
          id: "22",
          title: "应用",
        }, {
          id: "33",
          title: "加急1",
        }, {
          id: "44",
          title: "加急2",
        }, {
          id: "55",
          title: "加急3",
        }, ]
      }, {
        id: "501",
        title: "编码项目"
      }],
      curtab: 0
    };
  },
  created () {
  },
  methods: {
    switchTab (index) {
      this.curtab = index;
    }
  },
};
</script>

<style scope lang="less">
.sysMenu {
    margin-bottom: 10px;
  ul {
    width: 100%;
    height: 40px;
    background-color: rgb(204, 204, 204);
    margin: 0;
    padding: 0;
    li {
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: #111;
    }
    li:hover {
      background-color: rgb(70, 68, 68);
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

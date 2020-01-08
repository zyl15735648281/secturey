<template>
  <div class="aside fl">
    <!-- <ul class="outside">
    <Items v-for="(item,index) in list" :model="item" :key="index"></Items>
    </ul>-->
    <ul>
      <template v-for="route in $router.options.routes">
        <li
          :key="route.name"
          v-if="route.meta"
          @click="handleSwitchNav(route.path)"
          :class="$route.meta.description === route.meta.description ? 'active' : ''"
        >
          <i :class="route.meta.iconfont" class="mg-r"></i>
          {{route.meta.description}}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  methods: {
    handleSwitchNav(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scope>
@base: #4bc183;
.aside {
  width: 220px;
  height: 100%;
  background-color: #e4e4e4;
  li {
    padding-left: 10px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 500;
    height: 50px;
    line-height: 50px;
    border-left: 3px solid rgb(241, 241, 241);
    border-bottom: 1px dashed rgb(201, 201, 203);
  }
  li:hover {
    color: @base;
  }
  .active {
    border-left: 3px solid @base;
    background-color: rgb(214, 210, 210);
    position: relative;
  }
  .active::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 12px;
    border: 8px solid transparent;
    border-width: 14px 10px;
    border-right-color: @base;
  }
}
</style>

<template>
  <div class="aside">
    <!-- <ul class="outside">
    <Items v-for="(item,index) in list" :model="item" :key="index"></Items>
  </ul> -->
    <ul>
      <li
        v-for="route in $router.options.routes"
        :key="route.name"
        @click="handleSwitchNav(route.path)"
      >
        <i :class="route.meta.iconfont"></i>
        {{route.meta.description}}
      </li>
    </ul>
  </div>

</template>

<script>
// import Items from '@/views/aside/Items';

export default {
  name: '',
  components: {

  },
  data () {
    return {

    };
  },
  methods: {
    handleSwitchNav (path) {
      this.$router.push(path);
    }
  },
};
</script>

<style lang="less" scope>
@base: #285b91;
.aside{
  width: 256px;
  height: 100%;
  background-color:#e4e4e4;
}
</style>

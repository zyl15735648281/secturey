<template>
  <div class="">
    <h4>功能权限</h4>

    <ul>
      <!-- 外面这层用于权限的渲染 -->
      <li>
        <!-- 对于模块，场景渲染 -->
        <h4></h4>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </li>
    </ul>

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
    dataPerList: {
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
</style>

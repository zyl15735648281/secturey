<template>
  <div class="content fr">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
    };
  },
  created () {
  },
  methods: {
  },
};
</script>

<style lang="less" scope>
.content {
  width: calc(100% - 240px);
  height: calc(100% - 20px);
  padding: 10px;
}
</style>

<template>
  <div class="header">
    <img
      class="fl"
      src="@/assets/logo.png"
    >
    <h1 class="fl">权限管理系统</h1>
    <div class="fr right-header">
      <i class="iconfont icon-yonghu2"></i>
      <span class="ui-user-info">张艳丽</span>
      <span class="ui-checkuser">退出登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
  methods: {
  }
};
</script>

<style lang="less" scope>
@base: #285b91;
.header {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: @base;
  color: white;
  img {
    margin-left: 20px;
    width: 100px;
    padding-top: 8px;
    border-style: none;
    vertical-align: middle;
  }
  h1 {
    font-weight: 500;
    font-size: 24px;
    height: 30px;
    vertical-align: middle;
    margin-left: 20px;
  }
  .right-header {
    height: 100%;
    font-size: 18px;

    .ui-user-info,
    .ui-checkuser {
      display: inline-block;
      box-sizing: border-box;
      cursor: pointer;
      padding: 0 7px;
    }
    i {
      font-size: 22px;
      vertical-align: bottom;
    }
    .ui-checkuser {
      &:hover {
        background-color: rgb(25, 64, 105);
      }
    }
  }
}
</style>

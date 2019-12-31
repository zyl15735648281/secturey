<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="middle">
      <AppAside></AppAside>
      <AppContent></AppContent>
    </div>
    <footer>北京影研创新科技发展有限公司 docimax.company ® 2019-2024</footer>
  </div>
</template>

<script>
import AppHeader from "@/views/AppHeader";
import AppAside from "@/views/AppAside";
import AppContent from "@/views/AppContent";

export default {
  components: {
    AppHeader,
    AppAside,
    AppContent
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  .middle {
    width: 100%;
    height: calc(100% - 80px);
  }
  footer {
    position: absolute;
    text-align: center;
    height: 30px;
    line-height: 30px;
    width: 100%;
    background-color: rgb(228, 228, 228);
    bottom: 0;
    color: #111;
    font-size: 12px;
  }
}
</style>

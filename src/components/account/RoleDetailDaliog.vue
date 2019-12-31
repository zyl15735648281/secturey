<template>
  <transition name="confirm-fade">
    <div
      class="my-confirm"
      v-if="$store.state.wholeDialog.isShowRoleDetailConfirm"
      @click.stop="clickFun('clickCancle')"
    >
      <div
        class="confirm-content-wrap-roleDetail"
        @click.stop
      >
        <h2 class="confirm-title">{{$store.state.wholeDialog.titleText}}</h2>
        <p>角色2（2019-02-03）</p>
        <span>功能权限</span>
        <div></div>
        <span>数据权限权限</span>
        <div></div>

        <div class="operation">
          <div
            class="cancel-btn"
            v-if="$store.state.wholeDialog.type==='confirm'"
            @click="clickFun('clickCancle')"
          >
            <p class="btn-text btn-borderColor">{{$store.state.wholeDialog.cancleText}}</p>
          </div>
          <div
            class="confirm-btn"
            @click="clickFun('clickConfirm')"
          >
            <p class="btn-text btn-bacColor">{{$store.state.wholeDialog.confirmText}}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { hidden } from "@/js/dialog.js";

export default {
  name: "",
  data () {
    return {
    };
  },
  methods: {
    clickFun (type) {
      if (type === "clickCancle") {
        hidden("roleDetail");
      } else {
        this.$emit("userBehavior", type, this.$store.state.wholeDialog.receivedData);
        hidden("roleDetail");
      }
    }
  }
};
</script>

<style scope lang="less">
.confirm-content-wrap-roleDetail {
  padding: 20px;
  position: absolute;
  top: 28%;
  left: 0;
  right: 0;
  width: 720px;
  margin: 0 auto;
  background-color: #fff;
  z-index: 999;
  user-select: none;
  font-size: 16px;
  color: #111;
  height: 300px;
  .operation {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>

<template>
  <transition name="confirm-fade">
    <div
      class="my-confirm"
      v-if="$store.state.wholeDialog.isShowDelConfirm"
      @click.stop="clickFun('clickCancle')"
    >
      <div
        @click.stop
        class="confirm-content-wrap"
      >
        <h2 class="confirm-title">{{$store.state.wholeDialog.titleText}}</h2>
        <p class="confirm-content">{{$store.state.wholeDialog.content}}</p>
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
import { hidden } from '@/js/dialog.js';

export default {
  name: '',
  data () {
    return {
    };
  },
  methods: {
    clickFun (type) {
      if (type === 'clickCancle') {
        hidden('del');
      } else {
        this.$emit('userBehavior', type, this.$store.state.wholeDialog.receivedData);
        hidden('del');
      }
    }
  }
};
</script>

<style scope lang="less">
.my-confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2200;
  width: 100%;
  /* 包裹层容器样式 */
  .confirm-content-wrap {
    position: absolute;
    top: 28%;
    left: 0;
    right: 0;
    width: 300px;
    margin: 0 auto;
    height: 190px;
    background-color: #fff;
    border-radius: 5px;
    z-index: 999;
    user-select: none;
    /* 顶部标题部分 */
    .confirm-title {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      color: #333;
      padding: 20px 0 0 0;
    }

    /* 中间内容部分 */
    .confirm-content {
      padding: 0 15px;
      padding-top: 30px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 16px;
      line-height: 1.5;
    }
  }
}

/* 底部按钮样式 */
.operation .cancel-btn,
.confirm-btn {
  cursor: pointer;
}
.operation .confirm-btn {
  color: #285b91;
  float: right;
}
.operation .cancel-btn {
  float: left;
}
.operation .btn-text {
  text-align: center;
  font-size: 16px;
  margin: 14px 30px;
  padding: 9px 20px;
  border-radius: 4px;
}
.btn-bacColor {
  background-color: #285b91;
  color: white;
}
.btn-borderColor {
  border: 1px solid #eee;
}
</style>

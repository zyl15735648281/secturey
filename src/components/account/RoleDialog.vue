<template>
  <transition name="confirm-fade">
    <div
      class="my-confirm"
      v-if="$store.state.wholeDialog.isShowRoleConfirm"
      @click.stop="clickFun('clickCancle')"
    >
      <div
        class="confirm-content-wrap-other"
        @click.stop
      >
        <div class="ccw-header">
          <p class="mg-b confirm-title">{{$store.state.wholeDialog.titleText}}</p>
          <h3>角色</h3>
          <el-button
            class="fr cancel-button"
            v-if="$store.state.wholeDialog.type==='confirm'"
            @click="clickFun('clickCancle')"
          >{{$store.state.wholeDialog.cancleText}}</el-button>
          <el-button
            class="fr"
            @click="clickFun('clickConfirm')"
          >{{$store.state.wholeDialog.confirmText}}</el-button>
        </div>

        <ul class="ccw-content">
          <template v-for="item in roleList">
            <li :key="item.value">
              <div class="mg-b">
                {{item.label}}
                <el-checkbox
                  v-model="checked"
                  class="mg-l role-isEver"
                >角色有效性</el-checkbox>
              </div>
              <div class="mg-b">
                开始时间
                <el-date-picker
                  v-model="item.startTime"
                  type="date"
                  placeholder="选择开始时间"
                  class="mg-r"
                >
                </el-date-picker>
                截止时间
                <el-date-picker
                  v-model="item.endTime"
                  type="date"
                  placeholder="选择结束时间"
                  class="mg-r"
                >
                </el-date-picker>
                <el-checkbox v-model="item.isEver">永久有效</el-checkbox>
              </div>
            </li>
          </template>
        </ul>

      </div>
    </div>
  </transition>
</template>

<script>
import { roleDataset } from "@/js/dataset";
import { hidden } from "@/js/dialog.js";
export default {
  name: "",
  data () {
    return {
      checked: false,
      startTime: "",
      endTime: ""
    };
  },
  props: {
    currentMode: {
      type: String,
      default: ""
    }
  },
  computed: {
    roleList () {
      return roleDataset;
    }
  },
  methods: {
    clickFun (type) {
      if (type === "clickCancle") {
        hidden("role");
      } else {
        this.$emit("userBehavior", type, this.$store.state.wholeDialog.receivedData);
        hidden("role");
      }
    }
  }
};
</script>

<style scope lang="less">
/* 包裹层容器样式 */
.confirm-content-wrap-other {
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

  .ccw-header {
    height: 90px;
    .cancel-button {
      background-color: #285b91;
      color: white;
    }
    .el-button {
      margin-right: 10px;
    }
    .el-button:focus,
    .el-button:hover {
      color: #285b91;
      border-color: #285b91;
      background-color: #285b91;
      color: white;
    }
    .confirm-title {
      margin: 0 0 20px 0;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
  }
  .ccw-content {
    height: calc(100% - 90px);
    overflow: auto;
    .role-isEver::before {
      content: "*";
      color: #ff4949;
      width: 14px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>

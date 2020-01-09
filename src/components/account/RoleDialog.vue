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
          <li
            v-for="(item,index) in roleList"
            :key="item.Id"
          >
            <el-checkbox
              class="mg-l mg-b"
              :label="item.Name"
              :checked="item.checked"
              @change="handleChecked(item,index)"
            >{{item.Name}}</el-checkbox>
            <div
              class="mg-b role-limit"
              v-if="item.checked === true"
            >
              <span class="role-isEver mg-r">角色有效性</span>
              <el-checkbox
                :checked="item.isEver"
                @change="handleCheckedIsEver(item)"
              >永久有效</el-checkbox>
              <span>开始时间：</span>
              <el-date-picker
                v-model="item.startTime"
                type="date"
                placeholder="选择开始时间"
                class="mg-r"
                format="yyyy - MM - dd"
              >
              </el-date-picker>
              <span>截止时间：</span>
              <el-date-picker
                v-model="item.endTime"
                type="date"
                placeholder="选择结束时间"
                format="yyyy - MM - dd"
              >
              </el-date-picker>

            </div>
          </li>

        </ul>

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
      checkList: [],
      flag: false
    };
  },
  props: {
    roleList: {
      type: Array,
      default: () => []
    },
    userRoleList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickFun (type) {
      if (type === "clickCancle") {
        hidden("role");
      } else {
        this.$emit("userBehavior", type, this.$store.state.wholeDialog.receivedData);
        this.roleList.forEach(element => {
          element.checked = false;
        });
        hidden("role");
      }
    },
    handleChecked(e, index) {
      e.checked = !e.checked;
      if (this.userRoleList.length > 0) {
        const idx = this.userRoleList.forEach(element => {
          // eslint-disable-next-line no-unused-expressions
          element.Id === e.id;
        });
        if (idx !== -1) {
          return;
        }
      }

      if (this.checkList.length > 0) {
        const idx = this.checkList.findIndex(element => {
          // eslint-disable-next-line no-unused-expressions
          element.Id === e.Id;
        });
        if (idx !== -1) {
          this.checkList.splice(idx, 1);
        } else {
          this.checkList.push(e);
        }
      } else if (this.checkList.length === 0) {
        this.checkList.push(e);
      }
      this.$store.state.wholeDialog.receivedData = this.checkList;
      this.flag = e.checked;
    },
    handleCheckedIsEver(e) {
      e.isEver = !e.isEver;
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
      display: inline-block;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
    }
  }
}
.role-limit {
  .el-input__inner {
    height: 35px;
    line-height: 35px;
  }
  .el-input__icon {
    line-height: 35px;
  }
  .el-checkbox:last-of-type {
    margin-right: 15px;
  }
  .el-checkbox__label {
    padding-left: 5px;
    color: #111;
  }
}
.el-date-picker {
  // height: 30px;
  // line-height: 30px;
  z-index: 99999 !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 179px;
}
</style>

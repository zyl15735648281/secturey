import store from "@/store";
// import Vue from 'vue';

export function show (content, config, mode) {
  store.state.wholeDialog.content = content || "";
  if (Object.prototype.toString.call(config) === "[object Object]") {
    // 确保用户传的是一个对象
    store.state.wholeDialog.titleText = config.titleText || "操作提示";
    store.state.wholeDialog.cancleText = config.cancleText || "取消";
    store.state.wholeDialog.confirmText = config.confirmText || "确认";
    store.state.wholeDialog.type = config.type || "confirm";
    store.state.wholeDialog.receivedData = config.data || null;

    if (mode === "del") {
      // 删除
      store.state.wholeDialog.isShowDelConfirm = true;
    } else if (mode === "role") {
      // 新增用户里面的新增明细
      store.state.wholeDialog.isShowRoleConfirm = true;
    } else if (mode === "roleDetail") {
      // 明细角色
      store.state.wholeDialog.isShowRoleDetailConfirm = true;
    } else if (mode === "childDel") {
      // 子组件删除
      store.state.wholeDialog.isShowChildRoleDetailConfirm = true;
    } else {
      // 默认为删除弹出框
      store.state.wholeDialog.isShowDelConfirm = true;
    }
  }
};

export function hidden (mode) {
  if (mode === "del") {
    // 删除
    store.state.wholeDialog.isShowDelConfirm = false;
  } else if (mode === "role") {
    // 新增用户里面的新增明细
    store.state.wholeDialog.isShowRoleConfirm = false;
  } else if (mode === "roleDetail") {
    // 明细角色
    store.state.wholeDialog.isShowRoleDetailConfirm = false;
  } else if (mode === "childDel") {
    // 子组件删除
    store.state.wholeDialog.isShowChildRoleDetailConfirm = false;
  } else {
    // 默认为删除弹出框
    store.state.wholeDialog.isShowDelConfirm = false;
  }
  store.state.wholeDialog.titleText = "操作提示";
  store.state.wholeDialog.cancelText = "取消";
  store.state.wholeDialog.confirmText = "确认";
  store.state.wholeDialog.type = "confirm";
  store.state.wholeDialog.receivedData = null;
};

// export function clickFunction (type) {
//   if (type === 'clickCancle') {
//     hidden();
//   } else {
//     this.$emit('userBehavior', type, store.state.wholeDialog.receivedData);
//     hidden();
//   }
// }

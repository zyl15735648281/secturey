export const state = {
  wholeDialog: {
    isShowConfirm: false,
    titleText: "操作提示",
    content: "", // 提示框的内容
    cancleText: "取消", // 取消
    confirmText: "确定", // 确定
    type: "confirm", // [confirm/alert]
    receivedData: null // 接收到的数据
  }
};

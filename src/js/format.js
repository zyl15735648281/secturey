// 格式化状态的
export function fmtStatus (value) {
  return value === true ? "正常" : "禁用";
}

// 格式化时间的
export function formatterDate (value) {
  if (value && value.length > 10) return value.substr(0, 10);
  return value;
}

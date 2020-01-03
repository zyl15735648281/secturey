// 格式化状态的
export function fmtStatus (value) {
  if (value === true) {
    return "正常";
  } else {
    return "禁用";
  }
  // return value ? "正常" : "禁用";
}

// 格式化时间的
export function formatterDate (value) {
  if (value && value.length > 10) return value.substr(0, 10);
  return value;
}

export function formatterTime (value) {
  if (value === undefined || value === null) return value;
  return value.replace("T", " ");
}

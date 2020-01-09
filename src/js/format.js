// 格式化状态的
export function fmtStatus (value) {
  return value ? "正常" : "禁用";
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

// 格式化时间
export function formatterTimeData (date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)
    }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
}
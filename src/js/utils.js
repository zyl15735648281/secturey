// 获取分页数据的方法
/**
 *
 * @param list 总数据，数组，Arrary
 * @param cachList 缓存数据，数组，Arrary
 * @param currentPage 每页几条数据，Number
 * @param perPage 每页几条数据，Number
 */
export function pageData (list, cachList, currentPage, perPage) {
  cachList = [];
  // 分页数据
  let length = list.length;
  let maxLength = currentPage * perPage - 1;
  let minLength = currentPage * perPage - perPage;
  // eslint-disable-next-line no-plusplus
  for (let i = minLength; i < length; i++) {
    if (i > maxLength) {
      break;
    } else {
      cachList.push(list[i]);
    }
  }
  return cachList;
}

// 模糊查询的方法

export function frzzyQuery (searchText, list) {
  if (searchText) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    list = list.filter(v => {
      let sq;
      let text;
      let eq = false;
      let flag = false;
      sq = v.Name.trim().toUpperCase();
      text = searchText.trim().toUpperCase();

      eq = sq === text;
      if (!eq) {
        flag = sq.includes(text);
      }
      return eq || flag;
    });
  }

  return list;
}

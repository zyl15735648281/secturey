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

export function frzzyQuery (searchText, list, mode) {
  if (mode === "dic") {
    if (searchText) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      list = list.filter(v => {
        let sq;
        let text;
        let eq = false;
        let flag = false;
        sq = v.DicName.trim().toUpperCase();
        text = searchText.trim().toUpperCase();

        eq = sq === text;
        if (!eq) {
          flag = sq.includes(text);
        }
        return eq || flag;
      });
    }
  } else {
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
  }

  return list;
}
// 递归每一层的深度
export function treeList (arr) {
  let res = JSON.parse(JSON.stringify(arr));
  res.forEach((node) => {
    node = outsideList(node);
  });
  return res;
}

// 循环每一层的外层数据
export function outsideList (nodeInfo) {
  nodeInfo.checked = false;
  if (nodeInfo.treeChildren.length === 0) {
    return;
  }

  nodeInfo.treeChildren.forEach(treeNode => {
    treeNode = outsideList(treeNode);
  });
}
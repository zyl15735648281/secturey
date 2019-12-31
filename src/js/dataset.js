// 下拉框选项数据

// 1.标题为姓名的下拉框
export const nameDataset = [{
  value: '0',
  label: '黄金糕'
}, {
  value: '1',
  label: '双皮奶'
}, {
  value: '2',
  label: '蚵仔煎'
}, {
  value: '3',
  label: '龙须面'
}, {
  value: '4',
  label: '北京烤鸭'
}, {
  value: '5',
  label: '双奶'
}];

// 2.标题为状态的下拉框
export const statusDataset = [{
  label: '全部',
  value: '2'
},
{
  label: '开启',
  value: '1'
},
{
  label: '禁用',
  value: '0'
}
];

// 3.标题为系统的下拉框
export const systemDataset = [{
  value: '0',
  label: '示踪'
}, {
  value: '1',
  label: '权限'
}, {
  value: '2',
  label: '首页'
}, {
  value: '3',
  label: '导航'
}, {
  value: '4',
  label: '科研'
}];

// 4.标题为菜单的下拉框
export const menuDataset = [{
  value: '0',
  label: '资源管理'
}, {
  value: '1',
  label: '编码列表'
}, {
  value: '2',
  label: '病历入库'
}, {
  value: '3',
  label: '住院病人登记'
}, {
  value: '4',
  label: '病历出库'
}];

// 5. table模拟数据
export const tableList = [{
  id: '1',
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  id: '2',
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄',
  children: [{
    id: 31,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    id: 32,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }]
}, {
  id: '3',
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  id: '4',
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}];

// 6. tree结构模拟数据
export const dataList = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}];

// 7. 角色模拟数据
export const roleDataset = [{
  value: '0',
  label: '技师',
  isEver: '0',
  startTime: '2019-02-03',
  endTime: '2019-03-06'
}, {
  value: '1',
  label: '射手',
  isEver: '0',
  startTime: '2019-02-03',
  endTime: '2019-03-06'
}, {
  value: '2',
  label: '法师',
  isEver: '1',
  startTime: '2019-02-03',
  endTime: '2019-03-06'
}, {
  value: '3',
  label: '辅助',
  isEver: '1',
  startTime: '2019-02-03',
  endTime: '2019-03-06'
}, {
  value: '4',
  label: '下路',
  isEver: '0',
  startTime: '2019-02-03',
  endTime: '2019-03-06'
}];

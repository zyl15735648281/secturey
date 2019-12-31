import { createAPI } from "./request.js";

// 部门管理相关接口
// 部门管理获取列表
export const requestGetBaseDepartmentList = data => createAPI("/GetBaseDepartmentList", "post", data);

// 部门管理删除
export const requestDeleteBaseDepartment = data => createAPI("/DeleteBaseDepartment", "post", data);

// 部门管理查询
export const requestGetBaseDepartment = data => createAPI("/GetBaseDepartment", "get", data);

// 部门管理添加/修改
export const requestBaseDepartment = data => createAPI("/BaseDepartment", "post", data);

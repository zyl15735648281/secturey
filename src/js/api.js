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
// 获取部门字典
export const requestGetDicDepartment = data => createAPI("/GetDicDepartment", "get", data);
// 根据部门父级id查询列表
export const reqGetBaseDepartmentListByPid = data => createAPI("/GetBaseDepartmentListByPid", "get", data);

// 用户管理相关接口
// 用户管理添加 / 修改
export const requestBaseUser = data => createAPI("/BaseUser", "post", data);
// 用户管理查询
export const requestGetBaseUser = data => createAPI("/GetBaseUser", "post", data);
// 用户管理删除
export const requestDeleteBaseUser = data => createAPI("/DeleteBaseUser", "post", data);
// 用户管理获取列表
export const requestGetBaseUserList = data => createAPI("/GetBaseUserList", "post", data);

// 场景管理的添加/修改
export const requestBaseScope = data => createAPI("/BaseScope", "post", data);
// 场景管理查询
export const requestGetBaseScope = data => createAPI("/GetBaseScope", "post", data);
// 场景管理删除
export const requestDeleteBaseScope = data => createAPI("/DeleteBaseScope", "post", data);
// 场景管理获取列表
export const requestGetBaseScopeList = data => createAPI("/GetBaseScopeList", "post", data);

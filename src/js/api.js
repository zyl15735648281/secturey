import { createAPI, createAPIConfig } from "./request.js";

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
export const requestGetBaseUser = data => createAPI("/GetBaseUser", "get", data);
// 用户管理删除
export const requestDeleteBaseUser = data => createAPI("/DeleteBaseUser", "post", data);
// 用户管理获取列表
export const requestGetBaseUserList = data => createAPI("/GetBaseUserList", "post", data);
// 根据id获取权限信息
export const requestGetBaseRelationGroup = data => createAPI("/GetBaseRelationGroup", "get", data);
// 用户禁用，启用
export const requestModifiedIsEnable = data => createAPI("/ModifiedIsEnable", "post", data);
// 用户重置密码
export const requestModifiedPassword = data => createAPI("/ModifiedPassword", "post", data);

// 场景管理相关接口
// 场景管理的添加/修改
export const requestBaseScope = data => createAPI("/BaseScope", "post", data);
// 场景管理查询
export const requestGetBaseScope = data => createAPI("/GetBaseScope", "get", data);
// 场景管理删除
export const requestDeleteBaseScope = data => createAPI("/DeleteBaseScope", "post", data);
// 场景管理获取列表
export const requestGetBaseScopeList = data => createAPI("/GetBaseScopeList", "post", data);

// 分组管理相关接口
// 分组管理的添加/修改
export const requestBaseGroup = data => createAPI("/BaseGroup", "post", data);
// 分组管理查询
export const requestGetBaseGroup = data => createAPI("/GetBaseGroup", "get", data);
// 分组管理删除
export const requestDeleteBaseGroup = data => createAPI("/DeleteBaseGroup", "post", data);
// 分组管理获取列表
export const requestGetBaseGroupList = data => createAPI("/GetBaseGroupList", "post", data);
// 上级分组字典查询
export const requestGetDicBaseGroup = data => createAPI("/GetDicBaseGroup", "get", data);

// 角色管理相关接口
// 角色管理添加/修改
export const requestBaseRole = data => createAPI("/BaseRole", "post", data);
// 角色管理查询
export const requestGetBaseRole = data => createAPI("/GetBaseRole", "get", data);
// 角色管理删除
export const requestDeleteBaseRole = data => createAPI("/DeleteBaseRole", "post", data);
// 角色管理获取列表
export const requestGetBaseRoleList = data => createAPI("/GetBaseRoleList", "post", data);

// 模块管理相关接口
// 模块管理添加/修改
export const requestBaseModule = data => createAPI("/BaseModule", "post", data);
// 模块管理查询
export const requestGetBaseModule = data => createAPI("/GetBaseModule", "get", data);
// 模块管理删除
export const requestDeleteBaseModule = data => createAPI("/DeleteBaseModule", "post", data);
// 模块管理获取列表
export const requestGetBaseModuleList = data => createAPI("/GetBaseModuleList", "post", data);
// 模块的上移/下移
export const requestMoveBaseModule = data => createAPI("/MoveBaseModule", "post", data);
// 上传图片的接口
export const requestUploadBase64 = data => createAPI("/UploadBase64", "post", data);

// 获取字典数据
// 字典的添加 / 修改;
export const requestBaseDictionary = data => createAPI("/BaseDictionary", "post", data);
// 字典的删除;
export const requestDeleteBaseDictionary = data => createAPI("/DeleteBaseDictionary", "post", data);
// 字典查询，获取字典列表数据;
export const requestGetBaseDictionaryList = data => createAPI("/GetBaseDictionaryList", "get", data);
// 字典根据id查询字段;
export const requestGetBaseDictionary = data => createAPI("/GetBaseDictionary", "get", data);

// 删除角色场景;
export const requestDeleteBaseRoleScope = data => createAPI("/DeleteBaseRoleScope", "post", data);
// 删除角色模块;
export const requestDeleteBaseRoleModule = data => createAPI("/DeleteBaseRoleModule", "post", data);
// 删除组角色;
export const requestDeleteBaseGroupRole = data => createAPI("/DeleteBaseGroupRole", "post", data);
// 删除组用户;
export const requestDeleteBaseUserGroup = data => createAPI("/DeleteBaseUserGroup", "post", data);
// 删除用户角色;
export const requestDeleteBaseUserRole = data => createAPI("/DeleteBaseUserRole", "post", data);
// 用户的角色添加 / 修改;
export const requestBaseUserRole = data => createAPI("/BaseUserRole", "post", data);
// 获取用户角色列表;
export const requestGetBaseUserRoleList = data => createAPI("/GetBaseUserRoleList", "post", data);

// 获取资源配置系统
export const requestGetTableSystemList = data => createAPIConfig("GetTableSystemList", "post", data);
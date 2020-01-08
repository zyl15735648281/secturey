<template>
  <div class="">
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      width="70%"
      title="用户详情"
      class="userDialog"
    >
      <div class="all-item">
        <!-- 标题s -->
        <div class="item-title">

          <div style="margin-right: 120px">
            <h2>权限展示</h2>
          </div>
          <div style="margin-right: 240px">
            <h2>角色展示</h2>
          </div>
          <div style="margin-right: 170px">
            <h2>信息展示</h2>
          </div>
        </div>
        <!-- 标题e -->
        <!-- 所属用户<s></s> -->
        <div class="item">
          <div class="firstInfo">
            <h2>用户信息</h2>
          </div>
          <i class="iconfont icon-yiyongfeiji"></i>
          <div class="userInfo">
            <ul>
              <li>
                <span>姓名：{{detailInfo.Name}}</span>
              </li>
              <li>
                <span>工号：{{detailInfo.EmployeeId}}</span>
              </li>
              <li>
                <span>创建人：{{detailInfo.CreateUserName}}</span>
              </li>
              <li>
                <span>手机号：{{detailInfo.Mobile}}</span>
              </li>
              <li>
                <span>邮箱{{detailInfo.Email}}</span>
              </li>
              <li>
                <span>创建时间：{{detailInfo.CreateTime !== undefined ? detailInfo.CreateTime.slice(0,10) : detailInfo.CreateTime}}</span>
              </li>
              <li>
                <span>上次登录时间：</span>
              </li>

            </ul>
          </div>
          <div class="fourInfo">
            <p v-if="detailInfo.baseUserRoleList === undefined || detailInfo.baseUserRoleList === null || detailInfo.baseUserRoleList.length === 0">暂无用户角色</p>
            <li
              v-for="roleItem in detailInfo.baseUserRoleList"
              :key="roleItem.RoleId"
            >{{roleItem.RoleName}}
              <a
                href="javascript:void(0)"
                class="fr"
              >删除</a>
              <a
                href="javascript:void(0)"
                class="fr mg-r"
                @click="handleGetFeature(roleItem)"
              >功能权限</a>
              <a
                href="javascript:void(0)"
                class="fr  mg-r"
                @click="handleGetDataPer(roleItem)"
              >数据权限</a>
            </li>
          </div>
          <div class="thirdInfo">
            <div class="feature">
              <p v-if="userFeatureV === false && detailInfo.baseUserRoleList !== undefined && detailInfo.baseUserRoleList !== null && detailInfo.baseUserRoleList.length !== 0">请点击左侧功能权限查看</p>
              <p v-show="detailInfo.baseUserRoleList === undefined || detailInfo.baseUserRoleList === null || detailInfo.baseUserRoleList.length === 0 || userFeatureList.length === 0">暂无权限数据</p>
              <li
                v-show="userFeatureV === true"
                v-for="userFItem in userFeatureList"
                :key="userFItem.id"
              >场景1

                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
              </li>
            </div>
            <div class="dataAuth">
              <p v-if="detailInfo.baseUserRoleList !== undefined && detailInfo.baseUserRoleList !== null && detailInfo.baseUserRoleList.length !== 0">请点击左侧数据权限查看</p>
              <p v-show="detailInfo.baseUserRoleList !== undefined && detailInfo.baseUserRoleList !== null && detailInfo.baseUserRoleList.length !== 0 && userDataList.length === 0">暂无权限数据</p>
              <p v-show="(detailInfo.baseUserRoleList === undefined || detailInfo.baseUserRoleList === null || detailInfo.baseUserRoleList.length === 0) ">暂无权限数据</p>
              <li
                v-show="userDataV === true"
                v-for="userDItem in userDataList"
                :key="userDItem.id"
              >场景3
                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
              </li>
            </div>
          </div>
        </div>
        <!-- 所属用户e -->

        <!-- 所属部门s -->
        <div class="items">
          <div
            class="firstInfo"
            id="outside"
          >
            <h2>所属部门</h2>
          </div>
          <i class="iconfont icon-yiyongfeiji"></i>
          <div class="secondInfo">
            <p v-if="detailInfo.baseUserDepartmentModels === undefined || detailInfo.baseUserDepartmentModels === null">暂无部门数据</p>
            <ul>
              <li
                v-for="depItem in detailInfo.baseUserDepartmentModels"
                :key="depItem.groupId"
              >
                {{depItem.groupName}}
              </li>
            </ul>
          </div>
          <div class="fourInfo">
            <p v-if="detailInfo.baseUserGroupModels === undefined || detailInfo.baseUserGroupModels === null">暂无部门角色</p>
            <ul v-if="detailInfo.baseUserGroupModels !== undefined && detailInfo.baseUserGroupModels !== null">
              <li>病案科
                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
                <a
                  href="javascript:void(0)"
                  class="fr mg-r"
                  @click="handleGetDepFeatureV"
                >功能权限</a>
                <a
                  href="javascript:void(0)"
                  class="fr  mg-r"
                  @click="handleGetDepDataV"
                >数据权限</a>
              </li>
            </ul>
          </div>
          <div class="thirdInfo">
            <div class="feature">
              <p v-if="depFeatureV === false">请点击左侧功能权限查看</p>
              <li v-else>场景1
                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
              </li>
            </div>
            <div class="dataAuth">
              <p v-if="depDataV === false">请点击左侧功能权限查看</p>
              <li v-else>场景3
                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
              </li>
            </div>
          </div>
        </div>
        <!-- 所属部门e -->

        <!-- 所属分组s -->
        <div class="items">
          <div
            class="firstInfo"
            id="outside"
          >
            <h2>所属分组</h2>
          </div>
          <i class="iconfont icon-yiyongfeiji"></i>
          <div class="secondInfo">
            <p v-if="detailInfo.baseUserGroupModels === undefined || detailInfo.baseUserGroupModels === null">暂无分组数据</p>
            <ul>
              <li
                v-for="dpItem in detailInfo.baseUserGroupModels"
                :key="dpItem.departmentId"
              >{{dpItem.departName}}
              </li>
            </ul>
          </div>
          <div class="fourInfo">
            <li>病案科
              <a
                href="javascript:void(0)"
                class="fr"
              >删除</a>
              <a
                href="javascript:void(0)"
                class="fr mg-r"
              >功能权限</a>
              <a
                href="javascript:void(0)"
                class="fr  mg-r"
              >数据权限</a>
            </li>
          </div>
          <div class="thirdInfo">
            <div class="feature">
              <p v-if="gpFeatureV === false">请点击左侧功能权限查看</p>
              <li v-else>场景1
                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
              </li>
            </div>
            <div class="dataAuth">
              <p v-if="gpDataV === false">请点击左侧数据权限查看</p>
              <li v-else>场景3
                <a
                  href="javascript:void(0)"
                  class="fr"
                >删除</a>
              </li>
            </div>
          </div>
        </div>
        <!-- 所属分组e -->
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleClose"
        >关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { requestGetBaseRelationGroup } from "@/js/api";

export default {
  name: "",
  components: {
  },
  data () {
    return {
      userFeatureV: false,
      userDataV: false,
      depFeatureV: false,
      depDataV: false,
      gpFeatureV: false,
      gpDataV: false,
      userDataList: [],
      userFeatureList: []
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    },
    // 获取用户角色功能权限
    async handleGetFeature(row) {
      this.userFeatureV = true;
      const res = await requestGetBaseRelationGroup({ id: row.RoleId });
      if (res.status === 200 && res.data !== "") {
        this.userFeatureList = res.data;
      }
    },
    // 获取用户角色数据权限
    async handleGetDataPer(row) {
      // 根据此用户的id去获取权限
      this.userDataV = true;
      const res = await requestGetBaseRelationGroup({ id: row.RoleId });
      if (res.status === 200 && res.data !== "") {
        this.userDataList = res.data;
      }
    },
    // 获取所属部门功能权限
    handleGetDepFeatureV() {
      this.depFeatureV = true;
    },
    // 获取所属部门数据权限
    handleGetDepDataV() {
      this.depDataV = true;
    },
    handleGetGpFeatureV() {
      this.gpFeatureV = true;
    },
    handleGetGpDataV() {
      this.gpDataV = true;
    },
  },
};
</script>

<style scope lang="less">
.userDialog {
  .el-dialog__body {
    height: 400px;
    overflow: auto;
    color: #111;
    box-shadow: 0 1px 3px #ccc;
    padding: 20px 0;
    margin: 30px 20px;
  }
  .all-item {
    width: 100%;
    height: 100%;
  }
  .item-title {
    width: 100%;
    height: 60px;
    div {
      float: right;
      border: 2px solid rgb(224, 84, 99);
      padding: 10px;
    }
  }
  div {
    box-sizing: border-box;
    border-radius: 5px;
  }
  p {
    color: rgb(224, 84, 99);
    font-size: 16px;
    font-weight: 600;
  }

  .item {
    width: 100%;
    height: 150px;
    margin-bottom: 30px;
    position: relative;
    i {
      position: absolute;
      top: 60px;
      left: 120px;
    }
    .icon-yiyongfeiji:before {
      display: inline-block;
      font-size: 26px;
      padding-left: 2px;
      color: rgb(250, 202, 75);
    }
  }
  .items {
    width: 100%;
    height: 200px;
    margin-bottom: 30px;
    position: relative;
    i {
      position: absolute;
      top: 85px;
      left: 120px;
    }
    .icon-yiyongfeiji:before {
      display: inline-block;
      font-size: 26px;
      padding-left: 2px;
      color: rgb(250, 202, 75);
    }
  }
  .firstInfo {
    float: left;
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 2px solid rgb(224, 84, 99);
    margin: 50px 20px;
  }
  #outside {
    margin: 75px 20px;
  }
  .userInfo {
    width: 200px;
    // width: calc(100% - 110px);
    height: 100%;
    float: left;
    border: 2px solid rgb(167, 208, 108);
    overflow: auto;
    margin-left: 10px;
  }

  .secondInfo {
    width: 200px;
    border: 2px solid rgb(167, 208, 108);
    float: left;
    height: 100%;
    margin-left: 10px;
    overflow: auto;
  }
  .fourInfo {
    width: 330px;
    border: 2px solid rgb(94, 208, 177);
    float: left;
    height: 100%;
    margin-left: 20px;
    overflow: auto;
  }
  .thirdInfo {
    width: calc(100% - 720px);
    height: 100%;
    display: inline-block;
    margin-left: 20px;
    overflow: auto;
    .feature,
    .dataAuth {
      width: 100%;
      height: 47%;
      border: 2px solid rgb(99, 193, 234);
      overflow: auto;
    }
    .feature {
      margin-bottom: 10px;
    }
  }

  li {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #e4e4e4;
    list-style: none;
  }
  .el-icon-circle-close {
    float: right;
    margin-top: 8px;
  }
}
</style>

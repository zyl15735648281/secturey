<template>
  <div class="">
    <el-dialog
      title="角色详情"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <div>
        <h3>角色信息</h3>
        <ul>
          <li>
            <span>所属类型：{{roleInfo.TypeName}}</span>
          </li>
          <li>
            <span>创建人：{{roleInfo.CreateUserName}}</span>
          </li>
          <li>
            <span>创建时间：{{roleInfo.CreateTime !== undefined ? roleInfo.CreateTime.slice(0,10) : ''}}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>所属分组</h3>
        <span></span>
        <h3>所属用户</h3>
        <OperateGroup
          :aleradyUserList="alreadyRoleList"
          target="删除"
          @removeUser="handleRemoveUser"
          style="width:100%;height:calc(100% - 35px)"
        ></OperateGroup>
      </div>
      <div>
        <div>功能权限</div>
        <div>数据权限
          <span>场景1</span>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClose"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import OperateGroup from "@/components/group/OperateGroup";

export default {
  name: "",
  components: {
    OperateGroup
  },
  data () {
    return {
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    alreadyRoleList: {
      type: Array,
      default: () => []
    },
    roleInfo: {
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
    handleRemoveUser(row) {

    }
  },
};
</script>

<style scope lang="less">
ul {
  border: 1px solid #e4e4e4;
  height: calc(100% - 35px);
  overflow: auto;
  li {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #e4e4e4;
    list-style: none;
    font-size: 14px;
  }
}
</style>

<template>
  <div class="detailStyle">
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
        <div>
          <h3>所属分组</h3>
          <span
            v-for="item in alreadyGroupList"
            :key="item.id"
            class="spanStyle"
          >{{item.groupName}}</span>
        </div>

        <h3>所属用户</h3>
        <OperateGroup
          :aleradyUserList="alreadyRoleList"
          target="删除"
          @removeUser="handleRemoveUser"
          style="width:100%;height:calc(100% - 35px)"
        ></OperateGroup>
      </div>
      <div>
        <div>
          <h3>功能权限</h3><br>
          <span
            v-for="item in alreadyModuleList"
            :key="item.ModuleId"
            class="spanStyle"
          >
            {{item.ModuleName}}
          </span>
        </div>
        <div>
          <h3>数据权限</h3><br>
          <span
            v-for="item in alreadyScopeList"
            :key="item.ScopeId"
            class="spanStyle"
          >{{item.ScopeName}}</span>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          class="cancle"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="handleClose"
          class="confirm"
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
  watch: {
    roleInfo(val) {
      // console.log(val);
    }
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
    },
    alreadyGroupList: {
      type: Array,
      default: () => []
    },
    alreadyModuleList: {
      type: Array,
      default: () => []
    },
    alreadyScopeList: {
      type: Array,
      default: () => []
    },
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
.detailStyle {
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
  .spanStyle {
    display: inline-block;
    width: 80px;
    border: 1px solid #e4e4e4;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
  }
}
</style>

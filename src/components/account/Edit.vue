<template>
  <div>
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <!-- <span>新增用户</span> -->
      <el-form :model="formLabelAlign">
        <el-form-item label="姓名">
          <el-input
            v-model="formLabelAlign.name"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input
            v-model="formLabelAlign.region"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
          <DepList
            :value="depValue"
            @onChange="switchDep"
            class="dep-sel"
          ></DepList>
        </el-form-item>
        <el-form-item label="角色">
          <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
          <a
            href="javascript:void(0);"
            @click="handleAddRole"
          >添加</a>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="500"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          id="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
    <RoleDialog @userBehavior="switchRoleValue"></RoleDialog>
  </div>

</template>

<script>
import DepList from '@/components/DepList';
import RoleDialog from '@/components/account/RoleDialog';
import { show } from '@/js/dialog';

export default {
  name: '',
  components: {
    DepList,
    RoleDialog
  },
  data () {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      depValue: ''
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: '新增用户'
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('closed');
    },
    handleConfirm () {
      this.handleClose();
    },
    switchDep (e) {
      this.depValue = e;
    },
    switchRoleValue (type, data) {
      // console.log(e);
    },
    // 添加角色
    handleAddRole () {
      show('', {
        type: 'confirm',
        confirmText: '选好了',
        cancelText: '取消',
        titleText: '请为该用户添加/编辑角色'
      }, 'role');
    }
  },
};
</script>

<style lang="less" scope>
.dep-sel {
  .el-select {
    width: 100%;
  }
}
</style>

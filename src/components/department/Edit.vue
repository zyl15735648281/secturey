<template>
  <div class="dep">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <el-form
        ref="form"
        id="adddep"
      >
        <!-- :model="formLabelAlign" -->
        <el-form-item label="部门名称">
          <el-input maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="部门代码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="部门首字母拼音">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上级部门">
          <DepList
            :value="depValue"
            @onChange="switchDep"
            class="dep-sel"
          ></DepList>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-form-item>
        <el-form-item label="电话">
          <el-input></el-input>
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
          @click="handleClose"
          id="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DepList from '@/components/DepList';

export default {
  name: '',
  components: {
    DepList
  },
  data () {
    return {
      depValue: ''
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('closed');
    },
    switchDep (e) {
      this.depValue = e;
    }
  },
};
</script>

<style scope lang="less">
#adddep {
  .el-form-item__label {
    width: 120px;
  }
  .el-form-item__content {
    width: calc(100% - 120px);
  }
}
.dep-sel {
  .el-select {
    width: 100%;
  }
}
</style>

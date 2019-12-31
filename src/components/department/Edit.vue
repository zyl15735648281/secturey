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
        :model="childDePInfo"
      >
        <el-form-item label="部门名称">
          <el-input
            v-model="childDePInfo.Name"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门代码">
          <el-input v-model="childDePInfo.DepCode"></el-input>
        </el-form-item>
        <el-form-item label="部门首字母拼音">
          <el-input v-model="childDePInfo.PinyinShort"></el-input>
        </el-form-item>
        <el-form-item
          label="上级部门"
          id="norequired"
        >
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
        <el-form-item
          label="电话"
          id="norequired"
        >
          <el-input v-model="childDePInfo.Phone"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="childDePInfo.Note"
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
  </div>
</template>

<script>
import DepList from "@/components/DepList";
import { requestBaseDepartment } from "@/js/api.js";

export default {
  name: "",
  components: {
    DepList
  },
  data () {
    return {
      depValue: ""
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    childDePInfo: {
      type: Object,
      default: () => {}
    }
  },
  created () {
  },
  methods: {
    // 编辑或者修改
    async handleConfirm() {
      const params = {
        id: "",
        parentId: "string",
        depCode: this.childDePInfo.DepCode,
        name: this.childDePInfo.Name,
        note: this.childDePInfo.Note,
        phone: this.childDePInfo.Phone,
        pinyinShort: this.childDePInfo.PinyinShort,
        isEnable: true,
        createUserId: "string",
        createUserName: "string",
        createTime: "2019-12-31T10:46:14.998Z",
      };
      if (this.title === "编辑部门") {
        params.id = this.childDePInfo.Id;
      }
      const res = await requestBaseDepartment(params);
      if (this.title === "新增部门") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addGp");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，编辑成功"
          });
          this.$emit("editGp");
          this.handleClose();
        }
      }
    },
    handleClose () {
      this.$emit("closed");
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

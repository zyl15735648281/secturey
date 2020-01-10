<template>
  <div class="dicStyle">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      width="30%"
      height="300px"
      class="dialogStyle"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="dicInfo.DicName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="dicInfo.DicType"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dicInfo.Note"></el-input>
        </el-form-item>
      </el-form>
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
          @click="handleConfirm"
          class="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { requestBaseDictionary } from "@/js/api.js";

export default {
  name: "",
  components: {
  },
  data () {
    return {
    };
  },
  props: {
    mode: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    dicInfo: {
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
    async handleConfirm() {
      // 做一些必要的验证
      if (!this.verify()) {
        return;
      }
      const params = {
        id: "",
        dicName: this.dicInfo.DicName,
        dicType: this.dicInfo.DicType,
        createUserId: "zyl",
        createUserName: "zyl",
        note: this.dicInfo.Note
      };
      if (this.mode === "编辑字典") {
        params.id = this.dicInfo.Id;
      }
      const res = await requestBaseDictionary(params);
      if (this.mode === "新增字典") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addDic");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，编辑成功"
          });
          this.$emit("editDic");
          this.handleClose();
        }
      }
    },
    verify() {
      if (this.dicInfo.DicName === "" || this.dicInfo.DicName === undefined) {
        this.$message({
          type: "waring",
          message: "请输入字典名称"
        });
        return false;
      }

      if (this.dicInfo.DicType === "" || this.dicInfo.DicType === undefined) {
        this.$message({
          type: "waring",
          message: "请输入字典类型"
        });
        return false;
      }
      return true;
    }
  },
};
</script>

<style scope lang="less">
.dicStyle {
  .el-dialog__body {
    height: 200px;
  }
}

#dicReqrired {
  display: flex;
  .el-form-item__label {
    letter-spacing: 0.5px;
    text-align-last: justify;
    width: 110px;
  }
  .el-form-item__content {
    width: calc(100% - 110px);
    margin-left: 0;
  }
}

#dicReqrired::before {
  content: "*";
  color: #ff4949;
  width: 14px;
  display: inline-block;
  vertical-align: middle;
}
</style>

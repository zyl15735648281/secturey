<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <el-form :model="dperInfo">
        <el-form-item label="名称">
          <el-input
            maxlength="50"
            v-model="dperInfo.Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input
            maxlength="500"
            v-model="dperInfo.Value"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio
            v-model="dperInfo.Type"
            label="院区"
          ></el-radio>
          <el-radio
            v-model="dperInfo.Type"
            label="科室"
          ></el-radio>
          <el-radio
            v-model="dperInfo.Type"
            label="时间"
          ></el-radio>
          <el-radio
            v-model="dperInfo.Type"
            label="病案状态"
          ></el-radio>
          <el-radio
            v-model="dperInfo.Type"
            label="病案等级"
          ></el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            v-model="dperInfo.IsEnable"
            :label="true"
          >正常</el-radio>
          <el-radio
            v-model="dperInfo.IsEnable"
            :label="false"
          >禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="500"
            v-model="dperInfo.Memo"
          ></el-input>
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
import { requestBaseScope } from "@/js/api.js";

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
    dperInfo: {
      type: Object,
      default: () => {}
    },
    dperList: {
      type: Array,
      default: () => []
    }
  },
  created () {
  },

  methods: {
    handleClose () {
      this.$emit("closed");
    },
    // 点击确定
    async handleConfirm() {
      // 做一些必要的验证
      if (!this.verify()) {
        return;
      }
      const params = {
        scopeId: "",
        name: this.dperInfo.Name,
        type: this.dperInfo.Type,
        value: this.dperInfo.Value,
        enable: false,
        isEnable: this.dperInfo.IsEnable,
        createUserId: this.$store.state.userInfo.UserId,
        createUserName: this.$store.state.userInfo.Name,
        memo: this.dperInfo.Memo
      };
      console.log(params);

      if (this.mode === "编辑数据权限") {
        params.scopeId = this.dperInfo.ScopeId;
      }

      const res = await requestBaseScope(params);
      if (this.mode === "新增数据权限") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addDper");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，编辑成功"
          });
          this.$emit("editDper");
          this.handleClose();
        }
      }
    },
    verify() {
      if (this.dperInfo.Name === undefined || this.dperInfo.Name === "") {
        this.$message({
          type: "waring",
          message: "请输入名称"
        });
        return false;
      }
      if (this.mode === "新增数据权限") {
        if (this.dperList.length > 0) {
          const arr = [];
          console.log("this.dperInfo.Name: " + this.dperInfo.Name);
          this.dperList.forEach(element => {
            console.log("element.Name: " + element.Name);
            if (element.Name === this.dperInfo.Name) {
              arr.push(element);
            }
          });
          if (arr.length > 0) {
            this.$message({
              type: "waring",
              message: "名称不能重复"
            });
            return false;
          }
        }
      }
      if (this.dperInfo.Value === undefined || this.dperInfo.Value === "") {
        this.$message({
          type: "waring",
          message: "请输入值"
        });
        return false;
      }
      if (this.dperInfo.Type === undefined || this.dperInfo.Type === "") {
        this.$message({
          type: "waring",
          message: "请输入类型"
        });
        return false;
      }
      if (this.dperInfo.IsEnable === undefined || this.dperInfo.IsEnable === "") {
        this.$message({
          type: "waring",
          message: "请选择状态"
        });
        return false;
      }
      return true;
    }
  },
};
</script>

<style scope lang="less">
</style>

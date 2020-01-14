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
          id="depnorequired"
        >

          <SelectTree
            :selectList="deepTreeList"
            @selectData="handleSelectData"
            @removeDep="handelRemoveDep"
            :groupSearchText="ParentName"
          ></SelectTree>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            v-model="childDePInfo.IsEnable"
            :label="true"
          >正常</el-radio>
          <el-radio
            v-model="childDePInfo.IsEnable"
            :label="false"
          >禁用</el-radio>
        </el-form-item>
        <el-form-item
          label="电话"
          id="depnorequired"
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
import SelectTree from "@/components/SelectTree";
import { requestBaseDepartment } from "@/js/api.js";

export default {
  name: "",
  components: {
    SelectTree
  },
  data () {
    return {
      ParentName: "",
      ParentId: "0"
    };
  },
  watch: {
    childDePInfo(val) {
      this.ParentName = val.ParentName;
      this.ParentId = val.ParentId;
    }
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
    },
    depList: {
      type: Array,
      default: () => []
    },
    deepTreeList: {
      type: Array,
      default: () => []
    },
  },
  created () {
  },
  mounted() {
  },
  methods: {
    handleSelectData(e) {
      this.ParentName = e.name;
    },
    handelRemoveDep(e) {
      this.ParentName = "";
    },
    // 编辑或者修改
    async handleConfirm() {
      // 做一些必要的验证
      if (!this.verify()) {
        return;
      }
      const params = {
        id: "",
        parentName: this.childDePInfo.ParentName || 0,
        depCode: this.childDePInfo.DepCode,
        name: this.childDePInfo.Name,
        note: this.childDePInfo.Note || "",
        phone: this.childDePInfo.Phone,
        pinyinShort: this.childDePInfo.PinyinShort,
        isEnable: this.childDePInfo.IsEnable,
        createUserId: "",
        createUserName: ""
      };
      this.depList.forEach(element => {
        if (this.childDePInfo.ParentName === element.Name) {
          params.parentId = element.Id;
        }
      });

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
    verify() {
      if (this.childDePInfo.Name === undefined || this.childDePInfo.Name === "") {
        this.$message({
          type: "waring",
          message: "请输入部门名称"
        });
        return false;
      }

      if (this.title === "新增部门") {
        // 部门名称不能重复
        if (this.depList.length > 0) {
          const arr = [];
          this.depList.forEach(element => {
            if (element.Name === this.childDePInfo.Name) {
              arr.push(element);
            }
          });
          if (arr.length > 0) {
            this.$message({
              type: "waring",
              message: "部门名称不能重复"
            });
            return false;
          }
        }
      }
      if (this.childDePInfo.DepCode === undefined || this.childDePInfo.DepCode === "") {
        this.$message({
          type: "waring",
          message: "请输入部门代码"
        });
        return false;
      }

      if (this.childDePInfo.PinyinShort === undefined || this.childDePInfo.PinyinShort === "") {
        this.$message({
          type: "waring",
          message: "请输入部门首字母拼音"
        });
        return false;
      }
      if (this.childDePInfo.IsEnable === undefined || this.childDePInfo.IsEnable === "") {
        this.$message({
          type: "waring",
          message: "请选择状态"
        });
        return false;
      }

      return true;
    },
    handleClose () {
      this.$emit("closed");
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
#depnorequired {
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

#depnorequired::before {
  content: " ";
  width: 14px;
  height: 40px;
  line-height: 40px;
}
.dep-sel {
  .el-select {
    width: 100%;
  }
}
</style>

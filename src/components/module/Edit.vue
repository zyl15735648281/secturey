<template>
  <div class>
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <el-form v-model="mdInfo">
        <el-form-item label="系统名称">
          <SysNameList
            v-model="mdInfo.SystemName"
            :sysList="sysList"
            style="width:100%"
          ></SysNameList>
        </el-form-item>
        <el-form-item
          label="上级菜单"
          id="mdnorequired"
        >
          <SelectTree
            :selectList="moudleList"
            @selectData="handleSelectMdData"
            @removeDep="handelRemoveGp"
            :groupSearchText="ParentGp"
          ></SelectTree>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio
            label="目录"
            v-model="mdInfo.Type"
          >目录</el-radio>
          <el-radio
            label="菜单"
            v-model="mdInfo.Type"
          >菜单</el-radio>
          <el-radio
            label="按钮"
            v-model="mdInfo.Type"
          >按钮</el-radio>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input
            v-model="mdInfo.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单链接"
          id="mdnorequired"
        >
          <el-input v-model="mdInfo.Url"></el-input>
        </el-form-item>
        <el-form-item
          label="图标"
          id="mdnorequired"
        >
          <el-input
            v-model="Icon"
            style="width:calc(100% - 85px)"
            clearable
            @clear="handleClearImg"
          ></el-input>
          <form
            action
            name="file"
            class="file fr"
          >
            上传图片
            <input
              type="file"
              id="icon"
              name="icon"
              @change="uploadPhoto($event)"
            />
          </form>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            :label="true"
            v-model="mdInfo.IsEnable"
          >开启</el-radio>
          <el-radio
            :label="false"
            v-model="mdInfo.IsEnable"
          >禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="500"
            v-model="mdInfo.Description"
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
import SysNameList from "@/components/SysNameList";
import SelectTree from "@/components/SelectTree";
import { requestBaseModule } from "@/js/api.js";
// requestUploadBase64

export default {
  name: "",
  components: {
    SysNameList,
    SelectTree
  },
  data() {
    return {
      imgcodes: "",
      ParentGp: "",
      ParentGpId: "0"
    };
  },
  watch: {
    mdInfo(val) {
      if (this.mode === "编辑模块") {
        if (val.parentID === undefined) {
          return;
        }
        if (val.parentID.trim() === "0") {
          this.ParentGp = "";
          this.ParentGpId = "0";
        } else {
          let thisMouList = this.moudleList.filter(r => { return r.SystemId === val.SystemId; });
          if (thisMouList.length === 1) {
            let arr;
            arr = thisMouList.filter(r => {
              return r.id === val.parentID;
            });

            if (arr.length === 0) {
              let tempInfo = thisMouList[0].treeChildren.find(r => {
                return r.id === val.parentID;
              });
              arr.push(tempInfo);
            }

            this.ParentGp = arr[0].name;
            this.ParentGpId = arr[0].id;
          }
        }
      }

      if (this.mode === "新增平级模块") {
        this.ParentGp = val.ParentGpname;
        this.ParentGpId = val.ParentGpid;
        console.log(val);
      }

      if (this.mode === "新增子级模块") {
        this.ParentGp = val.ParentGpchildname;
        this.ParentGpId = val.ParentGpchildid;
      }
    }
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
    mdInfo: {
      type: Object,
      default: () => {}
    },
    sysList: {
      type: Array,
      default: () => []
    },
    moudleList: {
      type: Array,
      default: () => []
    },
    Icon: {
      type: String,
      default: ""
    }
  },
  methods: {
    handelRemoveGp() {
      this.ParentGp = "";
    },
    handleSelectMdData(e) {
      this.ParentGp = e.name;
      this.ParentGpId = e.id;
    },
    // 编辑/修改
    async handleConfirm() {
      if (!this.verify()) {
        return;
      }
      // 这里需要做必要的验证
      const params = {
        id: "",
        name: this.mdInfo.name,
        systemName: this.mdInfo.SystemName,
        isEnable: this.mdInfo.IsEnable,
        parentId: this.ParentGpId || 0,
        description: this.mdInfo.Description || "",
        createUserId: this.$store.state.userInfo.UserId,
        createUserName: this.$store.state.userInfo.Name,
        type: this.mdInfo.Type,
        icon: this.imgcodes || ""
      };

      this.sysList.forEach(element => {
        if (element.SystemName === this.mdInfo.SystemName) {
          params.systemId = element.SystemId;
        }
      });

      if (this.mode === "编辑模块") {
        params.id = this.mdInfo.id;
      }
      if (params.parentId === 0 && params.type === "按钮") {
        this.$message({
          type: "waring",
          message: "按钮不能作为父级添加"
        });
        return;
      }
      const res = await requestBaseModule(params);
      if (this.mode === "新增模块" || this.mode === "新增平级模块" || this.mode === "新增子级模块") {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，添加成功"
          });
          this.$emit("addMd");
          this.handleClose();
        }
      } else {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "祝贺您，修改成功"
          });
          this.$emit("editMd");
          this.handleClose();
        }
      }
    },
    handleClose() {
      this.$emit("closed");
    },
    verify() {
      if (this.mdInfo.SystemName === undefined || this.mdInfo.SystemName === "") {
        this.$message({
          type: "waring",
          message: "请选择系统名称"
        });
        return false;
      }
      if (this.mdInfo.Type === undefined || this.mdInfo.Type === "") {
        this.$message({
          type: "waring",
          message: "请选择类型"
        });
        return false;
      }
      if (this.mdInfo.name === undefined || this.mdInfo.name === "") {
        this.$message({
          type: "waring",
          message: "请输入菜单名称"
        });
        return false;
      }
      if (this.mdInfo.IsEnable === undefined || this.mdInfo.IsEnable === "") {
        this.$message({
          type: "waring",
          message: "请选择状态"
        });
        return false;
      }
      return true;
    },
    // 上传图片
    async uploadPhoto(e) {
      if (this.imgcodes !== "") {
        this.imgcodes = "";
      }
      let file = e.target.files[0];
      let filename = file.name;
      console.log(filename);
      let filesize = file.size;
      if (filesize / (1024 / 1024) > 1) {
        this.$message({
          type: "waring",
          message: "图片大小不能超过1M"
        });
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        // 读取到的图片base64 数据编码
        let imgcode = e.target.result;
        this.imgcodes = imgcode;
      };
      this.Icon = filename;
    },
    handleClearImg() {
      this.imgcodes = "";
    }

    // handleAddNum() {
    //   if (this.mdInfo.Sort === "") {
    //     return;
    //   }
    //   if (parseInt(this.mdInfo.Sort) >= 10) {
    //     this.mdInfo.Sort = "10";
    //   } else {
    //     this.mdInfo.Sort = (parseInt(this.mdInfo.Sort) + 1).toString();
    //   }
    // },
    // handleReduceNum() {
    //   if (this.mdInfo.Sort === "") {
    //     return;
    //   }
    //   if (parseInt(this.mdInfo.Sort) <= 0) {
    //     this.mdInfo.Sort = "0";
    //   } else {
    //     this.mdInfo.Sort = (parseInt(this.mdInfo.Sort) - 1).toString();
    //   }
    // },
  }
};
</script>

<style scope lang="less">
#sort-input {
  position: relative;
}
.sort {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 5px;
  right: 0;
}
// 实现三角形
.over {
  position: absolute;
  width: 0px;
  height: 0px;
  top: -6px;
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid grey;
  border-left: 5px solid transparent;
}

.up {
  position: absolute;
  bottom: 2px;
  width: 0;
  height: 0;
  border-bottom: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid grey;
  border-left: 5px solid transparent;
}

#mdnorequired {
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

#mdnorequired::before {
  content: " ";
  width: 14px;
  height: 40px;
  line-height: 40px;
}

.file {
  width: 75px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #4bc183;
  position: relative;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.file input {
  width: 75px;
  height: 40px;
  opacity: 0;
  filter: alpha(opacity=0);
  position: absolute;
  left: 0;
  top: 0;
}
</style>

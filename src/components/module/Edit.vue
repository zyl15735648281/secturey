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
          <SysNameList v-model="mdInfo.SystemName" :sysList="sysList" style="width:100%"></SysNameList>
        </el-form-item>
        <el-form-item label="上级菜单" id="mdnorequired">
          <el-input v-model="mdInfo.parentID" style="width: 48%;"></el-input>
          <SelectTree
            :selectList="moudleList"
            @selectData="handleSelectMdData"
            v-model="mdInfo.parentID"
          ></SelectTree>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio label="目录" v-model="mdInfo.Type">目录</el-radio>
          <el-radio label="菜单" v-model="mdInfo.Type">菜单</el-radio>
          <el-radio label="按钮" v-model="mdInfo.Type">按钮</el-radio>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="mdInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单链接" id="mdnorequired">
          <el-input v-model="mdInfo.Url"></el-input>
        </el-form-item>
        <el-form-item label="图标" id="mdnorequired">
          <el-input v-model="Icon" style="width:calc(100% - 85px)"></el-input>
          <form action name="file" class="file fr">
            上传图片
            <input type="file" id="icon" name="icon" @change="uploadPhoto($event)" />
          </form>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio :label="true" v-model="mdInfo.IsEnable">开启</el-radio>
          <el-radio :label="false" v-model="mdInfo.IsEnable">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" maxlength="500" v-model="mdInfo.Description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" class="cancle">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" class="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SysNameList from "@/components/SysNameList";
// import OverMenu from "@/components/module/OverMenu";
import SelectTree from "@/components/SelectTree";
import { requestBaseModule } from "@/js/api.js";

export default {
  name: "",
  components: {
    SysNameList,
    // OverMenu
    SelectTree
  },
  data() {
    return {
      menuValue: "",
      imgcodes: "",
      Icon: ""
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
    }
  },
  computed: {
    // Icon() {
    //   return this.mdInfo.Icon;
    // }
  },
  methods: {
    // 编辑/修改
    async handleConfirm() {
      const params = {
        id: "",
        name: this.mdInfo.name,
        systemName: this.mdInfo.SystemName,
        systemId: this.mdInfo.SystemId,
        isEnable: this.mdInfo.IsEnable,
        parentId: this.mdInfo.parentID || 0,
        description: this.mdInfo.Description,
        createUserId: "zyl",
        createUserName: "zyl",
        type: this.mdInfo.Type,
        sort: this.mdInfo.Sort,
        icon: this.imgcodes
      };

      if (this.mode === "编辑模块") {
        params.id = this.mdInfo.Id;
      }
      console.log(params);
      const res = await requestBaseModule(params);
      if (this.mode === "新增模块") {
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
    uploadPhoto(e) {
      let file = e.target.files[0];
      let filesize = file.size;
      let filename = file.name;
      this.Icon = filename;
      // 2,621,440   2M
      if (filesize > 2101440) {
        // 图片大于2MB
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        this.imgcodes = imgcode;
      };
    },
    handleSelectMdData() {}
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

<template>
  <div class="">
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
            @onChange="handleSwitchSys"
          ></SysNameList>
        </el-form-item>
        <el-form-item label="上级菜单">
          <!-- <el-input></el-input> -->
          <OverMenu
            :value="menuValue"
            @onChange="handleSwitchMenu"
          ></OverMenu>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio
            label="0"
            v-model="mdInfo.Type"
          >目录</el-radio>
          <el-radio
            label="1"
            v-model="mdInfo.Type"
          >菜单</el-radio>
          <el-radio
            label="2"
            v-model="mdInfo.Type"
          >按钮</el-radio>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="mdInfo.Name"></el-input>
        </el-form-item>
        <el-form-item label="菜单链接">
          <el-input v-model="mdInfo.Url"></el-input>
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input
            id="sort-input"
            v-model="mdInfo.Sort"
          ></el-input>
          <div class="sort">
            <i
              class="over"
              @click="handleAddNum"
            ></i>
            <i
              class="up"
              @click="handleReduceNum"
            ></i>
          </div>
        </el-form-item>
        <el-form-item label="图标">
          <el-input
            v-model="mdInfo.Icon"
            style="width:calc(100% - 75px)"
          ></el-input>
          <el-upload
            class="upload-demo fr"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            action="#"
          >
            <a
              href="javascript:void(0);"
              @click="handleupload"
            >点击上传</a>
          </el-upload>
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
import SysNameList from "@/components/SysNameList";
import OverMenu from "@/components/module/OverMenu";

export default {
  name: "",
  components: {
    SysNameList,
    OverMenu
  },
  data () {
    return {
      system: "",
      menuValue: "",
      numValue: 1
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
    }
  },
  computed: {
    temNum () {
      return this.numValue;
    }
  },
  created () {
  },
  methods: {
    handleAddNum () {
      if (this.temNum < 10) {
        this.numValue = this.temNum + 1;
      }
    },
    handleReduceNum () {
      if (this.temNum > 1) {
        this.numValue = this.temNum - 1;
      }
    },
    handlePreview () {},
    handleRemove () {},
    beforeRemove () {},
    handleExceed () {},
    handleSwitchMenu (e) {
      this.menuValue = e;
    },
    handleSwitchSys (e) {
      this.system = e;
    },
    handleClose () {
      this.$emit("closed");
    },
    handleupload () {

    }
  },
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
</style>

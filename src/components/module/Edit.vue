<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
      class="dialogStyle"
    >
      <el-form>
        <el-form-item label="系统名称">
          <SysNameList
            :value="system"
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
          <el-radio>目录</el-radio>
          <el-radio>菜单</el-radio>
          <el-radio>按钮</el-radio>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="菜单链接">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input
            id="sort-input"
            v-model="numValue"
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
          <el-upload
            class="upload-demo"
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
          <el-radio label="0">开启</el-radio>
          <el-radio>禁用</el-radio>
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

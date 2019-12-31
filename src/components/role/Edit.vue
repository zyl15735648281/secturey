<template>
  <div class="">
    <el-dialog
      :title="mode"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="角色名称" class="require">
          <el-input></el-input>
        </el-form-item>
        <SysMenu></SysMenu>
        <el-form-item label="数据权限" class="norequire">
          <!-- <el-input></el-input> -->
          <DataPermission></DataPermission>
          <DpList></DpList>
        </el-form-item>
        <el-form-item label="状态" class="require">
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注" class="norequire">
          <el-input type="textarea" maxlength="500"></el-input>
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
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SysMenu from "@/components/role/SysMenu";
import DataPermission from "@/components/role/DataPermission";
import DpList from "@/components/role/DpList";

export default {
  name: "",
  components: {
    SysMenu,
    DataPermission,
    DpList
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
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit("closed");
    }
  },
};
</script>

<style scope lang="less">
.require {
      display: flex;

      .el-form-item__label {
        letter-spacing : 0.5px;
        text-align-last: justify;
        width          : 110px;
      }

      .el-form-item__content {
        width      : calc(100% - 110px);
        margin-left: 0;
      }
    }
.require::before{
    content    : "*";
    color      : #ff4949;
    width      : 14px;
    height     : 40px;
    line-height: 40px;
}
.norequire{
    display: flex;

      .el-form-item__label {
        letter-spacing : 0.5px;
        text-align-last: justify;
        width          : 110px;
      }

      .el-form-item__content {
        width      : calc(100% - 110px);
        margin-left: 0;
      }

}
.norequire::before{
    content    : " ";
    width      : 14px;
    height     : 40px;
    line-height: 40px;
}
</style>

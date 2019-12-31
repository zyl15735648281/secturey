<template>
  <div class="datapermission">

        <el-select
        v-model="value"
        placeholder="请选择"
        >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
        </el-select>
        <el-input placeholder="请输入名称检索" class="dp-input"></el-input>
        <ul class="de-resource">
            <li>资源名称1</li>
            <li>资源名称2</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: "",
  components: {

  },
  data () {
    return {
      options: [{
        value: "选项1",
        label: "黄金糕"
      }, {
        value: "选项2",
        label: "双皮奶"
      }, {
        value: "选项3",
        label: "蚵仔煎"
      }, {
        value: "选项4",
        label: "龙须面"
      }, {
        value: "选项5",
        label: "北京烤鸭"
      }],
      value: ""
    };
  },
  created () {
  },
  methods: {
  },
};
</script>

<style scope lang="less">
.datapermission{
    width: 48%;
    height: 150px;
    float: left;
    .el-select{
        display: inline-block;
        width: 130px;
        margin-right: 10px;
    }
    .dp-input{
        width: calc(100% - 140px);
    }
    .de-resource{
        width: 100%;
        border: 1px solid #e4e4e4;
        margin-top: 10px;
        height: calc(100% - 50px);
        overflow: auto;
        li{
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            border-bottom: 1px dashed #e4e4e4;
            color: #111;
        }
        li:hover{
            background-color: rgb(236, 107, 106);
            color: white;
        }
    }
}
</style>

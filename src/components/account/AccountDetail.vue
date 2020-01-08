<template>
  <div class="detailDialog">
    <el-dialog
      title="用户详细信息"
      :visible.sync="visible"
      :before-close="handleClose"
      ref="dialog"
    >
      <div class="account-detail">
        <h3>用户详情</h3>
        <ul>
          <li>
            <span>姓名：</span>
            {{detailInfo.Name}}
          </li>
          <li>
            <span>工号：</span>
            {{detailInfo.EmployeeId}}
          </li>
          <li>
            <span>创建人：</span>
            {{detailInfo.CreateUserName}}
          </li>
          <li>
            <span>创建时间：</span>
            {{detailInfo.CreateTime !== undefined ? detailInfo.CreateTime.slice(0,10) : detailInfo.CreateTime}}
          </li>
          <li>
            <span>上次登录时间：</span>
            上次登录
          </li>
        </ul>
      </div>
      <div
        class="membership"
        id="container"
        ref="userCharts"
      >
        <h3>组织关系</h3>
        <ul class="me-list">
          <li>
            <span>科室：</span>
            <div class="place">{{detailInfo.DefaultDepName}}</div>
          </li>
          <span class="role-span">所属角色：</span>
          <div class="get-role">
            <p
              v-for="item in detailInfo.baseUserRoleList"
              :key="item.value"
            >
              <span>{{item.label}}</span>
              <a
                class="fr"
                @click="delRole(item)"
                href="javascript:void(0);"
              >删除</a>
              <a
                class="fr mg-r"
                @click="seeRoleDetail(item)"
                href="javascript:void(0);"
              >角色明细</a></p>
          </div>
          <li>
            <span>所属组：</span>
            <div class="place-group">编码组</div>
          </li>
          <span style="vertical-align: top;">组角色：</span>
          <div
            class="get-role"
            style="width: calc(100% - 56px);"
          >
            <p
              v-for="item in roleList"
              :key="item.value"
            >
              <span>{{item.label}}</span>
              <a
                class="fr"
                @click="delRole(item)"
                href="javascript:void(0);"
              >删除</a>
              <a
                class="fr mg-r"
                @click="seeRoleDetail(item)"
                href="javascript:void(0);"
              >角色明细</a>
            </p>
          </div>
        </ul>

      </div>
      <div class="info">
        <ul>
          <h3>个人信息</h3>
          <li class="mg-b">
            <span>手机号：</span>
            <div class="">{{detailInfo.Mobile}}</div>
          </li>
          <li>
            <span>Email：</span>
            <div style="width: calc(100% - 50px);">{{detailInfo.Email}}</div>
          </li>
        </ul>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">关 闭</el-button>
        <el-button
          @click="handleClose"
          id="confirm"
        >保 存</el-button>
      </span>

    </el-dialog>
    <RoleDetailDailog @userBehavior="handleInfo"></RoleDetailDailog>

    <ChildDialog @userBehavior="handleRelDelRole"></ChildDialog>
  </div>

</template>

<script>
import { roleDataset } from "@/js/dataset";
import RoleDetailDailog from "./RoleDetailDaliog";
import ChildDialog from "@/components/account/ChildDialog";
import { show } from "@/js/dialog";
import echarts from "echarts";

export default {
  name: "",
  components: {
    RoleDetailDailog,
    ChildDialog
  },
  data () {
    return {
      codeGroup: "编码组",
      myChart: null,
      chartData: [],
      chartLink: []
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    roleList () {
      return roleDataset;
    }
  },
  methods: {
    drawLine() {
      this.$nextTick(function() {
        let dom = this.$refs.userCharts;
        this.myChart = echarts.init(dom);
        this.chartData = this.dataEChart();

        let option = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
          },
          series: [
            {
              left: "2%",
              right: "2%",
              top: "8%",
              bottom: "20%",
              symbol: "emptyCircle",
              orient: "vertical",
              expandAndCollapse: true,
              label: {
                position: "top",
                rotate: -90,
                verticalAlign: "middle",
                align: "right",
                fontSize: 9
              },

              leaves: {
                label: {
                  position: "bottom",
                  rotate: -90,
                  verticalAlign: "middle",
                  align: "left"
                }
              },

              animationDurationUpdate: 750,

              layout: "force",
              roam: true,
              itemStyle: {
                normal: {
                  color: "#6495ED"
                },
                // 鼠标放上去有阴影效果
                emphasis: {
                  shadowColor: "#3721db",
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 40,
                },
              },
              // 头像
              // symbol: `image://${imgSrc}`,
              symbolSize: 86,
              type: "tree",
              data: this.chartData
            }
          ]
        };
        this.myChart.setOption(option);
      });
    },
    // 数据集合
    dataEChart() {
      let data = [
        {
          name: "admin",
          symbolSize: 76,
          id: "1",
        },
        {
          name: "病案科-编码组",
          id: "2",
        },
        {
          name: "组角色（技师，医师）",
          id: "3",
        },
        {
          name: "角色（技师）",
          id: "4",
        }
      ];
      return data;
    },
    // 关系数据集合
    linkEChart() {
      let dataLink = [
        { value: "同事", source: "1", target: "2" },
        { value: "同事", source: "1", target: "3" },
        { value: "同事", source: "1", target: "4" },
        { value: "同学", source: "1", target: "5" },
        { value: "同学", source: "1", target: "6" },
        { value: "同学", source: "1", target: "7" },
        { value: "爸爸", source: "1", target: "8" },
      ];
      return dataLink;
    },
    handleClose () {
      this.$emit("closed");
    },
    // 保存明细内容
    handleInfo (type, data) {
      // console.log(data);
    },
    // 查看明细
    seeRoleDetail () {
      show("", {
        type: "alert",
        confirmText: "关闭",
        titleText: "角色详情",
        data: "123"
      }, "roleDetail");
    },
    // 删除角色
    delRole () {
      show("您确定要删除这个角色吗？", {
        type: "confirm",
        cancleText: "取消",
        confirmText: "确定",
        titleText: "删除提示",
        data: "row"
      }, "childDel");
    },
    // 真正的删除角色
    handleRelDelRole (type, data) {
      this.$message({
        type: "success",
        message: "祝贺你，删除成功！,哈哈,傻子，我成功l"
      });
    }
  },
};
</script>

<style scope lang="less">
.detailDialog {
  .el-dialog__body {
    padding: 20px;
    height: 400px;
    overflow: auto;
  }
  .account-detail {
    height: 125px;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      li {
        width: 28%;
        border: 2px solid #e4e4e4;
        margin-right: 10px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        padding: 0 10px;
      }
    }
  }
  .membership {
    height: 260px;
    .me-list {
      height: calc(100% - 35px);
      overflow: auto;
    }
    li {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
    }
    .place {
      display: inline-block;
      width: calc(100% - 68px);
      border: 2px solid #e4e4e4;
      padding: 0 10px;
    }
    .role-span {
      vertical-align: top;
    }
    .get-role {
      display: inline-block;
      width: calc(100% - 70px);
      height: 100px;
      overflow: auto;
      padding: 0 10px;
      border: 2px solid #e4e4e4;
      box-sizing: border-box;
      p {
        text-align: left;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px dashed #e4e4e4;
      }
    }
    .place-group {
      display: inline-block;
      width: calc(100% - 82px);
      border: 2px solid #e4e4e4;
      padding: 0 10px;
    }
  }
  .info {
    li {
      height: 30px;
      line-height: 30px;
      span {
        display: inline-block;
        vertical-align: middle;
        height: 30px;
        line-height: 30px;
        margin-top: -20px;
      }
      div {
        border: 2px solid #e4e4e4;
        display: inline-block;
        width: calc(100% - 56px);
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 10px;
      }
    }
  }
}
</style>

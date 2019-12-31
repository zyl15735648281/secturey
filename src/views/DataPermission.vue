<template>
  <div class="information">
    <ul class="retrieval-header dp-header">
      <li>
        <span>名称：</span>
        <el-input v-model="authorName"></el-input>
      </li>

      <li>
        <State
          :value="status"
          @onChange="handleSwitchStatus"
        ></State>
      </li>
      <li>
        <el-button>查询</el-button>
      </li>
    </ul>
    <div class="info-table">
      <div class="ui-header">
        <h3>已有的数据权限列表</h3>
        <el-button
          class="fr add"
          @click="handleAddDp"
        >新增权限</el-button>
      </div>
      <el-table
        :data="tableData"
        :row-class-name="tabRowClassName"
        style="width: 100%"
        height="calc(100% - 70px)"
        v-loading="loading"
      >
        <el-table-column
          label="名称"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              placement="top"
            >
              <p>点我查看相关角色</p>
              <div
                slot="reference"
                class="name-wrapper"
              >
                <a
                  href="javascript:void(0);"
                  @click="SeeDPRole"
                >{{scope.row.name}}</a>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="类型"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="值"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="name"
          label="状态"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作人"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作时间"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template>
            <a
              href="javascript:void(0);"
              class="mg-r"
              @click="handleEditDp"
            >编辑</a>
            <a
              href="javascript:void(0);"
              @click="handleDelDp"
            >删除</a>

          </template>
        </el-table-column>
      </el-table>
      <Edit
        :mode="mode"
        :visible="dpVisible"
        @closed="handleCloseDp"
      ></Edit>
      <DpRoleDetail
        :visible="dpDetailVisible"
        @closed="handleCloseDpDetail"
      ></DpRoleDetail>
      <Dialog></Dialog>
      <Paging></Paging>

    </div>
  </div>
</template>

<script>
import State from '@/components/State';
import { tableList } from '@/js/dataset';
import Paging from '@/components/Paging';
import Edit from '@/components/dataPermission/Edit';
import { show } from '@/js/dialog';
import Dialog from '@/components/Dialog';
import DpRoleDetail from '@/components/dataPermission/DpRoleDetail';

export default {
  name: 'account',
  components: {
    State,
    Paging,
    Edit,
    Dialog,
    DpRoleDetail
  },
  data () {
    return {
      nameValue: '', // 姓名
      status: '全部', // 状态
      loading: false,
      authorName: '', // 权限名称
      dpVisible: false,
      mode: '',
      dpDetailVisible: false
    };
  },
  computed: {
    tableData () {
      return tableList;
    }
  },
  methods: {
    // 新增数据权限
    handleAddDp () {
      this.dpVisible = true;
      this.mode = '新增数据权限';
    },
    // 编辑数据权限
    handleEditDp () {
      this.dpVisible = true;
      this.mode = '编辑数据权限';
    },
    // 删除数据权限
    handleDelDp () {
      show('您确定要删除这条数据吗？', {
        type: 'confirm',
        cancleText: '取消',
        confirmText: '确定',
        titleText: '删除提示',
        data: ''
      }, 'del');
    },
    // 查看相关角色
    SeeDPRole () {
      this.dpDetailVisible = true;
    },
    handleCloseDp () {
      this.dpVisible = false;
    },
    handleCloseDpDetail () {
      this.dpDetailVisible = false;
    },
    // 切换姓名
    handleSwitchName (e) {
      this.nameValue = e;
    },
    // 切换状态
    handleSwitchStatus (e) {
      this.status = e;
    },
    // 自定义stripe样式
    tabRowClassName ({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 === 0) {
        return 'warning-row';
      }
    },
  },
};
</script>

<style lang="less" scope>
.dp-header {
  li:first-child {
    .el-input {
      width: calc(100% - 50px);
    }
  }
}
</style>

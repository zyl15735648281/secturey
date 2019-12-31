import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'index',
  //   redirect: '/Account'
  // },
  {
    path: '/',
    name: 'account',
    // redirect: '/Account',
    meta: {
      description: '用户管理',
      iconfont: 'iconfont icon-yonghuguanli1'
    },
    component: () => import('@/views/Account')
  },
  {
    path: '/Department',
    name: 'department',
    meta: {
      description: '部门管理',
      iconfont: 'iconfont icon-iconbmgl'
    },
    component: () => import('@/views/Department')
  },
  {
    path: '/Group',
    name: 'group',
    meta: {
      description: '分组管理',
      iconfont: 'iconfont icon-fenzuguanli'
    },
    component: () => import('@/views/Group')
  },
  {
    path: '/Role',
    name: 'role',
    meta: {
      description: '角色管理',
      iconfont: 'iconfont icon-jiaoseguanli1'
    },
    component: () => import('@/views/Role')
  },
  {
    path: '/DataPermission',
    name: 'dataPermission',
    meta: {
      description: '数据权限管理',
      iconfont: 'iconfont icon-shujuquanxianguanli1'
    },
    component: () => import('@/views/DataPermission')
  },
  {
    path: '/Module',
    name: 'module',
    meta: {
      description: '模块管理',
      iconfont: 'iconfont icon-mokuaiguanli-'
    },
    component: () => import('@/views/Module')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

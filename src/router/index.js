import Vue from "vue";
import VueRouter from "vue-router";
import { oidcGuard } from "@docimax/oidc";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "account",
        // redirect: '/Account',
        meta: {
            description: "用户管理",
            // requireAuth: true,
            iconfont: "iconfont icon-yonghuguanli1"
        },
        component: () =>
            import("@/views/Account")
    },
    {
        path: "/Department",
        name: "department",
        meta: {
            description: "部门管理",
            iconfont: "iconfont icon-iconbmgl"
        },
        component: () =>
            import("@/views/Department")
    },
    {
        path: "/Group",
        name: "group",
        meta: {
            description: "分组管理",
            iconfont: "iconfont icon-fenzuguanli"
        },
        component: () =>
            import("@/views/Group")
    },
    {
        path: "/Role",
        name: "role",
        meta: {
            description: "角色管理",
            iconfont: "iconfont icon-jiaoseguanli1"
        },
        component: () =>
            import("@/views/Role")
    },
    {
        path: "/DataPermission",
        name: "dataPermission",
        meta: {
            description: "数据权限管理",
            iconfont: "iconfont icon-shujuquanxianguanli1"
        },
        component: () =>
            import("@/views/DataPermission")
    },
    {
        path: "/Module",
        name: "module",
        meta: {
            description: "模块管理",
            iconfont: "iconfont icon-mokuaiguanli-"
        },
        component: () =>
            import("@/views/Module")
    },
    {
        path: "/Dictionary",
        name: "dictionary",
        meta: {
            description: "字典管理",
            iconfont: "iconfont icon-zidianguanli"
        },
        component: () =>
            import("@/views/Dictionary")
    },
    {
        path: "/Test",
        name: "test",
        meta: {
            description: "测试管理",
            iconfont: "iconfont icon-mokuaiguanli-"
        },
        component: () =>
            import("@/views/Test")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    try {
        if (to.name === "oidc-callback") {
            next();
        } else {
            oidcGuard(Vue, store, next);
        }
        // 获取当前操作人
        let operinfo = JSON.parse(window.sessionStorage.getItem("@docimax/oidc:userinfo"));
        store.state.userInfo = operinfo;
        // if (operinfo !== null) {
        //     if (from.name === "oidc-callback") {
        //         // 获取操作人的信息
        //         if (operinfo.UserName.trim() !== "admin") {
        //             Vue.prototype.$message({
        //                 type: "waring",
        //                 message: "您没有操作权限"
        //             });
        //             next(false);
        //         } else {
        //             store.state.userInfo = operinfo;
        //             console.log(store.state.userInfo);
        //             next();
        //         }
        //     }
        // } else {
        //     next(false);
        // }
    } catch (error) {
        console.log(error);
    }
});

export default router;
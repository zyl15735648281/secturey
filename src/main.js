import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { oidcInstance } from "@docimax/oidc";
import axios from "axios";
import auth from "./auth";
import "@/style/common.less";
import "@/style/content.less";
import "@/style/animation.less";
import "@/style/dialog.less";
import "@/assets/iconfont/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
// import _ from "lodash";

// 解决因为版本问题造成的路由错误
import Router from "vue-router";

import {
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    Pagination,
    Loading,
    Input,
    Tree,
    Dialog,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    DatePicker,
    Popover,
    Upload,
    Message,
    CheckboxGroup,
    Tabs,
    TabPane
} from "element-ui";

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
};

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(oidcInstance, { oidcConf: auth, router, store });

Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Input);
Vue.use(Tree);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.use(Upload);
Vue.use(CheckboxGroup);
Vue.use(Tabs);
Vue.use(TabPane);

Vue.prototype.$message = Message;
// Vue.prototype._ = _;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
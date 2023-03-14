/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 20:15:33
 * @Description:
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import plugin from "./plugin";
import "@/assets/css/iconfont.css";
import "@/assets/css/global.css";
import "element-plus/dist/index.css";
import "@/assets/scss/common.scss";
createApp(App).use(plugin).use(router).mount("#app");

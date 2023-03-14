/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-16 22:29:21
 * @Description: 第三方插件
 */
import ElementPlus from "element-plus";
import pinia from "./pinia";
import SEODom from "@/components/SEODom/index.vue"
export default {
    install:(app:any)=>{
        app.use(ElementPlus);
        app.use(pinia);
        app.component("SEODom",SEODom);
    }
}
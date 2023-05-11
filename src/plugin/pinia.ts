/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-16 22:32:55
 * @Description: pinia 存储中心
 */
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPluginPersist);
export default pinia;

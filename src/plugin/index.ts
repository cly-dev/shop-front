/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-16 22:29:21
 * @Description: 第三方插件
 */
import ElementPlus from 'element-plus'
import pinia from './pinia'
import SEODom from '@/components/SEODom/index.vue'
import VideoPlayer from 'vue-video-player/src'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
export default {
	install: (app: any) => {
		app.use(ElementPlus)
		app.use(pinia)
		app.component('SEODom', SEODom)
		app.component('VideoPlayer', VideoPlayer)
	},
}

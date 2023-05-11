<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-21 22:59:17
 * @Description: 首页
-->
<template>
	<section class="pageContainer">
		<div class="shopPage">
			<HomeHeader></HomeHeader>
			<div class="pageMainer">
				<router-view></router-view>
			</div>
			<el-footer>
				<HomeFooter></HomeFooter>
			</el-footer>
		</div>
		<aside class="pageAside">
			<div class="AsideItem" @click="() => handleClick('liveChat')">
				<div>
					<el-icon class="icon"><Service /></el-icon>
				</div>
				<span class="text">官方客服</span>
			</div>
			<div class="AsideItem">
				<div>
					<el-icon class="icon"><Present /></el-icon>
				</div>
				<!-- TODO:活动弹窗 -->
				<span class="text">活动</span>
			</div>
			<div class="AsideItem">
				<div>
					<el-icon class="icon"><EditPen /></el-icon>
				</div>
				<span class="text">反馈</span>
			</div>
			<div class="AsideItem">
				<div>
					<el-icon class="upIcon"><Download /></el-icon>
				</div>
				<span class="text">回顶部</span>
			</div>
			<el-backtop :bottom="20" :right="15" style="opacity: 0"></el-backtop>
		</aside>
	</section>
	<LiveChat ref="liveChatRef"></LiveChat>
</template>

<script setup lang="ts">
import {Service, EditPen, Download, Present} from '@element-plus/icons-vue'
import {ref} from 'vue'
import HomeHeader from './components/HomeHeader/index.vue'
import HomeFooter from './components/HomeFooter/index.vue'
import LiveChat from './components/LiveChat/index.vue'

const liveChatRef = ref<any>(null)

const handleClick = (type: 'liveChat') => {
	switch (type) {
		case 'liveChat': {
			liveChatRef.value.openModal()
		}
		// case:''{}
		default:
			return
	}
}
</script>

<style lang="scss" scoped>
.pageContainer {
	width: 100%;
	position: relative;
}
.shopPage {
	box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: #fafafa;
}
.pageMainer {
	max-width: 1060px;
	margin-top: 80px;
	padding-top: 20px;
	margin-left: 30px;
	margin-right: 30px;
}
.pageAside {
	border: 1px solid rgb(243, 240, 240);
	position: fixed;
	right: 0;
	width: 60px;
	bottom: 50%;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	transform: translateY(50%);
	z-index: 999;
	background-color: #f7f9fa;
	padding: 0px 5px 20px 5px;
	.AsideItem {
		margin-top: 20px;
		cursor: pointer;
		.icon {
			font-size: 20px;
		}
		.text {
			font-size: 12px;
			position: relative;
		}
		.upIcon {
			font-size: 20px;
			transform: rotate(180deg);
		}
	}
}
</style>

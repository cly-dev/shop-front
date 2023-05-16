<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-09 01:29:38
 * @Description: 面包屑
-->
<template>
	<nav>
		<RouterLink to="/home" class="navItem">
			首页
			<el-icon class="icon"><ArrowRight /></el-icon>
		</RouterLink>
		<RouterLink
			v-for="(item, index) in props.navList"
			:key="item.title"
			:to="item.href"
			:class="`navItem ${item.disabled && 'disabled'}`"
		>
			{{ item.title }}
			<el-icon class="icon" v-show="index !== props.navList?.length - 1"><ArrowRight /></el-icon>
		</RouterLink>
	</nav>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue'
import {ArrowRight} from '@element-plus/icons-vue'
type Props = {
	navList: Array<{title: string; href: string; disabled?: boolean}>
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	padding: 0;
	margin-bottom: 20px;
	align-items: center;
	color: #666;
	font-size: 13px;
	.navItem {
		display: flex;
		align-items: center;
		&:nth-child(n + 2) {
			margin-left: 5px;
		}
		.icon {
			font-size: 15px;
			margin-left: 3px;
		}
	}
	a {
		color: #666;
		font-weight: 400;
	}
}
.disabled {
	cursor: not-allowed;
	color: #262626;
}
</style>

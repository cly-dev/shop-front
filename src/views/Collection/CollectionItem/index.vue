<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 01:08:26
 * @Description: 
-->
<template>
	<div class="categoryItem">
		<RouterLink :to="`/category/${info._id}`">
			<div class="itemInfo">
				<img :src="info?.iconUrl ?? '@/assets/img/icon/1.jpg'" alt="icon" class="infoIcon" />
				<span class="infoName">
					{{ info.categoryTitle }}
				</span>
				<el-icon class="rightIcon"><ArrowRight /></el-icon>
			</div>
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue'
import {ArrowRight} from '@element-plus/icons-vue'
type Props = {
	info: any
}
const props = withDefaults(defineProps<Props>(), {})
const {info} = props
</script>

<style lang="scss" scoped>
.categoryItem {
	width: 100%;
	height: 80px;
	display: inline-block;
	border-radius: 10px;
	box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	background-color: #e4e4e4;
	cursor: pointer;
	&:nth-child(even) {
		margin-left: 16px;
	}
	&:hover {
		.infoIcon {
			transition: all ease 0.2s;
			transform: scale(1.1, 1.1);
		}
	}
	.itemInfo {
		margin: 0 10px;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.infoName {
		margin-left: 10px;
		font-size: 18px;
		font-family: $SC;
		flex: 1;
		max-width: 80%;
		word-wrap: break-word;
		word-break: break-all;
		text-align: left;
		@include moreEllipsis(2);
	}
	.infoIcon {
		width: 70px;
		height: calc(100% - 20px);
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	.rightIcon {
		font-size: 20px;
		color: red;
	}
}
</style>

<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-18 14:49:39
 * @Description: 服务卡牌
-->
<template>
	<div class="tipsList">
		<div v-for="item in props.list" class="tipsItem">
			<span :class="`iconfont ${TypeMap[item].font}`" :title="TypeMap[item].text"></span>
		</div>
	</div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue'
type T = 'freightInspection' | 'priceEnsure' | 'allergyTurn' | 'freightFree' | 'notReason'
type Props = {
	list?: Array<T>
}

const props = withDefaults(defineProps<Props>(), {
	list: () => ['freightFree', 'priceEnsure', 'allergyTurn', 'freightInspection', 'notReason'],
})
const TypeMap: Record<T, {text: string; font: string}> = {
	freightInspection: {
		text: '赠运费险',
		font: 'icon-tianmao-zengyunfeixian',
	},
	freightFree: {
		text: '包邮',
		font: 'icon-baoyou',
	},
	priceEnsure: {
		text: '15天价保',
		font: 'icon-jinqian',
	},
	allergyTurn: {
		text: '过敏包退',
		font: 'icon-guomin',
	},
	notReason: {
		text: '七天无理由',
		font: 'icon-qitianwuliyoutuihuo',
	},
}
</script>

<style lang="scss" scoped>
.tipsList {
	display: flex;
	.tipsItem {
		color: #ff5000;
		background: #ffffff;
		width: max-content;
		cursor: pointer;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		.iconfont {
			&::before {
				font-size: 25px;
			}
		}
		&:not(&:last-child) {
			margin-right: 5px;
		}
	}
}
</style>

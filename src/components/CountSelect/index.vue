<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-18 23:09:50
 * @Description: 数量输入按钮
-->
<template>
	<div class="quantityContent">
		<div :class="`minusIcon ${count === 1 && 'btnDisabled'}`" @click="() => handleChange('pre')">
			<el-icon><Minus /></el-icon>
		</div>
		<el-select v-model="count" style="height: 100%" class="quantitySelect" :disabled="!props.qty">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
		<div :class="`plusIcon ${count === qty && 'btnDisabled'}`" @click="() => handleChange('next')">
			<el-icon><Plus /></el-icon>
		</div>
		<!-- TODO: 库存状态标识 -->
		<div class="totalStatus" v-show="showTips">有货</div>
	</div>
</template>

<script setup lang="ts">
import {Plus, Minus} from '@element-plus/icons-vue'

import {defineProps, withDefaults, defineEmits, computed, ref, watch} from 'vue'
type Props = {
	//数量
	qty: number
	//数量
	modelValue: number
	//显示数量
	showTips?: boolean
}
const options = computed(() => {
	let i = 0
	const options = []
	if (props.qty) {
		while (i++ < props.qty) {
			options.push({
				label: i,
				value: i,
			})
		}
	}
	return options
})
const props = withDefaults(defineProps<Props>(), {
	showTips: true,
})
const emit = defineEmits(['update:modelValue'])
const count = ref<number>(1)
watch(
	() => count.value,
	(newV: number) => {
		emit('update:modelValue', newV)
	},
)
function handleChange(type: 'next' | 'pre') {
	if (type === 'next' && count.value + 1 <= props.qty) {
		count.value += 1
	}
	if (type === 'pre' && count.value - 1 >= 1) {
		count.value -= 1
	}
}
</script>

<style lang="scss" scoped>
.quantityContent {
	display: flex;
	align-items: center;
	margin-left: 5px;
	.plusIcon,
	.minusIcon {
		cursor: pointer;
		width: 40px;
		height: 40px;
		text-align: center;
		border: 1px solid #e5e5e5;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.06);
		font-size: 16px;
		font-weight: 800;
	}
	.quantitySelect {
		margin: 0 5px;
		width: 50px;
		height: 40px;
	}
	.btnDisabled {
		color: rgb(214, 214, 214);
		cursor: not-allowed;
	}
	::v-deep(.el-select .el-input) {
		height: 42px;
		padding: 0px;
		text-align: center;
	}
	::v-deep(.el-select .el-input__inner) {
		position: relative;
		text-align: center;
		font-size: 14px;
		font-family: $SC;
		font-weight: 900;
	}
	::v-deep(.el-input__wrapper) {
		padding: 1px 11px;
	}
	::v-deep {
		.el-input__suffix {
			display: none;
		}
	}
}
.totalStatus {
	margin-left: 20px;
	color: $SuccessColor;
	font-size: 13px;
}
</style>

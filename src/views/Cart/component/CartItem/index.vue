<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-18 14:20:11
 * @Description: 购物车条目
-->
<template>
	<div class="cartItems">
		<el-row class="listField">
			<el-col :span="10">
				<div class="field-title">
					<img :src="itemData.imageUrl" />
					<div class="productInfo">
						<h1>{{ itemData.productTitle }}</h1>
						<div class="tips">
							<ProductTips :list="getList(itemData)"></ProductTips>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="field-price">¥ {{ itemData.discountPrice?.toFixed(2) }}</div>
			</el-col>
			<el-col :span="4">
				<div class="field-count">
					<CountSelect v-model="count" :show-tips="false" :qty="itemData.total" :status="itemData.status"></CountSelect>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="field-totalPrice">¥ {{ ((itemData.discountPrice as number) * count).toFixed(2) }}</div>
			</el-col>
			<el-col :span="2">
				<div class="field-operate">
					<el-popconfirm title="确定删除该件商品?" confirm-button-text="确认" cancel-button-text="取消" width="200">
						<template #reference>
							<el-button type="danger" link>删除</el-button>
						</template>
					</el-popconfirm>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import {ref, withDefaults, defineProps, defineEmits, watch} from 'vue'
import ProductTips from '@/components/ProductTips/index.vue'
import CountSelect from '@/components/CountSelect/index.vue'

type Props = {
	itemData: ProductType.ItemType & {total: number}
	count: number
	qty: number
}
const emit = defineEmits(['update:count'])
const props = withDefaults(defineProps<Props>(), {
	count: 1,
})
const count = ref<number>(props.count)
const getList = (itemData: any) => {
	const arr = ['freightFree', 'priceEnsure', 'allergyTurn', 'freightInspection', 'notReason']
	Object.keys(itemData).forEach((item: any) => {
		const serveList = []
		if (arr.includes(item)) {
			serveList.push(item)
		}
		return serveList
	})
}
watch(
	() => count.value,
	(newV: number) => {
		emit('update:count', newV)
	},
)
</script>

<style lang="scss" scoped>
.cartItems {
	[class^='field'] {
		text-align: left;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.field-title {
		display: flex;
		align-items: flex-start;
		height: 100px;
		img {
			width: 100px;
			height: 100px;
			margin-right: 15px;
		}
		.productInfo {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			h1 {
				line-height: 16px;
				font-size: 14px;
			}
			.tips {
				height: 30px;
				display: flex;
				align-items: center;
			}
		}
	}
	.field-price,
	.field-totalPrice {
		color: $ThemeColor;
		font-weight: 900;
		font-size: 16px;
		user-select: none;
	}
}
</style>

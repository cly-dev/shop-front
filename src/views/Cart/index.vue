<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-17 22:15:24
 * @Description:购物车
-->
<template>
	<div class="shopCart">
		<BreadCrumbs :nav-list="[{title: '购物车', disabled: true, href: '/cart'}]"></BreadCrumbs>
		<div class="cartContainer">
			<div class="cartHeader">
				<h2>购物车 (全部{{ total }}个)</h2>
				<div class="cartOperate">
					<span>已选商品（不含运费)</span>
					<span class="price">¥ {{ totalCost }}</span>
					<button :class="`btn ${checkList.length === 0 && 'disabled'}`" :disabled="checkList.length">结算</button>
				</div>
			</div>
			<div class="cartMainer">
				<el-row class="listField">
					<el-col :span="4">
						<div class="field-checkBox">
							<el-checkbox label="全选" v-model="isAll"></el-checkbox>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="field-title">商品信息</div>
					</el-col>
					<el-col :span="4">
						<div class="field-price">单价</div>
					</el-col>
					<el-col :span="4">
						<div class="field-count">数量</div>
					</el-col>
					<el-col :span="4">
						<div class="field-count">金额</div>
					</el-col>
					<el-col :span="2">
						<div class="field-operate">操作</div>
					</el-col>
				</el-row>
				<div>
					<el-checkbox-group class="cartItemsList" v-model="checkList">
						<div v-for="item in itemList" :key="item.id">
							<el-checkbox :value="item.id" class="cartItem" :label="item.id">&nbsp;</el-checkbox>
							<CartItem :qty="item.qty" v-model:count="item.count" :item-data="item"></CartItem>
						</div>
					</el-checkbox-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/components/BreadCrumbs/index.vue'
import CartItem from './component/CartItem/index.vue'
import {computed, reactive, ref, watch} from 'vue'

import Img1 from '@/assets/img/1/1.jpg'
import Img2 from '@/assets/img/1/2.jpg'

const total = ref<number>(2)
const isAll = ref<boolean>(false)
const checkList = ref<any>([])

const itemList = reactive<Array<ProductType.ItemType & {count: number; qty: number}>>([
	{
		id: '1',
		title: '24h内顺丰发货 38礼物TF电光樱桃限定礼盒 口红套装新色',
		count: 1,
		imageUrl: Img1,
		discountPrice: 23.0,
		qty: 12,
	},
	{
		id: '2',
		title: '24h内顺丰发货 38礼物TF电光樱桃限定礼盒 口红套装新色',
		count: 1,
		imageUrl: Img2,
		discountPrice: 23.0,
		qty: 12,
	},
])
const totalCost = computed(() => {
	return itemList
		.reduce((pre: number, item: any) => {
			console.log(checkList.value.includes(item))
			if (checkList.value.includes(item.id)) {
				console.log(item)
				return pre + item.count * item.discountPrice
			}
			return pre
		}, 0)
		.toFixed(2)
})
watch(
	() => isAll.value,
	(newV: boolean) => {
		console.log(newV)
		if (newV) {
			checkList.value = itemList.map((item: any) => item.id)
		}
	},
)
</script>

<style lang="scss" scoped>
.shopCart {
	width: 100%;
	overflow: hidden;
	// margin: 0 60px;
	.cartContainer {
		background-color: white;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		height: 800px;
	}
	.cartHeader {
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		border-bottom: 1px solid #dfdfdf;
		h2 {
			font: 18px tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
			font-weight: 900;
		}
		.cartOperate {
			font-size: 14px;
			display: flex;
			align-items: center;
			.price {
				margin-left: 15px;
				font-weight: 800;
				color: $ThemeColor;
				font-size: 20px;
			}
			.btn {
				margin-left: 15px;
				border: none;
				padding: 10px;
				background-color: $ThemeColor;
				width: 74px;
				color: white;
				border-radius: 21px;
				cursor: pointer;
				transition: all ease 0.3s;
			}
			.disabled {
				background-color: #aaa;
				cursor: not-allowed;
			}
		}
	}
	.cartMainer {
		padding: 10px 40px;

		[class^='field'] {
			color: #606266;
			font-family: Avenir, Helvetica, Arial, sans-serif;
			font-size: 15px;
			height: 30px;
			line-height: 30px;
			text-align: center;
		}
		.field-checkBox {
			text-align: left;
		}
	}
	.cartItemsList {
		margin-top: 10px;
		width: 100%;
		.cartItem {
			// height: 80px;
			text-align: left;
			width: 100%;
		}
	}
}
</style>

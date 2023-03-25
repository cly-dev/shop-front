<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 23:21:15
 * @Description: 商品详情
-->
<template>
	<SEODom></SEODom>
	<div class="shop-product">
		<BreadCrumbs :nav-list="[{title: '商品详情', href: '/', disabled: true}]"></BreadCrumbs>
		<div class="productHeader">
			<el-row :gutter="24">
				<el-col :span="12">
					<!-- 商品媒体信息 -->
					<ProductImage></ProductImage>
				</el-col>
				<el-col :span="12">
					<div class="productInfo">
						<!-- 商品标题 -->
						<h1 class="infoTitle">
							<span class="tips">惠</span>
							24h内顺丰发货 38礼物TF电光樱桃限定礼盒 口红套装新色
						</h1>
						<!-- 商品价格 -->
						<div class="infoDiscount">
							<div class="label">价格</div>
							<div class="discount">¥ 124.00</div>
							<div class="originPrice">¥ 120.00</div>
							<div class="total">
								<span class="num">20</span>
								<span>月销量</span>
							</div>
						</div>
						<!-- 信息 -->
						<h2 class="infoItemId">
							<span class="label">序列号:</span>
							<span class="itemId text">1435312315123252</span>
							<el-icon class="btnCopy"><CopyDocument @click="() => copyAction('1435312315123252')" /></el-icon>
						</h2>
						<!-- 配送 -->
						<div class="infoDelivery">
							<span class="label">配送:</span>
							<div class="deliveryInfo text">
								<div class="adressContent">浙江宁波 至 福建福州</div>
								<div>快递:免运费</div>
								<div class="time">现在下单预计天3天后送达</div>
							</div>
						</div>
						<!-- 颜色 -->
						<div class="infoColor">
							<div class="label">颜色:</div>
							<div class="color">大春红</div>
						</div>
						<!-- 选择数量  -->
						<div class="infoQuantity">
							<span class="label">数量:</span>
							<!--TODO:加减逻辑 -->
							<CountSelect :qty="66" v-model="count" show-tips></CountSelect>
						</div>
						<!-- 购买和加购 -->
						<!-- TODO:加购和购买逻辑 -->
						<div class="infoPay">
							<button class="btnBuyNow">立即购买</button>
							<button class="btnBuyAddCart">
								<el-icon class="cartIcon"><ShoppingTrolley /></el-icon>
								加入购物车
							</button>
						</div>
						<!-- 服务承诺 -->
						<div class="infoService">
							<div class="label">承诺:</div>
							<ul class="serviceList">
								<li class="serviceItem">七天无理由</li>
								<li class="serviceItem">运费险</li>
								<li class="serviceItem">过敏包退</li>
							</ul>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="productMainer">
			<h2></h2>
		</div>
	</div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import ProductImage from './compoents/ProductImage/index.vue'
import {CopyDocument, Plus, Minus, ShoppingTrolley} from '@element-plus/icons-vue'
import {copyAction} from '@/untils/common'
import CountSelect from '@/components/CountSelect/index.vue'
import BreadCrumbs from '@/components/BreadCrumbs/index.vue'
import MyMap from '@/untils/map'

const productInfo = reactive<any>({
	qty: 66,
})

const count = ref<number>(1)
const options = getOptions()

function getOptions() {
	let i = 0
	const options = []
	while (i++ < productInfo.qty) {
		options.push({
			label: i,
			value: i,
		})
	}
	return options
}

onMounted(() => {
	MyMap.init().then(
		(BMap: any) => {
			new BMap.Geolocation().getCurrentPosition((position: any) => {
				if (position.accuracy) {
					//用户允许的操作，position里面有城市，省份，经纬度等信息
					console.log(position)
				}
			})
		},
		err => {
			console.log(err)
		},
	)
})
</script>

<style lang="scss" scoped>
.shop-product {
	height: 1000px;
	.productHeader {
		border-radius: 5px;
		padding: 20px 40px;
		background-color: white;
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
		.productInfo {
			text-align: left;
			.infoTitle {
				font-size: 20px;
				font-weight: 900;
				font-family: $SC;
				@include moreEllipsis(2);
				display: flex;
				align-items: center;
				.tips {
					font-size: 12px;
					border: 1px solid red;
					margin-right: 5px;
					width: 15px;
					height: 15px;
					text-align: center;
					border-radius: 5px;
					color: #f40;
				}
			}
			.infoDiscount {
				background-color: #fff2e8;
				display: flex;
				height: 40px;
				font-size: 13px;
				margin-top: 20px;
				padding: 10px 0 20px 10px;
				align-items: center;
				color: #666;
				position: relative;
				border-radius: 5px;
				margin-left: -5px;
				.discount {
					position: relative;
					top: -2px;
					vertical-align: middle;
					padding-right: 5px;
					font-size: 24px;
					font-weight: 700;
					font-family: Tahoma, Arial, Helvetica, sans-serif;
					color: #f40;
				}
				.originPrice {
					text-decoration: line-through;
					margin-left: 10px;
					font-size: 18px;
					font-family: $SS;
					color: #bebebe;
				}
				.total {
					position: absolute;
					right: 10px;
					top: 50%;
					transform: translate(0%, -50%);
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 14px;
					font-weight: 600;
					font-family: $SC;
					.num {
						font-size: 20px;
					}
				}
			}

			.infoItemId {
				color: #666;
				font-size: 13px;
				margin-top: 20px;
				font-family: $SS;
				display: flex;
				align-items: center;
				.itemId {
					margin-left: 5px;
					text-decoration: underline;
				}
				.btnCopy {
					cursor: pointer;
					margin-left: 5px;
				}
			}
		}

		.infoDelivery {
			font-size: 13px;
			margin-top: 20px;
			display: flex;
			align-items: flex-start;
			.deliveryInfo {
				margin-left: 5px;
				div {
					margin-bottom: 5px;
				}
			}
		}
		.infoColor {
			margin-top: 15px;
			display: flex;
			align-items: center;
			.color {
				font-family: $SS;
				font-size: 14px;
				font-weight: 900;
				margin-left: 5px;
			}
		}
		.infoQuantity {
			margin-top: 20px;
			display: flex;
			align-items: center;
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
		}
		.infoPay {
			margin-top: 20px;
			display: flex;
			button {
				border: none;
				border: 1px solid;
				padding: 10px 20px;
				font-size: 16px;
				width: 150px;
				font-family: 'Hiragino Sans GB', 'microsoft yahei', sans-serif;
				border-radius: 2px;
				cursor: pointer;
				transition: all ease 0.2s;
			}
			.btnBuyNow {
				color: #e5511d;
				border-color: #f0cab6;
				background: #ffe4d0;
				margin-right: 20px;
				&:hover {
					background: #ffddc2;
				}
			}
			.btnBuyAddCart {
				width: 200px;
				width: 180px;
				color: #fff;
				border-color: #f40;
				background: #f40;
				display: flex;
				align-items: center;
				justify-content: center;
				&:hover {
					background: rgb(249, 85, 25);
				}
			}
			.cartIcon {
				font-size: 20px;
				margin-right: 10px;
			}
		}
		.infoService {
			display: flex;
			margin-top: 30px;
			align-items: center;
			.serviceList {
				display: flex;
			}
			.serviceItem {
				font-size: 13px;
				margin-right: 10px;
				border: 1px solid red;
				padding: 5px;
				border-radius: 5px;
				color: #f40;
			}
		}
	}
	.productMainer {
		margin-top: 30px;
		border-radius: 5px;
		padding: 20px 40px;
		background-color: white;
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
	}
}
.label {
	color: #7f7f7f;
	width: 60px;
	font-size: 14px;
}
.text {
	font-weight: 600;
	font-size: 14px;
	font-family: $SC;
}
</style>

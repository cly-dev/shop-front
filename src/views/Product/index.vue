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
					<ProductImage
						:vedio-src="productInfo.videoSrc"
						:media-list="[productInfo.imageUrl, ...(productInfo?.mediaList ?? [])]"
					></ProductImage>
				</el-col>
				<el-col :span="12">
					<div class="productInfo">
						<!-- 商品标题 -->
						<h1 class="infoTitle">
							<span class="tips" v-if="productInfo?.discountPrice < productInfo?.originPrice">惠</span>
							{{ productInfo.productTitle }}
						</h1>
						<!-- 商品价格 -->
						<div class="infoDiscount">
							<div class="label">价格</div>
							<div class="discount">¥ {{ productInfo?.discountPrice?.toFixed(2) }}</div>
							<div class="originPrice">¥ {{ productInfo?.originPrice?.toFixed(2) }}</div>
							<div class="total">
								<span class="num">0</span>
								<span>月销量</span>
							</div>
						</div>
						<!-- 信息 -->
						<h2 class="infoItemId">
							<span class="label">序列号:</span>
							<span class="itemId text">{{ productInfo._id }}</span>
							<el-icon class="btnCopy"><CopyDocument @click="() => copyAction('1435312315123252')" /></el-icon>
						</h2>
						<!-- 配送 -->
						<div class="infoDelivery">
							<span class="label">配送:</span>
							<div class="deliveryInfo text">
								<div class="adressContent">{{ productInfo?.address?.join('') }} 至 福建福州</div>
								<div>
									快递: {{ productInfo.freightFree || productInfo.freight === 0 ? '免运费' : '¥ ' + productInfo.freight }}
								</div>
								<div class="time">现在下单预计天3天后送达</div>
							</div>
						</div>
						<!-- 颜色 -->
						<div class="infoColor">
							<div class="label">颜色:</div>
							<div class="color">{{ productInfo.color }}</div>
						</div>
						<!-- 选择数量  -->
						<div class="infoQuantity">
							<span class="label">数量:</span>
							<!--TODO:加减逻辑 -->
							<CountSelect :status="productInfo?.status" :qty="productInfo?.total" v-model="count" show-tips></CountSelect>
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
						<div
							class="infoService"
							v-if="
								productInfo.notReason &&
								productInfo.freightInspection &&
								productInfo.priceEnsure &&
								productInfo.freightInspection
							"
						>
							<div class="label">承诺:</div>
							<ul class="serviceList">
								<li class="serviceItem" v-show="productInfo.notReason">七天无理由</li>
								<li class="serviceItem" v-show="productInfo.freightInspection">赠运费险</li>
								<li class="serviceItem" v-show="productInfo.priceEnsure">过敏包退</li>
								<li class="serviceItem" v-show="productInfo.freightInspection">15天价保</li>
							</ul>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="productMainer">
			<h2 class="font-bold">详情信息</h2>
			<div class="productField">
				<el-row>
					<el-col :span="6" v-for="item in fieldList" :key="item.label" class="mt-5">
						<span class="font-serif font-bold from-gray-400" style="font-size: 16px">
							{{ item.label }}
						</span>
						:
						<span style="font-size: 14px" class="ml-1 fill-slate-200">{{ item.value }}</span>
					</el-col>
				</el-row>
			</div>
			<article class="mt-5" v-html="productInfo.desc"></article>
		</div>
	</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import ProductImage from './compoents/ProductImage/index.vue'
import {getProductDetail} from '@/api/product'
import {CopyDocument, ShoppingTrolley} from '@element-plus/icons-vue'
import {copyAction} from '@/untils/common'
import CountSelect from '@/components/CountSelect/index.vue'
import BreadCrumbs from '@/components/BreadCrumbs/index.vue'
import MyMap from '@/untils/map'

const productInfo = ref<any>({
	qty: 66,
})
const route = useRoute()
const count = ref<number>(1)
const fieldList = ref<any>([])

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
	getProductDetail(route.params.seoUrl as string).then((data: any) => {
		productInfo.value = data
		const arr: any[] = []
		Object.keys(data).forEach((item: any) => {
			if (['brand', 'address', 'color', 'location'].includes(item) && data[item]) {
				if (item === 'brand') {
					arr.push({label: '品牌', value: data[item]})
				} else if (item === 'color') {
					arr.push({label: '颜色', value: data[item]})
				} else if (item === 'location') {
					arr.push({label: '涂抹位置', value: data[item]})
				} else if (item === 'address') {
					arr.push({label: '产地', value: data[item].join('')})
				}
			}
		})
		fieldList.value = [...arr, ...data.custom]
	})
})
</script>

<style lang="scss" scoped>
.shop-product {
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
				align-items: flex-start;
				.tips {
					font-size: 12px;
					border: 1px solid red;
					margin-right: 5px;
					width: 15px;
					height: 15px;
					line-height: 15px;
					text-align: center;
					border-radius: 5px;
					color: #f40;
					margin-top: 5px;
				}
			}
			.infoDiscount {
				background-color: #fff2e8;
				display: flex;
				height: 70px;
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
		text-align: left;
		h2 {
			font-size: 24px;
		}
		.productField {
			border-bottom: 1px solid rgb(224, 224, 224);
			padding-bottom: 20px;
		}
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

<template>
	<div class="productItemCard">
		<RouterLink :to="`/product/${itemData.seoUrl}`">
			<img class="infoImg" :src="itemData.imageUrl" />
			<div class="infoContent">
				<div class="infoTitle">
					<h3>{{ itemData.productTitle }}</h3>
					<div class="infoTips">
						<span v-show="itemData.freightFree">包邮</span>
						<span v-show="itemData.freightInspection">送运费险</span>
						<span v-show="itemData.allergyTurn">过敏包退</span>
					</div>
				</div>
				<div class="discountPrice">
					<em>¥</em>
					{{ itemData.discountPrice }}
				</div>
			</div>
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue'
type Props = {
	itemData: Pick<
		ProductType.ItemType,
		'id' | 'productTitle' | 'imageUrl' | 'discountPrice' | 'allergyTurn' | 'freightInspection' | 'freightFree' | 'seoUrl'
	>
}
const {itemData} = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped>
.productItemCard {
	height: 190px;
	border-radius: 10px;
	color: #333;
	background-color: white;
	border: 1px solid #f7f9fa;
	cursor: pointer;
	transition: all ease 0.3s;
	box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 10%);
	padding: 10px;
	margin-bottom: 20px;
	&:hover {
		border: 1px solid #ff5000;
		transform: translateY(-7px);
		.infoImg {
			opacity: 0.7;
		}
	}

	a {
		display: block;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.infoImg {
		width: 150px;
		height: 150px;
		border: 1px solid rgb(224, 219, 219);
		border-radius: 10px;
	}
	.infoContent {
		height: 100%;
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		h3 {
			font-size: 16px;
			text-align: left;
			@include moreEllipsis(2);
		}
		.infoTitle {
			padding: 10px 0;
			text-align: left;
			span {
				color: #ff5000;
				background: #ffffff;
				font-size: 12px;
				padding: 5px;
				border-radius: 5px;
				border: 1px solid #fab596;
				&:not(&:last-child) {
					margin-right: 5px;
				}
			}
			.infoTips {
				margin-top: 10px;
			}
		}
		.discountPrice {
			text-align: left;
			font-size: 18px;
			color: #ff5000;
			font-size: 22px;
			line-height: 22px;
			font-weight: 600;
			em {
				font-size: 16px;
				font-weight: 900;
			}
		}
	}
}
</style>

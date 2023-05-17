<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-06 22:38:25
 * @Description: 
-->
<template>
	<section class="shopHome">
		<div class="banner">
			<swiper
				:height="400"
				:slides-per-view="1"
				:space-between="50"
				:pagination="true"
				:autoplay="true"
				:controller="true"
				:a11y="true"
				:navigation="true"
				:modules="[Navigation, Pagination, Autoplay, Controller, A11y, Manipulation]"
				@swiper="onSwiper"
				@slideChange="onSlideChange"
			>
				<swiper-slide v-for="item in config.banner" :key="item">
					<div class="sildeItem">
						<RouterLink :to="`/product/${item?.itemData?.seoUrl}`">
							<img :src="item?.imageUrl" class="bannerImg" />
						</RouterLink>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<!-- 热门类目 -->
		<div class="mt-7">
			<h2>热门类目</h2>
			<div class="hotCategory">
				<HotCategoryItem v-for="item in config?.hotCategory" :key="item?._id" :info="item.itemData"></HotCategoryItem>
				<HotCategoryItem v-for="item in config?.hotCategory" :key="item?._id" :info="item.itemData"></HotCategoryItem>
			</div>
		</div>
		<!-- 类目推荐 -->
		<div class="recommendCategory">
			<h2>类目推荐</h2>
			<div class="mt-7">
				<RecomendCategory v-for="item in config.category" :key="item._id" :info="item.itemData"></RecomendCategory>
			</div>
		</div>
		<!-- 商品推荐 -->
		<div class="recommendProduct">
			<h2>为你推荐</h2>
			<div class="productList">
				<el-row :gutter="24">
					<el-col :span="8" v-for="item in config?.product" :key="item._id">
						<ProductItemCard :item-data="item?.itemData"></ProductItemCard>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {Navigation, Pagination, Autoplay, Controller, A11y, Manipulation} from 'swiper'
import {getConfig} from '@/api/public'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import HotCategoryItem from './component/HotCategoryItem/index.vue'
import RecomendCategory from './component/RecomendCategory/index.vue'
import ProductItemCard from '@/components/ProductItemCard/index.vue'
import Img from '@/assets/img/icon/1.jpg'
const config = ref<any>({
	category: [],
})
const onSwiper = (swiper: any) => {
	console.log(swiper)
}
const onSlideChange = () => {
	console.log('slide change')
}

onMounted(() => {
	getConfig().then(doc => {
		console.log(doc)
		config.value = doc
	})
})
</script>

<style lang="scss" scoped>
.shopHome {
	width: 100%;
}
.banner {
	width: 100%;
	height: 500px;
	border-radius: 5px;
	overflow: hidden;
}
.sildeItem {
	height: 500px;
	.bannerImg {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}
.hotCategory {
	height: 250px;
	margin-top: 30px;
	display: flex;
	flex-wrap: wrap;
}
.recommendCategory {
	margin-top: 30px;
}
.recommendProduct {
	margin: 40px 0;

	.productList {
		margin-top: 30px;
	}
}
h2 {
	font: 20px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53', sans-serif;
	color: #333;
	font-weight: 900;
	position: relative;
	height: 40px;
	line-height: 40px;
	width: 250px;
	margin: 0 auto;
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		background-image: url('../../assets/img/icon.png');
		display: block;
		width: 50px;
		height: 20px;
		right: 0px;
		background-size: contain;
		background-repeat: no-repeat;
	}
	&::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		background-image: url('../../assets/img/icon.png');
		display: block;
		width: 50px;
		height: 20px;
		background-size: contain;
		background-repeat: no-repeat;
		left: 0px;
	}
}
</style>

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
				:navigation="true"
				:modules="[Navigation, Pagination]"
				@swiper="onSwiper"
				@slideChange="onSlideChange"
			>
				<swiper-slide v-for="item in ImgList" :key="item">
					<div class="sildeItem">
						<img :src="item" class="bannerImg" />
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<!-- 热门类目 -->
		<div class="hotCategory">
			<HotCategoryItem v-for="item in categoryList" :key="item.seoUrl" :info="item"></HotCategoryItem>
		</div>
		<!-- 类目推荐 -->
		<div class="recommendCategory">
			<RecomendCategory :list="list"></RecomendCategory>
			<RecomendCategory :list="list"></RecomendCategory>
		</div>
		<!-- 商品推荐 -->
		<div class="recommendProduct">
			<h2>为你推荐</h2>
			<div class="productList">
				<el-row :gutter="24">
					<el-col :span="8">
						<ProductItemCard></ProductItemCard>
					</el-col>
					<el-col :span="8">
						<ProductItemCard></ProductItemCard>
					</el-col>
					<el-col :span="8">
						<ProductItemCard></ProductItemCard>
					</el-col>
					<el-col :span="8">
						<ProductItemCard></ProductItemCard>
					</el-col>
					<el-col :span="8">
						<ProductItemCard></ProductItemCard>
					</el-col>
					<el-col :span="8">
						<ProductItemCard></ProductItemCard>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {Navigation, Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import HotCategoryItem from './component/HotCategoryItem/index.vue'
import RecomendCategory from './component/RecomendCategory/index.vue'
import ProductItemCard from '@/components/ProductItemCard/index.vue'
import Img from '@/assets/img/icon/1.jpg'
import ImgList from '@/assets/img/banner'
import Img1 from '@/assets/img/1/2.jpg'
import Img2 from '@/assets/img/1/3.jpg'
// Import Swiper styles

const categoryList = ref<any[]>([
	{
		title: '口红',
		iconUrl: Img1,
		seoUrl: '1',
	},
	{
		title: '口红',
		iconUrl: Img2,
		seoUrl: '2',
	},
])

const onSwiper = (swiper: any) => {
	console.log(swiper)
}
const onSlideChange = () => {
	console.log('slide change')
}

const list = reactive<Array<CategoryType.CategoryItem>>([
	{
		id: '1',
		iconUrl: Img,
		title: '类目名称',
		seoUrl: '1',
	},
	{
		id: '2',
		iconUrl: Img,
		title: '类目名称',
		seoUrl: '1',
	},
	{
		id: '3',
		iconUrl: Img,
		title: '类目名称',
		seoUrl: '1',
	},
	{
		id: '4',
		iconUrl: Img,
		title: '类目名称',
		seoUrl: '1',
	},
	{
		id: '5',
		iconUrl: Img,
		title: '类目名称',
		seoUrl: '1',
	},
	{
		id: '6',
		iconUrl: Img,
		title: '类目名称',
		seoUrl: '2',
	},
])
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
	height: 350px;
	margin-top: 30px;
	display: flex;
}
.recommendCategory {
	margin-top: 30px;
}
.recommendProduct {
	margin: 40px 0;
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
	.productList {
		margin-top: 30px;
	}
}
</style>

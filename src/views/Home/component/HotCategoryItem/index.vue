<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 00:24:14
 * @Description: 热门类目模块
-->
<template>
	<div class="categoryItem" :style="{backgroundImage: `url(${info.iconUrl})`, backgroundSize: '100% 100%'}">
		<h2>{{ info.categoryTitle }}</h2>
		<button class="btnLink" @click="toLink">查看更多</button>
	</div>
</template>

<script setup lang="ts">
import {withDefaults, defineProps} from 'vue'
import {useRouter} from 'vue-router'

type Props = {
	info: Required<Pick<CategoryType.CategoryItem, 'seoUrl' | 'categoryTitle' | 'iconUrl' | '_id'>>
}
const props = withDefaults(defineProps<Props>(), {})
const router = useRouter()
const {info} = props

const toLink = () => {
	router.push(`/category/${info._id}`)
}
</script>

<style scoped lang="scss">
.categoryItem {
	padding: 10px;
	flex: 1;
	box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	position: relative;
	background-size: 100% 100%;
	&:not(&:first-child) {
		margin-left: 20px;
	}
	h2 {
		text-align: left;
		margin-left: 10px;
		margin-top: 10px;
		font-family: $SS;
		font-weight: 900;
	}
}
.btnLink {
	position: absolute;
	border: none;
	width: 70px;
	font-size: 13px;
	bottom: 10%;
	right: 10%;
	height: 30px;
	border-radius: 10px;
	z-index: 66;
	color: white;
	font-size: $SS;
	padding: 0 5px;
	transition: all ease 0.3s;
	cursor: pointer;
	background: transparent linear-gradient(289deg, #f78b78 0%, #f54c2b 15%, #e23c4a 100%) 0% 0% no-repeat padding-box;
	&:hover {
		background: transparent linear-gradient(289deg, #eb6c56 0%, #f54c2b 15%, #e23c4a 100%) 0% 0% no-repeat padding-box;
		transform: translateY(-3px);
	}
}
</style>

<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 00:24:14
 * @Description: 热门类目模块
-->
<template>
	<div class="categoryItem" :style="{backgroundImage: `url(${info.iconUrl})`, backgroundSize: '100% 100%'}">
		<h2>{{ info.categoryTitle }}</h2>
		<button class="btnLink" @click="toLink">跳转</button>
	</div>
</template>

<script setup lang="ts">
import {withDefaults, defineProps} from 'vue'
import {useRouter} from 'vue-router'

type Props = {
	info: Required<Pick<CategoryType.CategoryItem, 'seoUrl' | 'categoryTitle' | 'iconUrl'>>
}
const props = withDefaults(defineProps<Props>(), {})
const router = useRouter()
const {info} = props

const toLink = () => {
	router.push(`/category/${info.seoUrl}`)
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
		margin-left: 20px;
		margin-top: 20px;
		font-family: $SS;
	}
}
.btnLink {
	position: absolute;
	border: none;
	width: 90px;
	font-size: 20px;
	bottom: 10%;
	right: 10%;
	height: 40px;
	border-radius: 10px;
	z-index: 66;
	color: white;
	font-size: $SS;
	transition: all ease 0.3s;
	cursor: pointer;
	background: transparent linear-gradient(289deg, #f78b78 0%, #f54c2b 15%, #e23c4a 100%) 0% 0% no-repeat padding-box;
	&:hover {
		background: transparent linear-gradient(289deg, #eb6c56 0%, #f54c2b 15%, #e23c4a 100%) 0% 0% no-repeat padding-box;
		transform: translateY(-3px);
	}
}
</style>

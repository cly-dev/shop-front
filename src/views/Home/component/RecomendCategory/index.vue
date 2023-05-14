<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 00:47:58
 * @Description: 类目推荐
-->
<template>
	<div class="recoomendCategory">
		<div class="categoryInfo">
			<img :src="categoryInfo?.iconUrl" alt="" class="bgImg" />
			<h2>{{ categoryInfo?.categoryTitle }}</h2>
			<button class="btnMore" @click="toLink">
				查看更多
				<el-icon><ArrowRight /></el-icon>
			</button>
		</div>
		<div class="subCategotyList">
			<CategoryItem v-for="item in categoryInfo?.list" :key="item.id" :info="item"></CategoryItem>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ArrowRight} from '@element-plus/icons-vue'
import CategoryItem from '../CategoryItem/index.vue'
import {useRouter} from 'vue-router'
import {getDetail} from '@/api/category'
import {defineProps, ref, withDefaults} from 'vue'
const router = useRouter()
type Props = {
	info: any
}
const categoryInfo = ref<any>({
	list: [],
})
// const
const props = withDefaults(defineProps<Props>(), {})
const {info} = props
getDetail(info._id).then((doc: any) => {
	categoryInfo.value = doc[0]
})
const toLink = () => {
	router.push(`/collection/${info._id}`)
}
</script>

<style scoped lang="scss">
.recoomendCategory {
	display: flex;
	height: 400px;
	margin-bottom: 40px;

	.categoryInfo {
		flex: 1;
		border-radius: 10px;
		position: relative;
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
		background-color: white;
		position: relative;
		overflow: hidden;
		.bgImg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		h2 {
			text-align: left;
			margin: 30px;
			font-family: $SS;
			font-size: 23px;
			font-weight: 900;
			z-index: 2;
			position: relative;
		}
		.btnMore {
			font-size: 18px;
			display: flex;
			align-items: center;
			padding: 10px 10px 10px 15px;
			border-radius: 15px;
			color: white;
			cursor: pointer;
			position: absolute;
			bottom: 30px;
			background-image: linear-gradient(to right, #ff5000 0, #ff6000 100%);
			z-index: 66;
			color: white;
			font-size: $SS;
			transition: all ease 0.3s;
			right: 10%;
			width: 120px;
			&:hover {
				transform: translateY(-3px);
			}
		}
	}
	.subCategotyList {
		flex: 1;
		margin-left: 20px;
		border-radius: 10px;
		flex-wrap: wrap;
	}
}
</style>

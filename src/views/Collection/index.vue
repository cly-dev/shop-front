<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-15 22:44:02
 * @Description: 类目集合
-->
<template>
	<section class="shopCollection">
		<BreadCrumbs :nav-list="navList"></BreadCrumbs>
		<div class="collectionMainer">
			<div class="collectiomItems">
				<el-row gutter="20">
					<el-col :span="6" v-for="item in info.list" :key="item.id">
						<CategoryItem :styles="{height: '90px', width: '100%', marginBottom: '20px'}" :info="item"></CategoryItem>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'

import {getDetail} from '@/api/category'
import BreadCrumbs from '@/components/BreadCrumbs/index.vue'
import CategoryItem from './CollectionItem/index.vue'

const route = useRoute()
const info = ref<any>({
	list: [],
})
const navList = ref<any>([])
console.log(route.params)
onMounted(() => {
	getDetail(route.params.seoUrl as string).then((res: any[]) => {
		info.value = res[0]
		navList.value = [{title: info.value?.categoryTitle, href: '/', disabled: true}]
	})
})
</script>

<style lang="scss" scoped>
.shopCollection {
	height: 80vh;
	text-align: left;
	width: 100%;
	min-width: 1050px;
}
.collectionMainer {
	h1 {
		font-size: px2rem(30);
		font-family: $SS;
	}
}
.collectiomItems {
	height: 100%;
}
</style>

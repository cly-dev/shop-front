<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-09 01:03:38
 * @Description: 类目
-->
<template>
	<BreadCrumbs :nav-list="[{title: '搜索结果', href: '/', disabled: true}]"></BreadCrumbs>
	<ProductListLayout
		:filter="itemData.filter"
		:total="itemData.total"
		:item-list="itemList"
		:loading="itemData.loading"
		@search="handleSearch"
	></ProductListLayout>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive, watch} from 'vue'
import {useRoute} from 'vue-router'
import BreadCrumbs from '@/components/BreadCrumbs/index.vue'
import {search} from '@/api/product'
import ProductListLayout from '@/components/ProductListLayout/index.vue'

const route = useRoute()
const itemData = ref<any>({
	total: 0,
	filter: '',
	itemList: [],
	loading: false,
})
const itemList = ref<any>([])

const handleSearch = (v: any) => {
	// itemData.value.filter = {}
	// itemData.value.itemList = []
	itemData.loading = true
	if (route.query?.keyWord) {
		Object.assign(v, {keyword: route.query?.keyWord})
	}
	search(v)
		.then((res: any) => {
			itemData.value.total = res.total
			itemData.value.filter = {...res.filter}
			itemList.value = res.itemList.map((item: any) => ({...item}))
		})
		.finally(() => {
			itemData.loading = false
		})
}
watch(
	() => route.query,
	(newV: any) => {
		handleSearch({page: 1, size: 20, keyword: newV.keywWord})
	},
	{
		immediate: true,
	},
)
</script>

<style scoped></style>

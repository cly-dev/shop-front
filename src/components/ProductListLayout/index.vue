<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-09 20:54:31
 * @Description: 商品列表
-->
<template>
	<div class="productListLayout" v-if="props.total">
		<el-row :gutter="24">
			<el-col :span="8">
				<el-affix :offset="120">
					<!-- 价格筛选器 -->
					<div class="filter-card">
						<el-form :model="filterForm" label-position="top" class="filterForm">
							<el-form-item label="价格">
								<div class="filter-price">
									<el-input-number
										:controls="false"
										:precision="2"
										v-model="priceValue.minPrice"
										:min="0"
										:max="999999"
										placeholder="Min"
										class="filter-input"
									/>
									<span class="spacing">-</span>
									<el-input-number
										:controls="false"
										:precision="2"
										v-model="priceValue.maxPrice"
										:min="0"
										:max="999999"
										placeholder="Max"
										class="filter-input"
									/>
									<span class="btn ml-5" @click="handleSearch">Go</span>
								</div>
							</el-form-item>
							<el-form-item label="颜色">
								<el-checkbox-group v-model="filterForm.color" @change="(v:any) => handleChange('color', v)">
									<el-checkbox
										v-for="item in preType.type === 'color' ? preType.list : filter?.colorList"
										:key="item"
										:label="item"
									>
										<div>
											{{ item }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="品牌">
								<el-checkbox-group v-model="filterForm.brand" @change="(v:any) => handleChange('brand', v)">
									<el-checkbox
										v-for="item in preType.type === 'brand' ? preType.list : filter?.brandList"
										:key="item"
										:label="item"
									>
										<div>
											{{ item }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<!-- <el-form-item label="产地">
								<el-checkbox-group v-model="filterForm.address">
									<el-checkbox v-for="item in filter?.addressList" :key="item" :label="item.join('')">
										<div>
											{{ item.join('') }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item> -->
							<el-form-item label="涂抹位置">
								<el-checkbox-group v-model="filterForm.location" @change="(v:any) => handleChange('location', v)">
									<el-checkbox
										v-for="item in preType.type === 'location' ? preType.list : filter?.locationList"
										:key="item"
										:label="item"
									>
										<div>
											{{ item }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-form>
					</div>
				</el-affix>
			</el-col>
			<el-col :span="16">
				<div class="product-card">
					<div slot="header" class="header">
						<!-- 排序 -->
						<div class="sort">
							<div
								v-for="item in sortMap"
								:key="item.name"
								:class="`sortItem ${filterForm.sort === item.key && 'activer'}`"
								@click="() => handleSortChange(item.key)"
							>
								{{ item.name }}
							</div>

							<!-- <el-dropdown>
								<div :class="`el-dropdown-link ${orderSort && 'activer'}`">
									{{ orderName ? orderName : '销量' }}
									<el-icon class="el-icon--right"><ArrowDown /></el-icon>
								</div>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item
											v-for="item in orderSortMap"
											:key="item"
											@click="() => handleMenuClick('order', item.key)"
										>
											{{ item.name }}
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown> -->
							<el-dropdown>
								<div :class="`el-dropdown-link ${(filterForm.sort == 'max' || filterForm.sort == 'min') && 'activer'}`">
									{{ filterForm.sort == 'max' || filterForm.sort == 'min' ? priceName : '价格' }}
									<el-icon class="el-icon--right"><ArrowDown /></el-icon>
								</div>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item
											v-for="item in priceSortMap"
											:key="item"
											@click="() => handleMenuClick('price', item.key)"
										>
											{{ item.name }}
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
						<div class="page">
							<div class="pageContent">
								<el-icon
									:class="`icon ${filter.page === 1 || props.total < filterForm.size ? 'disabled' : ''}`"
									@click="
										() => {
											filterForm.page += 1
										}
									"
								>
									<ArrowLeft />
								</el-icon>
								<span class="pageBox">1 / {{ Math.ceil(props.total / filterForm.size) }}</span>
								<el-icon
									:class="`icon ${
										filter.page === Math.ceil(props.total / filterForm.size) || props.total < filterForm.size
											? 'disabled'
											: ''
									}`"
									@click="
										() => {
											filterForm.page -= 1
										}
									"
								>
									<ArrowRight />
								</el-icon>
							</div>
							<div class="props.total">共{{ props.total }}条</div>
						</div>
					</div>
					<div class="seriveFilter">
						<el-checkbox-group class="filterContent" v-model="filterForm.service">
							<el-checkbox v-for="value in serviceMap" :key="value.value" :label="value.value">{{ value.label }}</el-checkbox>
						</el-checkbox-group>
					</div>
					<!-- 商品卡片 -->
					<div class="productList" v-loading="props.loading">
						<el-row :gutter="20">
							<el-col :span="6" v-for="item in props.itemList" :key="item._id">
								<ProductItemCard :item-data="item"></ProductItemCard>
							</el-col>
						</el-row>
					</div>
					<!-- 分页 -->
					<div class="pageContainer">
						<el-pagination
							v-model:current-page="filterForm.page"
							v-model:page-size="filterForm.size"
							layout="props.total,prev, pager, next, jumper"
							:total="props.total"
							@current-change="handleCurrentChange"
						/>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
	<div class="emptyContainer" v-else>
		<el-empty description="暂无结果" />
	</div>
</template>

<script setup lang="ts">
import {ArrowDown, ArrowLeft, ArrowRight} from '@element-plus/icons-vue'
import {ref, withDefaults, defineProps, computed, reactive, watch, defineEmits, onMounted} from 'vue'

import Img from '@/assets/img/icon/1.jpg'

import ProductItemCard from './component/ProductItemCard/index.vue'

import {sortMap, priceSortMap, serviceMap} from '@/constant/sort'

type Props = {
	filter: any
	total: number
	itemList: any[]
	loading: boolean
}
const emit = defineEmits(['search'])
const props = withDefaults(defineProps<Props>(), {})
//销量筛选
const orderSort = ref<string>('')
const priceValue = reactive({
	minPrice: '',
	maxPrice: '',
})
const preType = reactive({
	type: '',
	list: [],
})
const filterForm = reactive({
	color: [],
	brand: [],
	address: [],
	location: [],
	page: 1,
	size: 20,
	sort: '',
	service: [],
})
const handleSearch = () => {
	const params = {}
	Object.keys(filterForm).forEach((item: any) => {
		const fieldValue: any = filterForm[item as keyof typeof filterForm]
		if (fieldValue) {
			Object.assign(params, {[item]: fieldValue})
			Object.assign(params)
			if (['color', 'brand', 'address', 'location', 'address'].includes(item) && fieldValue.length > 0) {
				Object.assign(params, {[item]: (fieldValue as any[]).join(',')})
			}
			if (item === 'service') {
				fieldValue.forEach((item: any) => {
					Object.assign(item, {item: true})
				})
			}
		}
	})
	if (priceValue.maxPrice) {
		Object.assign(params, {maxPrice: priceValue.maxPrice})
	}
	if (priceValue.minPrice) {
		Object.assign(params, {minPrice: priceValue.minPrice})
	}
	emit('search', params)
}
const handleChange = (type: any, v: any) => {
	console.log(type)
	console.log('-=----------------')
	if (v.length !== 0 && (!preType.type || preType.type === type)) {
		preType.type = type
		if (type === 'color' && preType.list.length < props.filter.colorList.length) {
			preType.list = props.filter.colorList
		} else if (type === 'brand' && preType.list.length < props.filter.brandList.length) {
			preType.list = props.filter.brandList
		} else if (type === 'location' && preType.list.length < props.filter.locationList.length) {
			preType.list = props.filter.locationList
		}
	} else {
		preType.type = ''
		preType.list = []
	}
}
watch(
	filterForm,
	(newV, oldV) => {
		handleSearch()
	},
	// {
	// 	deep: true,
	// },
)
//mock商品数据
const handleCurrentChange = (val: number) => {
	console.log(`current page: ${val}`)
}
//点击销量和价格排序
const handleMenuClick = (type: 'order' | 'price', v: any) => {
	filterForm.sort = type
	filterForm.sort = type
	if (type === 'order') {
		filterForm.sort = ''
		orderSort.value = v
	} else {
		filterForm.sort = v
		orderSort.value = ''
	}
}

//更换排序方式
const handleSortChange = (v: any) => {
	filterForm.sort = v
	// filterForm.sort = v
	orderSort.value = ''
}
const priceName = computed(() => {
	const field: any = priceSortMap.find((item: any) => item.key === filterForm.sort)
	return field?.name
})
</script>

<style lang="scss" scoped>
.btn {
	border: 1px solid red;
	display: block;
	width: 40px;
	text-align: center;
	border-radius: 10px;
	background-color: #ff5500;
	color: white;
	cursor: pointer;
}
.emptyContainer {
	width: 100%;
	min-width: 1040px;
	height: calc(100vh - 200px);
}
.productListLayout {
	::v-deep {
		.el-checkbox-group {
			display: flex;
			flex-direction: column;
			margin-top: 0px;
		}
		.el-checkbox {
			margin-bottom: 5px;
		}
		.el-form-item {
			border-bottom: 1px dashed #d6d6d6;
			padding: 0px 20px 10px 20px;
		}
	}
}
.filter-card {
	padding-top: 20px;
	border-radius: 5px;
	text-align: left;
	font-family: 'Montserrat', sans-serif;
	background-color: #fff;
	color: #333;
	height: calc(100vh - 180px);
	overflow-y: auto;
	overflow-x: hidden;
	border: 1px solid #e8e8e8;
	&::-webkit-scrollbar {
		width: 0px;
		height: 0;
		cursor: pointer;
		/*height: 4px;*/
	}
}

.filter-price {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0;
}

.spacing {
	margin: 0 10px;
}

.filter-input {
	width: 100px;
	font-size: 16px;
	font-weight: bold;
	color: #333;
	border: none;
	border-radius: 4px;
}

.el-input-number__decrease,
.el-input-number__increase {
	background-color: #eee;
	color: #333;
	border-radius: 4px;
	border: none;
	font-size: 20px;
	width: 28px;
	height: 28px;
	margin: 0;
	transition: all 0.3s ease-in-out;
}

.el-input-number__decrease:hover,
.el-input-number__increase:hover {
	background-color: #ddd;
	color: #333;
}

.el-checkbox-group {
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
}

.el-checkbox {
	margin-right: 24px;
	margin-bottom: 16px;
	color: #333;
	font-weight: bold;
	font-size: 16px;
	transition: all 0.3s ease-in-out;
}

.el-checkbox__label {
	color: #333;
	font-size: 16px;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
	color: #ff5500;
}

.product-item {
	margin-bottom: 40px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.3s ease-in-out;
	overflow: hidden;
}

.product-item:hover {
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.product-card {
	text-align: left;
	border: 1px solid #e8e8e8;
	background-color: white;
	border-radius: 3px;
	.header {
		padding: 10px 0;
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e8e8e8;
		background-color: #f5f5f5;
		justify-content: space-between;
	}
	.sort {
		display: flex;
		color: #6d6d6d;
		font-size: 13px;
		.activer {
			background: white;
			color: #f50 !important;
			border-left: 1px solid #e8e8e8;
			border-right: 1px solid #e8e8e8;
			margin: 0 -1px;
		}
		.sortItem {
			padding: 0 20px;
			height: 40px;
			line-height: 40px;
			cursor: pointer;
			&:hover {
				@extend .activer;
			}
		}
		.el-dropdown-link {
			padding: 0 20px;
			display: flex;
			align-items: center;
			color: #6d6d6d;
			font-size: 13px;
		}
	}
	.page {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 13px;
		color: #6d6d6d;
		.props.total {
			height: 100%;
			padding: 0 20px;
			line-height: 40px;
			border-left: 1px solid #e8e8e8;
		}
		.pageContent {
			padding: 0 10px;
			width: 100px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.icon {
				font-size: 16px;
				cursor: pointer;
			}
			.pageBox {
				position: relative;
				top: 1px;
			}
			.disabled {
				pointer-events: none;
				color: #c5c5c5;
			}
		}
	}
}
.seriveFilter {
	.filterContent {
		flex-direction: row;
		align-items: center;
		height: 40px;
		padding-left: 20px;
		border-bottom: 1px solid #e8e8e8;
		::v-deep {
			.el-checkbox {
				font-size: 12px;
				font-weight: 500;
				margin-bottom: 0px !important;
				.el-checkbox__label {
					font-size: 12px;
					color: #666;
					font-weight: 500;
				}
			}
		}
	}
}
.productList {
	padding: 20px 20px 0px 20px;
}
.product-card .title {
	font-size: 27px;
	font-family: 'Montserrat', sans-serif;
	font-weight: 900;
}

.product-card p {
	font-size: 16px;
	color: #555;
	margin-bottom: 20px;
}

.product-card .price {
	font-size: 20px;
	font-weight: bold;
	color: #ff5500;
	margin-bottom: 20px;
}
.pageContainer {
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
}
</style>

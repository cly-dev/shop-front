<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-09 20:54:31
 * @Description: 商品列表
-->
<template>
	<div class="productListLayout">
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
										v-model="filterForm.minPrice"
										:min="0"
										:max="999999"
										placeholder="Min"
										class="filter-input"
									/>
									<span class="spacing">-</span>
									<el-input-number
										:controls="false"
										:precision="2"
										v-model="filterForm.maxPrice"
										:min="0"
										:max="999999"
										placeholder="Max"
										class="filter-input"
									/>
								</div>
							</el-form-item>
							<el-form-item label="类别" v-if="props.showCategory">
								<el-checkbox-group v-model="filterForm.category">
									<el-checkbox v-for="category in categories" :key="category.id" :label="category.id">
										{{ category.name }}
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="颜色">
								<el-checkbox-group v-model="filterForm.color">
									<el-checkbox v-for="color in colors" :key="color" :label="color">
										<div>
											{{ color }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="品牌">
								<el-checkbox-group v-model="filterForm.color">
									<el-checkbox v-for="color in brands" :key="color" :label="color">
										<div>
											{{ color }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="产地">
								<el-checkbox-group v-model="filterForm.color">
									<el-checkbox v-for="color in local" :key="color" :label="color">
										<div>
											{{ color }}
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="涂抹位置">
								<el-checkbox-group v-model="filterForm.position">
									<el-checkbox v-for="color in position" :key="color" :label="color">
										<div>
											{{ color }}
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
								:class="`sortItem ${sortValue === item.key && 'activer'}`"
								@click="() => handleSortChange(item.key)"
							>
								{{ item.name }}
							</div>

							<el-dropdown>
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
							</el-dropdown>
							<el-dropdown>
								<div :class="`el-dropdown-link ${priceSort && 'activer'}`">
									{{ priceSort ? priceName : '价格' }}
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
								<el-icon class="icon disabled"><ArrowLeft /></el-icon>
								<span class="pageBox">1 / 100</span>
								<el-icon class="icon"><ArrowRight /></el-icon>
							</div>
							<div class="total">共120条</div>
						</div>
					</div>
					<div class="seriveFilter">
						<el-checkbox-group class="filterContent" v-model="serviceFilter">
							<el-checkbox v-for="value in serviceMap" :key="value.value" :label="value.value">{{ value.label }}</el-checkbox>
						</el-checkbox-group>
					</div>
					<!-- 商品卡片 -->
					<div class="productList">
						<el-row :gutter="20">
							<el-col :span="6" v-for="item in items" :key="item.id">
								<ProductItemCard :item-data="item"></ProductItemCard>
							</el-col>
						</el-row>
					</div>
					<!-- 分页 -->
					<div class="pageContainer">
						<el-pagination
							v-model:current-page="filterValue.page"
							v-model:page-size="filterValue.pageSize"
							layout="total,prev, pager, next, jumper"
							:total="120"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
						/>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import {ArrowDown, ArrowLeft, ArrowRight} from '@element-plus/icons-vue'
import {ref, withDefaults, defineProps, computed, reactive} from 'vue'

import Img from '@/assets/img/icon/1.jpg'

import ProductItemCard from './component/ProductItemCard/index.vue'

import {sortMap, orderSortMap, priceSortMap, serviceMap} from '@/constant/sort'

type Props = {
	showCategory?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	showCategory: false,
})

const filterValue = reactive<{page: number; pageSize: number; sortValue?: string}>({
	page: 1,
	pageSize: 20,
	sortValue: '',
})

const total = ref<number>(120)
const filterForm = ref<any>({})
//服务筛选
const serviceFilter = ref<any>([])
//筛选方式
const sortValue = ref<any>('')
//价格筛选
const priceSort = ref<string>('')
//销量筛选
const orderSort = ref<string>('')
//mock商品数据
const items = [
	{
		id: '1',
		title: '商品标题11231231231231231231231231231',
		imageUrl: Img,
		discountPrice: 23.0,
		originPrice: 25.0,
		location: '浙江 杭州',
		num: 200,
		seoUrl: '12',
	},
	{
		id: '2',
		title: '商品标题',
		imageUrl: Img,
		discountPrice: 23.0,
		originPrice: 25.0,
		location: '浙江 杭州',
		num: 200,
		seoUrl: '2',
	},
	{
		id: '3',
		title: '商品标题',
		imageUrl: Img,
		discountPrice: 23.0,
		originPrice: 25.0,
		seoUrl: '3',
		location: '浙江 杭州',
		num: 200,
	},
	{
		id: '4',
		title: '商品标题',
		imageUrl: Img,
		discountPrice: 23.0,
		originPrice: 25.0,
		location: '浙江 杭州',
		num: 200,
		seoUrl: '4',
	},
	{
		id: '4',
		title: '商品标题',
		imageUrl: Img,
		discountPrice: 23.0,
		originPrice: 25.0,
		location: '浙江 杭州',
		num: 200,
		seoUrl: '4',
	},
	{
		id: '5',
		title: '商品标题',
		imageUrl: Img,
		discountPrice: 23.0,
		originPrice: 25.0,
		location: '浙江 杭州',
		num: 200,
		seoUrl: '/',
	},
]
const handleSizeChange = (val: number) => {
	console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
	console.log(`current page: ${val}`)
}
//点击销量和价格排序
const handleMenuClick = (type: 'order' | 'price', v: any) => {
	sortValue.value = type
	if (type === 'order') {
		priceSort.value = ''
		orderSort.value = v
	} else {
		priceSort.value = v
		orderSort.value = ''
	}
}
//更换排序方式
const handleSortChange = (v: any) => {
	priceSort.value = ''
	sortValue.value = v
	orderSort.value = ''
}
const priceName = computed(() => {
	const field: any = priceSortMap.find((item: any) => item.key === priceSort.value)
	return field?.name
})
const orderName = computed(() => {
	const field = orderSortMap.find((item: any) => item.key === orderSort.value)
	return field?.name
})
const categories = [
	{id: 1, name: 1},
	{id: 2, name: 2},
]
const colors = ['黑', '红']
const brands = ['雅诗兰黛', '兰蔻']
const local = ['浙江', '广东', '福建']
const position = ['手部', '脸部', '嘴部']
</script>

<style lang="scss" scoped>
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
		height: 20px;
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
		.total {
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

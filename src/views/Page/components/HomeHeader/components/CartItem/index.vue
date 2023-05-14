<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-14 18:45:37
 * @Description: 
-->
<template>
	<div class="cartItem">
		<img :src="props.itemData.imageUrl" />
		<h3 class="itemTitle">{{ props.itemData.productTitle }}</h3>
		<div class="itemCount">{{ props.itemData.count }}</div>
	</div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue'

type Props = {
	itemData: {
		productTitle: string
		_id: string
		imageUrl: string
		count: number
	}
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped>
.cartItem {
	height: 80px;
	display: flex;
	padding: 10px;
	align-items: center;
	border-bottom: 1px solid rgb(188, 188, 188);
}
img {
	min-width: 60px;
	min-height: 60px;
	max-width: 60px;
	max-height: 60px;
}
.itemTitle {
	margin-left: 10px;
	width: 60%;
}
.itemCount {
	margin-left: 10px;
	flex: 1;
	text-align: center;
}
</style>

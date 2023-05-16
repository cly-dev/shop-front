<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-16 23:09:58
 * @Description: 用户发送信息
-->
<template>
	<div class="accepterTime">{{ format(info?.createTime as number) }}</div>
	<div class="accepterBox">
		<div class="accepterInfo">
			<img :src="useAccount.userData?.avater || userAvater" class="avater" />
			<div class="infoName">{{ useAccount.userData?.userName }}</div>
		</div>
		<div class="msgBpx" v-html="info.content"></div>
	</div>
</template>

<script setup lang="ts">
import userAvater from '@/assets/img/avater.jpg'
import useStore from '@/pinia/user'
import {format} from '@/untils/common'

import {defineProps, withDefaults} from 'vue'

type Props = {
	info: MessageType.MessageItem
}
const props = withDefaults(defineProps<Props>(), {})
const useAccount = useStore()
const {info} = props
</script>

<style lang="scss" scoped>
.accepterTime {
	line-height: 12px;
	font-size: 12px;
	color: #a3a6ad;
	position: relative;
	top: 5px;
}

.accepterBox {
	display: flex;
	flex-direction: row;
	padding: 0 10px 10px 10px;
	align-items: flex-start;
	flex-direction: row-reverse;

	.accepterInfo {
		text-align: center;
	}
	.infoName {
		margin-top: 5px;
		font-size: 12px;
	}
	.msgBpx {
		margin-right: 15px;
		border-top-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		min-height: 30px;
		display: flex;
		align-items: center;
		max-width: calc(100% - 80px);
		text-align: left;
		padding: 5px;
		color: white;
		position: relative;
		top: 10px;
		background-color: $SuccessColor;

		&::before {
			content: '';
			position: absolute;
			right: -20.1px;
			border: 1px solid red;
			top: 0px;
			height: 0;
			width: 0;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			border-left: 10px solid $SuccessColor;
			border-right: 10px solid transparent;
		}
		img {
			height: 40px !important;
			width: 40px !important;
		}
	}
}
.avater {
	height: 50px;
	width: 50px;
	border-radius: 50%;
}
</style>

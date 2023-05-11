<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-08 00:02:13
 * @Description: 图片预览
-->
<template>
	<div class="productImg">
		<div class="videoContent" v-if="vedioSrc && isPlay">
			<video :src="vedioSrc" controls></video>
			<el-icon class="closeIcon" @click="() => (isPlay = false)"><Close /></el-icon>
		</div>
		<div class="imageContainer" @mouseleave="handleMouseLeave" v-else>
			<img :src="mediaList[activeIndex]" class="imgBox" @mouseover="handleMouseOver" />
			<div class="mask" ref="maskRef" @mousemove="handleMouseMover"></div>
			<el-icon class="videoIcon" @click="handleClickVideo" v-if="vedioSrc">
				<VideoPlay />
			</el-icon>
		</div>

		<ul class="imgList">
			<li v-for="(v, k) in mediaList" :key="v" @click="() => handleChange(k)" :class="activeIndex === k && 'activer'">
				<img :src="v" />
			</li>
		</ul>
		<div class="scaleContent" ref="scaleContentRef" v-show="!isPlay">
			<div>
				<img ref="scaleRef" :src="mediaList[activeIndex]" />
			</div>
		</div>
	</div>
	<ProductVideo></ProductVideo>
</template>

<script setup lang="ts">
import {VideoPlay, Close} from '@element-plus/icons-vue'
import {ref, withDefaults, defineProps} from 'vue'
import ProductVideo from '../ProductVideo/index.vue'
type Props = {
	mediaList: string[]
	vedioSrc?: string
}
const props = withDefaults(defineProps<Props>(), {})
const isPlay = ref<boolean>(false)
const activeIndex = ref<number>(0)
const maskRef = ref<any>(null)
const scaleContentRef = ref<any>(null)
const scaleRef = ref<any>(null)
const handleChange = (k: number) => {
	activeIndex.value = k
	isPlay.value = false
}
//鼠标移动
const handleMouseMover = (e: any) => {
	const scale = {
		x: 0,
		y: 0,
	}
	let x = 0
	let y = 0
	const {offsetX, offsetY} = e
	const el = maskRef.value
	const scaleContentEl = scaleContentRef.value
	const scaleEl = scaleRef.value
	const top = el?.offsetTop
	const left = el?.offsetLeft
	const height = el!.offsetHeight
	const width = el!.offsetWidth
	const moveX = offsetX + left - Math.ceil(width / 2)
	const moveY = offsetY + top - Math.ceil(height / 2)
	if (moveX <= 0) {
		x = 0
	} else {
		if (moveX + width >= el!.offsetParent!.clientWidth) {
			x = el!.offsetParent!.clientWidth - width
		} else {
			x = moveX
		}
	}
	if (moveY <= 0) {
		y = 0
	} else {
		if (moveY + height >= el!.offsetParent!.clientHeight) {
			y = el!.offsetParent!.clientHeight - height
		} else {
			y = moveY
		}
	}
	el!.style!.top = y + 'px'
	el!.style!.left = x + 'px'
	scale.x = (scaleEl!.offsetWidth - scaleContentEl!.offsetWidth) / (el!.offsetParent!.clientWidth - el!.offsetWidth)
	scale.y = (scaleEl!.offsetHeight - scaleContentEl!.offsetHeight) / (el!.offsetParent!.clientHeight - el!.offsetHeight)
	scaleEl!.style!.top = -y * scale.y + 'px'
	scaleEl!.style!.left = -x * scale.x + 'px'
}
const handleMouseOver = (e: any) => {
	const {offsetX, offsetY} = e
	const el = maskRef.value
	el!.style!.top = offsetY - 100 + 'px'
	el!.style!.left = offsetX - 100 + 'px'
	scaleContentRef.value!.style!.display = 'block'
}
const handleClickVideo = () => {
	isPlay.value = true
}
const handleMouseLeave = () => {
	setTimeout(() => {
		scaleContentRef.value!.style!.display = 'none'
	}, 0)
}
</script>

<style lang="scss" scoped>
.productImg {
	width: 100%;
	text-align: left;
	position: relative;
}
.imageContainer {
	width: 100%;
	height: 400px;
	object-fit: cover;
	position: relative;
	&:hover {
		cursor: move;
		.mask {
			display: block;
		}
	}
	.mask {
		width: 200px;
		height: 200px;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba($color: #fff, $alpha: 0.6);
		z-index: 9;
		display: none;
	}

	.imgBox {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
}
.imgList {
	margin-top: 10px;
	height: 80px;
	display: flex;
	li {
		flex: 1;
		border: 1px solid rgb(220, 220, 220);
		border-radius: 5px;
		cursor: pointer;
		overflow: hidden;
		&:hover {
			opacity: 0.7;
			border: 1px solid #ff5000;
		}
		&:not(&:last-child) {
			margin-right: 10px;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
}
.activer {
	border: 1px solid #ff5000 !important;
}
.scaleContent {
	position: absolute;
	right: -470px;
	width: 450px;
	height: 500px;
	top: -0px;
	overflow: hidden;
	display: none;
	> div {
		width: 100%;
		position: relative;
	}
	img {
		position: absolute;
		z-index: 99;
	}
}
.videoIcon {
	position: absolute;
	z-index: 10;
	bottom: 20px;
	left: 50%;
	transform: translate(-50%, 0);
	font-size: 40px;
	border-radius: 50%;
	background-color: rgba($color: #000, $alpha: 0.2);
	color: white;
}
.videoContent {
	height: 400px;
	position: relative;
	video {
		width: 100%;
		height: 100%;
	}
	.closeIcon {
		position: absolute;
		right: 10px;
		top: 10px;
		cursor: pointer;
		font-size: 18px;
	}
}
</style>

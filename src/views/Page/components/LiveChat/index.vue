<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-16 00:03:27
 * @Description: 
-->
<template>
	<el-dialog draggable v-model="dialogVisible" width="700px" title="官方客服" :before-close="handleClose" top="60px">
		<template #header>
			<div class="header">
				<h2>官方客服</h2>
			</div>
		</template>
		<div class="dialogMainer">
			<div class="msgList" ref="listRef">
				<div v-for="item in list" :key="item.createTime">
					<SenderBox v-if="item.type === '1'" :info="item"></SenderBox>
					<AccepterBox v-else :info="item"></AccepterBox>
				</div>
			</div>
			<div class="input">
				<div class="inputOperter">
					<el-icon class="icon" title="上传图片" @click="() => handleClick('img')"><Picture /></el-icon>
					<el-icon class="icon videoIcon" title="上传视频" @click="() => handleClick('video')"><VideoCamera /></el-icon>
				</div>
				<!-- 输入框 -->
				<textarea v-model.trim.lazy="content" maxlength="120" class="inputText" placeholder="请输入你的问题"></textarea>
			</div>
		</div>
		<template #footer>
			<div style="margin-top: -20px">
				<el-button @click="() => (dialogVisible = false)">取消</el-button>
				<el-button type="primary" @click="handleSubmit">发送</el-button>
			</div>
		</template>
	</el-dialog>
	<input style="display: none" type="file" ref="inputRef" @change="handleUpdate" />
</template>

<script setup lang="ts">
import {Picture, VideoCamera} from '@element-plus/icons-vue'
import {ref, defineExpose, watch, onMounted, onUnmounted, nextTick} from 'vue'
import {useRouter} from 'vue-router'
import AccepterBox from './components/AccepterBox/index.vue'
import SenderBox from './components/SenderBox/index.vue'
import {upload} from '@/api/public'
import {sendMessageSocket} from '@/socket/message'
import {createMessage, getMessageList} from '@/api/socket'
import socket from '@/socket'
import useStore from '@/pinia/user'
import {message, checkImg, checkVideo} from '@/untils/common'
const useAccount = useStore()
const listRef = ref<HTMLDivElement>()
const dialogVisible = ref<boolean>(false)
const content = ref<string>('')
const inputRef = ref<any>(null)
const router = useRouter()
const updateType = ref<'img' | 'video' | ''>('img')

//消息列表
const list = ref<Array<MessageType.MessageItem>>()
const handleSubmit = () => {
	let adminId: any = '12345'
	if (list.value?.length) {
		adminId = list.value[list.value?.length - 1].amdinInfo?.adminId
	}
	createMessage({content: content.value, adminId}).then((res: any) => {
		getList()
		sendMessageSocket({accountId: useAccount.userData?.accountId as string, content: content.value, adminId})
		content.value = ''
	})
}
const handleClick = (type: 'img' | 'video') => {
	updateType.value = type
	if (inputRef.value) {
		inputRef.value.click()
	}
}
watch(
	() => dialogVisible.value,
	(newV: boolean) => {
		if (!newV) {
			content.value = ''
		}
	},
)
function getList() {
	if (useAccount.token) {
		getMessageList().then(doc => {
			list.value = doc as any
			nextTick(() => {
				if (listRef.value) {
					listRef.value.scrollTop = listRef.value.scrollHeight
				}
			})
		})
	}
}
function handleUpdate(e: any) {
	const file = e.target.files[0]
	const formData = new FormData()
	if (updateType.value === 'img') {
		if (checkImg(file.type)) {
			formData.append('file', file)
		} else {
			message('只允许上传png、jpg、webp的图片')
			return
		}
	} else if (updateType.value === 'video') {
		if (checkVideo(file.type)) {
			formData.append('file', file)
		} else {
			message('只允许上传mp4、mov视频')
			return
		}
	}
	upload(formData)
		.then((v: any) => {
			let el = ''
			if (updateType.value === 'img') {
				el = `<img src='${v}' style="width:40px;height:40px"/>`
			} else {
				el = `<video src='${v}' controls autoplay/>`
			}
			let adminId: any = '12345'
			if (list.value?.length) {
				adminId = list.value[list.value?.length - 1].amdinInfo?.adminId
			}
			createMessage({content: el, adminId}).then((res: any) => {
				getList()
				sendMessageSocket({accountId: useAccount.userData?.accountId as string, content: el, adminId})
				content.value = ''
			})
		})
		.finally(() => {
			inputRef.value.value = ''
			updateType.value = ''
		})
}
onMounted(() => {
	getList()
	socket.on('admin-message', () => {
		getList()
	})
	socket.on('system-message', () => {})
})
onUnmounted(() => {
	socket.off('admin-message')
	socket.off('system-message')
})
defineExpose({
	openModal: () => {
		if (useAccount.token) {
			dialogVisible.value = true
		} else {
			message('请先登录')
			router.push('/login')
		}
	},
})
const handleClose = (done: () => void) => {
	done()
}
</script>

<style lang="scss" scoped>
.header {
	h2 {
		font-size: 18px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-weight: 900;
		text-align: left;
	}
}
.dialogMainer {
	height: 500px;
	margin-top: -20px;
	display: flex;
	flex-direction: column;
	.msgList {
		border: 1px solid #d6d6d6;
		height: 350px;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 10px 0;
	}
	.input {
		flex: 1;
		border: 1px solid #d6d6d6;
		margin-top: -1px;
	}
	.inputOperter {
		// border-bottom: none;
		margin: -1px 0;
		height: 40px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.icon {
			cursor: pointer;
			font-size: 20px;
		}
		.videoIcon {
			margin-left: 20px;
		}
	}

	.inputText {
		border: none;
		border-top: none;
		display: block;
		width: 100%;
		resize: none;
		// padding: 10px;
		font-size: 16px;
		height: calc(100% - 60px);
		padding: 0 10px;
	}
}
</style>

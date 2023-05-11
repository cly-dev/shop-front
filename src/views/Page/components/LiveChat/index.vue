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
			<div class="msgList">
				<div v-for="item in list" :key="item.createTime">
					<AccepterBox v-if="item.type !== '2'" :info="item"></AccepterBox>
					<SenderBox v-else :info="item"></SenderBox>
				</div>
			</div>
			<div class="input">
				<div class="inputOperter">
					<el-icon class="icon" title="上传图片"><Picture /></el-icon>
					<el-icon class="icon videoIcon" title="上传视频"><VideoCamera /></el-icon>
				</div>
				<!-- 输入框 -->
				<textarea v-model.trim.lazy="content" maxlength="120" class="inputText" placeholder="请输入你的问题"></textarea>
			</div>
		</div>
		<template #footer>
			<div style="margin-top: -20px">
				<el-button @click="() => (dialogVisible = false)">取消</el-button>
				<el-button type="primary">发送</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import {Picture, VideoCamera} from '@element-plus/icons-vue'
import {ref, defineExpose, watch} from 'vue'
import AccepterBox from './components/AccepterBox/index.vue'
import SenderBox from './components/SenderBox/index.vue'

const dialogVisible = ref<boolean>(false)
const content = ref<string>('')

//消息列表
const list = ref<Array<MessageType.MessageItem>>([
	{
		accountId: '1',
		content: '你好!,有什么需要帮助的嘛?',
		nickName: '后生1',
		createTime: '2023年3月3日 8:30',
		type: '1',
	},
	{
		accountId: '2',
		content: '你好!',
		nickName: '用户',
		createTime: '2023年3月3日 8:31',
		type: '2',
	},
	{
		accountId: '1',
		content: '你好!,有什么需要帮助的嘛?',
		nickName: '后生1',
		createTime: '2023年3月3日 8:33',
		type: '1',
	},
])

watch(
	() => dialogVisible.value,
	(newV: boolean) => {
		if (!newV) {
			content.value = ''
		}
	},
)

defineExpose({
	openModal: () => {
		dialogVisible.value = true
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

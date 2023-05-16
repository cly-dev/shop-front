<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-16 21:45:23
 * @Description: 
-->
<template>
	<div class="shopAccount">
		<BreadCrumbs :nav-list="[{title: '个人中心', href: '/', disabled: true}]"></BreadCrumbs>
		<div class="accountContainer">
			<div class="accountInfo">
				<div class="avater">
					<el-image :src="useAccount.userData?.avater"></el-image>
					<div class="text" @click="handleClick">切换头像</div>
				</div>
				<div class="infoBox">
					<div class="infoName">
						{{ useAccount.userData?.userName }}
						<div class="btnContent">
							<el-button size="small" type="primary" @click="() => handleOpenModel('update')">修改信息</el-button>
							<el-button size="small" type="danger" @click="handleOpenModel">修改密码</el-button>
						</div>
					</div>
					<div class="infoItem">
						邮箱:
						<span class="infoValue">{{ useAccount.userData?.accountId }}</span>
					</div>
					<div class="infoItem">
						性别:
						<span class="infoValue">{{ useAccount.userData?.sex === '1' ? '男' : '女' }}</span>
					</div>
					<div class="infoItem">
						电话:
						<span class="infoValue">{{ useAccount.userData?.phone }}</span>
					</div>
					<div class="infoItem">
						签名:
						<span class="infoValue">{{ useAccount.userData?.sign || '空空如也...' }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<input type="file" accept="*.jpg,*.png" style="display: none" ref="inputRef" @change="handleUpdate" />
	<!-- 修改信息 -->
	<el-dialog title="修改信息" v-model="updateVisible" :width="400">
		<el-form :model="form" label-width="60px">
			<el-form-item label="昵称:">
				<el-input v-model="form.userName" placeholder="请输入昵称" maxlength="8" show-word-limit />
			</el-form-item>
			<el-form-item label="性别:">
				<el-select v-model="form.sex" placeholder="请选择性别">
					<el-option label="男" value="1" />
					<el-option label="女" value="0" />
				</el-select>
			</el-form-item>
			<el-form-item label="电话:">
				<el-input v-model="form.phone" placeholder="请输入电话" maxlength="11" show-word-limit />
			</el-form-item>
			<el-form-item label="签名:">
				<el-input v-model="form.sign" type="textarea" placeholder="请输入签名" maxlength="200" show-word-limit />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="() => handleClose('update')">取消</el-button>
				<el-button type="primary" @click="() => handleUpdateInfo('update')">确定</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- 修改密码 -->
	<el-dialog title="修改密码" v-model="passwordVisible" :width="400">
		<el-form :model="passwordForm" label-width="80px" ref="passwordRef" :rules="rules">
			<el-form-item label="原密码:" prop="oldPassword">
				<el-input v-model="passwordForm.oldPassword" placeholder="请输入原密码" type="password" required />
			</el-form-item>
			<el-form-item label="新密码:" prop="password">
				<el-input v-model="passwordForm.password" placeholder="请输入新密码" type="password" required></el-input>
			</el-form-item>
			<el-form-item label="确认密码:" prop="checkPassword">
				<el-input v-model="passwordForm.checkPassword" placeholder="请确认密码" type="password" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="() => handleClose('password')">取消</el-button>
				<el-button type="primary" @click="() => handleUpdateInfo('password')">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import BreadCrumbs from '@/components/BreadCrumbs/index.vue'
import {updateAccount, updatePassword} from '@/api/user'
import {upload} from '@/api/public'
import useAccountStore from '@/pinia/user'
import {ref, toRef, toRefs} from 'vue'
import {checkImg, message} from '@/untils/common'
import {reactive} from 'vue'
const router = useRouter()

const inputRef = ref<any>(null)
const useAccount = useAccountStore()
const updateVisible = ref<boolean>(false)
const passwordVisible = ref<boolean>(false)
// do not use same name with ref
const form = reactive<any>({
	userName: '',
	sign: '',
	sex: '',
	phone: '',
})
const passwordRef = ref<any>(null)
const passwordForm = reactive<any>({
	oldPassword: '',
	password: '',
	checkPassword: '',
})
const rules = reactive({
	oldPassword: [{required: true, message: '原密码不能为空'}],
	password: [
		{required: true, message: '密码不能为空'},
		{pattern: /^[a-zA-Z0-9]\w{6,12}$/, message: '密码格式错误'},
	],
	checkPassword: [{required: true, message: '确认密码不能为空'}],
})
const handleOpenModel = (type: 'update' | 'password') => {
	if (type === 'update') {
		updateVisible.value = true
		Object.keys(useAccount.userData as any).forEach((item: any) => {
			form[item] = useAccount.userData[item]
		})
	} else {
		passwordVisible.value = true
	}
}
const handleUpdateInfo = (type: 'update' | 'password') => {
	if (type === 'update') {
		updateAccount(form).then((res: any) => {
			message('修改成功', 'success')
			useAccount.UPDATEUSERDATA()
			updateVisible.value = false
		})
	} else {
		passwordRef.value.validate((valie: boolean) => {
			if (valie) {
				updatePassword(passwordForm).then(() => {
					message('修改成功,请重新登录', 'success')
					useAccount.RESETUSERDATA()
					router.push('/login')
				})
			}
		})
	}
}
const handleClose = (type: 'update' | 'password') => {
	let obj = {}
	if (type === 'update') {
		updateVisible.value = false
		obj = form
	} else {
		passwordVisible.value = false
		obj = passwordForm
	}
	Object.keys(obj).forEach((item: string) => {
		form[item] = ''
	})
}
const onSubmit = () => {
	console.log('submit!')
}
const handleClick = () => {
	if (inputRef.value) {
		inputRef.value.click()
	}
}
const handleUpdate = async (e: any) => {
	const file = e.target.files[0]
	if (checkImg(file.type)) {
		const formData = new FormData()
		formData.append('file', file)
		const src = await upload(formData)
		inputRef.value.value = ''
		updateAccount({avater: src}).then(() => {
			useAccount.UPDATEUSERDATA()
		})
	} else {
		message('请上传png和jpg文件')
	}
}
</script>

<style scoped lang="scss">
.shopAccount {
	width: 100%;
}
.accountContainer {
	background-color: white;
	border-radius: 10px;
	text-align: left;
	height: 300px;
	box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
	.accountInfo {
		padding: 30px;
		display: flex;
		align-content: center;
		.avater {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			border: 1px solid #ebebeb;
			overflow: hidden;
			position: relative;
			cursor: pointer;
			&:hover {
				.text {
					opacity: 1;
				}
			}
			.text {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				position: absolute;
				background-color: rgba($color: #000000, $alpha: 0.4);
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				font-size: 12px;
				opacity: 0;
				transition: all 0.6s ease;
			}
		}
		.infoBox {
			margin-left: 20px;
			height: fit-content;
			margin-top: 10px;
			width: 90%;
		}
		.infoName {
			font-size: 18px;
			font-weight: 600;
			display: flex;
			width: 100%;
			justify-content: space-between;
			.btnContent {
				display: flex;
			}
		}
		.infoItem {
			margin-top: 10px;
			font-size: 18px;
			color: #888888;
			.infoValue {
				color: #333;
				font-size: 20px;
				margin-left: 5px;
			}
		}
	}
}
</style>

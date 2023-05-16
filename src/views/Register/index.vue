<template>
	<!-- 注册 -->
	<section class="wechar-register">
		<section class="register-content">
			<span class="content-header">美妆易购</span>
			<section class="content-mainer">
				<!-- 用户名 -->
				<section class="email-content">
					<span class="iconfont icon-icon-mail"></span>
					<input type="text" placeholder="邮箱" v-model="FormData.email" />
				</section>
				<!--错误提示 -->
				<span class="error-tips" v-if="isRegis">该手机已被注册</span>
				<!-- 密码 -->
				<section class="password-content">
					<span class="iconfont icon-mimasuo"></span>
					<input type="password" name="password" placeholder="密码" autocomplete="off" v-model="FormData.password" />
					<!-- 提示 -->
					<span class="password-tips" style="position: absolute">密码在6~12位之间,包含英文</span>
				</section>

				<!-- 确认密码 -->
				<section class="confirm-content">
					<span class="iconfont icon-querenmima"></span>
					<input type="password" name="password" placeholder="确认密码" autocomplete="off" v-model="FormData.comfirm" />
				</section>
				<!--错误提示 -->
				<span class="error-tips" v-if="isBind">该邮箱已被绑定</span>
				<!-- 邮箱验证码 -->
				<section class="checkCode-content">
					<span class="iconfont icon-yanzhengma"></span>
					<input type="text" placeholder="邮箱验证码" v-model="FormData.code" />
					<button :class="['btn-cotent', isLoading ? 'quiet' : 'activer']" :disabled="isLoading" @click="handleGetCode">
						{{ !isLoading ? '获取验证码' : num + '秒后重新获取' }}
					</button>
				</section>
				<!-- 按钮 -->
				<section class="btn-content">
					<el-button type="button" class="btn-login" @click="handleRegister">注册</el-button>
					<el-button type="button" class="btn-cancel" @click="Router.push('/login')">取消</el-button>
				</section>
			</section>
		</section>
	</section>
	<section class="register_background"></section>
</template>

<script>
import {useRouter} from 'vue-router'
import {reactive, ref, watchEffect, toRaw} from 'vue'
import volidor from 'validattoy'
import {message, randomCode} from '../../untils/common'
import {getCode} from '@/api/public'
import {register} from '@/api/user'

export default {
	setup() {
		// 路由对象
		const Router = new useRouter()
		// 标识等待状态
		const isLoading = ref(false)
		// 等待时间
		const num = ref(60)
		//判断id是否被注册
		const isRegis = ref(false)
		// 判断邮箱是否被绑定
		const isBind = ref(false)
		// 定时器
		let timer = null
		//表单数据
		const FormData = reactive({
			password: '',
			code: '',
			email: '',
			checkoutCode: '',
			comfirm: '',
		})
		//点击获取邮箱验证码
		async function handleGetCode() {
			const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			const {email} = FormData
			const checkoutCode = randomCode(8)
			FormData.checkoutCode = checkoutCode
			if (reg.test(email)) {
				if (await getCode({checkoutCode, email: FormData.email})) {
					message('发送成功', 'success')
					isLoading.value = true
					timer = setInterval(() => {
						num.value--
					}, 1000)
				}
			} else {
				message('邮箱格式错误')
			}
		}
		// 判断id是否被注册
		function handleIdBlur() {
			const {phone} = FormData
			//手机
			const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
			if (reg.test(phone)) {
				isGister(phone).then(res => {
					isRegis.value = res
				})
			} else {
				message('账号格式错误')
			}
		}

		// 监听值变化
		watchEffect(() => {
			if (num.value === 0) {
				isLoading.value = false
				timer && clearInterval(timer)
				num.value = 60
			}
		})

		//点击注册

		async function handleRegister() {
			if (checkEmail() && checkPassword() && checkComfirmPassword()) {
				if (FormData.code) {
					register(toRaw(FormData)).then(res => {
						message('注册成功')
						Router.push('/login')
					})
				} else {
					message('验证码不能为空')
				}
			}
		}

		function checkPassword() {
			if (FormData.password) {
				if (/^[a-zA-Z0-9]\w{6,12}$/.test(FormData.password)) {
					return true
				} else {
					message('密码格式错误')
				}
			} else {
				message('密码不能为空')
			}
		}
		function checkComfirmPassword() {
			if (FormData.comfirm) {
				if (FormData.comfirm !== FormData.password) {
					message('次输入的密码不一致')
				} else {
					return true
				}
			} else {
				message('确认密码不能为空')
			}
		}
		function checkEmail() {
			if (FormData.email) {
				if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(FormData.email)) {
					return true
				} else {
					message('邮箱格式错误')
				}
			} else {
				message('邮箱不能为空')
			}
		}
		return {
			FormData,
			isLoading,
			num,
			handleGetCode,
			isBind,
			isRegis,
			handleIdBlur,
			Router,
			handleRegister,
		}
	},
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 20:15:33
 * @Description: 
-->
<template>
	<router-view />
</template>

<script setup lang="ts">
import {loginSocket} from '@/socket/user'
import useStore from '@/pinia/user'
const useAccount = useStore()
if (useAccount.userData) {
	loginSocket(useAccount.userData.accountId)
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100vw;
	height: 100vh;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-14 17:43:31
 * @Description:
 */
import {defineStore} from 'pinia'
import {SETSHOPCART, CLEANSHOPCART} from './actionType'
export default defineStore('shopCart', {
	state(): {cartList: any[]} {
		return {
			cartList: [],
		}
	},
	actions: {
		[SETSHOPCART]: function (data: any) {
			let isExist = false
			this.cartList.forEach((item: any) => {
				if (item._id === data._id) {
					item.count += data.count
					isExist = true
				}
			})
			if (!isExist) {
				this.cartList = [data, ...this.cartList]
			}
		},
		[CLEANSHOPCART]: function () {
			this.cartList = []
		},
	},
	persist: {
		enabled: true,
	},
})

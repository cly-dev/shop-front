/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-14 18:07:58
 * @Description:
 */
import useStore from '@/pinia/shopCart'
import {SETSHOPCART} from '@/pinia/actionType'

const useShopCart = useStore()
export const setShopCart = (data: any) => {
	console.log(data)
	console.log('数据')
	useShopCart[SETSHOPCART](data)
}

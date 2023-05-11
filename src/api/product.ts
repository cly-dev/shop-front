/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-07 20:56:38
 * @Description:
 */
import Axios from './request'
const api = '/public/product'
//获取商品详情
export const getProductDetail = async (seoUrl: string) => {
	return await Axios.get(`${api}/detail/${seoUrl}`)
}
//搜索
export const search = async (parmas?: any) => {
	return await Axios.get('/public/search/filter', parmas)
}

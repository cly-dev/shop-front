/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-14 22:52:27
 * @Description:
 */
import Axios from './request'
const baseUrl = '/public/category'
//获取类目列表
export const getCategoryList = (params: {level?: '1' | '2'; categoryId: string}) => {
	return Axios.get(`${baseUrl}/children`, params)
}
//获取类目详情
export const getDetail = (_id: string) => {
	return Axios.get(`${baseUrl}/detail`, {id: _id})
}

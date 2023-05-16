/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 21:40:07
 * @Description: 用户接口
 */
import axios from './request'
const api = '/bugger'
//登录
export const login = async (data: {account: string; password: string}) => {
	return await axios.post(`${api}/login`, data)
}
//注册
export const register = async (data: {email: string; password: string; checkoutCode: string; code: string}) => {
	return await axios.post(`${api}/register`, data)
}

//修改信息
export const updateAccount = async (data: any) => {
	return await axios.put(`${api}/account/update`, data)
}
//查看自己的信息
export const getInfoDetail = async () => {
	return await axios.get(`${api}/account/detail`)
}
//修改密码
export const updatePassword = async (data: {oldPassword: string; password: string}) => {
	return await axios.put(`${api}/account/updatePassword`, data)
}

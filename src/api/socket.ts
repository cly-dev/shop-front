/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-13 14:09:25
 * @Description:
 */
import Axios from './request'
const baseUrl = '/bugger/message'
//发送信息
export const createMessage = (data: {content: string; adminId?: string}) => {
	return Axios.post(`${baseUrl}/create`, data)
}
//获取消息列表
export const getMessageList = () => {
	return Axios.get(`${baseUrl}/list`)
}

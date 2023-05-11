/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-17 00:14:13
 * @Description:
 */
declare namespace MessageType {
	type MessageItem = {
		//用户id
		accountId: string
		//头像
		avater?: string
		//消息内容
		content: string
		//昵称
		nickName?: string
		//时间
		createTime?: number
		//类型
		type: '1' | '2'
	}
}

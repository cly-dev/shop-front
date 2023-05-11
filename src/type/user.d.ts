/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-17 01:03:57
 * @Description: 
 */
declare namespace UserType{
    type UserField={
        //id
        accountId:string,
        //昵称
        userName?:string,
        //头像
        avater?:string,
        //邮箱
        email:string,
        //注册时间
        createTime?:string
        //用户签名
        sign?:string
        //用户联系方式
        phone?:number
    }
}
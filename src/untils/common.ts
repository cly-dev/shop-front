/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-20 19:31:03
 * @Description: 通用方法
 */
import{ElMessage} from "element-plus";

export const message= (message: any,type:'success' | 'warning' | 'info' | 'error'='warning',dangerouslyUseHTMLString=false,)=>{
    ElMessage ({
        type,
        message,
        showClose:true,
        dangerouslyUseHTMLString
    })
}
//随机选择字母和数字
export const randomCode=(num:number)=>{
    const result=[];
    while(result.length <= num){
    if(Math.floor(Math.random() * 10)  >5){
        let ranNum=Math.ceil(Math.random() * 25);
        result.push(String.fromCharCode(65 + ranNum));
    }else{
            result.push(Math.floor(Math.random() * 10))
        }
    }
    return result.join('');
}
//复制
export const copyAction=(str:string)=>{
        const text = document.createElement("textarea");
        document.body.appendChild(text);
        text.value = str;
        text.select();
        //判断兼容性--将内容储存到剪贴板中
        if (document.execCommand("copy")) {
          document.execCommand("copy");
          document.body.removeChild(text);
          ElMessage.success("复制成功");
          return true;
        }
        alert("抱歉,您的浏览器不兼容");
        document.body.removeChild(text);
        return false;
}
//获取现在的月份
export const  getMonth=()=>{
    const date=new Date();
    return date.getMonth() + 1;
}
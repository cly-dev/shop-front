/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-21 21:12:54
 * @Description: 用户动作
 */

import useData from "@/pinia/user";
import { ref} from "vue";

export function useAccount(){
    const isLogin=ref<boolean>(false);
    const userData=useData();
    if(userData.token){
        isLogin.value=true;
    }
    userData.$subscribe((mutations:any,state:any)=>{
        //记录行为
        console.log(mutations);
        //记录最新的数据
        if(!state.token){
            isLogin.value=false;
        }
      })
    return {
        isLogin,
        userData:userData.userData,
        token:userData.token
    }
}

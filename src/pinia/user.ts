/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-21 21:16:02
 * @Description: 用户信息
 */
import { SETUSERDATA, RESETUSERDATA } from "./actionType";
import { defineStore } from "pinia";

export default defineStore("user", {
  state():{
    token:string,
    userData:UserType.UserField | null
  } {
    return {
      token: "",
      userData: null,
    };
  },
  actions: {
    [SETUSERDATA]: function (data: any) {
      this.token = data.token;
      this.userData = data;
    },
    [RESETUSERDATA]: function () {
      this.userData = null;
    },
  },
  persist: {
    enabled: true,
  },
});

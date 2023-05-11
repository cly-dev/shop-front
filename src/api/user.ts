/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 21:40:07
 * @Description: 用户接口
 */
import axios from "./request";
const api = "/bugger";
//登录
export const login = async (data: { account: string; password: string }) => {
  return await axios.post(`${api}/login`, data);
};
//注册
export const register = async (data: {
  email: string;
  password: string;
  checkoutCode: string;
  code: string;
}) => {
  return await axios.post(`${api}/register`, data);
};

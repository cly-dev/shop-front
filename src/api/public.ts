/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-10-08 22:07:10
 * @Description: 公共接口
 */
import axios from "./request";
const api = "/public";
//获取验证码
export const getCode = (params: { checkoutCode: number; email: string }) => {
  return axios.get(`${api}/emailCode`, { params });
};
//上传文件
export const upload = (file: FormData) => {
  return axios.post(`${api}/upload`, { file, requestType: "form-data" });
};

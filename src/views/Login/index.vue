<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-20 23:45:12
 * @Description: 
-->
<template>
  <section class="loginPage">
    <div class="container">
      <h2 class="logo">
        <i class="el-icon-s-home"></i>
        美妆易购
      </h2>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        label-position="top"
      >
        <el-form-item label="邮箱" prop="accountId">
          <el-input
            v-model="formData.accountId"
            prefix-icon="el-icon-user"
            placeholder="请输入邮箱"
            clearable
          >
            <template #prefix>
              <el-icon class="icon"> <User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="margin-top: 20px">
          <el-input
            v-model="formData.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            clearable
          >
            <template #prefix>
              <el-icon class="icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import { login } from "@/api/user";
import useStore from "@/pinia/user";
import { SETUSERDATA } from "@/pinia/actionType";
import { message } from "@/untils/common";
const useData = useStore();
const router = useRouter();
const formRef = ref<any>(null);
const formData = reactive({
  accountId: "",
  password: "",
});
const rules = {
  accountId: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "accountId",
      message: "请输入正确的邮箱格式",
      trigger: ["blur", "change"],
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const handleLogin = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        login(toRaw(formData) as any).then((res) => {
          useData[SETUSERDATA](res);
          message("登录成功");
          router.push("/");
        });
      }
    });
  }
};
const toRegister = () => {
  router.push("/register");
};
</script>

<style>
.loginPage {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  /* filter: blur(30px); */
  justify-content: center;
  position: relative;
}
.loginPage::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f8f8f8;
  background-image: url("../../assets/img/loginBg.jpeg");
  background-size: 100% 100%;
  background-position: center;
  filter: blur(5px);
  width: 100%;
  height: 100%;
}
.icon {
  width: 20px;
  height: 20px;
}
.container {
  width: 400px;
  /* margin:120px auto 0 auto; */
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 999;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font-size: 36px;
  color: #3c3c3c;
}

.el-input {
  width: 100%;
  border-radius: 5px;
}

.el-button {
  width: 100%;
}

.el-form-item__label {
  color: #3c3c3c;
  font-weight: bold;
}

.el-form-item__error {
  margin-top: 5px;
}
.el-input .el-input__icon {
  margin-left: 0px;
}
.el-input__prefix-inner > :last-child {
  margin-right: 0px;
}
</style>

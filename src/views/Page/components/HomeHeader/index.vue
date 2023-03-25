<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-06 22:29:54
 * @Description: 头部
-->
<template>
  <header>
    <div class="shopHeader">
      <div class="headerInfo">
        <RouterLink to="/">
           <img class="logo" src="@/assets/logo.jpg" />
      </RouterLink>
      </div>
      <div class="headerSearch">
        <input class="searchInput" placeholder="输入您想要的宝贝" v-model="keyWord" />
        <button class="searchBtn" @click="handleSearch">搜索</button>
      </div>
      <div class="headerAccount">
        <img class="avater" src="@/assets/img/avater.jpg" />
        <span class="nickName">{{ userData?.userName }}</span>
        <component v-if="isLogin">
          <div class="headerOperate">
            <el-badge :value="12" class="item">
              <el-icon title="购物车" class="icon">
                <ShoppingTrolley />
              </el-icon>
            </el-badge>
            <el-icon title="个人中心" class="icon"><User/></el-icon>
          </div>
        </component>   
        <component v-else>
          <button class="loginBtn" @click="toLogin">登录</button>
          <button class="registerBtn" @click="toRegister">注册</button>
        </component>   
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import {ShoppingTrolley,User } from "@element-plus/icons-vue"
  import {useRouter} from "vue-router";
  import {ref} from "vue";
  import {useAccount} from "@/hook/useAccount";
  const router=useRouter();
  const {userData,isLogin}=useAccount();

  const keyWord=ref<string>('')
  console.log(userData);
  console.log('-=----------------')
  const handleSearch=()=>{
    router.push(`/search?keywWord=${keyWord.value}`)
  }

  const toLogin=()=>{
    router.push('/login');
  }
  const toRegister=()=>{
    router.push('/register')
  }

</script>

<style scoped lang="scss">
header {
  background-color: white;
  position: fixed;
  padding: 10px 0;
  top: 0;
  width: 100%;
  z-index: 99;
  border-bottom: 1px solid rgb(237, 237, 237);
}
.shopHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1250px;
  margin: 0 auto;
}
.logo {
  height: 60px;
  width: 200px;
  margin-right: 20px;
  cursor: pointer;
  margin-left: 20px;
}
h3 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 20px;
}
.headerInfo {
  display: flex;
  height: 100%;
  width: 250px;
  align-items: center;
  a{
    display: flex;
  height: 100%;
  width: 250px;
  align-items: center;
  }
}
.headerSearch {
  cursor: pointer;
  border: 2px solid #ff5000;
  flex: 1;
  min-width: 300px;
  margin: 0 60px;
  height: 40px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.headerAccount {
  width: 250px;
  height: 100%;
}
.searchInput {
  outline: none;
  border: none;
  flex: 1;
  padding-left: 20px;
  font-size: 18px;
}
.searchBtn {
  width: 80px;
  border-radius: 20px;
  background-color: #ff5000;
  color: white;
  border: none;
  font-family: $SC;
  font-weight: 900;
  font-size: 18px;
  margin: 3px;
  cursor: pointer;
}
.headerAccount {
  height: 60px;
  display: flex;
  align-items: center;
  width: 300px;
}
.loginBtn,
.registerBtn {
  border: none;
  cursor: pointer;
  color: white;
  min-width: 60px;
  height: 30px;
  border-radius: 30px;
  margin-left: 10px;
}
.loginBtn {
  margin-left: 20px;
  background-image: linear-gradient(to right, #ff5000 0, #ff6000 100%);
}
.registerBtn {
  background-image: linear-gradient(to right, #ff9000 0, #ff7000 100%);
  background-repeat: repeat-x;
}
.nickName {
  max-width: 80px;
  word-wrap: break-word;
  @include moreEllipsis(2);
  text-align: left;
  font-size: 13px;
  margin-left: 10px;
}
.avater {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.headerOperate{
  width: 120px;
  display: flex;
  margin-left: 20px;
  justify-content: space-between;
  ::v-deep{
    .el-badge__content{
      top: 2px;
      right: 10px;
    }
  }
  .icon{
    cursor: pointer;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    font-size:23px;
    background-image: linear-gradient(to right, #ff9000 0, #ff7000 100%);
    color: white;
    &:last-child{
      background-image: linear-gradient(to right, #ff5000 0, #ff6000 100%);

    }
  }
}
</style>

<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 00:47:58
 * @Description: 类目推荐
-->
<template>
    <div class="recoomendCategory">
        <div class="categoryInfo">
            <h2>类目推荐名称</h2>
            <button class="btnMore">查看更多
                <el-icon><ArrowRight /></el-icon>
            </button>
        </div>
        <div class="subCategotyList">
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
            <CategoryItem></CategoryItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import CategoryItem from "../CategoryItem/index.vue"
</script>

<style scoped lang="scss" >
    .recoomendCategory{
        display: flex;
        height: 400px;
        margin-bottom: 40px;
        .categoryInfo{
            flex: 1;
            border-radius: 10px;
            position: relative;
             box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
            background-color:white;

            h2{
                text-align: left;
                margin:30px;
                font-family: $SS;
                font-size: 23px;
                font-weight: 900;
            }
            .btnMore{
                font-size: 18px;
                display: flex;
                align-items: center;
                padding: 10px 10px 10px 15px;
                border-radius:15px;
                color: white;
                cursor: pointer;
                position: absolute;
                bottom: 30px;
                background-image: linear-gradient(to right, #ff5000 0, #ff6000 100%);
                z-index: 66;
                color: white;
                font-size: $SS;
                transition: all ease .3s;
                right: 10%;
                width: 120px;
                &:hover{
                    transform: translateY(-3px);
                }
            }
        }
        .subCategotyList{
            flex: 1;
            margin-left: 20px;
            border-radius: 10px;
            display: flex;
            flex-wrap: wrap;
        }
     
    }
   
</style>
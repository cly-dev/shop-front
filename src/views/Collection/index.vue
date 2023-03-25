<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-15 22:44:02
 * @Description: 类目集合
-->
<template>
    <section class="shopCollection">
        <BreadCrumbs :nav-list="navList"></BreadCrumbs>
        <div class="collectionMainer">
            <div class="collectiomItems">
                <el-row gutter="20">
                    <el-col :span="6" v-for="item in list" :key="item.id" >
                            <CategoryItem :styles="{height:'90px',width:'100%',marginBottom:'20px'}" :info="item"></CategoryItem>
                    </el-col>
                </el-row>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
  import {reactive} from "vue";

  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import CategoryItem from "../Home/component/CategoryItem/index.vue";

  import Img from "@/assets/img/icon/1.jpg";
  const navList=[{title:'类目详情',href:'/',disabled:true}]

  const list=reactive<Array<CategoryType.CategoryItem>>([{
    id:'1',
    iconUrl:Img,
    title:'类目名称',
    seoUrl:'1'
  },{
    id:'2',
    iconUrl:Img,
    title:'类目名称',
    seoUrl:'1'
  },{
    id:'3',
    iconUrl:Img,
    title:'类目名称',
    seoUrl:'1'
  },{
    id:'4',
    iconUrl:Img,
    title:'类目名称',
    seoUrl:'1'
  },{
    id:'5',
    iconUrl:Img,
    title:'类目名称',
    seoUrl:'1'
  },{
    id:'6',
    iconUrl:Img,
    title:'类目名称',
    seoUrl:'2'
  },


])

  
</script>

<style lang="scss" scoped>
    .shopCollection{
        height: 80vh;
        text-align: left;
    }
    .collectionMainer{
        h1{    
            font-size: px2rem(30);
            font-family: $SS;
        }
   
    }
    .collectiomItems{
        height: 100%;
    }
</style>
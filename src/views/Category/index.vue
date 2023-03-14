<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-09 01:03:38
 * @Description: 类目
-->
<template>
        <BreadCrumbs :nav-list="[{title:'类目详情',href:'/',disabled:true}]"></BreadCrumbs>
        <ProductListLayout></ProductListLayout>
</template>

<script setup lang="ts">
import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
import ProductListLayout from "@/components/ProductListLayout/index.vue";
</script>

<style scoped>

</style>
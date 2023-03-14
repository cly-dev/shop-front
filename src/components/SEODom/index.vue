<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-07 23:21:50
 * @Description: 
-->
<template>
    <head>
   	    <title>{{ props.seoTitle }}</title>
	    <meta name="description" :content="seoDesc" />
</head>
</template>

<script setup lang="ts">
    import {defineProps} from "vue"
    type Props={
        seoTitle?:string,
        seoDesc?:string
    }
    const props=withDefaults(defineProps<Props>(),{
        seoTitle:'美妆易购',
        seoDesc:'shop'
    })
</script>

<style scoped>

</style>
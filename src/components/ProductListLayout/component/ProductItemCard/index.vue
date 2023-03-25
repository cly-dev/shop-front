<!--
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-14 23:23:25
 * @Description: 商品卡片
-->
<template>
    <div class="productItem">
        <RouterLink :to="`/product/${itemData.seoUrl}`">
       <img :src="itemData.imageUrl" class="infoImg" />
        <div class="itemInfo">
            <div class="infoPrice">
                <span class="price">¥ {{ itemData.discountPrice }}</span>
                <span class="orderTotal">{{ itemData.num }}人付款</span>
            </div>
            <h2 class="itemName">{{ itemData.title }}</h2>

            <div class="infoBrand">
                <span>品牌名</span>
                <span>{{ itemData.location }}</span>
            </div>
        </div>
    </RouterLink>
    </div>
</template>

<script setup lang="ts">
import {withDefaults,defineProps} from "vue";

type Props={
    itemData:Required<Pick<ProductType.ItemType,'id' | 'imageUrl' | 'title' | 'discountPrice' | 'location'| 'originPrice' | 'seoUrl'>> & {num:number}
}

const props=withDefaults(defineProps<Props>(),{})
const {itemData}=props;

</script>

<style lang="scss" scoped>
    .productItem{
        border: 1px solid rgb(218, 218, 218);
        margin-bottom: 20px;
        transition: all ease .2s;
        &:hover{
            border-color: $ThemeColor;
            cursor: pointer;
        }
        .infoImg{
            width: 100%;
        }
        .itemInfo{
            padding: 10px;
            .itemName{
                margin-top: 5px;
                font-size: 14px;
                word-wrap: break-word;
                height: 40px;
                &:hover{
                    color: $ThemeColor;
                    text-decoration: underline;
                }
                @include moreEllipsis(2);
            }
            .infoPrice,.infoBrand{
                display:flex;
                justify-content: space-between;
                align-items: center;
            }
            .price{
                font-size: 18px;
                font-weight: 700;
                font-family: $SS;
                color: $ThemeColor;
            }
            .orderTotal{
                font-size: 12px;
                color: #666;
            }
            .infoBrand{
                margin-top: 5px;
                font-size: 12px;
                color: #666;
            }
        }
        
    }
    
</style>
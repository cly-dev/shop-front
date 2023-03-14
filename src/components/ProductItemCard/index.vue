<template>
    <div class="productItemCard">
        <img class="infoImg" src="@/assets/logo.jpg"/>
        <div class="infoContent">
             <div class="infoTitle">
                <h3>60包纸巾抽纸整箱卫生纸家用实惠装餐巾纸婴儿面巾纸擦手纸抽批发</h3>
                <div class="infoTips">
                    <span>包邮</span>
                    <span>送运费险</span>
                    <span>过敏包退</span>
                </div>
             </div>
             <div class="discountPrice">
                <em>
                    ¥ 
                </em>
                18.00
            </div>
        </div>
      
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .productItemCard{
        height: 150px;
        border-radius: 10px;
        color: #333;
        background-color:white;
        border: 1px solid #f7f9fa;
        cursor: pointer;
        transition: all ease .3s;
        box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 10%);
        padding: 10px;
        margin-bottom: 20px;
        &:hover{
            border: 1px solid #FF5000;
            transform: translateY(-7px);
            .infoImg{
                opacity: 0.7;
            }
        }
        display: flex;
        align-items: center;
        .infoImg{
            width: 150px;
            height: 150px;
            border: 1px solid rgb(224, 219, 219);
            border-radius: 10px;
        }
        .infoContent{
            height: 100%;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h3{
                font-size: 16px;
                text-align: left;
                @include moreEllipsis(2);
            }
            .infoTitle{
                padding: 10px 0;
                text-align: left;
                span{
                    color: #FF5000;
                    background: #FFFFFF;
                    font-size: 12px;
                    padding: 5px;
                    border-radius: 5px;
                    border: 1px solid #FAB596;
                    &:not(&:last-child){
                        margin-right: 5px;
                    }
                }
                .infoTips{
                    margin-top: 10px;
                }
            }
            .discountPrice{
                    text-align: left;
                    font-size: 18px;
                    color: #ff5000;
                    font-size: 22px;
                    line-height: 22px;
                    font-weight: 600;
                    em{
                        font-size: 16px;
                        font-weight: 900;
                    }
            }
        }
    }
    
</style>
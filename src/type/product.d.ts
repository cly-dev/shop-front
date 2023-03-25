/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-14 23:36:38
 * @Description: 商品类型
 */
declare namespace ProductType{
    //商品
    type ItemType={
        id:string,
        title:string,
        discountPrice?:number,
        originPrice?:number,
        imageUrl?:string
        location?:string
        seoUrl?:string
    }
}
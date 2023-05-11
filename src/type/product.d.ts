/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-14 23:36:38
 * @Description: 商品类型
 */
declare namespace ProductType {
	//商品
	type ItemType = {
		id: string
		productTitle: string
		discountPrice?: number
		originPrice?: number
		imageUrl?: string
		location?: string
		seoUrl?: string
		//送运费险
		freightInspection?: boolean
		//15天价保
		priceEnsure?: boolean
		//过敏包退
		allergyTurn?: boolean
		//七天无理由
		notReason?: boolean
		//免运费
		freightFree?: boolean
		brand?: string
	}
}

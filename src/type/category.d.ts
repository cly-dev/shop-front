/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-15 23:13:25
 * @Description:
 */
declare namespace CategoryType {
	//类目类型
	type CategoryItem = {
		_id: string
		//标题
		categoryTitle: string
		//id
		id: string
		//seo链接
		seoUrl: string
		//icon图标
		iconUrl?: string
	}
}

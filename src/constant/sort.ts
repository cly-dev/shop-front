/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-14 20:39:37
 * @Description: 排序
 */
//基础排序
export const sortMap = [
	{
		name: '综合',
		key: '',
	},
	{
		name: '新品',
		key: '6',
	},
]
//销量排序
export const orderSortMap = [
	{
		name: '销量从高到低',
		key: '1',
	},
	{
		name: '销量从低到高',
		key: '2',
	},
]
//价格排序
export const priceSortMap = [
	{
		name: '价格从高到低',
		key: 'max',
	},
	{
		name: '价格从低到高',
		key: 'min',
	},
]
//服务筛选
export const serviceMap = [
	{
		label: '包邮',
		value: 'freightFree',
	},
	{
		label: '赠送运费险',
		value: 'freightInspection',
	},
	{
		label: '过敏包退',
		value: 'allergyTurn',
	},
	{
		label: '15天价保',
		value: 'priceEnsure',
	},
	{
		label: '7天无理由',
		value: 'notReason',
	},
]

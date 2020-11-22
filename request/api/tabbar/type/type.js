import http from '../../../http.default.config.js';
export default {

	getCategory() { //获取分类Info
		// console.log(http)
		return http.get('v4/categories', {
			params: {
			},
			custom: {
				cache: false
			},

		})
	},
	getCategoryDetailList(id) { //获取分类详情列表Info
		// console.log(http)
		return http.get('v4/categories/videoList', {
			params: {
				udid:'d2807c895f0348a180148c9dfa6f2feeac0781b5',
				id
			},
			custom: {
				cache: false
			},
	
		})
	},
	getCategoryDetailListMore(url) { //获取分类详情更多列表Info
		// console.log(http)
		return http.get(url, {
			params: {
				udid:'d2807c895f0348a180148c9dfa6f2feeac0781b5',
			},
			custom: {
				cache: false
			},
	
		})
	},
}

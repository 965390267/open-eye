import http from '../../../http.default.config.js';
export default {

	getFollowInfo() { //获取关注数据Info
		// console.log(http)
		return http.get('v4/tabs/follow', {
			params: {
			},
			custom: {
				cache: false
			},

		})
	},
	getFollowInfoNext(url) { //获取关注数据Info
		// console.log(http)
		return http.get(url, {
			params: {
			},
			custom: {
				cache: false
			},
	
		})
	},
	
}

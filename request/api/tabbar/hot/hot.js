import http from '../../../http.default.config.js';
export default {

	getRankList() { //获取全部排行榜的Info
		// console.log(http)
		return http.get('v4/rankList', {
			params: {
			},
			custom: {
				cache: false
			},

		})
	},
	getOneRankList(url) { //获取周月年排行榜的Info
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

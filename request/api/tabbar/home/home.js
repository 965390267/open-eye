import http from '../../../http.default.config.js';
export default {

	getFirstHomeData(date,num=1) { //首页精选数据
		// console.log(http)
		return http.get('v2/feed', {
			params: {

				date,
				num
			},
			custom: {
				cache: false
			},

		})
	},
}

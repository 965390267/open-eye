import http from '../../http.default.config.js';
export default {

	getRelatedData(id) { //根据视频ID 获取视频
		// console.log(http)
		return http.get('v4/video/related', {
			params: {
              id
			},
			custom: {
				cache: false
			},

		})
	},
}

import http from './interceptors/interceptors.js'

const BASE_URL = "http://baobab.kaiyanapp.com/api/"

http.config.baseURL = BASE_URL; /* 根域名 */
http.config.timeout=1000*3;
http.config.header = {
		a: 1, // 演示用
		b: 2 // 演示用
	}
// http.setConfig((config) => { /* config 为默认全局配置*/
// 	config.baseURL = BASE_URL; /* 根域名 */
// 	config.header = {
// 		a: 1, // 演示用
// 		b: 2 // 演示用
// 	}
// 	return config
// })

export default http;

<template>
	<view class="cache-loadimage">
		<view class="loading-img" :style="loadingStyle" v-if="loadStatus == 'loading'"></view>
		<view class="loadfail-img" :style="failStyle" v-else-if="loadStatus == 'failed'"></view>
		<!-- #ifndef APP-PLUS-NVUE -->
		<image
			class="origin-img"
			:src="native"
			:webp="webp"
			:mode="mode"
			:fade-show="'fade-show'"
			:lazy-load="'lazy-load'"
			:show-menu-by-longpress="'show-menu-by-longpress'"
			:class="{ 'no-transition': !openTransition, 'show-transition': showTransition && openTransition }"
			@load="load($event)"
			@error="error($event)"
			@tap="previewImage"
		></image>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS-NVUE -->
		<image
			class="origin-img no-transition"
			:src="native"
			:webp="webp"
			:mode="mode"
			:fade-show="'fade-show'"
			:lazy-load="'lazy-load'"
			:show-menu-by-longpress="'show-menu-by-longpress'"
			@load="load"
			@error="error"
			@tap="previewImage"
		></image>
		<!-- #endif -->
	</view>
</template>
<script>
import { imageCache } from './js/imageCache.js';
export default {
	props: {
		src: {
			type: String
		},
		webp: {
			type: Boolean,
			default: false
		},
		loadingStyle: {
			type: Object,
			default:function(){
				return {}
			}
		},
		failStyle: {
			type: Object,
			default:function(){
				return {}
			}
		},
		mode: {
			type: String,
			default: 'scaleToFill'
		},
		"show-menu-by-longpress": {
			type: Boolean,
			default: false
		},
		"fade-show": {
			type: Boolean,
			default: true
		},
		"lazy-load": {
			type: Boolean,
			default: true
		},
		isPreview: {
			type: Boolean,
			default: false
		},
		loadingMode: {
			type: String,
			default: 'looming-gray'
		},
		openTransition: {
			type: Boolean,
			default: true
		},
		placeholder: {
			type: String,
			default: ''
		},
		
	},
	data() {
		return {
			native: '',
			showImg: false,
			loadStatus: 'loading', ///加载中，加载成功，加载失败
			showTransition: false
		};
	},
	watch: {
		src: function(n, o) {
			n && this.convert(n);
		}
	},
	methods: {
		convert(src) {
			//#ifndef H5
				if (src.match(/(http:|https:)/)) {
					const native = imageCache(src, e => {
						this.native = e;
						console.log(e);
						this.$emit('loadCompleted', e);
					});
					if (native != src) this.native = native;
				} else {
					this.native = src;
				}		
			//#endif
			//#ifdef H5
			    this.native = src;
			//#endif
		},
		previewImage() {
			this.$emit('previewImage',this.native);
			if (!this.isPreview) {
				return;
			}
			uni.previewImage({
				count: 1,
				current: 0,
				urls: [this.native]
			});
		},
		load(e) {
			this.loadStatus = 'loaded';
			this.showImg = true;
			let t = setTimeout(() => {
				this.showTransition = true;
				clearTimeout(t);
			}, 50);
			this.$emit('load',e);
		},
		error(e) {
			console.log(e);
			this.loadStatus = 'failed';
			this.$emit('error',e);
		}
	},
	created() {
		this.convert(this.src);
	},
	mounted() {}
};
</script>

<style scoped>

.cache-loadimage{
	position: relative;
}
.loading-img,.loadfail-img{
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	width: 100%;
	height: 100%;
}
/* 官方优化图片tips */
image {
	will-change: transform;
}
/* 渐变过渡效果处理 */
image.origin-img {
	width: 100%;
	height: 100%;
	opacity: 0;
}
image.origin-img.show-transition {
	transition: opacity 1.2s;
	opacity: 1;
}
image.origin-img.no-transition {
	opacity: 1;
}
/* 加载失败、加载中的占位图样式控制 */
.loadfail-img {
	height: 100%;
	background: url('./easy-loadimage/loadfail.png') no-repeat center;
	background-size: 50%;
	background-color: #e3e3e3;
	/* animation: looming-gray 3s infinite linear; */
}

/* 转圈 */
.loading-img {
	height: 100%;
	background: url('./easy-loadimage/loading.gif') no-repeat center;
	background-size: 100rpx;
}
/* 动态灰色若隐若现 */
.looming-gray {
}
@keyframes looming-gray {
	0% {
		background-color: #e3e3e3aa;
	}
	50% {
		background-color: #e3e3e3;
	}
	100% {
		background-color: #e3e3e3aa;
	}
}
/* 骨架屏1 */
.skeleton-1 {
	background-color: #e3e3e3;
	background-image: linear-gradient(100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 80%);
	background-size: 100rpx 100%;
	background-repeat: repeat-y;
	background-position: 0 0;
	animation: skeleton-1 0.6s infinite;
}
@keyframes skeleton-1 {
	to {
		background-position: 200% 0;
	}
}
/* 骨架屏2 */
.skeleton-2 {
	background-image: linear-gradient(-90deg, #fefefe 0%, #e6e6e6 50%, #fefefe 100%);
	background-size: 400% 400%;
	background-position: 0 0;
	animation: skeleton-2 1.2s ease-in-out infinite;
}
@keyframes skeleton-2 {
	to {
		background-position: -135% 0;
	}
}
</style>

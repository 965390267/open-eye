<template>
	<view class="home-banner">
		<swiper class="swiper" circular  autoplay interval="7000" @change="onSwiperChange">
			<swiper-item class="item" v-for="(item, index) in list" :key="index">
				<cache-image class="pic"  :src="item.cover.feed" mode="aspectFill" @click="navTo(item.link)"></cache-image>
			 <div class="title">{{item.title}}</div>
			</swiper-item>
		</swiper>
		<view class="dots row center"><view class="dot" :class="{ current: current === index }" v-for="(item, index) in list" :key="index"></view></view>
	</view>
</template>

<script>
	import CacheImage from '../../../../../components/cache-image/cache-image.vue'
export default {
	name: 'HomeBanner',
	components:{
		CacheImage
	},
	data() {
		return {
			current: 0,
			list1: [
				{ image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2221182985,1875035766&fm=26&gp=0.jpg' },
				{ image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544696267,4055569904&fm=26&gp=0.jpg' },
				{ image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2573133749,533767849&fm=26&gp=0.jpg' }
			]
		};
	},
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		onSwiperChange(e) {
			this.current = e.detail.current;
		}
	}
};
</script>

<style scoped lang="scss">
.home-banner {
	position: relative;
	background-color: #fff;
}
.swiper {
	width: 100%;
	height: 440rpx;
}
.item{
	position: relative;
}
.title{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50rpx;
	padding-left: 10rpx;
	background: rgba(0,0,0,.5);
	color: #fafafa;
	font-size: 24rpx;
}
.pic {
	width: 100%;
	height: 100%;
}
.dots {
	position: absolute;
	right: 0;
	bottom: 16rpx;
	width: 160rpx;
	.dot {
		width: 14rpx;
		height: 14rpx;
		margin: 0 6rpx;
		background-color: #fff;
		border-radius: 10px;
	
		&.current {
			background-color: $base-color;
		}
	}
}

</style>

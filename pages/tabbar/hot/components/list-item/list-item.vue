<template>
	<view class="item" >
		<view class="txt" >
			<view class="desc">{{ data.title }}</view>
			<view class="type-d">"# {{ data.category }} / {{ data.duration | duration(data.duration) }}"</view>
		</view>
		<CacheImage class="pic" :src="data.cover.feed"></CacheImage>
	</view>
</template>

<script>

import CacheImage from '@/components/cache-image/cache-image.vue';
export default {
	components: {
		CacheImage
	},
	props:{
		data:Object
	},
	data() {
		return {
			
		};
	}
};
</script>
<style scoped lang="scss">
	.item{
		position: relative;
		.pic{
			height: 440rpx;
		}
		
		.txt{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 9;
			.desc{
				font-size: 28rpx;
				color: #fff;
				font-weight: bold;
				text-align: center;
				padding-top: 160rpx;
			}
			.type-d{
				font-size: 24rpx;
				color: #fff;
				text-align: center;
				padding-top: 20rpx;
			}
		}
		
	}
</style>

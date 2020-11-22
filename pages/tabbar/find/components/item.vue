<template>
	<view class="item">
		<CacheImage class="pic" :src="data.cover.feed"></CacheImage>
		<view class="txt">
			<view class="desc clamp">{{ data.title }}</view>
			<view class="type-d clamp2">"# {{ data.category }} / {{ data.duration | duration(data.duration) }}"</view>
		</view>
	</view>
</template>

<script>
import CacheImage from '@/components/cache-image/cache-image.vue';
export default {
	components: {
		CacheImage
	},
	props: {
		data: Object
	},
	data() {
		return {};
	}
};
</script>
<style scoped lang="scss">
.item {
	display: inline-block;
	position: relative;
	padding: 10rpx 0;
	.pic {
		width: 400rpx;
		height: 240rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.txt {
		width: 200rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		.desc {
			font-size: 24rpx;
			color: #333;
			padding-top: 10rpx;
		}
		.type-d {
			font-size: 20rpx;
			color: #333;
			padding-top: 10rpx;
		}
	}
}
</style>

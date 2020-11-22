<template>
	<view class="video-item">
		<cache-image class="pic" :src="data.cover.detail"></cache-image>
		<view class="desc-wrap">
			<view class="title">{{ data.title }}</view>
			<view class="type">
				#{{ data.category }}
				<text>{{ data.duration | duration(data.duration) }}</text>
			</view>
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
	},
	mounted() {
		console.log(this.data);
	}
};
</script>

<style scoped lang="scss">
.video-item {
	display: flex;
	flex-direction: row;
	padding: 30rpx 0;
	margin: 0 40rpx;
	border-bottom: 1px solid #aeaeae;
}
.pic {
	width: 200rpx;
	height: 100rpx;
	border-radius: 10rpx;
	overflow: hidden;
}

.desc-wrap {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 16rpx;
	.title {
		font-size: 28rpx;
		color: #fff;
	}
	.type {
		font-size: 24rpx;
		color: #eaeaea;
	}
}
</style>

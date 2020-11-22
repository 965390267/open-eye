<template>
	<view class="video-item">
		<cache-image class="pic" :src="data.cover.feed"></cache-image>
		<view class="note">
			<view class="avator"><cache-image class="avator-icon" :src="data.author.icon"></cache-image></view>
			<view class="desc-wrap">
				<view class="title">{{ data.title }}</view>
				<view class="sub-tit">
					<template v-for="(item, index) in data.tags">
						<text v-if="index == 0">#{{ item.name }}/</text>
						<text v-else>{{ item.name }}/</text>
					</template>
					<text>{{data.duration|duration(data.duration)}}</text>
				</view>
			</view>
			<view class="type">#{{ data.category }}</view>
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
.pic {
	height: 400rpx;
}
.note {
	position: relative;
	display: flex;
	align-items: center;
	padding: 10rpx 0;
	padding-right: 16rpx;
	background: #fff;
}
// .note::after{
// 	content: '';
// 	position: absolute;
// 	left: 0;
// 	bottom: 0;
// 	background: #fff;
// 	filter: blur(2rpx);
// }
.avator-icon {
	margin-left: 16rpx;
	width: 60rpx;
	height: 60rpx;
	border-radius: 100%;
	overflow: hidden;
}
.desc-wrap {
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-left: 16rpx;
	.title {
		font-size: 28rpx;
		color: #666;
	}
	.sub-tit {
		width: 560rpx;
		font-size: 24rpx;
		color: #999;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
}
.type {
	font-size: 24rpx;
	color: #999;
}
</style>

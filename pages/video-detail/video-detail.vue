<template>
	<view class="video-detail">
		<video class="video-wrap" autoplay :poster="data.cover.feed" :src="data.playUrl" controls></video>
		<view class="list-wrap">
			<image class="img1" :src="data.cover.feed" mode="aspectFill"></image>
			<scroll-view class="desc-list" scroll-y="true" scroll-with-animation="true">
				<view class="desc">
					<view class="desc-wrap">
						<view class="title">{{ data.title }}</view>
						<view class="type">#{{ data.category }}/{{ data.duration | duration(data.duration) }}</view>
						<view class="desc-text">{{ data.description }}</view>
						<view class="like-wrap"><image class="like" src="/static/common/like.png" mode="aspectFill"></image>{{ data.consumption.collectionCount }}</view>
					</view>
				</view>
				<view class="lanmu">
					<view class="avator"><cache-image class="avator-icon" :src="data.author.icon"></cache-image></view>
					<div class="lanmu-type">
						<view class="lanmu-type1">{{ data.author.name }}</view>
						<view class="lanmu-type2">{{ data.author.description }}</view>
					</div>
				</view>
				<view v-for="item in list" :key="item.data.id">
					<view class="types" v-if="item.type == 'textCard'">{{ item.data.text }}</view>
					<ListItem @click.native="toDetail(item.data)" v-else-if="item.type == 'videoSmallCard'" :data="item.data"></ListItem>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import CacheImage from '@/components/cache-image/cache-image.vue';
import ListItem from './components/list-item/list-item.vue';
export default {
	components: {
		CacheImage,
		ListItem
	},
	props: {},
	onLoad(data) {
		// 保持屏幕常亮
		uni.setKeepScreenOn({
			keepScreenOn: true
		});
		this.data = getApp().globalData.parms;
		this.$http.VideoDetail.getRelatedData(this.data.id).then(res => {
			console.log(res);
			this.list = res.itemList;
		});
	},
	data() {
		return {
			data: {},
			list: []
		};
	},
	methods: {
		toDetail(data) {
			console.log(data);
			getApp().globalData.parms = data;
			uni.redirectTo({
				url: '/pages/video-detail/video-detail'
			});
		}
	},
	onHide() {
		// 保持屏幕常亮
		uni.setKeepScreenOn({
			keepScreenOn: false
		});
	},
	mounted() {
		// console.log(getApp().globalData.parms);
	}
};
</script>

<style scoped lang="scss">
.lanmu {
	display: flex;
	align-items: center;
	padding: 30rpx 20rpx;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	.avator-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		overflow: hidden;
	}
	.lanmu-type {
		margin-left: 20rpx;
		.lanmu-type1 {
			font-size: 26rpx;
			color: #fff;
		}
		.lanmu-type2 {
			padding-top: 8rpx;
			font-size: 22rpx;
			color: #fafafa;
		}
	}
}
.like-wrap{
	display: flex;
	align-items: center;
	color: #eee;
	font-size: 26rpx;
}
.like{
	width: 40rpx;
	height: 40rpx;
	margin-right: 10rpx;
}
.video-detail {
	display: flex;
	flex-direction: column;
	height: 100vh;
}
.video-wrap {
	position: relative;
	margin-top: var(--status-bar-height);
	width: 100%;
	height: 420rpx;
}
.list-wrap {
	position: relative;
	flex: 1;
	overflow: hidden;
	.img1 {
		display: block;
		width: 100%;
		height: 100%;
		box-sizing: content-box;
		padding: 40px 30px;
		position: absolute;
		z-index: 0;
		top: -40px;
		left: -30px;
		filter: blur(100rpx);
	}
}
.desc-list {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: transparent;
}
.desc {
	position: relative;
	display: flex;
	flex-direction: row;
	padding: 20rpx;
	background: rgba(0, 0, 0, 0.1);
}

.desc-wrap {
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-left: 16rpx;
	.title {
		font-size: 28rpx;
		color: #fefefe;
	}
	.type {
		padding-top: 20rpx;
		font-size: 24rpx;
		color: #f1f1f1;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.desc-text {
		padding-top: 20rpx;
		font-size: 22rpx;
		line-height: 38rpx;
		color: #f1f1f1;
	}
}
.types {
	font-size: 28rpx;
	color: #fff;
	padding-top: 10rpx;
	padding-left: 40rpx;
}
</style>

<template>
	<view>
		<view class="status-bar">
			
		</view>
		<view class="lanmu-item" v-for="(item1, j) in dataList" :key="item1.header.id + '' + j">
			<view class="lanmu">
				<view class="title">
					<CacheImage class="avator" :src="item1.header.icon"></CacheImage>
					<view class="rt">
						<view class="h1 ">{{ item1.header.title }}</view>
						<view class="des clamp2">{{ item1.header.description }}</view>
					</view>
				</view>
				<scroll-view enable-flex="true" class="scroll-view_H" scroll-x="true">
					<Item @click.native="toDetail(item2.data)" class="x-item" :data="item2.data" v-for="(item2, i) in item1.itemList" :key="item2.data.id + '' + i"></Item>
				</scroll-view>
			</view>
		</view>
		<view class="nodata">
			<text class="txt">{{ loadMoreText }}</text>
		</view>
	</view>
</template>

<script>
import Item from './components/item.vue';
import CacheImage from '@/components/cache-image/cache-image.vue';
export default {
	components: { Item, CacheImage },
	data() {
		return {
			nextPageUrl: '',
			dataList: [],
			refreshing: false,
			loadMoreText: '加载中...',
			hasData: false
		};
	},
	onLoad() {
		this.init();
	},
	onPullDownRefresh() {
		console.log('下拉刷新');
		this.refreshing = true;
		this.init();
	},
	onReachBottom() {
		console.log('上拉加载刷新');
		if (!this.hasData) {
			this.loadMoreText = '我也是有底线的~';
			return;
		}
		this.getFollowInfo(this.nextPageUrl);
		// this.getData();
	},
	methods: {
		toDetail(data) {
			console.log(data);
			getApp().globalData.parms = data;
			uni.navigateTo({
				url: '/pages/video-detail/video-detail'
			});
		},
		getFollowInfo(url) {
			this.$http.FIND.getFollowInfoNext(url)
				.then(res => {
					// console.log(res);
					const list = res.itemList.map(item => item.data);
					const nextUrl = res.nextPageUrl;
					console.log(nextUrl);
					this.dataList = this.dataList.concat(list);

					if (nextUrl) {
						this.nextPageUrl = nextUrl;
						this.hasData = true;
					} else {
						this.hasData = false;
					}
				})
				.catch(e => {
					console.log(e);
				});
		},
		//getFollowInfoNext
		init() {
			this.$http.FIND.getFollowInfo().then(res => {
				const list = res.itemList.map(item => item.data);
				console.log(list);
				const nextUrl = res.nextPageUrl;
				
				this.dataList = list;
				if (nextUrl) {
					this.nextPageUrl = res.nextPageUrl;
					this.hasData = true;
				} else {
					this.hasData = false;
				}
				if (this.refreshing) {
					this.refreshing = false;
					uni.stopPullDownRefresh();
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.status-bar{
		height: var(--status-bar-height);//设置状态栏高度为状态栏的高度
		//状态栏高度的获取方式为：--status-bar-height
		width:750rpx;
		background:#fff;
		position: fixed;//固定定位，能够让占位标签始终占据状态栏的部分，背景颜色与导航栏颜色一致，是为了美观
		top:0;
		left:50%;
		transform: translateX(-50%);
		z-index:99;
	}
.lanmu-item {
	padding-top:20rpx;
	margin: 50rpx 20rpx;
}
.title {
	display: flex;
	align-items: center;
	padding: 6rpx 20rpx;
	.avator {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
		overflow: hidden;
	}
	.rt {
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		.h1 {
			font-size: 28rpx;
			color: #555;
		}
		.des {
			font-size: 24rpx;
			color: #555;
		}
	}
}
.scroll-view_H {
	white-space: nowrap;
}
.x-item {
	margin-left: 20rpx;
}
.nodata {
	width: 100%;
	display: flex;
	justify-content: center;

	.txt {
		text-align: center;
		font-size: 24rpx;
		color: #aaa;
	}
}
</style>

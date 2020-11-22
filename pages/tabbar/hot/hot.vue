<template>
	<view class="tab">
		<view class="status-bar"></view>
		<TabBar
			class="tabbar"
			activeColor="#e4113f"
			:current="current"
			:values="tabName"
			bgc="#fff"
			:fixed="true"
			:top="systemInfo.statusBarHeight"
			:scrollFlag="true"
			:isEqually="false"
			@clickItem="onClickItem"
		></TabBar>
		<view class="tab-swiper">
			<swiper class="swiper" @change="scollSwiper" :current="current">
				<swiper-item class="s-item" v-for="(item1, index) in tablist" :key="item1.name" >
					<Item @click.native="toDetail(item2.data)" :data="item2.data" v-for="(item2, index) in item1.childList" :key="item2.data.id"></Item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import TabBar from '@/components/tabbar/tabbar';
import CacheImage from '@/components/cache-image/cache-image.vue';
import Item from './components/list-item/list-item.vue';
export default {
	components: {
		TabBar,
		CacheImage,
		Item
	},
	data() {
		return {
			current: 0,
			tabName:[],
			tablist: [],
			tablistUrl: [],
			list: []
		};
	},
	created() {
		this.$http.HOT.getRankList().then(res => {
			console.log(res);
			this.tabName=res.tabInfo.tabList.map(item => item.name);
			this.tablist = res.tabInfo.tabList.map(item =>{return{ name:item.name,childList:[]}});
			this.tablistUrl = res.tabInfo.tabList.map(item => item.apiUrl);
			this.getTabRankList(res.tabInfo.tabList[0].apiUrl, 0);
		});
	},
	methods: {
		toDetail(data) {
			console.log(data);
			getApp().globalData.parms = data;
			uni.navigateTo({
				url: '/pages/video-detail/video-detail'
			});
		},
		getTabRankList(url, index) {
			this.$http.HOT.getOneRankList(url).then(res => {
				console.log(res);
				if(this.tablist[index].childList.length>0)return;
				this.tablist[index].childList = res.itemList;
				// this.list = res.itemList;
			});
		},
		onClickItem(val) {
			console.log(val);
			this.current = val.currentIndex;
			this.getTabRankList(this.tablistUrl[this.current],this.current);
		},
		scollSwiper(e) {
			this.current = e.target.current;
			this.getTabRankList(this.tablistUrl[this.current],this.current);
		}
	}
};
</script>

<style lang="scss" scoped>
.status-bar {
	height: var(--status-bar-height); //设置状态栏高度为状态栏的高度
	//状态栏高度的获取方式为：--status-bar-height
	width: 750rpx;
	background: #fff;
	position: fixed; //固定定位，能够让占位标签始终占据状态栏的部分，背景颜色与导航栏颜色一致，是为了美观
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 99;
}
.tab {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}

.tab-swiper {
	display: flex;
	height: 100%;
	margin-top:140rpx;
}
.swiper {
	position: relative;
	width: 100%;
	height: 100%;
}

.s-item {
	height: 100%;
	overflow-y: auto;
}
</style>

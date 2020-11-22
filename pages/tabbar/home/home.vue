<template>
	<view class="container">
		<!-- <page-header :showFillView="true"></page-header> -->
		<Banner :list="bannerData"></Banner>
		<!-- <SpliceImg class="SpliceImg" src="http://cdn.yishilvyou.com/upload/userfile/68/page/image/2020-10-15/727902f1017640afb2171767f84b9e80.jpg"></SpliceImg> -->
		<view class="list"  :key="item.data.id+''+index"  v-for="(item, index) in homelist">
			<DateItem v-if="item.type == 'textHeader'"></DateItem>
			<VideoItem @click.native="toDetail(item.data)" :data="item.data" v-else-if="item.type == 'video'"></VideoItem>
		</view>
		<view class="nodata">
			<text class="txt">{{loadMoreText}}</text>
		</view>
	</view>
</template>

<script>
import SpliceImg from './components/splice-img/splice-img.vue';
import pageHeader from './components/page-header/page-header.vue';
import Banner from './components/banner/banner.vue';
import VideoItem from './components/list-item/video-item.vue';
import DateItem from './components/list-item/date-item.vue';
export default {
	components: {
		pageHeader,
		Banner,
		SpliceImg,
		VideoItem,
		DateItem
	},
	data() {
		return {
			bannerData: [],
			homelist: [],
			hasData: false,
			refreshing: false,
			loadMoreText: '加载中...',
			nextUrl:''
		};
	},
	filters: {
		filter() {
			return '';
		}
	},
	onPullDownRefresh() {
		console.log('下拉刷新');
		this.refreshing = true;
		this.banner();
	},
	onReachBottom() {
		console.log('上拉加载刷新');
		if (!this.hasData) {
			this.loadMoreText = '我也是有底线的~';
			return;
		}
		let { date, num } = this.parseParm(this.nextUrl)
		this.list(date, num);
	},
	onLoad() {
		this.banner();
	},
	methods: {
		toDetail(data){
			console.log(data);
			getApp().globalData.parms = data;
			uni.navigateTo({
				url:'/pages/video-detail/video-detail',			
			})
		},
	
		banner() {
			this.$http.HOME.getFirstHomeData()
				.then(res => {
					console.log(res);
					const list = res.issueList[0].itemList;
					const nextUrl = res.nextPageUrl;
					const banner = list.filter(item => item.type === 'video').map(item => item.data);
					this.bannerData = banner;					
					let { date, num } = this.parseParm(nextUrl)
					this.list(date, num,true);
				})
				.catch(e => {
					console.log(e);
				});
		},
		parseParm(url){
			const parmsStr = url.split('?')[1];
			let obj = {};
			parmsStr.split('&').forEach(item => {
				obj[item.split('=')[0]] = item.split('=')[1];
			});
			return obj
		},
		list(date, num,reflush) {
			this.$http.HOME.getFirstHomeData(date, num)
				.then(res => {
					// console.log(res);
					const list = res.issueList[0].itemList;
					const nextUrl = res.nextPageUrl;
					// const banner=list.filter(item=>item.type==='video').map(item=>item.data)
					console.log(list);
					if(reflush){
						this.homelist =[]
					}
					this.homelist =this.homelist.concat(list);

					if(nextUrl){
						this.nextUrl=nextUrl;
						this.hasData=true
					}else{
						this.hasData=false
					}
					if (this.refreshing) {
						this.refreshing=false;
						uni.stopPullDownRefresh();
					}
				})
				.catch(e => {
					console.log(e);
				});
		}
	},
	mounted() {
		
		// console.log(this.aCache);
		// console.log(this.$zzhutil.prePage(1));
	}
};
</script>

<style lang="scss">
.container {
	/* padding: 20px; */
	font-size: 14px;
	line-height: 24px;
}

.nodata{
	width: 100%;
	display: flex;
	justify-content: center;
	
	.txt{
		text-align: center;
		font-size: 24rpx;
		color: #aaa;
	}
}
.list{
	// padding-top: 40px;
	// height: 0%;
}
 @keyframes one-in {//列表进场动画
	from {
		padding-top: 40px;
		height: 0%;
	}
	to {
		padding-top: 0px;
		height: 100%;
	}
}
</style>

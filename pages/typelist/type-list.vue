<template>
	<view class="container">
		<Item @click.native="toDetail(item.data)" :data="item.data" v-for="item in typelist"></Item>
	<view class="nodata">
		<text class="txt">{{loadMoreText}}</text>
	</view>
	</view>
</template>

<script>
import Item from './components/item/item.vue'
export default {
	components: {
		Item
	},
	data() {
		return {
			initid:0,
			typelist: [],
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
		this.init(this.initid);
	},
	onReachBottom() {
		console.log('上拉加载刷新');
		if (!this.hasData) {
			this.loadMoreText = '我也是有底线的~';
			return;
		}
		this.list(this.nextUrl)
		// this.getData();
	},
	onLoad(p) {			console.log(p);			const id=p.id;
			this.initid=id;			this.init(id)		},
	methods: {
		toDetail(data){
			console.log(data);
			getApp().globalData.parms = data;
			uni.navigateTo({
				url:'/pages/video-detail/video-detail',			
			})
		},		
		parseParm(url){
			const parmsStr = url.split('?')[1];
			let obj = {};
			parmsStr.split('&').forEach(item => {
				obj[item.split('=')[0]] = item.split('=')[1];
			});
			return obj
		},
         init(id){
			this.$http.TYPE.getCategoryDetailList(id)
				.then(res => {
					// console.log(res);
					const list = res.itemList;
					const nextUrl = res.nextPageUrl;
					console.log(list);
					this.typelist =list
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
		 },
		list(url) {
			this.$http.TYPE.getCategoryDetailListMore(url)
				.then(res => {
					// console.log(res);
					const list = res.itemList;
					const nextUrl = res.nextPageUrl;
					// const banner=list.filter(item=>item.type==='video').map(item=>item.data)
					console.log(list);
					this.typelist =this.typelist.concat(list);					
					if(nextUrl){
						this.nextUrl=nextUrl;
						this.hasData=true
					}else{
						this.hasData=false
					}
					
				})
				.catch(e => {
					console.log(e);
				});
		}
	},
	mounted() {

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


</style>

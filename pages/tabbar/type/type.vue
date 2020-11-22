<template>
	<view class="g-list">
		<view class="status-bar">
			
		</view>
		<uni-grid :column="2" :show-border="false" :highlight="true">
			<uni-grid-item @click.native="toList(item.id)" :key="item.id"  class="item" v-for="item in list">
				<view class="txt">
				# {{item.name}}
				</view>
				<CacheImage class='pic' :src="item.headerImage||item.bgPicture"></CacheImage>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import TabBar from '@/components/tabbar/tabbar'
	import CacheImage from '@/components/cache-image/cache-image.vue';
	export default{
		components:{
			TabBar,
			CacheImage
		},
		data(){
			return{
				current:0,
				tablist:[],
				tablistUrl:[],
				list:[]
			}
		},
		onLoad() {
			this.getTabRankList()
		},
		methods:{
			toList(id){
				console.log(id);
				uni.navigateTo({
					url:'/pages/typelist/type-list?id='+id,			
				})
			},
			toDetail(data){
				console.log(data);
				getApp().globalData.parms = data;
				uni.redirectTo({
					url:'/pages/video-detail/video-detail',			
				})
			},
			getTabRankList(){
				this.$http.TYPE.getCategory().then(res=>{
					console.log(res);
					this.list=res;
				})
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
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
.g-list{
	padding: 10rpx 16rpx;
	.item{
		position: relative;
		padding: 8rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.txt{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		font-size: 32rpx;
		font-weight: bold;
		color: #fff;
		z-index: 2;
	}
	.pic{
		width: 100%;
		height: 100%;
	}
}
</style>


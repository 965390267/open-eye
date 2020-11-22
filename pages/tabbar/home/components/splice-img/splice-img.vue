<template>
	<view class="splice-img">
		<view class="splice-img-lf" :style="{ backgroundImage: 'url(' + src + ')' }"></view>
		<view class="splice-img-rt">
			<view class="splice-img-rt-t" :style="{ backgroundImage: 'url(' + src + ')' }"></view>
			<view class="splice-img-rt-b" :style="{ backgroundImage: 'url(' + src + ')' }"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'HomeBanner',
	components: {},
	props: {
		src: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.splice-img {
	min-height: 200rpx;
	display: flex;
	.splice-img-lf,
	.splice-img-rt {
		flex: 1;
	}
	.splice-img-lf {
		margin-right: 2%;
		// background-image: url('http://img.zangzhihong.com/background1.jpg');
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: 200% 100%;
		border-radius: 30rpx;
	}
	.splice-img-rt {
		margin-left: 2%;
		display: flex;
		flex-direction: column;
	}
	.splice-img-rt-t {
		margin-bottom: 4%;
		flex: 1;
		border-radius: 30rpx;
		// background-image: url('http://img.zangzhihong.com/background1.jpg');
		background-position: 100% 0%;
		background-repeat: no-repeat;
		background-size: 200% 200%;
	}
	.splice-img-rt-b {
		margin-top: 4%;
		flex: 1;
		border-radius: 30rpx;
		// background-image: url('http://img.zangzhihong.com/background1.jpg');
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: 200% 200%;
	}
}
</style>

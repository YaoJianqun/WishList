<template>
	<view class="header-wrapper">
		<view class="back" @click="handleBackClick">
			<view class="icon iconfont iconleft"></view>
		</view>
		<view class="title">
			{{taskName}}
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'TallyHeader',
		props: {
			taskName: {
				type: String,
				default: '今日'
			}
		},
		methods: {
			handleBackClick () {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		display: flex;
		align-items: center;
		height: 100rpx;
		font-size: 38rpx;
		margin: 118rpx 40rpx 30rpx;
		padding: 0 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.iconleft {
			width: 100rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 38rpx;
			color: #101010;
		}
		.title {
			width: 100%;
			line-height: 100rpx;
			margin-left: -50rpx;
			text-align: center;
		}
	}
</style>

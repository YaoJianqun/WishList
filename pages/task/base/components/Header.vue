<template>
	<view class="header-wrapper">
		<view class="back" @click="handleBackClick">
			<uni-icon type="back" color="#101010" size="24" />
		</view>
		<uni-icon type="back" color="#101010" size="24" />
		<view class="title">
			新任务<uni-icon type="back" color="#101010" size="24" />
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	export default {
		name: 'BaseHeader',
		components: {
			uniIcon
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
		/*display: flex;
		align-items: center;*/
		height: 100rpx;
		font-size: 38rpx;
		margin: 118rpx 40rpx 30rpx;
		padding: 0 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.title {
			width: 100%;
			line-height: 100rpx;
			margin-left: -48rpx;
			text-align: center;
		}
	}
</style>

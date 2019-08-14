<template>
	<view class="dock">
		<view class="item bgcolor success" @click="">下一步</view>
		<view class="item bgcolor danger">取消</view>
	</view>
</template>

<script>
	export default {
		name: 'BaseDock',
		methods: {
			handleNextClick () {
				uni.navigateTo({
					url: '../../../pages/task/detail/TaskDetail'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dock {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		margin: 0 40rpx;
		.item {
			width: 320rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 20rpx;
			text-align: center;
			color: #fff;
		}
	}
</style>

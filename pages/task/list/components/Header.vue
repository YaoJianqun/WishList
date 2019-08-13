<template>
	<view class="header-wrapper">
		<view class="title">任务</view>
		<view class="button-add" @click="handleAddTaskClick">+</view>
	</view>
</template>

<script>
	export default {
		name: 'TaskListHeader',
		methods: {
			handleAddTaskClick () {
				console.log(666)
				uni.redirectTo({
					url: '../../../pages/task/detail/TaskDetail'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		height: 120rpx;
		padding-top: 88rpx;
		padding-bottom: 30rpx;
		font-size: 68rpx;
		display: flex;
		justify-content: space-between;
		.title {
			margin-left: 40rpx;
			line-height: 120rpx;
		}
		.button-add {
			width: 68rpx;
			height: 68rpx;
			line-height: 56rpx;
			border-radius: 40rpx;
			margin-top: 26rpx;
			margin-right: 60rpx;
			background-color: #fff;
			text-align: center;
			color: #393939;
			text-decoration: none;
		}
	}
</style>

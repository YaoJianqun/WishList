<template>
	<view class="dock-wrapper">
		<view class="dock">
			<view class="item bgcolor success" @click="handleNextClick">下一步</view>
			<view class="item bgcolor danger" @click="handleCancelClick">取消</view>
		</view>
	</view>
</template>

<script>
	
	import { addTaskData } from '@/common/controller/TaskDataController.js'
	
	export default {
		name: 'BaseDock',
		methods: {
			handleNextClick () {
				let temp_task = this.$store.state.task;
				addTaskData(temp_task);
				this.redirectTo();
			},
			handleCancelClick () {
				this.redirectTo();
			},
			redirectTo () {
				uni.redirectTo({
					url: '../../../pages/task/list/TaskList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dock-wrapper {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding-top: 15px;
		padding-bottom: 34px;
		.dock {
			display: flex;
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
	}
</style>

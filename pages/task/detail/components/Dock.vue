<template>
	<view class="dock-wrapper">
		<view class="dock">
			<view class="item bgcolor danger" @click="handleCancelClick">取消</view>
			<view class="item bgcolor success" @click="handleNextClick">完成</view>
		</view>
	</view>
</template>

<script>
	
	import { addOrUpdateTaskData } from '@/common/dataOperate/controller/TaskDataController'
	
	export default {
		name: 'BaseDock',
		methods: {
			handleNextClick () {
				let temp_task = this.$store.state.task;
				addOrUpdateTaskData(temp_task).then(() => {
					this.redirectTo();
				});
			},
			
			handleCancelClick () {
				this.redirectTo();
			},
			
			redirectTo () {
				uni.switchTab({
				    url: '../../../pages/task/list/TaskList'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dock-wrapper {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding-top: 30rpx;
		padding-bottom: 68rpx;
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

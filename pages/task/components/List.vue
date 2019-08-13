<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll">
		
		<view id="demo1" 
					class="task-item"
					v-for="task of taskList"
					:key="task.id"
		>
			<view class="icon iconfont" :class="[task.icon,task.color]"></view>
			<view class="task-info">
				<view class="title" v-text="task.name"></view>
				<view class="info" v-text="taskCompleted(task)"></view>
			</view>
			<label class="radio" style="margin-left: auto;transform:scale(1.28);">
				<radio value="r1" :checked="isCompleted(task)" />
			</label>
			<view class="progress" :class="task.color" :style="{width:taskProgress(task)}"></view>
			<view class="progress bgprogress" :class="task.color"></view>
			
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'TaskList',
		props: {
			taskList: Array
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
				
			}
		},
		computed: {
			
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			taskCompleted (task) {
				return task.completed_count + '/' + task.target_count + task.unit;
			},
			isCompleted (task) {
				return task.completed_count >= task.target_count;
			},
			taskProgress (task) {
				let completed = task.completed_count / task.target_count;
				if(completed > 1){
					completed = 1;
				}
				completed *= 100;
				return completed + '%';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		background-color: #EEE;
		position: absolute;
		top: 238rpx;
		bottom: 200rpx;
		.task-item {
			display: flex;
			align-items: center;
			position: relative;
			padding: 0 30rpx 0 50rpx;
			border-radius: 20rpx;
			height: 180rpx;
			margin: 0 30rpx 30rpx;
			background-color: #fff;
			.iconfont {
				width: 80rpx;
				height: 180rpx;
				line-height: 180rpx;
				font-size: 80rpx;
			}
			.task-info {
				height: 130rpx;
				margin-left: 60rpx;
				.title {
					line-height: 70rpx;
					font-weight: bold;
					font-size: 40rpx;
				}
				.info {
					line-height: 50rpx;
					font-size: 32rpx;
					color: #9B9B9B;
				}
			}
		}
	}
	.progress {
		height: 0rpx;
		border-bottom: 12rpx solid #13CDBB;
		border-bottom-left-radius: 12rpx;
		position: absolute;
		z-index: 2;
		bottom: 0;
		left: 0;
	}
	.bgprogress {
		border-bottom-right-radius: 12rpx;
		width: 100%;
		z-index: 1;
		opacity: 0.3;
	}
</style>

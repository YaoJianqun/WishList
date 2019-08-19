<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll">
		
		<view class="task-item"
					v-for="task of taskList"
					:key="task.id"
					:data-taskid="task.id"
					@click="handleTaskClick(task.id)"
					@touchstart.prevent="handleTouchStart"
					@touchmove="handleTouchMove"
					@touchend="handleTouchEnd"
		>
			<view class="icon iconfont" :class="[task.icon,task.color]"></view>
			<view class="task-info">
				<view class="title" v-text="task.name"></view>
				<view class="info" v-text="taskCompleted(task)"></view>
			</view>
			<label class="radio" style="margin-left: auto;transform:scale(1.28);">
				<radio value="r1" :checked="isCompleted(task)" @click="handleTaskCompletedClick"/>
			</label>
			<view class="progress bdcolor" :class="[task.color, {'completed': isCompleted(task)}]" :style="{width:taskProgress(task)}"></view>
			<view class="progress bgprogress bdcolor" :class="task.color"></view>
			
		</view>
	</scroll-view>
</template>

<script>
	
	import { mapState } from 'vuex'
	
	export default {
		name: 'TaskListContent',
		data() {
			return {
				screenWidth: uni.getSystemInfoSync().windowWidth,
				touchStatus: false,
				timer: null,
				startX: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			...mapState({
				taskData: state => state.taskData
			}),
			taskList () {
				let temp_taskList = [];
				if (this.taskData.taskIdArray)
					for (let id of this.taskData.taskIdArray) {
						temp_taskList.push(this.taskData.taskObj[id]);
					}
				return temp_taskList;
			}
		},
		methods: {
			handleTouchStart (e) {
			  this.touchStatus = true;
				this.startX = e.touches[0].clientX;
			},
			handleTouchMove (e) {
			  if (this.touchStatus) {
			    if (this.timer) {
			      clearTimeout(this.timer)
			    }
			    this.timer = setTimeout(() => {
			      const touchX = e.touches[0].clientX;
						this.moveProgress.bind(this)(e);
			    }, 16)
			  }
			},
			moveProgress (e) {
				const touchX = e.touches[0].clientX;
				const movePercent = (touchX - this.startX) / (this.screenWidth - 30) * 0.8;
				//获取当前任务
				let taskid = e.currentTarget.dataset.taskid;
				let task = this.taskData.taskObj[taskid];
				
				//获取任务目标数量
				let target_count = task.target_count;
				//计算单步移动数量
				let onStepCount = Math.floor(target_count / 40);
				//真实移动数量
				let moveCount = onStepCount;
				
				
				if (onStepCount < Math.floor(task.target_count * movePercent))
					moveCount = Math.floor(task.target_count * movePercent) - (Math.floor(task.target_count * movePercent)%onStepCount)
				if (movePercent < 0)
					moveCount = Math.floor(task.target_count * movePercent) + (Math.abs(Math.floor(task.target_count * movePercent))%onStepCount) 
					
				
				task.completed_count += moveCount;
				if (task.completed_count > task.target_count)
					task.completed_count = task.target_count
				if (task.completed_count < 0)
					task.completed_count = 0
				this.startX = touchX;
			},
			handleTouchEnd () {
			  this.touchStatus = false
			},
			handleTaskClick (taskId) {
				
				uni.navigateTo({
					url: '../../../pages/task/base/TaskBase?taskId=' + taskId
				});
			},
			handleTaskCompletedClick () {
				
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
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
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
	.progress.completed, .bgprogress {
		border-bottom-right-radius: 12rpx;
	}
	.bgprogress {
		width: 100%;
		z-index: 1;
		opacity: 0.2;
	}
</style>

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
			<view class="task-icon icon iconfont" :class="[task.icon,task.color]"></view>
			<view class="task-info">
				<view class="title" v-text="task.name"></view>
				<view class="info" v-text="taskCompleted(task)"></view>
			</view>
			<label class="radio" style="margin-left: auto;transform:scale(1.28);">
				<radio value="r1" :checked="isCompleted(task)" @click.stop="handleTaskCompletedClick(task.id)"/>
			</label>
			<view class="progress bdcolor" :class="[task.color, {'completed': isCompleted(task)}]" :style="{width:taskProgress(task)}"></view>
			<view class="progress bgprogress bdcolor" :class="task.color"></view>
			<view class="task-menu task-edit bgcolor warning">
				<view class="menu-icon icon iconfont iconpencil"></view>
				<view class="menu-title">编辑</view>
			</view>
			<view class="task-menu task-delete bgcolor danger">
				<view class="menu-icon icon iconfont icontrash"></view>
				<view class="menu-title">删除</view>
			</view>
			
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
				scrollDirection: null,
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
						if (touchX !== this.startX && this.scrollDirection == null) {
							if (touchX > this.startX)
								this.scrollDirection = true;
							else
								this.scrollDirection = false;
						}
						
						if (this.scrollDirection)
							this.moveProgress.bind(this)(e);
						else
							this.editTask.bind(this)(e);
							
						return;
			    }, 16)
			  }
			},
			editTask (e) {
				console.log('edittask')
			},
			moveProgress (e) {
				const touchX = e.touches[0].clientX;
				const movePercent = (touchX - this.startX) / (this.screenWidth - 30);
				//获取当前任务
				let taskid = e.currentTarget.dataset.taskid;
				let task = this.taskData.taskObj[taskid];
				
				//获取任务目标数量
				let target_count = task.target_count;
				//计算单步移动数量
				let onStepCount = Math.floor(target_count / 50);
				//真实移动数量
				let moveCount = onStepCount;
				
				let temp_moveCount = Math.floor(task.target_count * movePercent);
				if (onStepCount < temp_moveCount)
					moveCount = temp_moveCount - (temp_moveCount%onStepCount)
				if (movePercent < 0) {
					moveCount = temp_moveCount + (Math.abs(temp_moveCount)%onStepCount)
					if (moveCount === 0) moveCount = -onStepCount;
				}
					
				task.completed_count += moveCount;
				if (task.completed_count > task.target_count)
					task.completed_count = task.target_count
				if (task.completed_count < 0)
					task.completed_count = 0
				this.startX = touchX;
			},
			handleTouchEnd () {
			  this.touchStatus = false;
				this.startX = 0;
				this.scrollDirection = null;
			},
			handleTaskClick (taskId) {
				uni.navigateTo({
					url: '../../../pages/task/base/TaskBase?taskId=' + taskId
				});
			},
			handleTaskCompletedClick (taskId) {
				let task = this.taskData.taskObj[taskId];
				if (this.isCompleted(task)) 
					task.completed_count = 0;
				else
					task.completed_count = task.target_count;
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
			.task-icon {
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
			right: 420rpx;
			.task-menu {
				position: absolute;
				right: -210rpx;
				top: 0;
				
				display: flex;
				flex-direction: column;
				justify-content: center;
				
				width: 180rpx;
				height: 180rpx;
				text-align: center;
				color: #fff;
				border-radius: 20rpx;
				font-size: 38rpx;
				.menu-icon {
					font-size: 48rpx;
				}
				.menu-title {
					margin-top: 10rpx;
				}
				&.task-edit {
					z-index: 2;
				}
				&.task-delete {
					z-index: 1;
					right: -420rpx;
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

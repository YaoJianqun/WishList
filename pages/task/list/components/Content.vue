<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll" @click="handleScrollClick">
		
		<view class="task-item"
					v-for="task of taskList"
					:key="task.id"
					:data-taskid="task.id"
					:style="menuMoveTask == task.id ? itemMoveStyle : ''"
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
			<view class="task-menu task-edit bgcolor warning" @click.stop="handleTaskClick(task.id)">
				<view class="menu-icon icon iconfont iconpencil"></view>
				<view class="menu-title">编辑</view>
			</view>
			<view class="task-menu task-delete bgcolor danger" :style="menuMoveTask == task.id ? deleteMoveStyle : ''">
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
				startX: 0,
				startLeftX: 0,
				startRightX: 0,
				timer: null,
				menuMoveTask: '',
				menuState: false,
				menuMoveCount: 0,
				touchStatus: false,
				scrollDirection: '',
				screenWidth: uni.getSystemInfoSync().windowWidth,
				
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			itemMoveStyle () {
				return 'right:' + Math.abs(this.menuMoveCount) + 'rpx;';
			},
			deleteMoveStyle () {
				let moveCount = -210;
				if (this.menuMoveCount < -210) moveCount = this.menuMoveCount;
				return 'right:' + moveCount + 'rpx;'; 
			},
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
			handleScrollClick () {
					this.menuMoveCount = 0;
					this.menuMoveTask = '';
					this.menuState = false;
			},
			handleTouchStart (e) {
			  this.touchStatus = true;
				this.startX = e.touches[0].clientX;
			},
			handleTouchMove (e) {
				//判断是否为滑动状态
			  if (this.touchStatus) {
					//判断是否存在timer，如果有清除未执行timer
			    if (this.timer) {
			      clearTimeout(this.timer)
			    }
					//创建timer延迟16ms执行
			    this.timer = setTimeout(() => {
						//获取当前用户滑动位置
			      const touchX = e.touches[0].clientX;
						//判断如果当前滑动位置与起始位置不同，且滑动方向未空对象
						if (touchX !== this.startX && this.scrollDirection === ''){
							//依据起始位置与当前位置大小判断滑动方向
							touchX > this.startX ? this.scrollDirection = 'left' : this.scrollDirection = 'right';
							if (this.scrollDirection === 'left') {
								this.startLeftX = this.startX;
							} else {
								this.menuState = true;
								this.startRightX = this.startX;
							}
						}
						
						//依据滑动方向与右滑菜单判断执行函数 moveProgress:为改变进度条大小 editTask:为弹出菜单
						this.scrollDirection === 'left'&&!this.menuState ? this.moveProgress(e) : this.editTask(e);
						
			    }, 16)
			  }
			},
			editTask (e) {
				
				let taskid = e.currentTarget.dataset.taskid;
				let task = this.taskData.taskObj[taskid];
				
				const touchX = e.touches[0].clientX;
				let defferenceCount = touchX - this.startRightX;
				if (defferenceCount > 0) defferenceCount = 0;
				let movePercent = defferenceCount / 140;
				
				let temp_moveCount = Math.floor(420 * movePercent);
				
				if (temp_moveCount < -420) temp_moveCount = -420;
				
				this.menuMoveTask = taskid;
				this.menuMoveCount = temp_moveCount;
			},
			moveProgress (e) {
				
				//获取当前位置
				const touchX = e.touches[0].clientX;
				//计算滚动条比例
				let movePercent = (touchX - this.startLeftX) / this.screenWidth;
				//获取当前任务
				let taskid = e.currentTarget.dataset.taskid;
				let task = this.taskData.taskObj[taskid];
				
				//获取任务目标数量
				let target_count = task.target_count;
				//计算单步移动数量
				let min_step = target_count * 0.05;
				min_step > 5 ? min_step = (min_step - min_step%5) : '';
				//计算单步移动数量
				let onStepCount = Math.floor(target_count / min_step);
				//真实移动数量
				let moveCount = onStepCount;
				
				
				//依据移动比例计算真实移动数量
				let temp_moveCount = Math.floor(task.target_count * movePercent);
				
				if (onStepCount < Math.abs(temp_moveCount))
					if (temp_moveCount > 0)
						moveCount = temp_moveCount - (temp_moveCount%onStepCount);
					else
						moveCount = temp_moveCount + (Math.abs(temp_moveCount)%onStepCount);
				else
					//if (temp_moveCount < 0) moveCount *= -1;
					moveCount = 0;
				
				//排除
				if (moveCount >= target_count * 0.1) {
					this.handleTouchEnd();
					return;
				};
				
				task.completed_count += moveCount;
				
				if (task.completed_count > task.target_count)
					task.completed_count = task.target_count
				else if (task.completed_count < 0)
					task.completed_count = 0
				
				this.startLeftX = touchX;
			},
			handleTouchEnd () {
				
				if (this.timer) {
				  clearTimeout(this.timer);
				}
				
			  this.touchStatus = false;
				this.startRightX = this.startLeftX = this.startX = 0;
				if (this.scrollDirection === 'right')
					this.menuMoveCount < -300 ? this.menuMoveCount = -420 : this.menuMoveCount = 0;
					
				this.scrollDirection = '';
				
				if (this.menuMoveCount === -420) this.menuState = true;
				if (this.menuMoveCount === 0) this.menuState = false;
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
			right: 0rpx;
			transition: right 0.4s;
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
					transition: right 0.4s;
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

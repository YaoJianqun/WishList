<template>
	<view class="wrapper">
		<base-header :taskName="taskName" @navigateBack="navigateBack"></base-header>
		<base-info-date @changeInterval="changeInterval" v-if="currentPageInfo === 'clock'"></base-info-date>
		<base-info-score v-if="currentPageInfo === 'score'"></base-info-score>
		<uni-popup :show="show" :type="type" :custom="true" :mask-click="false" ref="tip">
			<view class="uni-tip">
				<view class="uni-tip-title">警告</view>
				<view class="uni-tip-content">您确定暂停当前任务计时并推出吗？</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button bgcolor success" @click="cancel('tip', false)">取消</view>
					<view class="uni-tip-button" @click="cancel('tip', true)">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	
	import Task from '@/common/model/Task'	
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	
	import BaseHeader from './components/Header';
	import BaseInfoDate from './components/InfoDate';
	import BaseInfoScore from './components/InfoScore';
	import { mapState } from 'vuex'
	import { addOrUpdateTaskData } from '@/common/dataOperate/controller/TaskDataController'
	
	export default {
		name: 'TaskTally',
		components: {
			BaseHeader,
			BaseInfoDate,
			BaseInfoScore,
			uniPopup
		},
		
		data() {
			return {
				type: 'center',
				show: false,
				currentPageInfo: '',
				taskId: '',
				taskName: '',
				timerInterval: ''
			}
		},
		
		computed: {
			...mapState({
				task: state => state.task,
				taskData: state => state.taskData
			})
		},
		
		methods: {
			changeInterval (timerInterval) {
				this.timerInterval = timerInterval;
				//return this.saveTask();
			},
			
			navigateBack () {
				if (this.timerInterval)
					this.togglePopup();
				else 
					this.saveTask().then(() => {
						//uni.switchTab({url: '../../../pages/task/list/TaskList'});
						uni.navigateBack();
					});
					
			},
			
			saveTask () {
				if (this.timerInterval) clearInterval(this.timerInterval);
				let temp_task = this.task;
				this.taskData.taskObj[temp_task.id] = temp_task;
				return addOrUpdateTaskData(temp_task);
			},
			
			togglePopup(open) {
				this.$refs['tip'].open();
			},
			
			cancel(type, state) {
				
				this.show = false;
				this.$refs['tip'].close();
				if (state) {
					this.saveTask().then(() => {
						uni.navigateBack();
					});
				} else {
					
				}
				return;
			}
		},
		onLoad (params) {
			let task = null;
			if (params.hasOwnProperty('taskId')) {
				let _this = this;
				this.taskId = params.taskId;
				uni.getStorage({
					key: 'taskData',
					success (res) {
						let temp_task = res.data.taskObj[params.taskId];
						_this.$store.dispatch('changeTask', temp_task)
						_this.taskName = temp_task.name;
						if (temp_task.unit !== '秒' && temp_task.unit !== '分' && temp_task.unit !== '小时') {
							_this.currentPageInfo = 'score';
						} else {
							_this.currentPageInfo = 'clock';
						};
					}
				})
			}
		},
		
		onHide () {
			this.saveTask();
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
		.uni-tip {
			padding: 15px;
			width: 300px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 10px;
			.uni-tip-title {
				text-align: center;
				font-weight: bold;
				font-size: 16px;
				color: #333;
			}
			
			.uni-tip-content {
				padding: 15px;
				font-size: 14px;
				color: #666;
			}
			.uni-tip-group-button {
				margin-top: 10px;
				display: flex;
				.uni-tip-button {
					width: 100%;
					text-align: center;
					font-size: 14px;
					color: #3b4144;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 20rpx;
					&.success {
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
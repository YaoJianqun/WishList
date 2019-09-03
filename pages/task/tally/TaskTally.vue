<template>
	<view class="wrapper">
		<base-header :taskName="taskName" @navigateBack="navigateBack"></base-header>
		<base-info-date @changeInterval="changeInterval" v-if="currentPageInfo === 'clock'"></base-info-date>
		<base-info-score v-if="currentPageInfo === 'score'"></base-info-score>
		<uni-popup :show="show" :type="type" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">警告</view>
				<view class="uni-tip-content">这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('tip', false)">取消</view>
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
	
	import { addOrUpdateTaskData } from '@/common/controller/TaskDataController'
	
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
				type: '',
				show: false,
				currentPageInfo: 'score',
				taskId: '',
				taskName: '',
				timerInterval: ''
			}
		},
		methods: {
			changeInterval (timerInterval) {
				this.timerInterval = timerInterval;
			},
			navigateBack () {
				if (this.timerInterval)
					this.togglePopup('tip');
				else 
					uni.navigateBack();
			},
			saveTask () {
				clearInterval(this.timerInterval);
				let temp_task = this.$store.state.task;
				this.$store.state.taskData.taskObj[temp_task.id] = temp_task;
				addOrUpdateTaskData(temp_task);
			},
			togglePopup(open) {
				this.$refs[open].open()
			},
			cancel(type, state) {
				
				this.show = false
				if (state) {
					this.saveTask();
					setTimeout(function () {uni.navigateBack();}, 400)
				}	
				return
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
						if (temp_task.unit!=='秒'&&temp_task.unit!=='分'&&temp_task.unit!=='小时') _this.currentPageInfo = 'score';
					}
				})
			}
		},
		onBackPress () {
			this.saveTask();
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
				}
			}
		}
	}
</style>
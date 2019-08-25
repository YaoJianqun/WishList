<template>
	<view class="wrapper">
		<base-header :taskName="taskName"></base-header>
		<base-info></base-info>
	</view>
</template>

<script>
	
	import Task from '@/common/model/Task'	
	
	import BaseHeader from './components/Header';
	import BaseInfo from './components/Info';
	
	import { addOrUpdateTaskData } from '@/common/controller/TaskDataController.js'
	
	export default {
		name: 'TaskTally',
		components: {
			BaseHeader,
			BaseInfo
		},
		data() {
			return {
				taskId: '',
				taskName: ''
			}
		},
		methods: {
			saveTask () {
				clearInterval();
				let temp_task = this.$store.state.task;
				this.$store.state.taskData[temp_task.id] = temp_task;
				addOrUpdateTaskData(temp_task);
				
			}
		},
		onLoad (params) {
			console.log(uni.getStorageSync('taskData').taskObj)
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
	}
</style>
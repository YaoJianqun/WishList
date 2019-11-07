<template>
	<view class="wrapper">
		<base-header></base-header>
		<base-info></base-info>
		<base-dock></base-dock>
	</view>
</template>

<script>
	
	import Task from '@/common/model/Task'
	import { queryTaskData } from '@/common/dataOperate/controller/TaskDataController'
	
	import BaseHeader from './components/Header';
	import BaseInfo from './components/Info';
	import BaseDock from './components/Dock';
	
	export default {
		name: 'TaskBase',
		components: {
			BaseHeader,
			BaseInfo,
			BaseDock
		},
		data() {
			return {
				taskId: ''
			}
		},
		onLoad (params) {
			if (params.hasOwnProperty('taskId')) {
				let _this = this;
				this.taskId = params.taskId;
				queryTaskData().then((taskData) => {
					let temp_task = taskData.taskObj[params.taskId];
					this.$store.dispatch('changeTask', temp_task)
				})
				/*uni.getStorage({
					key: 'taskData',
					success (res) {
						let temp_task = res.data.taskObj[params.taskId];
						_this.$store.dispatch('changeTask', temp_task)
					},
					fail () {
						console.log('init taskBase fail')
					}
				})*/
			} else {
				this.$store.dispatch('changeTask', new Task());
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
<template>
	<view class="wrapper">
		<base-header :taskName="taskName"></base-header>
		<base-info></base-info>
		<base-dock></base-dock>
	</view>
</template>

<script>
	
	import Task from '@/common/model/Task'	
	
	import BaseHeader from './components/Header';
	import BaseInfo from './components/Info';
	
	//console.log(new task_test());
	
	export default {
		name: 'TaskBase',
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
					},
					fail () {
						console.log('init taskBase fail')
					}
				})
			} 
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
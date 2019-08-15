<template>
	<view class="wrapper">
		<base-header></base-header>
		<base-info></base-info>
		<base-dock></base-dock>
	</view>
</template>

<script>
	
	import Task from '@/common/model/Task'	
	
	import BaseHeader from './components/Header';
	import BaseInfo from './components/Info';
	import BaseDock from './components/Dock';
	
	//console.log(new task_test());
	
	export default {
		name: 'TaskBase',
		components: {
			BaseHeader,
			BaseInfo,
			BaseDock
		},
		data() {
			return {
				taskId: '',
				task: new Task()
			}
		},
		onLoad (taskId) {
			if (taskId.hasOwnProperty('taskId')) {
				this.taskId = taskId;
				uni.getStorage({
					key: 'taskData',
					success (res) {
						this.$store.dispatch('changeTask', res.data[newValue])
					},
					fail () {
						console.log('init taskBase fail')
					}
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
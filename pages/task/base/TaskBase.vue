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
				taskId: ''
			}
		},
		onLoad (params) {
			if (params.hasOwnProperty('taskId')) {
				this.taskId = params.taskId;
				let _this = this;
				uni.getStorage({
					key: 'taskData',
					success (res) {
						let temp_task = res.data.taskObj[this.taskId];
						_this.$store.dispatch('changeTask', res.data.taskObj[this.taskId])
					},
					fail () {
						console.log('init taskBase fail')
					}
				})
			} else {
				this.$store.dispatch('changeTask', new Task());
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
<template>
	<view class="wrapper">
		<task-header></task-header>
		<task-list :taskList="taskList"></task-list>
		<task-dock></task-dock>
	</view>
</template>

<script>
	import TaskHeader from './components/Header'
	import TaskList from './components/List'
	import TaskDock from './components/Dock'
	
	export default {
		name: 'Task',
		components: {
			TaskHeader,
			TaskList,
			TaskDock
		},
		data() {
			return {
				taskList: []
			}
		},
		mounted () {
			this.getListData()
		},
		methods: {
			getListData () {
				uni.request({
						url: '/static/data/task.json', 
						success: (res) => {
							if(res.data.code.toLocaleUpperCase() === 'SUCCESS'){
								this.taskList = res.data.result;
							}
						}
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>
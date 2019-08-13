<template>
	<view class="wrapper">
		<task-list-header></task-list-header>
		<task-list-content :taskList="taskList"></task-list-content>
		<task-list-dock></task-list-dock>
	</view>
</template>

<script>
	import TaskListHeader from './components/Header'
	import TaskListContent from './components/Content'
	import TaskListDock from './components/Dock'
	
	export default {
		name: 'TaskList',
		components: {
			TaskListHeader,
			TaskListContent,
			TaskListDock
		},
		data() {
			return {
				taskList: []
			}
		},
		mounted () {
			//this.getListData()
			this.taskList = [];
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
<template>
	<view class="wrapper">
		<task-list-header></task-list-header>
		<task-list-content></task-list-content>
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
		onLoad () {
			let taskData = this.getListData();
			this.$store.dispatch('changeTaskData', taskData);
		},
		methods: {
			getListData () {
				let taskData = uni.getStorageSync('taskData');
				return taskData;
			}
		}
	}
</script>

<style lang="scss">
	
</style>
<template>
	<view class="wrapper">
		<task-list-header></task-list-header>
		<task-list-content></task-list-content>
		<task-list-dock></task-list-dock>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	import TaskListHeader from './components/Header'
	import TaskListContent from './components/Content'
	import TaskListDock from './components/Dock'
	
	export default {
		name: 'TaskList',
		computed: {
			...mapState({
				taskData: state => state.taskData
			})
		},
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
		},
		onHide () {
			let taskData = this.taskData;
			uni.setStorage({
				key: 'taskData',
				data: taskData,
				success: function () {
					console.log('save taskData success');
				}
			})
		}
	}
</script>

<style lang="scss">
	
</style>
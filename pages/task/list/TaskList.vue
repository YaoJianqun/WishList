<template>
	<view class="wrapper">
		<task-list-header @pageStateChange="pageStateChange"></task-list-header>
		<task-list-content :pageState="pageState"></task-list-content>
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
		data () {
			return {
				pageState: 'today'
			}
		},
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
			pageStateChange (pageState) {
				this.pageState = pageState;
			},
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
				success: function (e) {
					let taskData = uni.getStorageSync('taskData');
					console.log('save taskData success');
				}
			})
		}
	}
</script>

<style lang="scss">
	
</style>
<template>
	<view class="wrapper">
		<task-list-header @pageStateChange="pageStateChange"></task-list-header>
		<task-list-content :pageState="pageState"></task-list-content>
		<!-- <task-list-dock></task-list-dock> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { queryTaskData, saveTaskData } from '@/common/dataOperate/controller/TaskDataController'
	
	import TaskListHeader from './components/Header'
	import TaskListContent from './components/Content'
	//import TaskListDock from './components/Dock'
	
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
			TaskListContent
			//TaskListDock
		},
		
		methods: {
			//改变页面展示内容
			pageStateChange (pageState) {
				this.pageState = pageState;
			},
			
			//获取任务列表数据
			getListData () {
				queryTaskData().then((taskData) => {
					this.$store.dispatch('changeTaskData', taskData);
				});
			}
		},
		
		onShow() {
			this.getListData();
		},
		
		onHide () {
			saveTaskData(this.taskData).then(() => {
				console.log('task-list save taskData success');
			})
		}
	}
</script>

<style lang="scss">
	
</style>
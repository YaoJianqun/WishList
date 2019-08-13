<template>
	<view class="wrapper">
		<task-detail-header></task-detail-header>
		<task-detail-info></task-detail-info>
		<task-detail-dock></task-detail-dock>
	</view>
</template>

<script>
	import TaskDetailHeader from './components/Header'
	import TaskDetailInfo from './components/Info'
	import TaskDetailDock from './components/Dock'
	
	export default {
		name: 'TaskDetail',
		components: {
			TaskDetailHeader,
			TaskDetailInfo,
			TaskDetailDock
		},
		data() {
			return {
				
			}
		},
		mounted () {
			//this.getListData()
		},
		methods: {
			/*getListData () {
				uni.request({
						url: '/static/data/task.json', 
						success: (res) => {
							if(res.data.code.toLocaleUpperCase() === 'SUCCESS'){
								this.taskList = res.data.result;
							}
						}
				});
			}*/
		}
	}
</script>

<style lang="scss">
	.wrapper {
		overflow-y: hidden;
	}
</style>
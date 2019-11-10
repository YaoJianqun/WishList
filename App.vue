<script>
	
	import { mapState } from 'vuex'
	import { queryCompletedData } from '@/common/dataOperate/controller/CompletedDataController'
	
	export default {
		computed: {
			...mapState({
				taskData: state => state.taskData,
				wishData: state => state.wishData
			})
		},
		
		methods: {
			//创建完成列表数据
			setCompletedData () {
				uni.setStorage({
					key: 'completedData',
					data: {'taskCompletedData': {}, 'wishCompletedData': {
						'happyCoinPool': {} 
					}},
					success: function () {
						console.log('init completedData success');
					}
				})
			},
			
			//创建愿望列表数据
			setWishData () {
				let wishData = {'wishIdArray': [], 'wishObj': {}};
				uni.setStorage({
					key: 'wishData',
					data: wishData,
					success: function(){
						this.$store.dispatch('changeWishData', wishData);
						console.log('init wishData success');
					}.bind(this)
				})
			},
			
			//创建任务列表数据
			setTaskData () {
				let taskData = {'taskIdArray': [], 'taskObj': {}};
				uni.setStorage({
					key: 'taskData',
					data: taskData,
					success: function(){
						this.$store.dispatch('changeTaskData', taskData);
						console.log('init taskData success');
					}.bind(this)
				})
			},
			
			loadCompletedData () {
				queryCompletedData().then((completedData) => {
					this.$store.dispatch('changeCompletedData', completedData);
				})
			}
		},
		
		onLaunch: function() {
			//获取存储信息，判断是否存在所需数据
			uni.getStorageInfo({
				success: async function (storageInfo) {
					let storageKeys = storageInfo.keys;
					if (storageKeys.indexOf('taskData') < 0) await this.setTaskData();
					if (storageKeys.indexOf('wishData') < 0) await this.setWishData();
					if (storageKeys.indexOf('completedData') < 0) await this.setCompletedData();
					//加载任务及愿望清单完成情况数据
					await this.loadCompletedData();
					console.log('init Data success')
				}.bind(this)
			})
		}
	}
</script>

<style lang="scss">
	@import '~@/common/css/common.scss';
	@import '~@/common/icon-font/iconfont.scss';
	/*每个页面公共css */
	a {
	  text-decoration: none;
	}
	
	page {
		color: #101010;
		background-color: #EEE;
	}
	
	.scroll-Y {
		background-color: #EEE;
	}
</style>

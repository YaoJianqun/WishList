<script>
	
	import { mapState } from 'vuex'
	
	export default {
		computed: {
			...mapState({
				taskData: state => state.taskData
			})
		},
		methods: {
			//创建完成列表数据
			setCompletedData () {
				uni.setStorageSync('completedData', {'taskCompletedData': {}, 'wishCompletedData': {}})
				console.log('init completedData success');
			},
			
			//创建愿望列表数据
			setWishData () {
				uni.setStorageSync('wishData', {'wishIdArray': [], 'wishObj': {}})
				console.log('init wishData success');
			},
			
			//创建任务列表数据
			setTaskData () {
				uni.setStorageSync('taskData', {'taskIdArray': [], 'taskObj': {}})
				console.log('init taskData success');
			},
			
			//初始化任务数据，如不存在任务列表数据则创建新的数据
			initTaskData (storageInfo) {
				if (storageInfo.keys.indexOf('taskData') < 0)
					this.setTaskData();
				console.log('init taskData complete')
			},
			
			//初始化愿望数据，如不存在愿望列表数据则创建新的数据
			initWishData (storageInfo) {
				if (storageInfo.keys.indexOf('wishData') < 0)
					this.setWishData();
				console.log('init wishData complete')
			},
			
			//初始化完成列表数据，如不才能在创建新的数据
			initCompletedData (storageInfo) {
				if (storageInfo.keys.indexOf('completedData') < 0)
					this.setCompletedData();
				console.log('init completedData complete')
			}
		},
		
		onLaunch: function() {
			//获取存储信息，判断是否存在所需数据
			const storageInfo = uni.getStorageInfoSync()
			this.initTaskData(storageInfo);
			this.initWishData(storageInfo);
			this.initCompletedData(storageInfo);
		},
		
		onShow: function() {
			console.log('App Show')
		},
		
		//退出app后存储任务数据
		onHide: function() {
			let taskData = this.taskData;
			uni.setStorage({
				key: 'taskData',
				data: taskData,
				success: function () {
					console.log('App Hide - save taskData success');
				}
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

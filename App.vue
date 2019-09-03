<script>
	
	import { mapState } from 'vuex'
	
	export default {
		computed: {
			...mapState({
				taskData: state => state.taskData
			})
		},
		methods: {
			setCompletedData () {
				uni.setStorageSync('completedData', {'taskCompletedData': {}, 'wishCompletedData': {}})
				console.log('init completedData success');
			},
			setWishData () {
				uni.setStorageSync('wishData', {'wishIdArray': [], 'wishObj': {}})
				console.log('init wishData success');
			},
			setTaskData () {
				uni.setStorageSync('taskData', {'taskIdArray': [], 'taskObj': {}})
				console.log('init taskData success');
			},
			initTaskData (storageInfo) {
				if (storageInfo.keys.indexOf('taskData') < 0)
					this.setTaskData();
				console.log('init taskData complete')
			},
			initWishData (storageInfo) {
				if (storageInfo.keys.indexOf('wishData') < 0)
					this.setWishData();
				console.log('init wishData complete')
			},
			initCompletedData (storageInfo) {
				if (storageInfo.keys.indexOf('completedData') < 0)
					this.setCompletedData();
				console.log('init completedData complete')
			}
		},
		onLaunch: function() {
			const storageInfo = uni.getStorageInfoSync()
			this.initTaskData(storageInfo);
			this.initWishData(storageInfo);
			this.initCompletedData(storageInfo);
		},
		onShow: function() {
			console.log('App Show')
		},
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

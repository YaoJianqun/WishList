<script>
	
	import { mapState } from 'vuex'
	
	export default {
		computed: {
			...mapState({
				taskData: state => state.taskData
			})
		},
		methods: {
			setWishData () {
				uni.setStorage({
					key: 'wishData',
					data: {'wishIdArray': [], 'wishObj': {}},
					success: function () {
						console.log('init wishData success');
					}
				})
			},
			setTaskData () {
				uni.setStorage({
					key: 'taskData',
					data: {'taskIdArray': [], 'taskObj': {}},
					success: function () {
						console.log('init taskData success');
					}
				})
			},
			initTaskData () {
				let _this = this;
				uni.getStorageInfo({
					success: function (res) {
						if (res.keys.indexOf('taskData') < 0)
							_this.setTaskData();
					},
					fail: function () {
						console.log('getStorageInfo fail', arguments)
						_this.setTaskData();
					},
					complete: function () {console.log('init taskData complete')}
				})
			},
			initWishData () {
				let _this = this;
				uni.getStorageInfo({
					success: function (res) {
						if (res.keys.indexOf('wishData') < 0)
							_this.setWishData();
					},
					fail: function () {
						console.log('getStorageInfo fail', arguments)
						_this.setWishData();
					},
					complete: function () {console.log('init wishData complete')}
				})
			}
		},
		onLaunch: function() {
			this.initTaskData();
			this.initWishData();
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

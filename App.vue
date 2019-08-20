<script>
	export default {
		onLaunch: function() {
			uni.getStorageInfo({
				success: function (res) {
					if (res.keys.indexOf('taskData') < 0) {
						uni.setStorage({
							key: 'taskData',
							data: {'taskIdArray': [], 'taskObj': {}},
							success: function () {
								console.log('init taskData success');
							}
						})
					}
				},
				fail: function () {
					console.log('getStorageInfo fail', arguments)
					uni.setStorage({
						key: 'taskData',
						data: {'taskIdArray': [], 'taskObj': {}},
						success: function () {
							console.log('init taskData success');
						}
					})
				},
				complete: function () {console.log('init appData complete')}
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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

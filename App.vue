<script>
	
	import { mapState } from 'vuex'
	import { queryCompletedData } from '@/common/dataOperate/controller/CompletedDataController'
	import User from '@/common/model/User'
	
	export default {
		computed: {
			...mapState({
				taskData: state => state.taskData,
				wishData: state => state.wishData
			})
		},
		
		methods: {
			dateFormat () {
				Date.prototype.Format=function(fmt){
				    var o={
						"M+":this.getMonth()+1,//月份
						"d+":this.getDate(),//日
						"H+":this.getHours(),//小时
						"m+":this.getMinutes(),//分
						"s+":this.getSeconds(),//秒
						"q+":Math.floor((this.getMonth()+3)/3),//季度
						"S+":this.getMilliseconds()//毫毛
				    };
				    if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
				    for (var k in o)
						if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				    return fmt;
			    };
			},
			
			//创建完成列表数据
			setCompletedData () {
				let completedData = {'completedObj': {}, 'happyCoinPool': 0};
				uni.setStorage({
					key: 'completedData',
					data: completedData,
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
			
			//创建用户信息
			setUserInfo () {
				let userInfo = new User();
				uni.setStorage({
					key: 'userInfo',
					data: userInfo,
					success: function(){
						this.$store.dispatch('changeUserInfo', userInfo);
						console.log('init userInfo success');
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
			if (!Date.Format) this.dateFormat();
			//获取存储信息，判断是否存在所需数据
			uni.getStorageInfo({
				success: async function (storageInfo) {
					let storageKeys = storageInfo.keys;
					if (storageKeys.indexOf('taskData') < 0) await this.setTaskData();
					if (storageKeys.indexOf('wishData') < 0) await this.setWishData();
					if (storageKeys.indexOf('completedData') < 0) await this.setCompletedData();
					if (storageKeys.indexOf('userInfo') < 0) await this.setUserInfo();
					//加载任务及愿望清单完成情况数据
					//await this.loadCompletedData();
					console.log('init Data success');
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

<template>
	<view class="wrapper">
		<view class="header">
			<image src="../../../static/img/personal_bg.png"></image>
			<view class="header-item user-name" v-text="user.name"></view>
			<view class="header-item user-logo">
				<view class="icon iconfont iconuser default" v-if="!user.image"></view>
				<image v-else class="image" :mode="'aspectFill'" :src="user.image"></image>
			</view>
			<view class="happy-card">
				${{totalHappyCoin}}
			</view>
		</view>
		
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll">
			<view class="option" @click="handleOptionClick('UserInfo')">
				<view class="icon iconfont iconuser warning"></view>
				<view class="title">个人信息</view>
				<view class="progress bgprogress bdcolor warning"></view>
			</view>
			<view class="option">
				<view class="icon iconfont iconbook success"></view>
				<view class="title">使用说明</view>
				<view class="progress bgprogress bdcolor success"></view>
			</view>
			<view class="option" v-if="false">
				<view class="icon iconfont iconskyatlas primary"></view>
				<view class="title">云端同步</view>
				<view class="progress bgprogress bdcolor primary"></view>
			</view>
			<view class="option" v-if="false">
				<view class="icon iconfont iconshare warning"></view>
				<view class="title">分享</view>
				<view class="progress bgprogress bdcolor warning"></view>
			</view>
			<view class="option" v-if="false">
				<view class="icon iconfont iconstar-fill purple"></view>
				<view class="title">AppStore评分</view>
				<view class="progress bgprogress bdcolor purple"></view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { queryUserInfo } from '@/common/dataOperate/controller/UserInfoController'
	import { queryCompletedData } from '@/common/dataOperate/controller/CompletedDataController'
	
	export default {
		name: 'personal',
		
		onLoad() {
			this.loadUserInfo();
			this.loadCompletedData();
		},
		
		onShow() {
			this.loadUserInfo();
			this.loadCompletedData();
		},
		
		computed: {
			totalHappyCoin () {
				return this.$store.state.completedData.happyCoinPool;
			},
			...mapState({
				user: state => state.userInfo
			})
		},
		
		data () {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		
		methods: {
			handleOptionClick (state) {
				if (state === 'UserInfo')
					uni.navigateTo({url: '../../../pages/personal/info/UserInfo'});
			},
			
			loadCompletedData () {
				queryCompletedData().then((completedData) => {
					this.$store.dispatch('changeCompletedData', completedData);
				})
			},
			
			loadUserInfo () {
				queryUserInfo().then((userInfo) => {
					this.$store.dispatch('changeUserInfo', userInfo);
				})
			},
			
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		.header {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 336rpx;
			image {
				position: absolute;
				height: 100%;
				width: 100%;
				z-index: -1;
			}
			.header-item {
				margin: 0 60rpx;
			}
			.user-name {
				font-size: 40rpx;
				color: #fff;
				font-weight: bold;
			}
			.user-logo {
				width: 68rpx;
				height: 68rpx;
				text-align: center;
				border-radius: 34rpx;
				background-color: #fff;
				margin-top: -18rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon {
					font-size: 60rpx;
					color: #333333;
				}
				.image {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					z-index: 10;
				}
			}
			.happy-card {
				height: 260rpx;
				position: absolute;
				top: 228rpx;
				z-index: 1;
				background-color: #fff;
				flex: 1;
				left: 40rpx;
				right: 40rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 60rpx;
				font-weight: bold;
			}
		}
		.scroll-Y {
			position: absolute;
			top: 518rpx;
			bottom: 0rpx;
			z-index: 0;
			.option {
				height: 100rpx;
				margin: 0rpx 40rpx 30rpx;
				border-radius: 20rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				position: relative;
				.icon {
					font-size: 46rpx;
					margin: 0 20rpx;
				}
				.title {
					line-height: 46rpx;
					font-size: 32rpx;
				}
				.progress {
					width: 100%;
					height: 0rpx;
					border-bottom: 12rpx solid #13CDBB;
					border-bottom-left-radius: 12rpx;
					border-bottom-right-radius: 12rpx;
					position: absolute;
					z-index: 2;
					bottom: 0;
					left: 0;
				}
			}
		}
	}
</style>

<template>
	<view class="header-wrapper">
		<view class="title" @click="handleTitleClick">
			{{titleContent}}
			<view class="icon iconfont iconcaret-down menu-down"></view>
		</view>
		<view class="theme-wrapper" @click="handleThemeClick">
			<view class="icon iconfont iconnavicon" data-theme="default"></view>
			<view class="icon iconfont iconappstore-fill" data-theme="card"></view>
			<view class="theme icon iconfont" :class="[selTheme,pageTheme]" :data-theme="pageTheme"></view>
		</view>
		<view class="button-add" @click="handleAddWishClick">
			<view class="icon iconfont iconplus1 add-icon"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'WishListHeader',
		
		props: {
			pageTheme: {
			  type: String,
			  default: 'default'
			},
			pageState: {
			  type: String,
			  default: 'no-redeem'
			}
		},
		
		computed: {
			selTheme () {
				return this.pageTheme === 'default' ? 'iconnavicon' : 'iconappstore-fill'
			},
			titleContent () {
				return this.pageState === 'no-redeem' ? '待完成' : '已完成';
			}
		},
		
		methods: {
			handleTitleClick () {
				let pageState = this.pageState === 'no-redeem' ? 'redeem' : 'no-redeem';
				this.$emit('pageStateChange', pageState);
			},
			handleThemeClick (e) {
				let pageTheme = e.target.dataset.theme;
				this.$emit('pageThemeChange', pageTheme);
			},
			handleAddWishClick () {
				uni.navigateTo({
					url: '../../../pages/wish/base/WishBase'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		display: flex;
		justify-content: space-between;
		height: 120rpx;
		padding-top: 88rpx;
		padding-bottom: 30rpx;
		font-size: 58rpx;
		.title {
			margin-left: 40rpx;
			line-height: 120rpx;
			.menu-down {
				display: inline;
				font-size: 48rpx;
				margin-left: 10rpx;
				margin-bottom: 30rpx;
			}
		}
		.theme-wrapper {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: relative;
			margin-top: 30rpx;
			width: 140rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 42rpx;
			border-radius: 30rpx;
			background-color: #C3C3C3;
			.icon {
				flex: 1;
				text-align: center;
			}
			.theme {
				position: absolute;
				height: 60rpx;
				width: 50%;
				text-align: center;
				border-radius: 30rpx;
				background-color: #fff;
				transition: left .6s;
				transition-timing-function: ease-in-out;
				&.default {
					left: 0;
					color: #101010;
				}
				&.card {
					left: 50%;
				}
			}
		}
		.button-add {
			width: 68rpx;
			height: 68rpx;
			line-height: 68rpx;
			border-radius: 34rpx;
			margin-top: 26rpx;
			margin-right: 60rpx;
			background-color: #fff;
			color: #393939;
			display: flex;
			justify-content: center;
			align-items: center;
			.add-icon {
				font-size: 42rpx;
				font-weight: bold;
			}
		}
	}
</style>

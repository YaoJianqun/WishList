<template>
	<view class="header-wrapper">
		<view class="title" @click="handleThemeClick()">
			愿望
		</view>
		<view class="button-add" @click="handleAddWishClick">
			<view class="icon iconfont iconplus1 add-icon"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'WishListHeader',
		data () {
			return {
				pageTheme: 'default'
			}
		},
		methods: {
			handleThemeClick () {
				this.pageTheme === 'default' ? this.pageTheme = 'card' : this.pageTheme = 'default';
				this.$emit('pageThemeChange', this.pageTheme);
			},
			handleAddWishClick () {
				uni.navigateTo({
					url: '../../../pages/task/base/TaskBase'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		height: 120rpx;
		padding-top: 88rpx;
		padding-bottom: 30rpx;
		font-size: 68rpx;
		display: flex;
		justify-content: space-between;
		.title {
			margin-left: 40rpx;
			line-height: 120rpx;
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

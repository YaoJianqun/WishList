<template>
	<view class="dock-wrapper">
		<view class="dock">
			<view class="item bgcolor success" @click="handleNextClick">完成</view>
			<view class="item bgcolor danger" @click="handleCancelClick">取消</view>
		</view>
	</view>
</template>

<script>
	
	import { mapState } from 'vuex'
	import { addOrUpdateUser } from '@/common/dataOperate/controller/UserInfoController'
	
	export default {
		name: 'BaseDock',
		computed: {
			...mapState({
				user: state => state.userInfo
			})
		},
		methods: {
			handleNextClick () {
				const _this = this;
				let temp_user = this.$store.state.userInfo;
				if (temp_user.image) {
					uni.saveFile({
						tempFilePath: temp_user.image,
						success: function (res) {
							var savedFilePath = res.savedFilePath;
							temp_user.image = savedFilePath;
							addOrUpdateUser(temp_user).then(() => {
								_this.handleCancelClick();
							});
						}.bind(this)
					});
				} else {
					addOrUpdateUser(temp_user).then(() => {
						this.handleCancelClick();
					});
				}
			},
			handleCancelClick () {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dock-wrapper {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding-top: 30rpx;
		padding-bottom: 68rpx;
		.dock {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			margin: 0 40rpx;
			.item {
				width: 320rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 20rpx;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>

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
	import { addOrUpdateWish, saveWishData } from '@/common/dataOperate/controller/WishDataController'
	
	export default {
		name: 'BaseDock',
		computed: {
			...mapState({
				wish: state => state.wish
			})
		},
		methods: {
			saveWishData (temp_wish) {
				addOrUpdateWish(temp_wish).then(() => {
					uni.switchTab({
					    url: '../../wish/list/WishList'
					});
				});
			},
			
			handleNextClick () {
				let temp_wish = this.$store.state.wish;
				if (temp_wish.image) {
					uni.saveFile({
						tempFilePath: temp_wish.image,
						success: function (res) {
							var savedFilePath = res.savedFilePath;
							temp_wish.image = savedFilePath;
							this.saveWishData(temp_wish);
						}.bind(this)
					});
				} else {
					this.saveWishData(temp_wish);
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

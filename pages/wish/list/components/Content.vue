<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll">
		<view class="wish-list" :class="[pageState]">
			<view class="wish-item">
				<view class="image-wrapper">
					
				</view>
				<view class="task-info">
					<view class="title">索尼WH-1000XM3索尼WH-1000XM3</view>
					<view class="info">1782/2599</view>
				</view>
				<view class="progress bdcolor warning" style="width: 60%;"></view>
				<view class="progress bgprogress bdcolor warning"></view>
			</view>
			<view class="wish-item">
				<view class="image-wrapper">
					
				</view>
				<view class="task-info">
					<view class="title">索尼WH-1000XM3索尼WH-1000XM3</view>
					<view class="info">1782/2599</view>
				</view>
				<view class="progress bdcolor warning" style="width: 60%;"></view>
				<view class="progress bgprogress bdcolor warning"></view>
			</view>
			<view class="wish-item">
				<view class="image-wrapper">
					
				</view>
				<view class="task-info">
					<view class="title">索尼WH-1000XM3索尼WH-1000XM3</view>
					<view class="info">1782/2599</view>
				</view>
				<view class="progress bdcolor warning" style="width: 60%;"></view>
				<view class="progress bgprogress bdcolor warning"></view>
			</view>
			<view class="wish-item">
				<view class="image-wrapper">
					
				</view>
				<view class="task-info">
					<view class="title">索尼WH-1000XM3索尼WH-1000XM3</view>
					<view class="info">1782/2599</view>
				</view>
				<view class="progress bdcolor warning" style="width: 60%;"></view>
				<view class="progress bgprogress bdcolor warning"></view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	
	import { mapState } from 'vuex'
	import { deleteWishData } from '@/common/controller/WishDataController.js'
	
	export default {
		name: 'WishListContent',
		props: {
			pageState: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				startX: 0,
				timer: null,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			...mapState({
				wishData: state => state.wishData
			})
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		background-color: #EEE;
		position: absolute;
		top: 238rpx;
		bottom: 200rpx;
		.wish-list {
			.wish-item {
				display: flex;
				align-items: center;
				position: relative;
				height: 180rpx;
				font-size: 32rpx;
				border-radius: 20rpx;
				margin: 0 30rpx 30rpx;
				padding: 0 30rpx 0 30rpx;
				background-color: #fff;
				transition: height 0.6s;
				.image-wrapper {
					width: 120rpx;
					height: 120rpx;
					border: 2rpx solid #BBB;
					border-radius: 20rpx;
				}
				.task-info {
					width: 400rpx;
					height: 130rpx;
					margin-left: 30rpx;
					.title {
						white-space:nowrap;
						overflow:hidden; 
						text-overflow:ellipsis;
						line-height: 70rpx;
						font-weight: bold;
						font-size: 40rpx;
					}
					.info {
						line-height: 50rpx;
						font-size: 32rpx;
						color: #9B9B9B;
					}
				}
			}
			&.wish-card {
				display: flex;
				flex-wrap: wrap;
				.wish-item {
					flex-direction: column;
					align-items: center;
					box-sizing: border-box;
					width: 47%;
					height: 380rpx;
					border-radius: 20rpx;
					margin-left: 2%;
					margin-right: 0;
					margin-bottom: 30rpx;
					padding: 30rpx;
					background-color: #fff;
					.task-info {
						width: 100%;
						height: auto;
						margin-top: 20rpx;
						margin-left: 0rpx;
						.title {
							/*word-wrap: break-word;
							word-break: break-all;*/
							white-space:nowrap; 
							overflow:hidden; 
							text-overflow:ellipsis;
							line-height: 52rpx;
							text-align: center;
							font-weight: bold;
							font-size: 32rpx;
							margin-bottom: 20rpx;
						}
						.info {
							text-align: center;
							line-height: 50rpx;
							font-size: 32rpx;
							color: #9B9B9B;
						}
					}
				}
			}
		}
	}
	.progress {
		height: 0rpx;
		border-bottom: 12rpx solid #13CDBB;
		border-bottom-left-radius: 12rpx;
		position: absolute;
		z-index: 2;
		bottom: 0;
		left: 0;
	}
	.progress.completed, .bgprogress {
		border-bottom-right-radius: 12rpx;
	}
	.bgprogress {
		width: 100%;
		z-index: 1;
		opacity: 0.2;
		&.view-progress {
			opacity: 0.8;
		}
	}
</style>

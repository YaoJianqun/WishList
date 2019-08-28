<template>
	<view class="wish-item" :class="[pageTheme]">
		<view class="image-wrapper">
			
		</view>
		<view class="task-info">
			<view class="title">索尼WH-1000XM3索尼WH-1000XM3</view>
			<view class="info">1782/2599</view>
		</view>
		<view class="progress bdcolor warning" style="width: 60%;"></view>
		<view class="progress bgprogress bdcolor warning"></view>
	</view>
</template>

<script>
	
	import { deleteWishData } from '@/common/controller/WishDataController.js'
	
	export default {
		name: 'WishItem',
		props: {
			pageTheme: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				startX: 0,
				timer: null
			}
		},
		computed: {
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
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
		&.card {
			flex-direction: column;
			box-sizing: border-box;
			width: 100%;
			height: 380rpx;
			padding: 30rpx;
			.image-wrapper {
				width: 130rpx;
				height: 130rpx;
			}
			.task-info {
				width: 100%;
				height: auto;
				margin-top: 20rpx;
				margin-left: 0rpx;
				.title {
					line-height: 52rpx;
					text-align: center;
					font-size: 32rpx;
					margin-bottom: 20rpx;
				}
				.info {
					font-size: 28rpx;
					text-align: center;
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

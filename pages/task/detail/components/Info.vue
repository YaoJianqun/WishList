<template>
	<view class="info-wrapper">
		<view class="task-icon">+</view>
		<view class="task-form">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view class="title">名称 : </view>
					<input class="uni-input" placeholder="请输入任务名称" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">快乐币 : </view>
					<input class="uni-input" placeholder="请输入当前任务快乐币价值" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">宣言 : </view>
					<view class="uni-textarea">
						<textarea placeholder-style="color:#888888" placeholder="请输入任务宣言"/>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">颜色 : </view>
					<view class="color-list">
						<view class="bgcolor warning"></view>
						<view class="bgcolor parimary"></view>
						<view class="bgcolor success"></view>
						<view class="bgcolor danger"></view>
						<view class="bgcolor pink"></view>
					</view>
					<view class="color-list">
						<view class="bgcolor purple"></view>
						<view class="bgcolor info"></view>
						<view class="bgcolor grey"></view>
						<view class="bgcolor black"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="tab"></view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	export default {
		name: 'TaskDetailInfo',
		components: {
			uniIcon
		},
		props: {
			
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrapper {
		position: relative;
		height: 1130rpx;
		margin: 0 40rpx 30rpx;
		border-radius: 10px;
		background-color: #fff;
		padding-top: 72rpx;
		padding: 72rpx 50rpx 0;
		.tab {
			height: 0;
			border-top: 12rpx solid #2AD181;
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
			position: absolute;
			top: 0;
			left: 0;
		}
		.task-icon {
			width: 140rpx;
			height: 140rpx;
			line-height: 140rpx;
			font-size: 56rpx;
			color: #8A8A8A;
			text-align: center;
			border-radius: 20rpx;
			background-color: #CDCDCD;
			margin: 0 auto 60rpx;
		}
		.task-form {
			.uni-form-item {
				margin-bottom: 40rpx;
			}
			.title {
				font-size: 32rpx;
				margin-bottom: 12rpx;
			}
			.uni-input {
				height: 60rpx;
				line-height: 60rpx;
				font-size: 30rpx;
				border-bottom: 1px solid #BBBBBB;
				padding: 0 10rpx;
			}
			.uni-textarea {
				font-size: 30rpx;
				margin-top: 28rpx;
				padding: 10rpx;
				border: 1px solid #BBBBBB;
				border-radius: 20rpx;
			}
			.color-list {
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				padding: 0 40rpx;
				margin-bottom: 16rpx;
				.bgcolor {
					width: 32rpx;
					height: 32rpx;
					line-height: 32rpx;
					border-radius: 50%;
					margin-right: 80rpx;
					background-color: #007AFF;
				}
			}
		}
	}
</style>

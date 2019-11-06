<template>
	<view class="header-wrapper">
		<view class="title" @click="handleTitleClick">
			{{titleContent}}
			<view class="icon iconfont iconcaret-down menu-down"></view>
		</view>
		<view class="button-add" @click="handleAddTaskClick">
			<view class="icon iconfont iconplus1 add-icon"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TaskListHeader',
		data () {
			return {
				pageState: 'today'
			}
		},
		computed: {
			titleContent () {
				return this.pageState === 'today' ? '今日' : '全部';
			}
		},
		methods: {
			//切换展示模式
			handleTitleClick () {
				this.pageState = this.pageState === 'today' ? 'all' : 'today';
				this.$emit('pageStateChange', this.pageState);
			},
			
			//添加任务
			handleAddTaskClick () {
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
			.menu-down {
				display: inline;
				font-size: 48rpx;
				margin-left: 10rpx;
				margin-bottom: 30rpx;
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

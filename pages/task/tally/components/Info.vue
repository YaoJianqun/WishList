<template>
	<view class="info-wrapper">
		<canvas id="text" width="500" height="100"></canvas>
		<canvas id="stage" width="500" height="100"></canvas>
		<view :class="['tab bdcolor', task.color]"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	
	export default {
		name: 'BaseInfo',
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				task: state => state.task
			})
		}
	}
</script>

<style lang="scss" scoped>
	
	.info-wrapper::after {
		content: '';
		display: block;
		height: 0;
		clear: both;
	}
	.info-wrapper {
		position: absolute;
		top: 248rpx;
		left: 40rpx;
		right: 40rpx;
		bottom: 68rpx;
		border-radius: 20rpx;
		background-color: #fff;
		.tab {
			height: 0;
			width: 100%;
			border-top: 12rpx solid #2AD181;
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>

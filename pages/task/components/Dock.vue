<template>
	<view class="footer-wrapper">
		<view class="dock-bar">
			<view class="dock-item">
				<view class="icon iconfont iconmenu checked"></view>
			</view>
			<view class="dock-item">
				<view class="icon iconfont iconcarryout"></view>
			</view>
			<view class="dock-item">
				<view class="icon iconfont iconbarchart"></view>
			</view>
			<view class="dock-item">
				<view class="icon iconfont iconuser"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TaskDock'
	}
</script>

<style lang="scss" scoped>
	.footer-wrapper {
		background-color: #EEE;
		height: 51px;
		width: 100%;
		padding-top: 15px;
		padding-bottom: 34px;
		position: fixed;
		bottom: 0;
		.dock-bar {
			height: 51px;
			margin: 0 15px;
			border-radius: 10px;
			background-color: #fff;
			display: flex;
			.dock-item {
				width: 25%;
				text-align: center;
				line-height: 51px;
				.icon.iconfont {
					font-size: 28px;
					color: #A2A2A2;
				}
				.icon.iconfont.checked {
					color: #101010;
				}
			}
		}
	}
</style>

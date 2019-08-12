<template>
	<view id="demo1" class="task-item">
		<view class="icon iconfont iconcutlery font-danger"></view>
		<view class="task-info">
			<view class="title">减肥餐</view>
			<view class="info">1/1次</view>
		</view>
		<label class="radio" style="margin-left: auto;transform:scale(1.28);">
			<radio value="r1" checked="true" />
		</label>
		<view class="progress"></view>
	</view>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.task-item {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 15px 0 25px;
	border-radius: 10px;
	height: 90px;
	margin: 0 15px 15px;
	background-color: #fff;
	.iconfont {
		width: 40px;
		height: 90px;
		line-height: 90px;
		font-size: 40px;
	}
	.task-info {
		height: 65px;
		margin-left: 30px;
		.title {
			line-height: 35px;
			font-weight: bold;
			font-size: 20px;
		}
		.info {
			line-height: 25px;
			font-size: 16px;
			color: #9B9B9B;
		}
	}
}
</style>

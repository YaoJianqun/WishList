<template>
	<view class="wrapper">
		<view class="header-wrapper">
			<view class="title">任务</view>
			<view class="button-add">+</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll">
			
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
			
			<view id="demo1" class="task-item">
				<view class="icon iconfont iconbicycle font-success"></view>
				<view class="task-info">
					<view class="title">运动</view>
					<view class="info">1/1次</view>
				</view>
				<label class="radio" style="margin-left: auto;transform:scale(1.28);">
					<radio value="r1" checked="true" />
				</label>
				<view class="progress progress-blue"></view>
			</view>
			
			<view id="demo1" class="task-item">
				<view class="icon iconfont iconbook font-warning"></view>
				<view class="task-info">
					<view class="title">学习</view>
					<view class="info">30/40分钟</view>
				</view>
				<label class="radio" style="margin-left: auto;transform:scale(1.28);">
					<radio value="r1" checked="true" />
				</label>
				<view class="progress progress-green1"></view>
			</view>
			
			<view id="demo1" class="task-item">
				<view class="icon iconfont iconshopping-cart font-danger"></view>
				<view class="task-info">
					<view class="title">购物</view>
					<view class="info">1/1次</view>
				</view>
				<label class="radio" style="margin-left: auto;transform:scale(1.28);">
					<radio value="r1" checked="true" />
				</label>
				<view class="progress progress-green2"></view>
			</view>
			
			<view id="demo1" class="task-item">
				<view class="icon iconfont icongithub-fill"></view>
				<view class="task-info">
					<view class="title">GitHub review</view>
					<view class="info">18/40分钟</view>
				</view>
				<label class="radio" style="margin-left: auto;transform:scale(1.28);">
					<radio value="r1" checked="true" />
				</label>
				<view class="progress progress-yellow"></view>
			</view>
			
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
			
			<view id="demo1" class="task-item">
				<view class="icon iconfont iconbicycle font-success"></view>
				<view class="task-info">
					<view class="title">运动</view>
					<view class="info">1/1次</view>
				</view>
				<label class="radio" style="margin-left: auto;transform:scale(1.28);">
					<radio value="r1" checked="true" />
				</label>
				<view class="progress progress-blue"></view>
			</view>
			
			<view id="demo1" class="task-item">
				<view class="icon iconfont iconbook font-warning"></view>
				<view class="task-info">
					<view class="title">学习</view>
					<view class="info">30/40分钟</view>
				</view>
				<label class="radio" style="margin-left: auto;transform:scale(1.28);">
					<radio value="r1" checked="true" />
				</label>
				<view class="progress progress-green1"></view>
			</view>
			
		</scroll-view>
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
	</view>
</template>

<script>
	
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	
	export default {
		components: {
			uniIcon,
			uniSwipeAction
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
				
			}
		},
		onLoad() {

		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/common/icon-font/iconfont.scss';
	
	.header-wrapper {
		width: 100%;
		height: 60px;
		padding-top: 44px;
		padding-bottom: 15px;
		font-size: 34px;
		display: flex;
		justify-content: space-between;
		.title {
			margin-left: 20px;
			line-height: 60px;
		}
		.button-add {
			width: 34px;
			height: 34px;
			line-height: 28px;
			border-radius: 20px;
			margin-top: 13px;
			margin-right: 30px;
			background-color: #fff;
			text-align: center;
			color: #393939;
		}
	}
	
	.scroll-Y {
		background-color: #EEE;
		position: absolute;
		top: 119px;
		bottom: 100px;
		/*.task-item {
			display: flex;
			position: relative;
			padding: 0 15px;
			border-radius: 10px;
			height: 105px;
			margin: 0 15px 15px;
			background-color: #fff;
			.iconfont {
				margin: 0 15px;
				height: 105px;
				line-height: 105px;
				font-size: 40px;
			}
			.task-info {
				height: 65px;
				margin-left: 15px;
				padding: 20px 0;
				vertical-align: baseline;
				.title {
					font-weight: bold;
					font-size: 25px;
				}
				.info {
					color: #9B9B9B;
				}
			}
			.progress {
				height: 0px;
				width: 180px;
				border-bottom: 6px solid #13CDBB;
				border-bottom-left-radius: 6px;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}*/
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
	}
	.progress {
		height: 0px;
		width: 180px;
		border-bottom: 6px solid #13CDBB;
		border-bottom-left-radius: 6px;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	
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
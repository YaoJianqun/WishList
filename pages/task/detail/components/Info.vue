<template>
	<view class="info-wrapper">
		<view class="task-form">
			<view class="uni-form-item uni-column">
				<view class="title">标准 : </view>
				<view class="input-wrapper">
					<input class="uni-input" placeholder="请输入任务标准" />
					<view :class="['unit bgcolor', task.color]">小时</view>
					<view class="frequency"> / 每日</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">频率 : </view>
				<view class="tab-wrapper iconfont" :class="task.color">
					<view class="item day">日</view>
					<view class="item week">周</view>
					<view class="item month">月</view>
					<view class="frequency bgitem bgcolor" :class="[task.color, task.frequency]">日</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">标准类型 : </view>
				<view class="tab-wrapper iconfont" :class="task.color">
					<view class="item task" :class="[isTypeSel('task')]">每周定量</view>
					<view class="item count" :class="[isTypeSel('count')]">每周定次</view>
					<view class="type bgcolor bgitem" :class="[task.color, task.type]">每周定量</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">每周 6 次 : </view>
				<view class="count-wrapper iconfont" :class="task.color">
					<view class="item bgcolor" :class="[isRepeatCountSel(1)]">1</view>
					<view class="item bgcolor" :class="[isRepeatCountSel(2)]">2</view>
					<view class="item bgcolor" :class="[isRepeatCountSel(3)]">3</view>
					<view class="item bgcolor" :class="[isRepeatCountSel(4)]">4</view>
					<view class="item bgcolor" :class="[isRepeatCountSel(5)]">5</view>
					<view class="item bgcolor" :class="[isRepeatCountSel(6)]">6</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">提醒 : </view>
				<scroll-view class="remind-wrapper" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll">
						<view class="item iconfont bdcolor" :class="[task.color]">B</view>
						<view class="item iconfont bdcolor" :class="[task.color]">C</view>
						<view class="item iconfont bdcolor" :class="[task.color]">B</view>
						<view class="item iconfont bdcolor" :class="[task.color]">C</view>
						<view class="item iconfont bdcolor" :class="[task.color]">B</view>
						<view class="item iconfont bdcolor" :class="[task.color]">C</view>
						<view class="item iconfont bdcolor" :class="[task.color]">B</view>
						<view class="item iconfont bdcolor" :class="[task.color]">C</view>
						<view class="item iconfont bdcolor" :class="[task.color]">B</view>
						<view class="item iconfont bdcolor" :class="[task.color]">C</view>
						<view class="item iconfont bdcolor" :class="[task.color]">B</view>
						<view class="item iconfont bdcolor" :class="[task.color]">C</view>
						<view class="add item bgcolor bdcolor" :class="[task.color]">+</view>
				</scroll-view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">提醒 : </view>
				<view class="time-wrapper">
					<view class="start time bdcolor iconfont" :class="[task.color]">
						<view class="time-title">开始时间</view>
					</view>
					<view class="time-line bgcolor" :class="[task.color]"></view>
					<view class="end time bdcolor iconfont" :class="[task.color]">
						<view class="time-title">结束时间</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 顶部标签 -->
		<view :class="['tab bdcolor', task.color]"></view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	export default {
		name: 'BaseInfo',
		components: {
			uniIcon
		},
		data() {
			return {
				task: {},
				scrollLeft: 10000,
				old: {
					scrollLeft: 10000
				}
			}
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goLeft: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 10000
				});
			},
			isTypeSel (type) {
				if(this.task.type === type) return 'sel ' + this.task.color;
			},
			isRepeatCountSel (repeat_count) {
				if(this.task.repeat_count === repeat_count) return 'sel ' + this.task.color;
			}
		},
		mounted () {
			 this.task = this.$store.state.task;
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrapper {
		position: relative;
		margin: 0 40rpx 30rpx;
		border-radius: 10px;
		background-color: #fff;
		padding-top: 72rpx;
		padding: 72rpx 50rpx 40rpx;
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
		.task-form {
			.uni-form-item {
				margin-bottom: 40rpx;
			}
			.title {
				font-size: 32rpx;
				margin-bottom: 18rpx;
			}
			.input-wrapper {
				position: relative;
				line-height: 60rpx;
				font-size: 30rpx;
				border-bottom: 1px solid #BBBBBB;
				padding: 0 10rpx;
				.uni-input {
					height: 60rpx;
					width: 230rpx;
					line-height: 60rpx;
				}
				.unit {
					width: 76rpx;
					color: #fff;
					height: 54rpx;
					line-height: 54rpx;
					text-align: center;
					border-radius: 20rpx;
					position: absolute;
					left: 240rpx;
					top: 3rpx;
				}
				.frequency {
					position: absolute;
					left: 320rpx;
					top: 0;
				}
			}
			.tab-wrapper {
				position: relative;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				border: 1rpx solid #8E8E8E;
				.item {
					flex: 1;
					height: 64rpx;
					text-align: center;
					background-color: rgba(0, 0 ,0 ,0);
				}
				.bgitem {
					height: 64rpx;
					color: #fff;
					text-align: center;
					border-radius: 30rpx;
					position: absolute;
					&.frequency {width: 33.333%;}
					&.type {width: 50%;}
					top: -2rpx;
					left: -2rpx;
					&.day {
						left: 0;
					}
					&.week {
						left: 50%;
						margin-left: -16.6666667%;
					}
					&.month {
						right: 0;
					}
				}
			}
			.count-wrapper {
				&.remind {justify-content: flex-start;}
				margin: 0 40rpx;
				display: flex;
				justify-content: space-around;
				.item {
					width: 72rpx;
					text-align: center;
					line-height: 72rpx;
					border-radius: 36rpx;
					&.sel {
						color: #fff;
					}
				}
			}
			.remind-wrapper {
				white-space: nowrap;
				.item, .item {
					display: inline-block;
					width: 72rpx;
					text-align: center;
					line-height: 72rpx;
					border: 1px solid;
					border-radius: 36rpx;
					margin-right: 30rpx;
					&.add {
						color: #fff;
					}
				}
			}
			.time-wrapper {
				display: flex;
				align-items: center;
				height: 100rpx;
				.time {
					position: relative;
					height: 60rpx;
					width: 240rpx;
					border: 2rpx solid;
					border-radius: 30rpx;
					.time-title {
						width: 240rpx;
						font-size: 28rpx;
						color: #6f6f6f;
						text-align: center;
						position: absolute;
						bottom: -46rpx;
					}
				}
				.time-line {
					flex: 1;
					height: 2rpx;
				}
			}
		}
	}
</style>

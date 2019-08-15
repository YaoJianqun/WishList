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
					<view class="item frequency bgcolor day" :class="[isFrequencySel('day')]">日</view>
					<view class="item frequency bgcolor week" :class="[isFrequencySel('week')]">周</view>
					<view class="item frequency bgcolor month" :class="[isFrequencySel('week')]">月</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">标准类型 : </view>
				<view class="tab-wrapper iconfont" :class="task.color">
					<view class="item type bgcolor task" :class="[isTypeSel('task')]">每周定量</view>
					<view class="item type bgcolor count" :class="[isTypeSel('count')]">每周定次</view>
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
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">标准类型 : </view>
			<view class="tab-wrapper iconfont" :class="task.color">
				<view class="item type bgcolor task" :class="[isTypeSel('task')]">每周定量</view>
				<view class="item type bgcolor count" :class="[isTypeSel('count')]">每周定次</view>
			</view>
		</view>
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
				task: {}
			}
		},
		methods: {
			isFrequencySel (frequency) {
				if(this.task.frequency === frequency) return 'sel ' + this.task.color;
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
			 console.log(task)
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
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				border: 1rpx solid #8E8E8E;
				.item {
					position: absolute;
					height: 64rpx;
					text-align: center;
					border-radius: 30rpx;
				}
				.frequency {
					width: 33.333%;
					&.day {
						top: -2rpx;
						left: -2rpx;
					}
					&.week {
						position: static;
						margin-left: 33.333%;
					}
					&.month {
						top: -1rpx;
						right: -2rpx;
					}
				}
				.type {
					width: 50%;
					&.task {
						top: -2rpx;
						left: -2rpx;
					}
					&.count {
						top: -2rpx;
						right: -2rpx;
					}
				}
				.sel {
					color: #fff;
				}
			}
			.count-wrapper {
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
		}
	}
</style>

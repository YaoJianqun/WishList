<template>
	<view class="info-wrapper">
		<view class="task-icon sel" v-if="!task.icon">+</view>
		<view class="task-icon" v-if="task.icon">
			<view class="icon iconfont" :class="[task.icon,task.color]"></view>
		</view>
		<view class="task-form">
			<view class="uni-form-item uni-column">
				<view class="title">名称 : </view>
				<input class="uni-input" type="text" placeholder="请输入任务名称" v-model="task.name"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">快乐币 : </view>
				<input class="uni-input" type="number" placeholder="请输入当前任务快乐币价值" v-model="happy_coin"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">宣言 : </view>
				<view class="uni-textarea">
					<textarea maxlength="100" placeholder-style="color:#888888" placeholder="请输入任务宣言" v-model="task.declaration"/>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">颜色 : </view>
				<view class="color-list">
					<view :class="['task-color bgcolor warning',isColorSel('warning')]"></view>
					<view :class="['task-color bgcolor parimary',isColorSel('parimary')]"></view>
					<view :class="['task-color bgcolor parimary',isColorSel('success')]"></view>
					<view :class="['task-color bgcolor danger',isColorSel('danger')]"></view>
					<view :class="['task-color bgcolor pink',isColorSel('pink')]"></view>
					<view :class="['task-color bgcolor purple',isColorSel('purple')]"></view>
					<view :class="['task-color bgcolor info',isColorSel('info')]"></view>
					<view :class="['task-color bgcolor grey',isColorSel('grey')]"></view>
					<view :class="['task-color bgcolor black',isColorSel('black')]"></view>
				</view>
			</view>
		</view>
		<view :class="['tab bdcolor', task.color]"></view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import Task from '@/common/model/Task'
	
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
		computed: {
			happy_coin: {
				get: function () {
					return this.task.happy_coin == 0 ? '' : this.task.happy_coin
				},
				set: function (newValue) {
					this.task.happy_coin = newValue;
				}
			}
		},
		methods: {
			isColorSel (color) {
				if(this.task.color === color) return 'sel';
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
		padding: 72rpx 50rpx 0;
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
		.task-icon {
			width: 140rpx;
			height: 140rpx;
			line-height: 140rpx;
			font-size: 56rpx;
			text-align: center;
			border-radius: 20rpx;
			margin: 0 auto 60rpx;
			&.sel {
				color: #8A8A8A;
				background-color: #CDCDCD;
			}
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
				height: 200rpx;
				font-size: 30rpx;
				margin-top: 28rpx;
				padding: 10rpx;
				border: 1px solid #BBBBBB;
				border-radius: 20rpx;
			}
			.color-list {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				width: 100%;
				padding: 0 40rpx;
				margin-top: 32rpx;
				margin-bottom: 16rpx;
				.task-color {
					width: 32rpx;
					height: 32rpx;
					line-height: 32rpx;
					border-radius: 50%;
					margin-right: 80rpx;
					margin-bottom: 30rpx;
					background-color: #007AFF;
					&.sel {
						border: 1px solid #101010;
					}
				}
			}
		}
	}
</style>

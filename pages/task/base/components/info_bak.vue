<template>
	<view class="info-wrapper">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			<view class="task-icon sel" v-if="!task.icon" @click="openPopup">+</view>
			<view class="task-icon" v-if="task.icon" @click="selIcon">
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
					<view class="color-list" @click="handleColorClick">
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
		</scroll-view>
		<view :class="['tab bdcolor', task.color]"></view>
		<uni-popup ref="popup" custom="true" type="bottom">
			
			<view class="icon-wrapper">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-iconList" @scroll="scroll">
					<view class="iconList">
						<view class="icon-item icon iconfont"
									v-for="icon of iconList"
									:key="icon"
									:class="[icon, icon === task.icon ? task.color : '']"
									@click="handleIconClick(icon)"
						>
						</view>
					</view>
				</scroll-view>
				<view class="operate-wrapper">
					<button type="primary" class="operate-item bgcolor success" @click="changeIcon(true)">确认</button>
					<button type="primary" class="operate-item bgcolor danger" @click="changeIcon(false)">取消</button>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	import iconList from '@/static/data/IconList'
	import Task from '@/common/model/Task'
	
	export default {
		name: 'BaseInfo',
		components: {
			uniIcon,
			uniPopup
		},
		data() {
			return {
				iconList,
				oldIcon: '',
				task: {},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
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
			handleColorClick () {
				console.log(arguments)
			},
			handleIconClick (icon) {
				this.task.icon = icon;
			},
			changeIcon (isChange) {
				if (!isChange) this.task.icon = this.oldIcon;
				this.$refs.popup.close()
			},
			selIcon(){
				this.oldIcon = this.task.icon;
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
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
		position: absolute;
		top: 248rpx;
		left: 40rpx;
		right: 40rpx;
		bottom: 178rpx;
		.scroll-Y {
			position: absolute;
			top: 0rpx;
			bottom: 0rpx;
			border-radius: 20rpx;
			background-color: #fff;
			.task-icon {
				width: 140rpx;
				height: 140rpx;
				line-height: 140rpx;
				font-size: 56rpx;
				text-align: center;
				border: 2rpx solid #BBB;
				border-radius: 20rpx;
				margin: 72rpx auto 60rpx;
				&.sel {
					color: #8A8A8A;
					background-color: #CDCDCD;
				}
				.iconfont {
					font-size: 70rpx;
				}
			}
			.task-form {
				padding: 40rpx;
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
		
			
		.icon-wrapper {
			margin: 40rpx 40rpx;
			border-radius: 20rpx;
			background-color: #fff;
			.scroll-iconList {
				max-height: 500rpx;
				.iconList {
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;
					color: #3E4B53;
					.icon-item {
						width: 116rpx;
						height: 116rpx;
						line-height: 116rpx;
						text-align: center;
						font-size: 60rpx;
						border: 1px solid #BBB;
						border-radius: 20rpx;
						margin: 20rpx;
						&.sel {
							
						}
					}
				}
			}
			.operate-wrapper {
				height: 100rpx;
				padding: 16rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.operate-item {
					width: 40%;
					color: #fff;
					border-radius: 20rpx;
				}
				
			}
		}
	}
</style>

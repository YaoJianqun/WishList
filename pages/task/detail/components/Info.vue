<template>
	<view class="info-wrapper">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			<view class="task-form">
				
				<!-- 标准 target_count -->
				<view class="uni-form-item uni-column">
					<view class="title">标准 : </view>
					<view class="input-wrapper">
						<input class="uni-input" placeholder="请输入任务标准" v-model="target_count"/>
						<view :class="['unit bgcolor', task.color]" @click="selUnit" v-text="task.unit"></view>
						<view class="frequency"> / 每{{frequency}}</view>
					</view>
				</view>
				
				<!-- 频率 frequency -->
				<view class="uni-form-item uni-column">
					<view class="title">频率 : </view>
					<view class="tab-wrapper iconfont" :class="task.color" @click="handleFrequencyClick($event)">
						<view class="item" 
									:class="item.key" 
									:data-frequency="item.key"
									:key="getKey(item.key)"
									v-for="item in frequencyList"
						>{{item.value}}</view>
						<view class="frequency bgitem bgcolor" :class="[task.color, task.frequency]" v-text="frequency"></view>
					</view>
				</view>
				
				<!-- 标准类型 type -->
				<transition name="compoent">
					<view class="uni-form-item uni-column" v-if="frequencyIsNotDay">
						<view class="title">标准类型 : </view>
						<view class="tab-wrapper iconfont" :class="task.color" @click="handleTypeClick($event)">
							<view class="item"
										:class="item.key"
										:data-type="item.key"
										v-for="item in typeList"
										:key="getKey(item.key)"
							>
								每{{frequency + item.value}}
							</view>
							<view class="type bgcolor bgitem" :class="[task.color, task.type]" v-text="type"></view>
						</view>
					</view>
				</transition>
				
				<!-- 频率 ration -->
				<transition name="compoent">
				<view class="uni-form-item uni-column" v-if="typeIsTask" @click="handleRationClick($event)">
					<view class="title">{{showWeek ? '星期 : ' : '时期 : '}}</view>
					<scroll-view class="circle-wrapper ration" :scroll-left="scrollTop" scroll-x="true" @scroll="scroll">
							<transition name="week">
								<view v-if="showWeek" class="inline-block">
									<view class="item iconfont bdcolor"
												:class="[task.color, {'bgcolor sel': task.ration.indexOf(item.key) > -1}]"
												v-for="item in weekList"
												:key="getKey(item.key)"
												:data-ration="item.key"
									>
										{{item.value}}
									</view>
								</view>
							</transition>
							<transition name="month">
								<view v-if="!showWeek" class="inline-block">
									<view class="item iconfont bdcolor"
												:class="[task.color, {'bgcolor sel': task.ration.indexOf(item.key) > -1}]"
												v-for="item in monthList"
												:key="getKey(item.key)"
												:data-ration="item.key"
									>
										{{item.value}}
									</view>
								</view>
							</transition>
					</scroll-view>
				</view>
				</transition>
				
				<!-- 频率 repeat_count -->
				<transition name="compoent">
					<view class="uni-form-item uni-column" v-if="!typeIsTask">
						<view class="title">每{{frequency + ' ' + task.repeat_count}} 次 : </view>
						<view class=" iconfont" :class="task.color" @click="handleRepeatCountClick">
							<view class="count-wrapper">
								<scroll-view class="circle-wrapper ration" :scroll-left="scrollTop" scroll-x="true" @scroll="scroll">
									<transition name="week">
										<view class="inline-block" v-if="task.frequency !== 'month'">
											<view class="flex">
												<view class="item bgcolor"
															:data-repeat_count="item + 1" 
															:class="[task.repeat_count == item ? RepeatCountSel : '']"
															v-for="item in 6"
															:key="item"
															v-text="item + 1"
												>
												</view>
											</view>
										</view>
									</transition>
									<transition name="month">
											<view class="inline-block" v-if="task.frequency === 'month'">
												<view class="flex">
													<view class="item bgcolor"
																:data-repeat_count="item + 1" 
																:class="[task.repeat_count == item ? RepeatCountSel : '']"
																v-for="item in 31"
																:key="item"
																v-text="item + 1"
													>
													</view>
												</view>
											</view>
									</transition>
								</scroll-view>
							</view>
						</view>
					</view>
				</transition>
				<view class="uni-form-item uni-column">
					<view class="title">提醒 : </view>
					<scroll-view class="circle-wrapper" :scroll-left="scrollRight" scroll-x="true" @scroll="scroll">
							<picker mode="time" start="00:00" end="24:00" @change="bindRemindChangeChange">
							<view class="item iconfont bdcolor" 
										:class="[task.color]"
										v-for="item in task.remind"
										:key="getKey(item)"
										v-text="item"
							>
							</view>
							<view class="add item bgcolor bdcolor" :class="[task.color]">+</view>
							</picker>
					</scroll-view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">提醒 : </view>
					<view class="time-wrapper">
						<view class="start time iconfont" :class="task.color">
							2018-01-01
							<view class="time-title">开始时间</view>
						</view>
						<view class="time-line"></view>
						<view class="end time iconfont" :class="task.color">
							2019-01-01
							<view class="time-title">结束时间</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 顶部标签 -->
		<view :class="['tab bdcolor', task.color]"></view>
		<!-- 单位弹出框 -->
		<uni-popup ref="popup" custom type="bottom">
			<view class="unit-wrapper">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-unitList" @scroll="scroll">
					<view class="unitList">
						<view class="unit-item icon iconfont bdcolor"
									v-for="unit of unitList"
									:data-unit="unit"
									:key="getKey(unit)"
									@click="handleUnitClick($event)"
									:class="[unit === task.unit ? task.color : '']"
									v-text="unit"
						>
						</view>
					</view>
				</scroll-view>
				<view class="operate-wrapper">
					<button type="primary" class="operate-item bgcolor success" @click="changeUnit(true)">确认</button>
					<button type="primary" class="operate-item bgcolor danger" @click="changeUnit(false)">取消</button>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import getUUID from '@/common/util/UUID'
	
	import { unitList, frequencyList, typeList, weekList, monthList} from '@/static/data/TaskEnum'
	
	export default {
		name: 'BaseInfo',
		components: {
			uniPopup
		},
		data() {
			return {
				unitList,
				frequencyList,
				weekList,
				monthList,
				typeList,
				task: {},
				scrollTop: 0,
				scrollRight: 10000,
				old: {
					scrollRight: 10000,
					scrollTop: 0
				},
				
			}
		},
		computed: {
			RepeatCountSel () {
				return 'sel ' + this.task.color;
			},
			type: {
				get: function () {
					let temp_type = '每' + this.frequency + this.typeList[this.task.type].value;
					return temp_type;
				}
			},
			frequency: {
				get: function () {
					let temp_fre = this.frequencyList[this.task.frequency].value;
					return temp_fre;
				},
				set: function (newValue) {
					this.task.frequency = newValue;
				}
			},
			target_count: {
				get: function () {
					return this.task.target_count == 0 ? '' : this.task.target_count
				},
				set: function (newValue) {
					this.task.target_count = newValue;
				}
			},
			showWeek () {
				return this.task.frequency === 'week' || this.task.frequency === 'day';
			},
			frequencyIsNotDay () {
				return this.task.frequency !== 'day';
			},
			typeIsTask () {
				return this.task.type === 'task'
			}
		},
		methods: {
			bindRemindChangeChange (e) {
				if (e.type === 'change' && this.task.remind.indexOf(e.detail.value) < 0)
					this.task.remind.push(e.detail.value);
			},
			handleRationClick (e) {
				let temp_ration = e.target.dataset.ration;
				if (temp_ration && this.task.ration.indexOf(temp_ration) < 0)
					this.task.ration.push(temp_ration);
				else if (temp_ration)
					this.task.ration.splice(this.task.ration.indexOf(temp_ration), 1);
			},
			handleRepeatCountClick (e) {
				let temp_count = e.target.dataset.repeat_count;
				if (temp_count) this.task.repeat_count = temp_count;
			},
			handleFrequencyClick (e) {
				let temp_fre = e.target.dataset.frequency;
				if (temp_fre) this.task.frequency = temp_fre;
			},
			handleTypeClick (e) {
				let temp_type = e.target.dataset.type;
				if (temp_type) this.task.type = temp_type;
			},
			handleUnitClick (e) {
				let temp_unit = e.target.dataset.unit;
				if (temp_unit) this.task.unit = temp_unit;
			},
			changeUnit (isChange) {
				if (!isChange) this.task.unit = this.oldUnit;
				this.$refs.popup.close()
			},
			selUnit(){
				this.oldUnit = this.task.unit;
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			},
			getKey (id) {
				return (id + '-' + getUUID(4, 16));
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goLeft: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 10000;
				});
			}
		},
		created () {
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
			.task-form {
				padding: 50rpx 40rpx 0;
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
						left: 244rpx;
						top: 3rpx;
					}
					.frequency {
						position: absolute;
						left: 328rpx;
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
					border: 1rpx solid #BBBBBB;
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
						transition: left .6s;
						transition-timing-function: ease-in-out;
						&.day {
							left: -2rpx;
						}
						&.week {
							left: 50-16.6666667%;
						}
						&.month {
							left: 100-33.333%;
						}
						&.task {
							left: -2rpx;
						}
						&.count {
							left: 50%;
						}
					}
				}
				.count-wrapper {
					margin: 0 40rpx;
					height: 72rpx;
					white-space: nowrap;
					.flex {
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
				.circle-wrapper {
					white-space: nowrap;
					uni-picker {
						display: inline-block;
					}
					.item {
						display: inline-block;
						width: 72rpx;
						line-height: 72rpx;
						text-align: center;
						border: 1px solid;
						border-radius: 41rpx;
						margin-right: 20rpx;
						
						font-size: 24rpx;
						&.sel {
							color: #fff;
						}
						&.add {
							font-size: 36rpx;
							color: #fff;
						}
					}
				}
				.time-wrapper {
					display: flex;
					align-items: center;
					height: 100rpx;
					font-size: 28rpx;
					.time {
						position: relative;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						width: 240rpx;
						border: 2rpx solid #BBBBBB;
						border-radius: 30rpx;
						.time-title {
							width: 240rpx;
							font-size: 28rpx;
							color: #6f6f6f;
							text-align: center;
							position: absolute;
							bottom: -52rpx;
						}
					}
					.time-line {
						flex: 1;
						height: 2rpx;
						background-color: #BBBBBB;
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
		.unit-wrapper {
			margin: 40rpx 40rpx;
			border-radius: 20rpx;
			background-color: #fff;
			.scroll-unitList {
				max-height: 500rpx;
				.unitList {
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;
					color: #3E4B53;
					.unit-item {
						width: 116rpx;
						height: 116rpx;
						line-height: 116rpx;
						text-align: center;
						font-size: 36rpx;
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
	
	.inline-block {
		display: inline-block;
	}

	/* 动态组件动画 */
	.compoent-enter-active, .compoent-leave-active {
		transition: transform .6s, opacity .6s;
	}
	/* .fade-leave-active in below version 2.1.8 */ 
	.compoent-enter, .compoent-leave-to{
		opacity: 0;
		transform: translate3d(100%, 0, 0)
	}
	
	
	.month-enter-active{
		transition: .6s transform .6s, .6s opacity .6s;
	}
  .month-leave-active {
	 transition:  transform .6s, opacity .6s;
  }
	/* .fade-leave-active in below version 2.1.8 */
	.month-enter, .month-leave-to, .week-enter, .week-leave-to {
		opacity: 0;
		transform: translate3d(100%, 0, 0)
	}
	.week-enter-active{
		transition: .6s transform .6s, .6s opacity .6s;
	}
	.week-leave-active {
	 transition: transform .6s, opacity .6s;
	}
</style>

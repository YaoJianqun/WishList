<template>
	<view class="info-wrapper">
		<view class="timer-wrapper">
			<view class="time hour-wrapper" :style="hourRotateX">
				<view class="number back iconfont" v-text="hour.front" :class="[task.color]"></view>
				<view class="number front iconfont" v-text="hour.back" :class="[task.color]"></view>
				<view class="mask"></view>
			</view>
			<view class="time min-wrapper" :style="minRotateX">
				<view class="number back iconfont" v-text="min.front" :class="[task.color]"></view>
				<view class="number front iconfont" v-text="min.back" :class="[task.color]"></view>
				<view class="mask"></view>
			</view>
			<view class="time sec-wrapper" :style="secRotateX">
				<view class="number back iconfont" v-text="sec.front" :class="[task.color]"></view>
				<view class="number front iconfont" v-text="sec.back" :class="[task.color]"></view>
				<view class="mask"></view>
			</view>
			
		</view>
		<view class="operate-wrapper">
			<view class="on-off bgcolor" 
						:class="[{'success': !timerState}, {'danger': timerState}]"
						@click="handleOnOffClick"
			>
				<view class="icon iconfont" :class="[{'iconplay': !timerState},{'iconstop': timerState}, {'play': !timerState}]"></view>
			</view>
		</view>
		<view :class="['tab bdcolor', task.color]"></view>
		<uni-popup :show="show" :type="'center'" :custom="true" :mask-click="false" ref="tip">
			<view class="uni-tip">
				<view class="uni-tip-title">提示</view>
				<view class="uni-tip-content">棒！恭喜你完成任务！</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button bgcolor success" @click="cancel">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapState } from 'vuex'
	import { commonColor, commonColors } from '@/static/data/commonData'
	import digit from '@/static/data/digit'
	
	
	export default {
		name: 'TallyInfoDate',
		components: {
			uniPopup
		},
		data() {
			return {
				isInit: true,
				timerInterval: null,
				timerState: false,
				balls: [],
				totalMilliSeconds: 0,
				completedMilliSeconds: 0,
				hour: {front: 0, back: 0},
				min: {front: 0, back: 0},
				sec: {front: 0, back: 0},
				hourDeg: 0,
				minDeg: 0,
				secDeg: 0
			}
		},
		computed: {
			secRotateX () {
				return `transform: translateZ(-380rpx) rotateX(${this.secDeg}deg);`;
			},
			
			minRotateX () {
				return `transform: translateZ(-380rpx) rotateX(${this.minDeg}deg);`;
			},
			
			hourRotateX () {
				return `transform: translateZ(-380rpx) rotateX(${this.hourDeg}deg);`;
			},
			...mapState({
				task: state => state.task
			})
		},
		methods: {
			
			cancel() {
				this.$refs['tip'].close();
			},
			
			togglePopup() {
				this.$refs['tip'].open()
			},
			
			handleOnOffClick () {
				if (!this.timerState && this.task.completed_count == this.task.target_count) return;
				//当前计时器为计时状态时
				if (this.timerState) {
					clearInterval(this.timerInterval);
					this.timerInterval = '';
				} else {
					this.timerStart ();
				}
				console.log(this.timerState)
				this.timerState = !this.timerState;
				console.log(this.timerState)
				//uni.vibrateLong()
				this.$emit('changeInterval', this.timerInterval);
				uni.vibrateShort()
			},
			
			initTimer () {
				if (this.task.unit === '分') {
					this.completedMilliSeconds = this.task.completed_count * 60 * 1000 + this.task.completed_milliseconds;
				} else if (this.task.unit === '时') {
					this.completedMilliSeconds = this.task.completed_count * 3600 * 1000 + this.task.completed_milliseconds;
				} else {
					this.completedMilliSeconds = this.task.completed_count * 1000;
				}
				this.totalMilliSeconds = this.getTargetMilliSeconds(this.task.target_count, this.task.unit);
				this.renderTimer();
			},
			
			timerStart () {
				this.timerInterval = setInterval(function () {
					this.updateTime();
					this.renderTimer();
				}.bind(this), 1000)
			},
			
			renderTimer () {
				let timeData = this.getTimeData();
				
				let hours = timeData.hours;
				let minutes = timeData.minutes;
				let seconds = timeData.seconds;
				
				setTimeout(() => {
					let temp_seconds = `${parseInt(seconds/10)}${parseInt(seconds%10)}`;
					if (Math.abs(this.secDeg) / 180 % 2 == 0) {
						this.sec.back = temp_seconds;
					} else {
						this.sec.front = temp_seconds;
					}
				}, 400)
				this.secDeg -= 180;
				
				setTimeout(() => {
					let temp_min = `${parseInt(minutes/10)}${parseInt(minutes%10)}`;
					if (Math.abs(this.minDeg) / 180 % 2 == 0) {
						this.min.back = temp_min;
					} else {
						this.min.front = temp_min;
					}
				}, 400);
				if (seconds === 59 || this.isInit) this.minDeg -= 180;
				
				setTimeout(() => {
					let temp_sec = `${parseInt(hours/10)}${parseInt(hours%10)}`;
					if (Math.abs(this.hourDeg) / 180 % 2 == 0) {
						this.hour.back = temp_sec;
					} else {
						this.hour.front = temp_sec;
					}
				}, 400);
				if ((seconds === 59 && minutes%10 === 9) || this.isInit) this.hourDeg -= 180;
				
				if (hours === 0 && minutes ===0 && seconds === 0) {
					if (this.timerState) {
						setTimeout(() => {
							this.handleOnOffClick();
							this.togglePopup();
						}, 500)
					} else {
						return;
					}
					
				}
				if (this.isInit) this.isInit = false;
			
			},
			
			updateTime () {
				this.completedMilliSeconds += 1000;
				
				if (this.task.unit === '分') {
					this.task.completed_count = Math.floor(this.completedMilliSeconds/1000/60);
					this.task.completed_milliseconds = (this.completedMilliSeconds - this.task.completed_count*60*1000);
				} else if (this.task.unit === '时') {
					this.task.completed_count = Math.floor(this.completedMilliSeconds/1000/3600);
					this.task.completed_milliseconds = Math.floor((this.completedMilliSeconds - this.task.completed_count*3600*1000));
				} else {
					this.task.completed_count = this.completedMilliSeconds/1000;
				}
			},
			
			getTimeData () {
				let temp_totalMilliSeconds = this.totalMilliSeconds - this.completedMilliSeconds;
				
				let timeData = {hours: 0, minutes: 0, seconds: 0};
				
				timeData.hours = Math.floor(temp_totalMilliSeconds / 1000 / 3600);
				timeData.minutes = Math.floor((temp_totalMilliSeconds / 1000 - timeData.hours * 3600)/60);
				timeData.seconds = Math.floor(temp_totalMilliSeconds / 1000 % 60);
				
				return timeData;
			},
			
			getTargetMilliSeconds (targetCount, unit) {
				
				let temp_seconds = (targetCount/* - this.task.completed_count*/) * 1000;
				
				let totalMilliSeconds = 0;
				
				if (unit === '秒')
					totalMilliSeconds = Math.floor(temp_seconds);
				else if (unit === '分')
					totalMilliSeconds = Math.floor(temp_seconds * 60);
				else if (unit === '小时')
					totalMilliSeconds = Math.floor(temp_seconds * 3600);
				
				return totalMilliSeconds;
			}
		},
		mounted() {
			this.initTimer();
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrapper {
		position: absolute;
		top: 248rpx;
		left: 40rpx;
		right: 40rpx;
		bottom: 68rpx;
		border-radius: 20rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.timer-wrapper {
			position: relative;
			height: 420rpx;
			margin: 102rpx 40rpx 40rpx;
			/*background-color: #2AD181;*/
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 20rpx;
			perspective: 380rpx;
			box-shadow: 0rpx 0rpx 10rpx 0rpx #ccc;
			.time {
				width: 26%;
				height: 100%;
				position: relative;
				transform: translateZ(-380rpx);
				transition:transform .8s;
				transform-style: preserve-3d;
				.number {
					width: 100%;
					height: 360rpx;
					line-height: 380rpx;
					background-color: #FFFFFF;
					border: 2rpx solid #AAAAAA;
					border-radius: 20rpx;
					position: absolute;
					margin: 30rpx 0rpx;
					text-align: center;
					font-size: 40rpx;
					
					&.front {
						transform: translateZ(380rpx);
					}
					&.back {
						transform: translateZ(-380rpx) rotateX(180deg);
					}
				}
				&.min-wrapper {
					z-index: 2;
				}
				.mask {
					background: rgba($color: #FFFFFF, $alpha: 1.0);
					position: absolute;
					width: 100%;
					height: 100%;
					transform: translateZ(0rpx);
					z-index: 1;
				}
			}
			/*.time:hover {
				transform: translateZ(-380rpx) rotateX(-180deg);
			}*/
		}
		/*overflow: hidden;*/
		.operate-wrapper {
			margin: 200rpx 40rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			background-color: #fff;
			box-shadow: 0rpx 0rpx 6rpx 6rpx #eee;
			display: flex;
			justify-content: center;
			align-items: center;
			.on-off {
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 60rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				.icon {
					&.play {
						margin-left: 12rpx;
					}
					font-size: 48rpx;
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
		.uni-tip {
			padding: 15px;
			width: 300px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 10px;
			.uni-tip-title {
				text-align: center;
				font-weight: bold;
				font-size: 16px;
				color: #333;
			}
			
			.uni-tip-content {
				text-align: center;
				padding: 15px;
				font-size: 14px;
				color: #666;
			}
			.uni-tip-group-button {
				margin-top: 10px;
				display: flex;
				.uni-tip-button {
					width: 100%;
					text-align: center;
					font-size: 14px;
					color: #FFFFFF;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>

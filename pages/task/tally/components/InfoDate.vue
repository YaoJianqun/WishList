<template>
	<view class="info-wrapper">
		<canvas canvas-id="task-timer"
						:width="timerCanvasWidth"
						:height="timerCanvasHeight"
						:style="{width: timerCanvasWidth*2 + 'rpx', height: timerCanvasHeight*2 + 'rpx'}"
		></canvas>
		<view class="operate-wrapper">
			<view class="on-off bgcolor" 
						:class="[{'success': !timerState}, {'danger': timerState}]"
						@click="handleOnOffClick"
			>
				<view class="icon iconfont" :class="[{'iconplay': !timerState},{'iconstop': timerState}, {'play': !timerState}]"></view>
			</view>
		</view>
		<view :class="['tab bdcolor', task.color]"></view>
		<uni-popup ref="popup" :type="'center'" custom="true">
			<view class="popup-wrapper">
				恭喜您完成任务！
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
				timerInterval: null,
				timerState: false,
				
				balls: [],
				timerContext: null,
				totalMilliSeconds: 0,
				completedMilliSeconds: 0,
				canvasStartX: 0,
				canvasStartY: 0,
				operateBarOffsetTop: 0,
				operateBarOffsetLeft: 0,
				operateBarOffsetRight: 0,
				timerCanvasWidth: 0,
				timerCanvasHeight: 0,
				radius: 2.4
			}
		},
		computed: {
			...mapState({
				task: state => state.task
			})
		},
		methods: {
			togglePopup() {
				this.$refs['popup'].open()
			},
			handleOnOffClick () {
				//当前计时器为计时状态时
				if (this.timerState) {
					clearInterval(this.timerInterval);
					this.timerInterval = '';
				} else {
					this.timerStart (this.timerContext);
				}
				this.timerState = !this.timerState;
				//uni.vibrateLong()
				this.$emit('changeInterval', this.timerInterval);
				uni.vibrateShort()
			},
			initTimer (data) {
				
				this.timerCanvasHeight = data[0].height;
				this.timerCanvasWidth = data[0].width;
				
				this.timerContext = uni.createCanvasContext('task-timer', this);
				
				let temp_time = this.task.target_count;
				let time_unit = this.task.unit;
				
				if (this.task.unit === '分') {
					this.completedMilliSeconds = this.task.completed_count * 60 * 1000 + this.task.completed_milliseconds;
				} else if (this.task.unit === '时') {
					this.completedMilliSeconds = this.task.completed_count * 3600 * 1000 + this.task.completed_milliseconds;
				} else {
					this.completedMilliSeconds = this.task.completed_count * 1000;
				}
				this.totalMilliSeconds = this.getTargetMilliSeconds(this.task.target_count, this.task.unit);
				
				let timeWidth = (this.radius + 0.25) * 7 * 6 * 2 + (this.radius + 0.25) * 4 * 2 * 2 + (this.radius + 0.25) * 7;
				
				this.canvasStartX = (this.timerCanvasWidth / 2) - (timeWidth / 2);
				this.canvasStartY = this.timerCanvasHeight * 0.2;
				
				this.renderTimer(this.timerContext);
				//this.timerStart (this.timerContext);
			},
			timerStart (ctx) {
				this.timerInterval = setInterval(function () {
					this.renderTimer(ctx);
					this.updateTime();
				}.bind(this), 50)
			},
			renderTimer (ctx) {
				
				ctx.clearRect(0, 0, this.timerCanvasWidth, this.timerCanvasHeight);
				
				let timeData = this.getTimeData();
				
				if (timeData.hours === 0 && timeData.minutes ===0 && timeData.seconds === 0) {
					this.handleOnOffClick();
					this.togglePopup();
				}
				
				let hours = timeData.hours;
				
				let minutes = timeData.minutes;
				let seconds = timeData.seconds;
				
				this.renderDigit(this.canvasStartX, this.canvasStartY, parseInt(hours/10), ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 15, this.canvasStartY, parseInt(hours%10), ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 30, this.canvasStartY, 10, ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 39, this.canvasStartY, parseInt(minutes/10), ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 54, this.canvasStartY, parseInt(minutes%10), ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 69, this.canvasStartY, 10, ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 78, this.canvasStartY, parseInt(seconds/10), ctx);
				this.renderDigit(this.canvasStartX + (this.radius + 0.25) * 93, this.canvasStartY, parseInt(seconds%10), ctx);
				
				for (let i = 0,length = this.balls.length; i < length; i++) {
					ctx.fillStyle = this.balls[i].color;
					ctx.beginPath();
					ctx.arc(this.balls[i].x, this.balls[i].y, this.radius, 0, Math.PI * 2, true);
					ctx.closePath();
					ctx.fill();
				}
				
				ctx.draw(true);
			},
			renderDigit (renderStartX, renderStartY, number, ctx) {
				ctx.fillStyle = commonColor[this.task.color];
				for (let i = 0,length = digit[number].length; i < length; i++) {
					for (let j = 0,length = digit[number][i].length; j < length; j++) {
						if (digit[number][i][j] === 1) {
							ctx.beginPath();
							let arcX = renderStartX + j * 2 * (this.radius + 0.25) + (this.radius + 0.25);
							let arcY = renderStartY + i * 2 * (this.radius + 0.25) + (this.radius + 0.25);
							ctx.arc(arcX, arcY, this.radius, 0 , 2*Math.PI)
							ctx.closePath();
							ctx.fill();
						}
					}
				}
			},
			updateTime () {
				let beforeTimeData = this.getTimeData();
				this.completedMilliSeconds += 50;
				let afterTimeData = this.getTimeData();
				if (beforeTimeData.hours !== afterTimeData.hours)
					this.addBalls(this.canvasStartX + 0 * (this.radius + 0.25), this.canvasStartY, parseInt(beforeTimeData.hours/10));
				if (beforeTimeData.hours !== afterTimeData.hours)
					this.addBalls(this.canvasStartX + 15 * (this.radius + 0.25), this.canvasStartY, parseInt(beforeTimeData.hours%10));
				if (beforeTimeData.minutes !== afterTimeData.minutes)
					this.addBalls(this.canvasStartX + 39 * (this.radius + 0.25), this.canvasStartY, parseInt(beforeTimeData.minutes/10));
				if (beforeTimeData.minutes !== afterTimeData.minutes)
					this.addBalls(this.canvasStartX + 54 * (this.radius + 0.25), this.canvasStartY, parseInt(beforeTimeData.minutes%10));
				if (beforeTimeData.seconds !== afterTimeData.seconds)
					this.addBalls(this.canvasStartX + 78 * (this.radius + 0.25), this.canvasStartY, parseInt(beforeTimeData.seconds/10));
				if (beforeTimeData.seconds !== afterTimeData.seconds)
					this.addBalls(this.canvasStartX + 93 * (this.radius + 0.25), this.canvasStartY, parseInt(beforeTimeData.seconds%10));
					
				this.updateBalls();
				
				if (this.completedMilliSeconds%1000 === 0) {
					if (this.task.unit === '分') {
						this.task.completed_count = Math.floor(this.completedMilliSeconds/1000/60);
						this.task.completed_milliseconds = (this.completedMilliSeconds - this.task.completed_count*60*1000);
					} else if (this.task.unit === '时') {
						this.task.completed_count = Math.floor(this.completedMilliSeconds/1000/3600);
						this.task.completed_milliseconds = Math.floor((this.completedMilliSeconds - this.task.completed_count*3600*1000));
					} else {
						this.task.completed_count = this.completedMilliSeconds/1000;
					}
				}
			},
			addBalls (renderStartX, renderStartY, number) {
				let colorLength = commonColors.length;
				for (let i = 0,length = digit[number].length; i < length; i++) {
					for (let j = 0,length = digit[number][i].length; j < length; j++) {
						if (digit[number][i][j] === 1) {
							
							let arcX = renderStartX + j * 2 * (this.radius + 0.25) + (this.radius + 0.25);
							let arcY = renderStartY + i * 2 * (this.radius + 0.25) + (this.radius + 0.25);
							
							let aBall = {
								x: arcX,
								y: arcY,
								g: 1.5 + Math.random(),
								vx: Math.pow( -1, Math.ceil(Math.random()*1000)) * 4,
								vy: -1 * Math.floor(Math.random() * 8),
								'color': commonColors[Math.floor(Math.random()*colorLength)]
							}
							this.balls.push(aBall);
						}
					}
				}
			},
			updateBalls () {
				for (let i = 0,length = this.balls.length; i < length; i++) {
					this.balls[i].x += this.balls[i].vx;
					this.balls[i].y += this.balls[i].vy;
					this.balls[i].vy += this.balls[i].g;
					
					let ballX = this.balls[i].x + this.radius;
					let ballY = this.balls[i].y + this.radius;
					
					let isOperateBar = ballX > this.operateBarOffsetLeft && ballX < this.operateBarOffsetRight;
					if (
						(!isOperateBar && ballY >= this.timerCanvasHeight - this.radius)
						||
						(isOperateBar && ballY >= this.operateBarOffsetTop - this.radius)
					) {
						if (!isOperateBar)
							ballY = this.timerCanvasHeight - this.radius;
						else
							ballY = this.operateBarOffsetTop - this.radius;
						this.balls[i].vy = - this.balls[i].vy * 0.75;
					}
				}
				
				let cnt = 0;
				for (let i = 0, length = this.balls.length; i < length; i++) {
					let ballEdge = this.balls[i].x + this.radius;
					if (ballEdge > 0 && ballEdge < this.timerCanvasWidth) {
						this.balls[cnt++] = this.balls[i]
					}
				}
				
				while (this.balls.length > Math.min(cnt, 200)) {
					this.balls.pop();
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
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.info-wrapper').boundingClientRect(data => {}).exec(this.initTimer);
			
			query.select('.operate-wrapper').boundingClientRect(data => {
				this.operateBarOffsetTop = data.top - 100;
				this.operateBarOffsetLeft = data.left - 20;
				this.operateBarOffsetRight = data.right - 20;
			}).exec();
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
		.popup-wrapper {
			padding: 20rpx;
			border-radius: 20rpx;
			min-width: 300rpx;
			min-height: 300rpx;
			background-color: #fff;
		}
		/*overflow: hidden;*/
		.operate-wrapper {
			position: absolute;
			bottom: 400rpx;
			height: 160rpx;
			left: 40rpx;
			right: 40rpx;
			border-radius: 20rpx;
			background-color: #fff;
			box-shadow: 0rpx 0rpx 6rpx 6rpx #eee;
			display: flex;
			justify-content: space-around;
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
	}
</style>

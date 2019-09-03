<template>
	<view class="info-wrapper">
		<canvas canvas-id="task-score"
						:style="{width: scorePageWidth * 1.92 + 'rpx', height: scorePageHeight * 0.6 * 1.92 + 'rpx'}"
		></canvas>
		<uni-popup ref="popup" :type="'center'" custom="true">
			<view class="popup-wrapper">
				恭喜您完成任务！
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { commonColor } from '@/static/data/commonData'
	import { mapState } from 'vuex'
	
	export default {
		name: 'TallyInfoScore',
		components: {
			uniPopup
		},
		data() {
			return {
				scoreContext: null,
				scorePageWidth: 0,
				scorePageHeight: 0
			}
		},
		computed: {
			taskCompleted () {
				let completed_count = 0;
				let target_count = 1;
				if (this.task) {
					completed_count = this.task.completed_count;
					target_count = this.task.target_count;
				}
				let temp_progress = completed_count / target_count * 2 + 1.5
				if (temp_progress > 2) {
					temp_progress = temp_progress - 2;
				}
				return temp_progress;
			},
			...mapState({
				task: state => state.task
			})
		},
		methods: {
			togglePopup() {
				this.$refs['popup'].open()
			},
			initScore (data) {
				this.scorePageWidth = data[0].width;
				this.scorePageHeight = data[0].height;
				
				this.scoreContext = uni.createCanvasContext('task-score', this);
				
				this.renderScore(this.scoreContext);
				//this.timerStart (this.timerContext);
			},
			renderScore (ctx) {
				
				//ctx.clearRect(0, 0, this.timerCanvasWidth, this.timerCanvasHeight);
				
				let arcX = this.scorePageWidth * 1.02 * 0.5;
				let arcY = this.scorePageHeight * 0.6 * 0.5;
				let arcR = this.scorePageWidth * 1.02 * 0.8 * 0.5;
				
				//底部灰色圆环
				ctx.beginPath();
				ctx.arc(arcX, arcY, arcR, 0, Math.PI * 2, true);
				ctx.strokeStyle = '#BBB';
				ctx.lineWidth = '4'
				ctx.closePath();
				ctx.stroke();
				
				ctx.beginPath();
				ctx.arc(arcX, arcY, arcR, Math.PI * 1.5, this.taskCompleted*Math.PI, false);
				ctx.strokeStyle = commonColor[this.task.color];
				ctx.lineWidth = '4'
				ctx.setFillStyle(commonColor[this.task.color]);
				ctx.setFontSize(50);
				ctx.setTextAlign('center');
				ctx.fillText(this.task.completed_count, arcX, arcY, arcR * 2);
				ctx.stroke();
				
				/*ctx.fillStyle = this.task.color;
				//顶部进度圆环
				ctx.beginPath();
				ctx.arc(arcX, arcY, arcR, Math.PI * 1.5, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();*/
				
				ctx.draw(true);
			}
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.info-wrapper').boundingClientRect(data => {}).exec(this.initScore);
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
		
		/*display: flex;
		flex-direction: column;
		align-items: center;*/
	}
</style>

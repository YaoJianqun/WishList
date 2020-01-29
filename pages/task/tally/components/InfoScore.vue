<template>
	<view class="info-wrapper">
		<canvas canvas-id="task-score" 
				:style="{width: '100%', height: '60%'}"
		></canvas>
		
		<view class="operate-wrapper">
			<view class="btn bgcolor success add" @click="addScore">
				<view class="icon iconfont iconplus"></view>
			</view>
			<view class="btn bgcolor danger sub" @click="subScore">
				<view class="icon iconfont iconminus"></view>
			</view>
		</view>
		
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
	import { mapState, mapActions } from 'vuex'
	
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
			computeStepCount() {
				let totalCount = this.task.target_count;
				let oneStepCount = 1;
				
				let temp_stepCount = 0;
				
				if (totalCount >= 10000) {
					temp_stepCount = totalCount * 0.05;
					oneStepCount = temp_stepCount - temp_stepCount%50;
				} else if (totalCount >= 1000 && totalCount < 10000) {
					oneStepCount = 100;
				} else if (totalCount >= 200 && totalCount < 1000) {
					oneStepCount = 50;
				} else if (totalCount > 20) {
					oneStepCount = 10;
				}
				
				return oneStepCount;
				
			},
			
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
		watch: {
			taskCompleted() {
				this.renderScore();
			}
		},
		methods: {
			...mapActions(['changeTask']),
			addScore() {
				this.task.completed_count += this.computeStepCount;
				//this.changeTask(this.task);
			},
			
			subScore() {
				this.task.completed_count -= this.computeStepCount;
				//this.changeTask(this.task);
			},
			
			togglePopup() {
				this.$refs['popup'].open()
			},
			
			initScore (data) {
				this.scorePageWidth = data[0].width;
				this.scorePageHeight = data[0].height;
				
				this.scoreContext = uni.createCanvasContext('task-score', this);
				
				this.renderScore();
			},
			
			renderScore () {
				let ctx = this.scoreContext;
				let arcX = this.scorePageWidth * 0.5;
				let arcY = this.scorePageHeight * 0.6 * 0.5;
				let arcR = this.scorePageWidth * 0.8 * 0.5;
				ctx.clearRect(0, 0, this.scorePageWidth, this.scorePageHeight);
				//底部灰色圆环
				ctx.beginPath();
				ctx.arc(arcX, arcY, arcR, 0, Math.PI * 2);
				ctx.strokeStyle = '#BBB';
				ctx.lineWidth = '4';
				ctx.closePath();
				ctx.stroke();
				
				//进度条
				ctx.beginPath();
				ctx.arc(arcX, arcY, arcR, Math.PI * 1.5, this.taskCompleted * Math.PI, false);
				ctx.strokeStyle = commonColor[this.task.color];
				ctx.setFillStyle(commonColor[this.task.color]);
				ctx.lineWidth = '4';
				ctx.setFontSize(50);
				ctx.setTextAlign('center');
				ctx.fillText(this.task.completed_count, arcX, arcY, arcR * 2);
				ctx.stroke();
				
				ctx.draw(true);
			},
			
			init() {
				let query = uni.createSelectorQuery().in(this);
				query.select('.info-wrapper').boundingClientRect().exec(this.initScore);
			}
		},
		
		mounted() {
			this.init();
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
		.operate-wrapper {
			position: absolute;
			bottom: 300rpx;
			height: 120rpx;
			left: 40rpx;
			right: 40rpx;
			box-shadow: 0rpx 0rpx 6rpx 6rpx #eee;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.btn {
				height: 96rpx;
				width: 96rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 96rpx;
				.iconfont {
					font-size: 54rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>

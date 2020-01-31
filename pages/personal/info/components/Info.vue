<template>
	<view class="info-wrapper">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			<view class="user-form">
				<view class="user-icon sel" v-if="!user.image" @click="selIcon">+</view>
				<view class="user-icon" v-if="user.image" @click="selIcon">
					<image class="image" :mode="'aspectFill'" :src="user.image"></image>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">姓名 : </view>
					<input class="uni-input" type="text" placeholder="不努力者不配拥有姓名" v-model="user.name"/>
				</view>
			</view>
		</scroll-view>
		<view :class="['tab bdcolor warning']"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	import User from '@/common/model/User'
	
	export default {
		name: 'BaseInfo',
		
		data() {
			return {
				oldImage: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			...mapState({
				user: state => state.userInfo
			})
		},
		methods: {
			selIcon(){
				this.oldImage = this.user.image;
				let _this = this;
				uni.chooseImage({
				    count: 1, //默认9
						sizeType: ['compressed'],
				    sourceType: ['album','camera'], //album 从相册选图，camera 使用相机
				    success: function (res) {
							_this.user.image = res.tempFilePaths[0];
				    }
				});
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			}
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
			.user-icon {
				width: 140rpx;
				height: 140rpx;
				line-height: 140rpx;
				font-size: 56rpx;
				text-align: center;
				border: 2rpx solid #BBB;
				border-radius: 20rpx;
				overflow: hidden;
				padding: 2rpx;
				margin: 24rpx auto 22rpx;
				.image {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
				}
				&.sel {
					color: #8A8A8A;
					background-color: #CDCDCD;
				}
				.iconfont {
					font-size: 70rpx;
				}
			}
			.user-form {
				padding: 40rpx 40rpx;
				.uni-form-item {
					margin-bottom: 30rpx;
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
					color: rgb(128, 128, 128);
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

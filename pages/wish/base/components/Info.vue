<template>
	<view class="info-wrapper">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			<view class="wish-form">
				<view class="wish-icon sel" v-if="!wish.image" @click="selIcon">+</view>
				<view class="wish-icon" v-if="wish.image" @click="selIcon">
					<image class="image" :mode="'aspectFill'" :src="wish.image"></image>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">名称 : </view>
					<input class="uni-input" type="text" placeholder="请输入愿望名称" v-model="wish.name"/>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">快乐币 : </view>
					<input class="uni-input" type="number" placeholder="请输入愿望所需快乐币" v-model="happy_coin"/>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">颜色 : </view>
					<view class="color-list" @click="handleColorClick($event)">
						<view :class="['wish-color bgcolor warning',isColorSel('warning')]" data-color="warning"></view>
						<view :class="['wish-color bgcolor parimary',isColorSel('primary')]" data-color="primary"></view>
						<view :class="['wish-color bgcolor success',isColorSel('success')]" data-color="success"></view>
						<view :class="['wish-color bgcolor danger',isColorSel('danger')]" data-color="danger"></view>
						<view :class="['wish-color bgcolor pink',isColorSel('pink')]" data-color="pink"></view>
						<view :class="['wish-color bgcolor purple',isColorSel('purple')]" data-color="purple"></view>
						<view :class="['wish-color bgcolor info',isColorSel('info')]" data-color="info"></view>
						<view :class="['wish-color bgcolor grey',isColorSel('grey')]" data-color="grey"></view>
						<view :class="['wish-color bgcolor black',isColorSel('black')]" data-color="black"></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view :class="['tab bdcolor', wish.color]"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	//import uniPopup from "@/components/uni-popup/uni-popup"
	
	import Wish from '@/common/model/Wish'
	
	export default {
		name: 'BaseInfo',
		components: {
			//uniPopup
		},
		data() {
			return {
				index: 0,
				oldImage: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			...mapState({
				wish: state => state.wish
			}),
			happy_coin: {
				get: function () {
					if (!this.wish) return '';
					return this.wish.happy_coin == 0 ? '' : this.wish.happy_coin
				},
				set: function (newValue) {
					this.wish.happy_coin = newValue;
				}
			}
		},
		methods: {
			handleColorClick (e) {
				let color = e.target.dataset.color;
				if (color) {
					this.wish.color = color;
				};
			},
			selIcon(){
				this.oldImage = this.wish.image;
				let _this = this;
				uni.chooseImage({
				    count: 1, //默认9
						sizeType: ['compressed'],
				    sourceType: ['album','camera'], //album 从相册选图，camera 使用相机
				    success: function (res) {
							_this.wish.image = res.tempFilePaths[0];
				    }
				});
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			isColorSel (color) {
				if(this.wish && this.wish.color === color) return 'sel';
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
			.wish-icon {
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
			.wish-form {
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
				.color-list {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					width: 100%;
					padding: 0 20rpx;
					margin-top: 32rpx;
					margin-bottom: 16rpx;
					.wish-color {
						box-sizing: border-box;
						width: 42rpx;
						height: 42rpx;
						border-radius: 50%;
						margin: 0 20rpx 30rpx;
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
	}
</style>

<template>
	<view class="info-wrapper">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			<view class="task-form">
				<view class="task-icon sel" v-if="!task.icon" @click="selIcon">+</view>
				<view class="task-icon" v-if="task.icon" @click="selIcon">
					<view class="icon iconfont" :class="[task.icon,task.color]"></view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">名称 : </view>
					<input class="uni-input" type="text" placeholder="请输入任务名称" v-model="task.name"/>
				</view>
				<picker mode=selector :range="wishList" range-key="name" @change="selWish">
					<view class="uni-form-item uni-column">
						<view class="title">愿望 : </view>
						<view class="uni-input" v-text="wishName === '' ? '请选择愿望' : wishName"></view>
						<!-- <input class="uni-input" type="text" placeholder="请选择愿望" @click.prevent=""/> -->
					</view>
				</picker>
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
					<view class="color-list" @click="handleColorClick($event)">
						<view :class="['task-color bgcolor warning',isColorSel('warning')]" data-color="warning"></view>
						<view :class="['task-color bgcolor parimary',isColorSel('primary')]" data-color="primary"></view>
						<view :class="['task-color bgcolor success',isColorSel('success')]" data-color="success"></view>
						<view :class="['task-color bgcolor danger',isColorSel('danger')]" data-color="danger"></view>
						<view :class="['task-color bgcolor pink',isColorSel('pink')]" data-color="pink"></view>
						<view :class="['task-color bgcolor purple',isColorSel('purple')]" data-color="purple"></view>
						<view :class="['task-color bgcolor info',isColorSel('info')]" data-color="info"></view>
						<view :class="['task-color bgcolor grey',isColorSel('grey')]" data-color="grey"></view>
						<view :class="['task-color bgcolor black',isColorSel('black')]" data-color="black"></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view :class="['tab bdcolor', task.color]"></view>
		<uni-popup ref="popup" custom type="bottom">
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
	import { mapState } from 'vuex'
	
	import { iconList } from '@/static/data/TaskEnum'
	import Task from '@/common/model/Task'
	import { queryWishData } from '@/common/dataOperate/controller/WishDataController'
	
	export default {
		name: 'BaseInfo',
		data() {
			return {
				wishName: '',
				iconList,
				wishList: [],
				index: 0,
				oldIcon: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			...mapState({
				task: state => state.task
			}),
			happy_coin: {
				get: function () {
					if (!this.task) return '';
					return this.task.happy_coin == 0 ? '' : this.task.happy_coin
				},
				set: function (newValue) {
					this.task.happy_coin = newValue;
				}
			}
		},
		methods: {
			selWish (e) {
				let wishIndex = e.detail.value;
				this.task.wishId = this.wishList[wishIndex].id;
				this.wishName = this.wishList[wishIndex].name;
			},
			
			handleColorClick (e) {
				let color = e.target.dataset.color;
				if (color) {
					this.task.color = color;
				};
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
				this.old.scrollTop = e.detail.scrollTop
			},
			
			isColorSel (color) {
				if(this.task && this.task.color === color) return 'sel';
			}
		},
		created() {
			queryWishData().then((wishData) => {
				let temp_wishObj = wishData.wishObj;
				for (let id in temp_wishObj) {
					let temp_wish = temp_wishObj[id];
					if (!temp_wish.redeem) {
						this.wishList.push({id: temp_wish.id, name: temp_wish.name});
						if (this.task.wishId === temp_wish.id) this.wishName = temp_wish.name;
					}
				}
			})
			/*uni.getStorage({
				key: 'wishData',
				success(res) {
					let temp_wishlist = res.data.wishObj;
					for (let id in temp_wishlist) {
						let temp_wish = temp_wishlist[id];
						if (!temp_wish.redeem) {
							_this.wishList.push({id: temp_wish.id, name: temp_wish.name});
							if (_this.task.wishId === temp_wish.id) _this.wishName = temp_wish.name;
						}
					}
				},
				fail() {
					_this.wishList = [];
				}
			})*/
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
				margin: 24rpx auto 22rpx;
				&.sel {
					color: #8A8A8A;
					background-color: #CDCDCD;
				}
				.iconfont {
					font-size: 70rpx;
				}
			}
			.task-form {
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
					padding: 0 20rpx;
					margin-top: 32rpx;
					margin-bottom: 16rpx;
					.task-color {
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

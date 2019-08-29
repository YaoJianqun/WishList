<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll" @click="handleScrollClick">
		<view class="wish-list" :class="[pageTheme]">
			<view class="wish-item"
						:class="[reverseClass]"
						v-for="wish in wishList"
						:key="wish.id"
						:data-wishid="wish.id"
						:style="menuMoveWish == wish.id ? itemMoveStyle : ''"
						@touchstart.prevent="handleTouchStart"
						@touchmove="handleTouchMove"
						@touchend="handleTouchEnd"
			>
				<view class="image-wrapper">
					<view class="icon iconfont icondiamond1 warning" v-if="!wish.image"></view>
					<image :mode="'aspectFill'"
								 class="image"
								 :src="wish.image"
								 v-if="wish.image"
					></image>
				</view>
				<view class="wish-info">
					<view class="title" v-text="wish.name"></view>
					<view class="info" v-text="wish.happy_coin"></view>
				</view>
				<view class="progress bdcolor warning" style="width: 60%;"></view>
				<view class="progress bgprogress bdcolor warning"></view>
				<!-- 默认主题菜单 -->
				<view class="wish-menu wish-edit bgcolor warning"
							@click.stop="handleEditWishClick(wish.id)" 
							v-if="pageTheme === 'default'"
				>
					<view class="menu-icon icon iconfont iconpencil"></view>
					<view class="menu-title">编辑</view>
				</view>
				<view class="wish-menu wish-delete bgcolor danger" 
							:style="menuMoveWish == wish.id ? deleteMoveStyle : ''"
							@click.stop="handleDelWishClick(wish.id)"
							v-if="pageTheme === 'default'"
				>
					<view class="menu-icon icon iconfont icontrash"></view>
					<view class="menu-title">删除</view>
				</view>
				<!-- 卡片主题菜单 -->
				<view class="wish-menu" v-if="pageTheme === 'card'">
					
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import { mapState } from 'vuex'
	import { deleteWishData } from '@/common/controller/WishDataController.js'
	
	export default {
		name: 'WishListContent',
		props: {
			pageTheme: {
				type: String,
				default: 'default'
			},
			pageState: {
				type: String,
				default: 'no-redeem'
			}
		},
		data() {
			return {
				startX: 0,
				timer: null,
				clickTime: 0,
				cardMunuState: false,
				menuMoveWish: '',
				menuState: false,
				menuMoveCount: 0,
				touchStatus: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			reverseClass () {
				return this.cardMunuState ? 'reverse' : '';
			},
			deleteMoveStyle () {
				let moveCount = -210;
				if (this.menuMoveCount < -210) moveCount = this.menuMoveCount;
				return 'right:' + moveCount + 'rpx;'; 
			},
			itemMoveStyle () {
				return 'right:' + Math.abs(this.menuMoveCount) + 'rpx;';
			},
			wishList () {
				let temp_wishList = [];
				if (this.wishData.wishIdArray) {
					for (let id of this.wishData.wishIdArray) {
						let wish = this.wishData.wishObj[id]; 
						if (this.pageState === 'no-redeem' && wish.redeem) continue;
						if (this.pageState === 'redeem' && !wish.redeem) continue;
						temp_wishList.push(wish);
					}
				}
				return temp_wishList;
			},
			...mapState({
				wishData: state => state.wishData
			})
		},
		methods: {
			handleScrollClick () {
					this.menuMoveCount = 0;
					this.menuMoveWish = '';
					this.menuState = false;
			},
			handleTouchStart (e) {
				if (this.pageTheme === 'card') {
					this.clickTime = Date.now();
					this.timer = setInterval(function () {
						let endTime = Date.now();
						if (endTime - this.clickTime >= 1500) {
							this.cardMunuState = true;
							console.log(this.cardMunuState)
							clearInterval(this.timer);
						}
					}.bind(this), 100)
					return;
				}
			  this.touchStatus = true;
				this.startX = e.touches[0].clientX;
				if (!this.menuState) this.handleScrollClick();
			},
			handleTouchMove (e) {
				//判断是否为卡片主题
				if (this.pageTheme === 'card') return;
				//判断是否为滑动状态
			  if (this.touchStatus && this.startX !== 0) {
					//判断是否存在timer，如果有清除未执行timer
			    if (this.timer) {
			      clearTimeout(this.timer)
			    }
					//创建timer延迟16ms执行
			    this.timer = setTimeout(() => {
						
						if (this.menuState) this.editWish(e);
						
						//获取当前用户滑动位置
			      const touchX = e.touches[0].clientX;
						
						//判断如果当前滑动位置与起始位置不同，且滑动方向未空对象
						if (this.scrollDirection === '' && touchX !== this.startX){
							//依据起始位置与当前位置大小判断滑动方向
							touchX > this.startX ? this.scrollDirection = 'right' : this.scrollDirection = 'left';
							//当用户为左滑时，将左滑菜单状态置为true
							if (this.scrollDirection === 'left') this.menuState = true;
						}
						
						//依据滑动方向与右滑菜单判断执行函数 moveProgress:为改变进度条大小 editWish:为弹出菜单
						if (this.scrollDirection === 'left'&&this.menuState)
							this.editWish(e);
							
			    }, 16)
			  }
			},
			editWish (e) {
				if (!this.touchStatus) return;
				
				let wishid = e.currentTarget.dataset.wishid;
				
				const touchX = e.touches[0].clientX;
				
				let defferenceCount = touchX - this.startX;
				if (defferenceCount > 0) defferenceCount = 0;
				
				let movePercent = defferenceCount / 120;
				
				let temp_moveCount = Math.floor(380 * movePercent);
				
				if (temp_moveCount < -380) temp_moveCount = -380;
				
				this.menuMoveWish = wishid;
				this.menuMoveCount = temp_moveCount;
			},
			handleTouchEnd () {
				if (this.pageTheme === 'card') return;
				
				this.touchStatus = false;
				
				if (this.timer) {
				  clearTimeout(this.timer);
				}
			  
				this.startX = 0;
				if (this.scrollDirection === 'left')
					this.menuMoveCount < -190 ? this.menuMoveCount = -380 : this.menuMoveCount = 0;
					
				this.scrollDirection = '';
				
				if (this.menuMoveCount === -380) this.menuState = true;
				if (this.menuMoveCount === 0) this.menuState = false;
			},
			handleDelWishClick (wishId) {
				let wishIndex = this.wishData.wishIdArray.indexOf(wishId);
				if (wishIndex > -1) {
					this.wishData.wishIdArray.splice(wishIndex, 1);
					deleteWishData(wishId);
				}
			},
			handleEditWishClick (wishId) {
				uni.navigateTo({
					url: '../../../pages/wish/base/WishBase?wishId=' + wishId
				});
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		background-color: #EEE;
		position: absolute;
		top: 238rpx;
		bottom: 200rpx;
		.wish-list {
			.wish-item {
				display: flex;
				align-items: center;
				position: relative;
				height: 180rpx;
				font-size: 32rpx;
				border-radius: 20rpx;
				margin: 0 30rpx 30rpx;
				padding: 0 30rpx 0 30rpx;
				background-color: #fff;
				transition: height 0.6s;
				.image-wrapper {
					width: 120rpx;
					height: 120rpx;
					line-height: 120rpx;
					text-align: center;
					border: 2rpx solid #BBB;
					border-radius: 20rpx;
					overflow: hidden;
					.icon {
						font-size: 60rpx;
					}
					.image {
						width: 120rpx; 
						height: 120rpx;
					}
				}
				.wish-info {
					width: 400rpx;
					height: 130rpx;
					margin-left: 30rpx;
					.title {
						white-space:nowrap;
						overflow:hidden; 
						text-overflow:ellipsis;
						line-height: 70rpx;
						font-weight: bold;
						font-size: 40rpx;
					}
					.info {
						line-height: 50rpx;
						font-size: 32rpx;
						color: #9B9B9B;
					}
				}
				right: 0rpx;
				transition: right 0.4s;
				.wish-menu {
					position: absolute;
					right: -190rpx;
					top: 0;
					
					display: flex;
					flex-direction: column;
					justify-content: center;
					
					width: 160rpx;
					height: 180rpx;
					text-align: center;
					color: #fff;
					border-radius: 20rpx;
					font-size: 38rpx;
					.menu-icon {
						font-size: 48rpx;
					}
					.menu-title {
						margin-top: 10rpx;
					}
					&.wish-edit {
						z-index: 2;
					}
					&.wish-delete {
						z-index: 1;
						transition: right 0.4s;
					}
				}
			}
			&.card {
				display: flex;
				flex-wrap: wrap;
				.wish-item {
					z-index: 2;
					flex-direction: column;
					box-sizing: border-box;
					width: 45.5%;
					height: 380rpx;
					margin: 0 0 30rpx 3%;
					padding: 30rpx;
					.image-wrapper {
						width: 130rpx;
						height: 130rpx;
						.image {
							width: 130rpx; 
							height: 130rpx; 
						}
					}
					.wish-info {
						width: 100%;
						height: auto;
						margin-top: 26rpx;
						margin-left: 0rpx;
						.title {
							line-height: 52rpx;
							text-align: center;
							font-size: 38rpx;
							margin-bottom: 14rpx;
						}
						.info {
							font-size: 28rpx;
							text-align: center;
						}
					}
					.wish-menu {
						transform:rotateY(180deg);
						top: 0;
						left: 0;
						position: absolute;
					}
					&.reverse {
						transform:rotateY(180deg);
						transition: transform .6s;
						.wish-menu {
							z-index: 1;
							width: 100%;
							height: 100%;
							background-color: #fff;
						}
					}
				}
			}
		}
		.progress {
			height: 0rpx;
			border-bottom: 12rpx solid #13CDBB;
			border-bottom-left-radius: 12rpx;
			position: absolute;
			z-index: 2;
			bottom: 0;
			left: 0;
			right: auto;
		}
		.card .reverse .progress {
			transform:rotateY(180deg);
			right: 0;
			left: auto;
		}
		.bgprogress {
			width: 100%;
			z-index: 2;
			opacity: 0.2;
			&.view-progress {
				opacity: 0.8;
			}
		}
	}
</style>

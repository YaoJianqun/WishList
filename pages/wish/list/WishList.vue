<template>
	<view class="wrapper">
		<wish-list-header 
			:pageTheme="pageTheme" 
			:pageState="pageState"
			@pageThemeChange="pageThemeChange" 
			@pageStateChange="pageStateChange"
		></wish-list-header>
		<wish-list-content :pageTheme="pageTheme" :pageState="pageState" @convertHappyCoin="convertHappyCoin"></wish-list-content>
		<uni-popup :show="true" :type="'center'" :custom="true" :mask-click="false" ref="tip">
			<view class="uni-tip">
				<view class="uni-tip-title">提示</view>
				<view class="uni-tip-content">牛啤坏了！确定去快乐的剁手吗？</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('tip', false)">取消</view>
					<view class="uni-tip-button bgcolor success" @click="cancel('tip', true)">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapState } from 'vuex'
	import { addOrUpdateWish, queryWishData, saveWishData } from '@/common/dataOperate/controller/WishDataController'
	import { queryCompletedData, changeHappyCoinPool } from '@/common/dataOperate/controller/CompletedDataController'
	
	import WishListHeader from './components/Header'
	import WishListContent from './components/Content'
	import WishListDock from './components/Dock'
	
	export default {
		name: 'WishList',
		data () {
			return {
				wish: null,
				pageTheme: 'default',
				pageState: 'no-redeem'
			}
		},
		computed: {
			...mapState({
				wishData: state => state.wishData,
				completedData: state => state.completedData
			})
		},
		components: {
			WishListHeader,
			WishListContent,
			uniPopup
		},
		onShow() {
			this.loadWishData();
			this.loadCompletedData();
		},
		onLoad () {
			this.loadWishData();
			this.loadCompletedData();
		},
		methods: {
			async cancel(type, state) {
				this.$refs['tip'].close();
				if (state) {
					this.wish.redeem = true;
					await addOrUpdateWish(this.wish);
					await changeHappyCoinPool('sub', this.wish.happy_coin);
					this.completedData.happyCoinPool -= this.wish.happy_coin
					this.loadWishData();
				} else {
					this.wish = null;
				}
				return;
			},
			
			convertHappyCoin (wish) {
				this.wish = wish;
				this.$refs['tip'].open();
				//addOrUpdateWish()
			},
			
			loadWishData () {
				queryWishData().then((wishData) => {
					this.$store.dispatch('changeWishData', wishData);
				});
			},
			
			loadCompletedData () {
				queryCompletedData().then((completedData) => {
					this.$store.dispatch('changeCompletedData', completedData);
				})
			},
			
			pageStateChange (pageState) {
				this.pageState = pageState;
			},
			
			pageThemeChange (pageTheme) {
				this.pageTheme = pageTheme;
			}
		},
		onHide () {
			//推出页面时保存数据
			saveWishData(this.wishData).then(() => {
				console.log('wish-list save wishData success');
			})
		}
	}
</script>

<style lang="scss">
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
				color: #3b4144;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 20rpx;
			}
		}
	}
</style>
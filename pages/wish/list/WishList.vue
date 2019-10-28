<template>
	<view class="wrapper">
		<wish-list-header 
			:pageTheme="pageTheme" 
			:pageState="pageState"
			@pageThemeChange="pageThemeChange" 
			@pageStateChange="pageStateChange"
		></wish-list-header>
		<wish-list-content :pageTheme="pageTheme" :pageState="pageState"></wish-list-content>
		<!-- <task-list-dock></task-list-dock> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	import WishListHeader from './components/Header'
	import WishListContent from './components/Content'
	import WishListDock from './components/Dock'
	
	export default {
		name: 'WishList',
		data () {
			return {
				pageTheme: 'default',
				pageState: 'no-redeem'
			}
		},
		computed: {
			...mapState({
				wishData: state => state.wishData
			})
		},
		components: {
			WishListHeader,
			WishListContent/*,
			WishListDock*/
		},
		onShow() {
			this.loadWishData();
		},
		onLoad () {
			this.loadWishData();
		},
		methods: {
			loadWishData () {
				this.getListData().then((wishData) => {
					this.$store.dispatch('changeWishData', wishData);
				});
			},
			
			pageStateChange (pageState) {
				this.pageState = pageState;
			},
			
			pageThemeChange (pageTheme) {
				this.pageTheme = pageTheme;
			},
			
			getListData () {
				return new Promise((resolve, reject) => {
					uni.getStorage({
						key: 'wishData',
						success: function (wishData) {
							resolve(wishData.data);
						}
					})
				})
			}
		},
		onHide () {
			let wishData = this.wishData;
			uni.setStorage({
				key: 'wishData',
				data: wishData,
				success: function (e) {
					console.log('wish-list save wishData success');
				}
			})
		}
	}
</script>

<style lang="scss">
	
</style>
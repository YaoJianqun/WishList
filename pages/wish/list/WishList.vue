<template>
	<view class="wrapper">
		<wish-list-header @pageThemeChange="pageThemeChange" @pageStateChange="pageStateChange"></wish-list-header>
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
			WishListContent,
			WishListDock
		},
		onLoad () {
			let wishData = this.getListData();
			this.$store.dispatch('changeWishData', wishData);
		},
		methods: {
			pageStateChange (pageState) {
				this.pageState = pageState;
			},
			pageThemeChange (pageTheme) {
				this.pageTheme = pageTheme;
			},
			getListData () {
				let wishData = uni.getStorageSync('wishData');
				return wishData;
			}
		},
		onHide () {
			let wishData = this.wishData;
			uni.setStorage({
				key: 'wishData',
				data: wishData,
				success: function (e) {
					console.log('task-list save wishData success');
				}
			})
		}
	}
</script>

<style lang="scss">
	
</style>
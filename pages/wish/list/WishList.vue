<template>
	<view class="wrapper">
		<wish-list-header 
			:pageTheme="pageTheme" 
			:pageState="pageState"
			@pageThemeChange="pageThemeChange" 
			@pageStateChange="pageStateChange"
		></wish-list-header>
		<wish-list-content :pageTheme="pageTheme" :pageState="pageState"></wish-list-content>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { queryWishData, saveWishData } from '@/common/dataOperate/controller/WishDataController'
	import { queryCompletedData } from '@/common/dataOperate/controller/CompletedDataController'
	
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
			WishListContent
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
	
</style>
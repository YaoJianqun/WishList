<template>
	<view class="wrapper">
		<wish-header></wish-header>
		<wish-info></wish-info>
		<wish-dock></wish-dock>
	</view>
</template>

<script>
	
	import Wish from '@/common/model/Wish'	
	import { queryWishData } from '@/common/dataOperate/controller/WishDataController'
	
	import WishHeader from './components/Header';
	import WishInfo from './components/Info';
	import WishDock from './components/Dock';
	
	export default {
		name: 'WishBase',
		components: {
			WishHeader,
			WishInfo,
			WishDock
		},
		data() {
			return {
				wishId: ''
			}
		},
		onLoad (params) {
			if (params.hasOwnProperty('wishId')) {
				let _this = this;
				this.wishId = params.wishId;
				queryWishData().then((wishData) => {
					let temp_wish = wishData.wishObj[params.wishId];
					this.$store.dispatch('changeWish', temp_wish)
				}).cache(() => {
					console.log('init wishBase fail');
				})
			} else {
				this.$store.dispatch('changeWish', new Wish());
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
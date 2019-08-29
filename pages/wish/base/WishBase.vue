<template>
	<view class="wrapper">
		<wish-header></wish-header>
		<wish-info></wish-info>
		<wish-dock></wish-dock>
	</view>
</template>

<script>
	
	import Wish from '@/common/model/Wish'	
	
	import WishHeader from './components/Header';
	import WishInfo from './components/Info';
	import WishDock from './components/Dock';
	
	//console.log(new wish_test());
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
				uni.getStorage({
					key: 'wishData',
					success (res) {
						let temp_wish = res.data.wishObj[params.wishId];
						_this.$store.dispatch('changeWish', temp_wish)
					},
					fail () {
						console.log('init wishBase fail')
					}
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
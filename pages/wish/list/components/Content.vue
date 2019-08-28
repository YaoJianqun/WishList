<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content-wrapper" @scroll="scroll">
		<view class="wish-list" :class="[pageTheme]">
			<wish-item :pageTheme="pageTheme"></wish-item>
			<wish-item :pageTheme="pageTheme"></wish-item>
		</view>
	</scroll-view>
</template>

<script>
	
	import { mapState } from 'vuex'
	import WishItem from './Item'
	
	export default {
		name: 'WishListContent',
		components: {
			WishItem
		},
		props: {
			pageTheme: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		computed: {
			...mapState({
				wishData: state => state.wishData
			})
		},
		methods: {
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
		.wish-list.card {
				display: flex;
				flex-wrap: wrap;
				wish-item {
					width: 47%;
					margin: 0 0 30rpx 2%;
					.card {
						width: 47%;
						margin: 0 0 30rpx 2%;
					}
				}
		}
	}
</style>

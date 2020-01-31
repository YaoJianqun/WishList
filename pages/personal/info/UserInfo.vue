<template>
	<view class="wrapper">
		<user-header></user-header>
		<user-info></user-info>
		<user-dock></user-dock>
	</view>
</template>

<script>
	import { queryUserInfo } from '@/common/dataOperate/controller/UserInfoController'
	
	import UserHeader from './components/Header';
	import UserInfo from './components/Info';
	import UserDock from './components/Dock';
	
	export default {
		name: 'UserBase',
		components: {
			UserHeader,
			UserInfo,
			UserDock
		},
		data() {
			return {
			}
		},
		onLoad (params) {
			queryUserInfo().then((userInfo) => {
				this.$store.dispatch('changeUserInfo', userInfo)
			}).cache(() => {
				console.log('query userInfo fail');
			})
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
<template>
	<view class="wrapper">
		<detail-header></detail-header>
		<detail-info></detail-info>
		<detail-dock></detail-dock>
	</view>
</template>

<script>
	import getUUID from '@/common/util/UUID.js'
	
	import DetailHeader from './components/Header'
	import DetailInfo from './components/Info'
	import DetailDock from './components/Dock'
	
	export default {
		name: 'TaskDetail',
		components: {
			DetailHeader,
			DetailInfo,
			DetailDock
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
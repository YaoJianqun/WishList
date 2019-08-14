<template>
	<view class="wrapper">
		<base-header></base-header>
		<base-info></base-info>
		<base-dock></base-dock>
	</view>
</template>

<script>
	import BaseHeader from './components/Header';
	import BaseInfo from './components/Info';
	import BaseDock from './components/Dock';
	
	//console.log(new task_test());
	
	export default {
		name: 'TaskBase',
		components: {
			BaseHeader,
			BaseInfo,
			BaseDock
		},
		data() {
			return {
				
			}
		},
		mounted () {
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: hidden;
	}
</style>
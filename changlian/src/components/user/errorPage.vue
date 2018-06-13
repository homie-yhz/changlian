<template>
	<div>
		<router-link :to="{name:'nearbyStation'}"></router-link>
		访问路径有误！即将跳转！
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		methods: {
			tab() {
				console.log('tab');
			}
		}
	}
</script>

<style lang="scss">
	
</style>

<template>
<div>
	<scroller 
  :on-refresh="refresh"
  :on-infinite="infinite">
  <!-- content goes here -->
</scroller>
</div>
</template>
<script>
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
export default {
	methods:{
		refresh(){},
		infinite(){}
	}
}
</script>
<style lang="scss">

</style>

import Vue from 'vue';
Vue.directive('tap', {
	inserted: function (el) {
		// 聚焦元素
		el.addEventListener('touchmove',function(event){
			console.log('move');
			el.style.left = event.touches[0].pageX+'px';
			el.style.top = event.touches[0].pageY+'px';
			event.stopPropagation();
		},true);
	}
})
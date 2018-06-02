import Vue from 'vue';
Vue.directive('tap', {
	inserted: function (el) {
		// 聚焦元素
		el.addEventListener('touchmove',function(event){
			console.log('move');
			el.style.left = event.touches[0].pageX-30+'px';
			el.style.top = event.touches[0].pageY-30+'px';
			event.stopPropagation();
		},false);
	}
})



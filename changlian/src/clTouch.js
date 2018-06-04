import Vue from 'vue';
Vue.directive('tap', {
	inserted: function (el) {
		let screenWidth = document.body.clientWidth;
		let screenHeight = document.body.clientHeight;
		let circleWidth = el.clientWidth/2;
		// 聚焦元素
		el.addEventListener('touchmove',function(event){
			event.preventDefault();
			let touches = event.touches[0];
			console.log('move');
			el.style.left = (touches.clientX>=circleWidth && touches.clientX<=screenWidth-circleWidth)&&(touches.clientX-circleWidth+'px');
			el.style.top = (touches.clientY>=circleWidth && touches.clientY<=screenHeight-circleWidth)&&(touches.clientY-circleWidth+'px');
		},false);
	}
})
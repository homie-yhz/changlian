import Vue from 'vue';

export function timestampToData(){
	Vue.filter('timestampToData',function(value){
		let h = Math.floor(value/1000/60/60); //下取整
		let m = Math.floor(value%(1000*60*60)/(1000*60));
		(h>=0 && h<10) && (h = '0'+h);
		(m>=0 && m<10) && (m = '0'+m);
		console.log(h,m);
		return h+'小时'+m+'分';
	});
}
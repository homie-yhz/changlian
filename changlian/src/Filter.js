import Vue from 'vue';

export function timestampToData(){
	Vue.filter('timestampToData',function(value){
		value = parseInt(value);
		let h = Math.floor(value/60/60); //下取整
		let m = Math.floor(value%(60*60)/(60));
		//58000
		let s = Math.floor((value)%60);
		(h>=0 && h<10) && (h = '0'+h);
		(m>=0 && m<10) && (m = '0'+m);
		
		//console.log(h,m,s);
		return h+'小时'+m+'分';
	});
}
export function timestampToEnglishData(){
	Vue.filter('timestampToEnglishData',function(timestamp){
		let date = new Date(timestamp);
		let Y = date.getFullYear();
		let M = date.getMonth() + 1;
		let D = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		return Y+'-'+(M<10?'0'+M:M)+'-'+(D<10?'0'+D:D)+' '+(h<10?'0'+h:h)+':'+(m<10?'0'+m:m)
	});
}
export function SToHM(){
	Vue.filter('SToHM',function(value){
		let h = Math.floor(value/60/60);
		let m = Math.floor((value+59)%(60*60)/60);
		// console.log(h,m);
		return h+'小时 '+m+'分';
	})
}
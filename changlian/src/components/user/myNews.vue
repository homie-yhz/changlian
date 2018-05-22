<template>
	<div>
		我的消息
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	export default {
		data() {
			return {
	
			}
		},
		created() {
			//业务逻辑  将一个axios请求封装成一个promise公共方法，调用之后再执行其他请求。
			let A = {
				url: '',
				get: function(url) {
					return new Promise(function(resolve, reject) {
						resolve("A");
					});
				}
			}

			let c = function() {
				return new Promise(function(resolve, reject) {
					A.get('url').then(function(A) {
						console.log('A请求返回数据：' + A);
						resolve(A);
					});
				});
			}

			let d = function(){
				return new Promise(function(resolve,reject){
					A.get('url').then(function(A) {
						console.log('A请求返回数据：2' + A);
						resolve(A);
					});
				});
			}

			c().then(function(data){
				d();
			}).then(function(){
				console.log('last');
			});
			//let a = GLOBAL.interfacePath + '';
			// return new Promise(function(resolve, reject) {
			// 	let a = '';
			// 	axios
			// 		.get(a)
			// 		.then(function(data) {
			// 			console.log(data);
			// 			var data = {
			// 				data: {
			// 					state: 1
			// 				}
			// 			}
			// 			if (data.data.state === 1) {
			// 				console.log(2)
			// 				return new Promise(function(resolve, reject) {
			// 					resolve();
			// 				});
			// 			}
			// 		})
			// 		.then(function() {
			// 			console.log(3)
			// 		})
			// 		.catch(function(err) {
	
			// 		})
			// });
		}
	}
</script>

<style lang="scss">
	
</style>

<template>
	<div>
		授权登录后跳转页面
	</div>
</template>

<script>
	import axios from 'axios';
	import GLOBAL,{getUserInfo,ws} from '../../GLOBAL.js';
	import {
		Toast,
		MessageBox
	} from "mint-ui";
	import "mint-ui/lib/toast/style.css";
	export default {
		data() {
			return {
	
			}
		},
		created() {
			let url = window.location.href;
			let code = '';
			let _this = this;
			// alert(window.location.href);
			if (url.indexOf('code=') > -1) {
				code = url.split('code=')[1].split('&')[0];
				//获取code
				let postWxUserLoginInfo = GLOBAL.interfacePath + '/clyun/postUserLoginUrl';
				axios
					.post(postWxUserLoginInfo, {
						'wxAuthCode': code,
						'thirdType': '1'
					})
					.then(function(data) {
						// alert(JSON.stringify(res));
						// alert('openId:' + res.body.openid);
						let res = data.data;
						if (res.code === 200) {
							console.log('获取登陆后信息——————————————————————————————————');
							console.log(res.body);
							localStorage.setItem('userId', res.body.userId || '');
							localStorage.setItem('token',res.body.token||'');
							localStorage.setItem('openId',res.body.openid||'');
							MessageBox.alert("登录成功！").then(action => {
								//设置userId 以及 登录状态 
								getUserInfo();
								ws();
								// getOpenId();
								_this.$router.replace({
									name: 'personalCenter'
								});
							});
							//用户不存在，前去注册？
						} else if (res.code === 607) {
							MessageBox.confirm('请绑定手机号！').then(action => {
								_this.$router.push({
									name: 'bindPhone'
								});
							});
						} else {
							MessageBox.alert(res.msg);
						}
					})
					.catch(function(err) {
						console.log({
							'url': getOpenId,
							'err': err
						});
					});
			} else {
				alert('url中不存在code');
			}
		}
	}
</script>

<style>
	
</style>

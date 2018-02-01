<template>
	<div>
		<!-- 设置页面 -->
		<header class="header-poa-white v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">设置</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="scroll-box">
			<div class="settings-box">
				<!-- 要设置的选项 -->
				<div>
					<router-link tag="div" :to="{name:'modifyPwd'}">
						<span>修改登录密码</span>
						<i class="icon-right"></i>
					</router-link>
					<p class="blank"></p>
					<div>
						<span>当前版本</span>
						<span style="color:#adadad;">{{level}}</span>
					</div>
					<p class="blank"></p>
					<div>
						<span>分享给好友</span>
						<span class="icon-right"></span>
					</div>
					<div>
						<span>加盟电话</span>
						<a style="color:#adadad;" href="tel:400-800-8888">400-800-8888</a>
					</div>
				</div>
				<div @click="loginOut" class="btn-loginOut">
					<div>退出登录</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import GLOBAL from "../../GLOBAL";
	import axios from 'axios';
	export default {
		data() {
			return {
				level: ""
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			loginOut(){
				let _this = this;
				let userId = sessionStorage.getItem('userId');
				//let loginOutUrl = GLOBAL.interfacePath + '';
				let loginOutUrl = '';
				axios
					.get(loginOutUrl)
					.then(function(data){
						console.log('loginOutUrl|返回数据|'+JSON.stringify(data.data));
						data.data = {
							state:'success'
						};
						if(data.data.state === 'success'){
							sessionStorage.removeItem('userId');
							_this.$router.replace({name:'personalCenter'});
						} 
					})
					.catch(function(err){
						console.log({'url':loginOutUrl,'err':JSON.stringify(err)});
					});
			}
		},
		created() {
			this.level = GLOBAL.level;
		}
	};
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	@import "../../../static/css/iconfont.css";
	.btn-loginOut {
		@include fcm;
		width: 100%;
		height: 6rem;
		padding: 0 .8rem;
		div {
			@include fcm;
			height: 2rem;
			width: 100%;
			color: #fff;
			background-color: #2eafed;
			border-radius: 4px;
			font-size: 0.7rem;
		}
	}
	
	.settings-box {
		&>div:first-child {
			&>div {
				height: 2rem;
				border-bottom: 1px solid #d9d9d9;
				@include fm;
				@include fb;
				padding: 0 0.8rem;
				&>.icon-right {
					margin-right: 0 !important;
				}
			}
		}
	}
</style>

<template>
	<div>
		<header class="header v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">登录</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div>
			<!-- 图标 -->
			<div class="v-fcm">
				<div style="margin:2rem 0;">
					<div class="icon-changlian-logo"></div>
					<div>欢迎登录运营管理平台</div>
				</div>
			</div>
			<!-- 登录输入框 -->
			<div style="width:85%;" class="m-auto operator-login-box">
				<input type="tel" v-model="operatorLoginInfo.userName" maxlength="11" placeholder="账号" style="margin-bottom:3px;">
				<input type="password" v-model="operatorLoginInfo.userPwd" placeholder="密码">
				<!-- <p class="v-fb register-or-backpwd">
				          <router-link :to="{name:'phoneInput',params:{title:'register'}}" class="v-fm td-u">新用户注册>></router-link>
				          <router-link :to="{name:'phoneInput',params:{title:'backPwd'}}" class="v-fm td-u">找回密码</router-link>
				        </p> -->
				<p @click="login" class="btn v-fcm btn-operator-login">登录</p>
				<!-- <p class="tac agreement">登录即表示同意《畅联通用户协议》</p>
				        <div class="v-fm other-login-method">
				          <p class="v-i1"></p>
				          <p>其它方式登录</p>
				          <p class="v-i1"></p>
				        </div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import GLOBAL from '../../GLOBAL';
	import RegExp from "../../RegExp";
	import {
		Toast,MessageBox
	} from 'mint-ui'
	import 'mint-ui/lib/toast/style.css';
	export default {
		data() {
			return {
				operatorLoginInfo: {
					userName:'',
					userPwd:'',
					userId:'',
				}
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			login() {
				console.log(this.operatorLoginInfo);
				let _this = this;
				console.log("提交登录信息");
				if (!this.operatorLoginInfo.userName) {
					Toast('请输入账号！')
				} else if (!RegExp.account.test(this.operatorLoginInfo.userName)) {
					Toast('请输入8位以上的账号！')
				} else if (!this.operatorLoginInfo.userPwd) {
					Toast('请输入密码！')
				} 
				else {
					//需要3个参数  还有一个 userId
					_this.operatorLoginInfo.userId = localStorage.getItem('userId');
					let operatorLogin = GLOBAL.interfacePath + '/clyun/sysLogin';
					console.log(_this.operatorLoginInfo);
					axios
						.post(operatorLogin, _this.operatorLoginInfo)
						.then(function(data) {
							let res = data.data;
							console.log(res);
							if(res.code === 200){
								localStorage.setItem('operatorId',res.body.thirdId);
								MessageBox.alert('登录成功！').then(()=>{
									_this.$router.replace({name:'operatorMain'});
								});	
							}else{
								MessageBox.alert(res.msg);
							}
						})
						.catch(function(err) {
							MessageBox.alert('接口异常(错误代码：101)');
							console.log({
								'url': operatorLogin,
								'err': JSON.stringify(err)
							});
						});
				}
			},
			created() {
			}
		}
	};
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	@import "../../../static/css/iconfont.css";
	.header {
		height: 2rem;
		border-bottom: 1px solid #d9d9d9;
	}
	
	.arrow-back {
		width: 0.4rem;
		height: 0.4rem;
		border-left: 2px solid #616161;
		border-top: 2px solid #616161;
		transform: rotate(-45deg);
		margin-left: 0.5rem;
	}
	
	.operator-login-box {
		&>input {
			height: 1.8rem;
			width: 100%;
			border-bottom: 1px solid #bbbbbb;
			&:last-child {
				margin-top: 0.5rem;
			}
		}
	}
	
	.btn-login {
		background-color: #19d64e;
		color: #fff;
		margin: 0.8rem 0;
		border-radius: 3px;
		height: 1.6rem;
	}
	
	.other-login-method {
		margin-top: 2rem;
		color: #999;
		font-size: 0.5rem;
		&>p:nth-child(2) {
			margin: 0 0.5rem;
		}
		&> :first-child,
		 :last-child {
			border-top: 1px solid #dbdbdb;
		}
	}
	
	.register-or-backpwd>a {
		margin-top: 0.2rem;
		text-decoration: underline;
		color: #e65300;
	}
	
	.agreement {
		color: #5c5c5c;
		font-size: 0.55rem;
	}
	
	.btn-operator-login {
		margin-top: 1.4rem;
		background-color: #3db0bf!important;
	}
</style>

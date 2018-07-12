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
					<div v-if="!!usualStationId" @click="unbindStation(usualStationId)">
						<span>解绑电站</span>
						<i class="icon-right"></i>
					</div>
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
				<div @click="loginOut()" class="btn-loginOut">
					<div>退出登录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import GLOBAL from "../../GLOBAL";
	import axios from 'axios';
	import loader from '../../loading';
	import {
		MessageBox
	} from "mint-ui";
	export default {
		data() {
			return {
				level: "",
				usualStationId: ''
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			loginOut() {
				MessageBox.confirm('确定退出?').then(action => {
					let _this = this;
					let userId = localStorage.getItem('userId');
					//let loginOutUrl = GLOBAL.interfacePath + '';
					let loginOutUrl = '';
					axios
						.get(loginOutUrl)
						.then(function(data) {
							console.log('>>>退出登录|返回数据|', data.data);
							data.data = {
								state: 'success'
							};
							if (data.data.state === 'success') {
								sessionStorage.removeItem('userId');
								//清空localStorage
								localStorage.clear();
								_this.$router.replace({
									name: 'personalCenter'
								});
							}
						})
						.catch(function(err) {
							console.log({
								'url': loginOutUrl,
								'err': JSON.stringify(err)
							});
						});
				});
	
			},
			unbindStation(usualStationId) {
				let _this = this;
				MessageBox.confirm('确认解绑电站？').then(action => {
					loader.show();
					let unbindStationUrl = GLOBAL.interfacePathToken + '/clyun/unbindStation';
					axios
						.post(unbindStationUrl, {
							'userId': localStorage.getItem('userId'),
							'stationId': _this.usualStationId
						})
						.then(function(data) {
							loader.hide();
							let res = data.data;
							if (res.code === 200) {
								localStorage.setItem('usualStationId', '');
								_this.usualStationId = '';
								MessageBox.alert(res.msg);
							} else if (res.code === 501) {
								
							} else {
								_this.usualStationId = '';
								MessageBox.alert(res.msg);
							}
							console.log('unbindStationUrl|返回数据|', res);
						})
						.catch(function(err) {
							loader.hide();
							MessageBox.alert('接口异常！错误代码:105');
							console.log(err);
						});
				});
			}
		},
		created() {
			this.level = GLOBAL.level;
			this.usualStationId = localStorage.getItem('usualStationId');
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

<template>
	<div style="background-color:#f7f7f7;">
		<header class="header-poa-white v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">绑定ID卡</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="scroll-box">
			<div class="IDCard-charge">
				<ul>
					<li v-for="IDCard in IDCardList" :key="IDCard.id">
						<span>ID卡</span><span class="v-i1">{{IDCard.num}}</span>
						<!-- 解绑选项 -->
						<div class="icon-shenglve1" @click="showUnbindBtn(IDCard.id)">
							<div>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
						<!-- 解绑按钮 -->
						<div @click="handleIDCard('unbind',IDCard.num)" :class="{'slide':IDCard.choosed}" class="btn-unbind">解绑</div>
					</li>
					<li @click="addIDCard()" class="add-IDCard v-fm">
						<span>＋</span>
						<span class="v-i1">添加ID卡</span>
						<span class="icon-right"></span>
					</li>
				</ul>
				<div v-if="showCardNumBox">
					<div class="cardNum-Ipt">
						<span>卡号</span> <input type="tel" v-model="bindIDCardNum" placeholder="请输入卡号">
					</div>
					<div @click="handleIDCard('bind')" class="btn-bind">立即绑定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import GLOBAL from '../../GLOBAL';
	import axios from 'axios';
	import {
		Toast
	} from "mint-ui";
	import "mint-ui/lib/toast/style.css";
	import RegExp from '../../RegExp';
	export default {
		data() {
			return {
				IDCardList: [],
				showCardNumBox: false,
				bindIDCardNum: ''
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			showUnbindBtn(cardId) {
				let IDCardListlen = this.IDCardList.length;
				console.log(cardId);
				for (var i = 0; i < IDCardListlen; i++) {
					if (this.IDCardList[i].id === cardId) {
						if (!this.IDCardList[i].choosed) {
							for (var j = 0; j < IDCardListlen; j++) {
								this.$set(this.IDCardList[j], 'choosed', false);
							}
							this.$set(this.IDCardList[i], 'choosed', true);
						} else {
							this.IDCardList[i].choosed = false;
						}
					}
				}
			},
			addIDCard() {
				this.showCardNumBox = true;
			},
			handleIDCard(method, unbindCardNum) {
				let postData = {
					'userId': localStorage.getItem('userId'),
					'cardNum': '',
					'method': ''
				}
				if (method === 'bind') {
					postData.cardNum = this.bindIDCardNum;
					postData.method = 1;
					if (!this.bindIDCardNum || !RegExp.IDCard.test(this.bindIDCardNum)) {
						Toast('请输入正确的ID卡卡号！');
						return false;
					}
				} else {
					postData.cardNum = unbindCardNum;
					postData.method = 2;
				}
				let _this = this;
				let bindIDCardUrl = GLOBAL.interfacePathToken + '/clyun/bindIDCardUrl';
				// ?userId=' + sessionStorage.getItem('userId')+'&cardNum='+this.bindIDCardNum
				axios
					.post(bindIDCardUrl, postData)
					.then(function(data) {
						let res = data.data;
						if (res.code === 200) {
							Toast(method === 'bind' ? '绑定成功！' : '解绑成功！');
							_this.bindIDCardNum = '';
							_this.showCardNumBox = false;
							_this.getIDCardList();
						} else if (res.code === 501) {
							//
						} else {
							Toast(method === 'bind' ? '绑定失败！' : '解绑失败！' + res.msg);
						}
					})
					.catch(function(err) {
						console.log({
							'url': bindIDCardUrl,
							'err': JSON.stringify(err)
						});
					});
			},
			//获取ID卡片列表
			getIDCardList() {
				let _this = this;
				// let IDCardListUrl = "";
				let IDCardListUrl = GLOBAL.interfacePathToken + '/clyun/IDCardListUrl?userId=' + localStorage.getItem('userId');
				axios
					.get(IDCardListUrl)
					.then(function(data) {
						console.log(data);
						let res = data.data;
						if (res.code === 200) {
							console.log('IDCardListUrl|返回数据|' + JSON.stringify(res));
							_this.IDCardList = res.body;
						} else if (res.code === 501) {
							//
						}
					})
					.catch(function(err) {
						console.log({
							url: IDCardListUrl,
							err: JSON.stringify(err)
						});
					});
			}
		},
		created() {
			this.getIDCardList();
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	@import "../../../static/css/iconfont.css";
	.IDCard-charge {
		padding: 0.7rem 1rem;
		&>ul>li {
			position: relative;
			@include fm;
			height: 4rem;
			width: 100%;
			margin-bottom: 0.6rem;
			padding: 0 .4rem;
			background-color: #ffe55c;
			box-shadow: 0 0 5px #994e09;
			border-radius: 5px;
			color: #bd6c0d;
			font-size: .8rem;
			.icon-shenglve1 {
				@include fcm;
				height: 1rem;
				position: absolute;
				top: .2rem;
				right: .5rem;
				&>div {
					@include fm;
					span {
						display: block;
						width: 5px;
						height: 5px;
						border-radius: 10px;
						background-color: #fff;
						margin: 0 3px;
					}
				}
			}
			.btn-unbind {
				position: absolute;
				right: .5rem;
				top: 1.2rem;
				width: 2.2rem;
				height: 1.2rem;
				border: 1px solid #d9b600;
				color: #666;
				background-color: #f2e9bb;
				font-size: .6rem;
				border-radius: 3px;
				line-height: 1.2rem;
				text-align: center;
				opacity: 0;
				visibility: hidden;
				transition: opacity .25s, visibility .25s;
				&.slide {
					opacity: 1;
					visibility: visible;
				}
			}
			&>span:nth-child(2) {
				display: block;
				margin-left: 1rem;
				word-wrap: break-word;
				word-break: break-all;
			}
			&:last-child {
				height: 1.5rem;
				width: 100%;
				background-color: #fff;
				box-shadow: 0 0 0;
				border: 1px solid #bbb;
				height: 100%;
				color: #adadad!important;
				padding: 0;
				span {
					&:first-child {
						margin: 0 .3rem 0 .2rem;
						font-size: 1rem;
					}
					&:nth-child(2) {
						margin-left: 0;
						font-size: .7rem;
					}
					&:last-child {
						margin-right: .4rem!important;
					}
				}
			}
		}
		.cardNum-Ipt {
			height: 2rem;
			@include fm;
			background-color: #fff;
			color: #666;
			box-shadow: 0 0 2px #b8b8b8;
			span {
				font-size: .7rem;
				margin: 0 .5rem 0 .2rem;
			}
			input {
				@include i1;
				margin-right: .5rem;
			}
		}
		.btn-bind {
			height: 1.8rem;
			border-radius: 3px;
			@include fcm;
			margin: 0 auto;
			border: 1px solid #666;
			color: #666;
			background-color: #fff;
			margin-top: 1rem;
			width: 45%;
		}
	}
</style>


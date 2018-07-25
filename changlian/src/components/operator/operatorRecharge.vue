<template>
	<div>
		<header class="header-bg-fff v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">充值</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<!-- 充值卡片列表 -->
		<div class="operator-recharge-box" style="padding:0 .5rem;">
			<span>充值金额</span>
			<div>
				<input type="tel" v-model="postData.operatorRechargeMoney" :class="{'focus':focus}" @focus="change()" @focusout="changeFocus()">
			</div>
			<!-- <div style="">
						<div @click="chooseCard2(item.id)" :class="{'checked':item.id === postData.chooseCardId}" v-for="item in operatorRechargeCardList" :key="item.id">
							<div class="v-fcm">{{'￥'+item.operatorRechargeMoney}}</div>
							<div class="v-fm" style="background-color:#1898a1;color:#fff;">
								<div class="v-fcm">收益分配</div>
								<div class="v-i1">
									<div>平台/经营者</div>
									<div>{{item.incomeDistribution}}</div>
								</div>
							</div>
						</div>
					</div> -->
		</div>
		<!-- 选择充值方式 -->
		<div class="payMethod" style="padding:0 .5rem">
			<p style="margin:.5rem auto;">支付方式</p>
			<div @click="payMethods('wx')" class="v-fm mt-5 mb-5">
				<i class="icon-wx"></i>
				<p class="v-i1">微信支付</p><i :class="{'icon-check-yes':postData.payMethod==='wx'}" class="icon-select"></i>
			</div>
		</div>
		<div class="operatorRechargeBtn" @click="rechargeNow()">立即充值</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Toast,
		MessageBox
	} from "mint-ui";
	import axios from "axios";
	import "mint-ui/lib/toast/style.css";
	export default {
		data() {
			return {
				focus: false,
				operatorRechargeCardList: [{
					'operatorRechargeMoney': '1000.00',
					'incomeDistribution': '2/8',
					'id': '001'
				}, {
					'operatorRechargeMoney': '1000.00',
					'incomeDistribution': '2/8',
					'id': '002'
				}, {
					'operatorRechargeMoney': '1000.00',
					'incomeDistribution': '2/8',
					'id': '003'
				}],
				postData: {
					payMethod: '',
					operatorRechargeMoney: ''
				},
			}
		},
		methods: {
			payMethods(method) {
				this.postData.payMethod = method;
			},
			chooseCard2(cardId) {
				this.postData.chooseCardId = cardId;
			},
			rechargeNow() {
				let moneyRegExp = /^[0-9]+$/;
				console.log(typeof this.postData.operatorRechargeMoney);
				if (!this.postData.operatorRechargeMoney||this.postData.operatorRechargeMoney-0===0) {
					Toast('请输入充值金额！');
				}else if(!moneyRegExp.test(this.postData.operatorRechargeMoney)){
					Toast('请输入正确的正整数金额！');
				} else if (!this.postData.payMethod) {
					Toast('请选择充值方式！');
				} else {
	
				}
			},
			change() {
				this.focus = true;
			},
			changeFocus(){
				this.focus = false;
			}
		},
		created() {
			let getOperatorRechargeCardList = GLOBAL.interfacePath + '';
			let _this = this;
			axios
				.get(getOperatorRechargeCardList)
				.then(function(data) {
					let res = data.data;
					console.log('getOperatorRechargeCardList|返回数据|', res);
					if (res.code === 200) {
						_this.operatorRechargeCardList = res.body.operatorRechargeCardList;
					} else if (res.code === 500) {
	
					} else {
						MessageBox.alert(res.msg);
					}
				})
				.catch(function(err) {
					console.log({
						'url': getOperatorRechargeCardList,
						'err': err
					});
				});
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	@import "../../../static/css/iconfont.css";
	.operator-recharge-box {
		input {
			width: 100%;
			display: block;
			margin: 1rem auto;
			border: 2px solid #1898a1;
			height: 2rem;
			border-radius: 8px;
			padding: 0 .5rem;
			font-size: .7rem;
			transition: box-shadow ease 200ms;
		}
		input.focus{
			-webkit-box-shadow: 0 0 20px #1898a1;
			box-shadow: 0 0 10px #1898a1;
		}
		border-bottom: 1px solid #e3e3e3;
		&>div {
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			&>div {
				&.checked {
					box-shadow: 0 0 6px #1898a1;
				}
				border: 1px solid #1898a1;
				border-radius: 5px;
				width: 48%;
				margin-bottom: .5rem;
				&:nth-child(2n-1) {
					margin-right: 4%;
				}
				&>div {
					height: 1.8rem;
				}
				&>div:first-child {
					font-size: .9rem;
					color: #1898a1;
				}
				&>div>div:first-child {
					border-right: 1px solid #fff;
					width: 3rem;
					height: 100%;
				}
				&>div>div:last-child>div:first-child {}
			}
		}
	}
	
	.payMethod {
		margin-top: 0.2rem;
		.icon-check-yes {
			border: none;
		}
	}
	
	.icon-check-yes {
		bottom: 1px;
		right: 1px;
		width: 0.7rem;
		height: 0.7rem;
		z-index: 11;
	}
	
	.icon-wx {
		width: 0.8rem;
		height: 0.8rem;
		display: block;
		background: url("../../../static/img/logo-wx.png");
		background-size: 100% 100%;
		margin-right: 0.5rem;
	}
	
	.icon-select {
		height: 0.8rem;
		width: 0.8rem;
		border-radius: 50%;
		border: 1px solid #bbbbbb;
	}
	
	.icon-check {
		border: 1.4rem solid transparent;
		border-bottom: 1.4rem solid #fff;
		display: block;
		position: absolute;
		right: -1.4rem;
		bottom: -1px;
		z-index: 2;
	}
	
	.operatorRechargeBtn {
		margin: 1rem auto;
		display: block;
		text-align: center;
		height: 2rem;
		width: 8rem;
		border-radius: 3px;
		background-color: #1898a1;
		color: #fff;
		line-height: 2rem;
	}
</style>

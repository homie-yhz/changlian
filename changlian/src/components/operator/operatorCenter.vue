<template>
	<div>
		<header class="operator-center">
			<div class="v-fm">
				<div class="setting-message v-fm">
					<!-- <i class="iconfont icon-lingdang"></i>
						<div class="v-f" style="height:.8rem;">
							<span class="icon-point-red"></span>
						</div>
						<span @click="routerTo('myNews','')"></span>
						<div class="v-fcm" @click="routerTo('settings','')">
							<i class="iconfont icon-ttpodicon" style="display:block;"></i>
						</div> -->
				</div>
				<div class="tac v-i1">{{operator.userName}}</div>
				<div class="icon-scan2" @click="scanQRCode()" style="margin-left:2rem;"></div>
			</div>
			<div class="v-fm my-account-box">
				<div class="">
					<div>账户余额（元）</div>
					<div>{{operator.balance}}</div>
				</div>
				<div class="line-vertical"></div>
				<div class="">
					<div>可提现金额（元）</div>
					<div>{{operator.profit}}</div>
				</div>
			</div>
			<!-- <div class="v-fcm">
				<div class="v-fb">
					<div style="padding:.5rem 2rem;text-align:center;">
						<i class="icon-recharge"></i> 
						充值
					</div>
					<div style="padding:.5rem 2rem;text-align:center;">
						<i class="icon-out-money"></i> 
						提现
					</div>
				</div>
			</div> -->
		</header>
		<div class="center-list">
			<!-- <a href="">您有一笔12000.0元的资金到账待确认</a> -->
			<!-- <a @click="routerTo('rechargeLog')" class="v-fm">
				<p class="v-i1">充值记录</p>
				<i class="icon-right"></i>
			</a>
			<a @click="routerTo('chargeElecLog')" class="v-fm">
				<p class="v-i1">提现记录</p>
				<i class="icon-right"></i>
			</a> -->
			<a @click="scanQRCode()" class="v-fm">
				<p class="v-i1">维护电站</p>
				<i class="icon-right"></i>
			</a>
			<a @click="scanQRCode()" class="v-fm">
				<p class="v-i1">维护终端</p>
				<i class="icon-right"></i>
			</a>
			<div class="blank"></div>
			<a class="v-fm">
				<p class="v-i1">使用帮助</p>
				<i class="icon-right"></i>
			</a>
			<a  class="v-fm">
				<p class="v-i1">版本信息</p>
				<i class="icon-right"></i>
			</a>
			<a class="v-fm">
				<p class="v-i1">联系我们</p>
				<i class="icon-right"></i>
			</a>
			<!-- <a @click="" class="v-fm">
				<p class="v-i1">用户充电记录</p>
				<i class="icon-right"></i>
			</a> -->
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk';
	import GLOBAL, {
		getCode
	} from '../../GLOBAL.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				operator: {},
				roleTypeList: []
			}
		},
		methods: {
			scanQRCode() {
				// alert('调用扫一扫');
				wx.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
			}
		},
		created() {
			let _this = this;
			getCode(_this)
				.then(function(WXoptions) {
					// return new Promise(function(resolve, reject) {
					//alert('获取到的微信配置信息：---' + JSON.stringify(WXoptions));
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx1dfdc1b4affcd19d', // 必填，公众号的唯一标识
						timestamp: WXoptions.timestamp, // 必填，生成签名的时间戳
						nonceStr: WXoptions.nonceStr, // 必填，生成签名的随机串
						signature: WXoptions.signature, // 必填，签名
						jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表
					});
				})
			let getOperatorInfo = GLOBAL.interfacePathToken + '/clyun/getOperatorInfo?operatorId=' + localStorage.getItem('operatorId') + '&userId=' + localStorage.getItem('userId');
			console.log(getOperatorInfo);
			axios
				.get(getOperatorInfo)
				.then(function(data) {
					let res = data.data;
					if (res.code === 200) {
						_this.operator = res.body;
	
					}
					console.log('getOperatorInfo|返回数据|', res);
				})
				.catch(function(err) {
					console.log({
						'url': getOperatorInfo,
						'err': err
					});
				});
	
	
			/**获取用户权限接口，展示相关内容
			 * roleType:  1->代理商  2->合作伙伴 
			 * 0->平台公司   
			 * 
			 */
		}
	}
</script>

<style lang="scss">
	.operator-center {
		background-color: #3db0bf;
		color: #fff;
	}
	
	.icon-scan2 {
		display: block;
		background: url('../../../static/img/scan-white.png') center center no-repeat;
		background-size: 100% 100%;
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.setting-message {
		width: 3.5rem;
		.icon-point-red {
			width: 5px;
			height: 5px;
			display: block;
			border-radius: 50%;
			background-color: #e51c23;
			margin-right: 0.2rem;
		}
	}
	
	.my-account-box {
		margin-top: 1rem;
		padding-bottom:1rem;
		color: #fff500;
		.line-vertical {
			width: 0;
			height: 3rem;
			border-left: 1px solid #fff;
		}
		&>div {
			width: 50%;
			text-align: center;
			&>div:last-child {
				font-size: 1rem;
			}
		}
	}
	.icon-scan3{
		display: block;
		background: url('../../../static/img/scan-white.png') center center no-repeat;
		background-size: 100% 100%;
		width: 1.5rem;
		height: 1.5rem;
	}	
	.icon-recharge {
		background: url('../../../static/img/money-white.png') center center no-repeat;
		background-size: 100% 100%;
		width: 1.5rem;
		height: 1.5rem;
		display: block;
		margin: 0 auto;
	}
	
	.icon-out-money {
		background: url('../../../static/img/withdraw-money.png') center center no-repeat;
		background-size: 130% 130%;
		width: 1.5rem;
		height: 1.5rem;
		display: block;
		margin: 0 auto;
	}
	
	.center-list {
		&>a {
			border-bottom: 1px solid #e3e3e3;
			height: 2rem;
			padding: 0 0 0 .5rem;
		}
	}
</style>

<template>
	<div>
		<header class="header v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">管理平台</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="operator-main-box">
			<!-- <router-link :to="{name:'agentList'}">
						<i class="icon-star"></i>
						<div>代理商管理</div>
					</router-link>
					<router-link :to="{name:'updateAgent'}">
						<i class="icon-star"></i>
						<div>绑定设备</div>
					</router-link> -->
			<a @click="scanQRCode()" v-if="roleTypeList.indexOf('wxdz')>-1">
				<i class="icon-star"></i>
				<div>维护电站</div>
				<div>点击扫描中控二维码</div>
			</a>
			<a @click="scanQRCode()" v-if="roleTypeList.indexOf('whzd')>-1">
				<i class="icon-star"></i>
				<div>维护终端</div>
				<div>点击扫描终端二维码</div>
			</a>
			<router-link :to="{'name':'operatorCenter'}" v-if="roleTypeList.indexOf('ckzhxx')>-1">
				<i class="icon-star" ></i>
				<div>查看账户信息</div>
				<div></div>
			</router-link>
			<a v-if="roleTypeList.indexOf('cz')>-1">
				<i class="icon-star"></i>
				<div>充值</div>
				<div></div>
			</a>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import GLOBAL, {
		getCode
	} from '../../GLOBAL';
	import RegExp from "../../RegExp";
	import {
		Toast
	} from 'mint-ui'
	import 'mint-ui/lib/toast/style.css';
	import wx from 'weixin-js-sdk';
	export default {
		data() {
			return {
				operatorLoginInfo: {},
				roleTypeList:[]
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
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
						appId: WXoptions.appId, // 必填，公众号的唯一标识
						timestamp: WXoptions.timestamp, // 必填，生成签名的时间戳
						nonceStr: WXoptions.nonceStr, // 必填，生成签名的随机串
						signature: WXoptions.signature, // 必填，签名
						jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表
					});
				})

				
		}
	};
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	.operator-main-box {
		background-color: #f7f7f7;
		a {
			width: 44%;
			float: left;
			border: 1px solid #bbb;
			border-radius: 5px;
			margin-left: 4%;
			margin-top: .5rem;
			&>i {
				display: block;
				border-radius: 10rem;
				height: 2.5rem;
				width: 2.5rem;
				margin: .5rem auto .3rem;
				background-color: red;
			}
			&>div {
				text-align: center;
				margin-bottom: .2rem;
			}
		}
	}
	
	.arrow-back {
		border-left: 1px solid #fff;
		border-top: 1px solid #fff;
		width: .5rem;
		height: .5rem;
		transform: rotate(-45deg);
	}
</style>


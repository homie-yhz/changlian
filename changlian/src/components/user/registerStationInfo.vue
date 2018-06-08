<template>
	<div style="background:#f9f9f9;">
		<div id="registerBox">
			<div>
				<p>电站名称：</p>
				<input type="text" v-model="postData.stationName">
			</div>
			<div>
				<p>地址：</p>
				<input type="text" v-model="postData.stationAddr"></div>
			<div>
				<p>终端数量：</p>
				<input type="text" v-model="postData.terminalCount"></div>
			<div>
				<p>中控信息：</p> 
				<select v-model="postData.consoleId" @change="changeSelect('consoleList','consoleId')">
					<option v-for="item in consoleList" :name="item.name" :key="item.consoleId" :value="item.consoleId">{{item.consoleName}}</option>
				</select>
				<i class="icon-right"></i>
			</div>
			<div>
				<p>合作伙伴信息：</p> 
				<select v-model="postData.cooperatorId" @change="changeSelect('cooperatorList','cooperatorId')">
					<option v-for="item in cooperatorList" :key="item.cooperatorId" :value="item.cooperatorId">{{item.cooperatorName}}</option>
				</select>
				<i class="icon-right"></i>
			</div>
			<div class="v-fm">
				<p>经/纬度：</p>
				<span v-if="locationState">{{postData.longitude+'° / '+postData.latitude+'°'}}</span>
				<img style="height:2rem;" v-if="!locationState" src="../../../static/img/spinner.gif" alt="">
			</div>
			<div class="active cl-btn v-fcm" @click="saveStationInfo">
				提 交
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import GLOBAL, {
		getCode
	} from '../../GLOBAL.js';
	import wx from 'weixin-js-sdk';
	import {
		Toast
	} from "mint-ui";
	import "mint-ui/lib/toast/style.css";
	export default {
		data() {
			return {
				postData: {
					stationName: '',
					stationAddr: '',
					terminalCount: '',
					consoleId: '-',
					cooperatorId: '-',
					longitude: '', // 经度
					latitude: '' //纬度
				},
				consoleList: [{'consoleName':'请选择','consoleId':'-'}],
				cooperatorList: [{'cooperatorName':'请选择','cooperatorId':'-'}],
				locationState:false
			}
		},
		methods: {
			//提交  我录入的电站信息  
			saveStationInfo() {
				console.log('asdfassfadd');
				if (!this.postData.stationName) {
					Toast('请输入电站名称！');
				} else if (!this.postData.stationAddr) {
					Toast('请输入电站地址！');
				} else if (!this.postData.terminalCount) {
					Toast('请输入终端数量！')
				} else if (this.postData.consoleId==='-') {
					Toast('请选择中控信息！')
				} else if (this.postData.cooperatorId==='-') {
					Toast('请选择合作伙伴信息！');
				} else if (!this.postData.longitude || !this.postData.latitude) {
					Toast('等待定位信息！');
				} else {
					let saveStationInfo = GLOBAL.interfacePath + '/clyun/saveStationInfo';
					axios
						.post(saveStationInfo, this.postData)
						.then(function(data) {
							let res = data.data;
							alert(res.code);
							console.log('saveStationInfo|返回数据|', res);
						})
						.catch(function(err) {
							console.log({
								'url': saveStationInfo,
								'err': err
							});
						});
				}
			},
			changeSelect(listName,listId){
				console.log(JSON.stringify(this[listName]));
				if(this[listName][0][listId]==='-'){
					this[listName] = this[listName].slice(1);
				}
			}
		},
		created() {
			let _this = this;
			//调用定位信息
			getCode(_this)
				.then(function(WXoptions) {
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx632e516935ac17d7', // 必填，公众号的唯一标识
						timestamp: WXoptions.timestamp, // 必填，生成签名的时间戳
						nonceStr: WXoptions.nonceStr, // 必填，生成签名的随机串
						signature: WXoptions.signature, // 必填，签名
						jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
					});
					wx.ready(function() {
						wx.getLocation({
							type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
							success: function(res) {
								_this.postData.longitude = res.longitude;
								_this.postData.latitude = res.latitude;
								_this.locationState = true;
								//alert('获取经纬度：经度：' + latitude + '(经度)/' + longitude + '(纬度)/' + speed + '(速度)/' + accuracy + '(经度)');
								//alert(JSON.stringify('发送给后台的定位信息' + _this.postData.position));
							}
						});
					});
				});
			//合作商   录入电站信息 接口
			let getMyStationInfo = GLOBAL.interfacePath + '/clyun/getMyStationInfo?userId=' + (sessionStorage.getItem('userId') || 0);
			// let getStationInfo = '';
			axios
				.get(getMyStationInfo)
				.then(function(data) {
					let res = data.data;
					console.log('getMyStationInfo|返回数据|', res);
					if (res.code === 200) {
						_this.consoleList = _this.consoleList.concat(res.body.consoleList);
						_this.cooperatorList = _this.cooperatorList.concat(res.body.cooperatorList);
					}
				})
				.catch(function(err) {
					console.log({
						'url': getMyStationInfo,
						'err': err
					});
				});
	
		},
		watch: {
			postData: {
				handler:function(nv, ov) {
					console.log(JSON.stringify(nv));
				},
				deep:true
		}
	}
	}
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
	.cl-btn {
		width: 80%;
		background-color: #2eafed!important;
		color: #fff;
		margin: 0.8rem auto;
		border-radius: 3px;
		height: 1.6rem;
	}
	#registerBox{
		&>div{ 
			@include fm;
			padding:0 .5rem;
			background: #fff;
			height:2rem;
			font-size:.7rem;
			border-bottom:1px solid #e3e3e3;
			&>p:first-child{
				width:5rem;
			}
			select{width:5rem;};
			input,select{
				@include i1;
				background: #fff;
			}
		}
	}
	.icon-right{
		border-top:1px solid #e3e3e3;
		border-right:1px solid #e3e3e3;
		height:.5rem;
		width:.5rem;
		transform: rotate(45deg);
		margin:0!important;
	}
</style>

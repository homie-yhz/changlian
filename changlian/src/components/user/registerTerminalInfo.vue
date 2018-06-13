<template>
	<div style="background:#f9f9f9;">
		<div id="registerBox">
			<div>
				<p>电站名称：</p>
				<select v-model="postData.consoleId" @change="changeSelect('stationList','stationId')">
										<option v-for="item in stationList" :name="item.consoleName" :key="item.consoleId" :value="item.consoleId">{{item.consoleName}}</option>
								</select>
				<i class="icon-right"></i>
			</div>
			<div>
				<p>终端选择：</p>
				<select v-model="postData.terminalId" @change="changeSelect('terminalList','terminalId')">
								<option v-for="item in terminalList" :name="item.terminalName" :key="item.terminalId" :value="item.terminalId">{{item.terminalName}}</option>
				      </select>
				<i class="icon-right"></i>
			</div>
		</div>
		<div class="active cl-btn v-fcm" @click="saveStationInfo">
			提 交
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
		Toast,
		MessageBox
	} from "mint-ui";
	import "mint-ui/lib/toast/style.css";
	export default {
		data() {
			return {
				postData: {
					consoleId: '-',
					terminalId: '-',
					qrCodeId: ''
				},
				terminalList: [{
					'terminalName': '请选择',
					'terminalId': '-'
				}],
				stationList: [{
					'consoleName': '请选择',
					'consoleId': '-'
				}],
				locationState: false
			}
		},
		methods: {
			//提交  我录入的电站信息  
			saveStationInfo() {
				if (this.postData.consoleId === '-') {
					Toast('请选择电站名称！');
				} else if (this.postData.terminalId === '-') {
					Toast('请选择终端！');
				} else {
					let _this = this;
					let saveStationInfo = GLOBAL.interfacePath + '/clyun/saveTerminalInfo';
					alert(JSON.stringify(this.postData));
					axios
						.post(saveStationInfo, this.postData)
						.then(function(data) {
							let res = data.data;
							if (res.code === 200) {
								MessageBox.alert('提交成功！').then(action => {
									_this.$router.replace({
										name: 'registerStationInfo'
									});
								});
							}
						})
						.catch(function(err) {
							MessageBox.alert('接口异常！(错误代码:104)')
							console.log({
								'url': saveStationInfo,
								'err': err
							});
						});
				}
			},
			changeSelect(listName, listId) {
				let _this = this;
				console.log(JSON.stringify(this[listName]));
				if (this[listName][0][listId] === '-') {
					this[listName] = this[listName].slice(1);
				}
				if (listName === 'stationList') {
					this.terminalList = [{
						'terminalName': '请选择',
						'terminalId': '-'
					}];
					this.postData.terminalId = '-';
					let getTerminalListUrl = GLOBAL.interfacePath + '/clyun/getTerminalList?consoleId=' + this.postData.consoleId;
					axios
						.get(getTerminalListUrl)
						.then(function(data) {
							let res = data.data;
							console.log('getTerminalListUrl|返回数据|', res);
							_this.terminalList = _this.terminalList.concat(res.body);
						})
						.catch(function(err) {
							console.log({
								'url': getTerminalListUrl,
								'err': err
							});
						});
				}
			}
		},
		created() {
			let _this = this;
			let getMyTerminalInfoUrl = GLOBAL.interfacePath + '/clyun/getMyTerminalInfo?userId=' + (localStorage.getItem('userId') || '') + '&consoleId=' + (localStorage.getItem('registerConsoleId')||'') + '&qrCodeId=' + this.$route.params.qrCodeId;
			alert('registerTerminalInfoUrl'+getMyTerminalInfoUrl);
			axios
				.get(getMyTerminalInfoUrl)
				.then(function(data) {
					let res = data.data;
					console.log('|返回数据|', res);
					if (res.code === 200) {
						_this.stationList = _this.stationList.concat(res.body.consoleList);
						_this.terminalList = _this.terminalList.concat(res.body.terminalList);
						console.log(_this.stationList);
						_this.postData.consoleId = res.body.registerTerminalInfo.consoleId;
						_this.postData.terminalId = res.body.registerTerminalInfo.terminalId;
						_this.postData.qrCodeId = _this.$route.params.qrCodeId;
						console.log(_this.postData);
					}
				})
				.catch(function(err) {
					console.log({
						'url': getMyTerminalInfoUrl,
						'err': err
					});
				});
		},
		watch: {
			postData: {
				handler: function(nv, ov) {
					console.log(JSON.stringify(nv));
				},
				deep: true
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
	
	#registerBox {
		&>div {
			@include fm;
			padding: 0 .5rem;
			background: #fff;
			height: 2rem;
			font-size: .7rem;
			border-bottom: 1px solid #e3e3e3;
			&>p:first-child {
				width: 5rem;
			}
			select {
				width: 5rem;
			}
			;
			input,
			select {
				@include i1;
				background: #fff;
			}
		}
	}
	
	.icon-right {
		border-top: 1px solid #888;
		border-right: 1px solid #888;
		height: .5rem;
		width: .5rem;
		transform: rotate(45deg);
		margin: 0!important;
	}
</style>

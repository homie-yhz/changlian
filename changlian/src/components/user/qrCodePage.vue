<template>
	<div>
		<div class="v-fcm" v-if="showQRCode" style="height:100%;">
			<div style="height:70%;text-align: center;padding: 0 1rem;">
				<img src="../../../static/img/changlian.jpg" alt="">
				<div style="text-align:center;font-size:1rem;">{{msg}}</div>
			</div>
		</div>
		<div v-if="!showQRCode">即将跳转...</div>
	</div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import GLOBAL from '../../GLOBAL.js';
export default {
	data(){
		return {
			showQRCode:false,
			msg:''
		}
	},
	created(){
		let _this = this;
		alert(window.location.href);
		alert('userId='+localStorage.getItem('userId'));
		localStorage.setItem('qrCodeId',this.$route.params.qrCodeId);
		sessionStorage.setItem('qrCodeId',this.$route.params.qrCodeId);
		let getScanQRCodePage = GLOBAL.interfacePath + '/clyun/getScanQRCodePage?qrCodeId='+this.$route.params.qrCodeId+'&userId='+(localStorage.getItem('userId')||'');
		// console.log('>getScanQRCodePage|通过qrCodeId获取即将跳转的页面',getScanQRCodePage);
		alert(getScanQRCodePage);
		axios
			.get(getScanQRCodePage)
			.then(function(data){
				let res = data.data;
				alert(JSON.stringify(res));
				console.log('>>>getAfterScanQRCode|返回数据|',res);
				if(res.code === 200){
					_this.msg = res.body.msg;
					// alert('即将跳转的页面>>>'+res.body.pageName);
					//展示公众号二维码，提示关注 
					if(res.body.pageName === 'wechatSubscription'){
						_this.showQRCode = true;
					}
					//跳转注册电站信息页面
					else if(res.body.pageName === 'registerStationInfo'){
						_this.$router.replace({name:'registerStationInfo'});
					}
					//关闭H5窗口
					else if(res.body.pageName === 'sysHome'){
						WeixinJSBridge.call('closeWindow');
					}
					//跳转到电站详情页面
					else if(res.body.pageName === 'stationDetial'){
						_this.$router.replace({name:'chooseStationPort',params:{stationId:res.body.paramObj.stationId}});
					}
					//跳转到注册终端
					else if(res.body.pageName === 'registerTerminalInfo'){
						//跳转到新建页面
						_this.$router.replace({name:'registerTerminalInfo',params:{qrCodeId:res.body.qrCodeId}});
					}
					//跳转到选择充电模式页面
					else if(res.body.pageName === 'chooseChargeMethod'){
						// :stationId/:portId/:portNumber/:consoleId/:consoleNumber
						_this.$router.replace({name:'chooseChargeMethod',params:{stationId:res.body.paramObj.stationId||'',portId:res.body.paramObj.portId||'',portNumber:res.body.paramObj.portNumber||'',consoleId:res.body.paramObj.consoleId||'',consoleNumber:res.body.paramObj.consoleNumber||''}});
					}
				}
			})
			.catch(function(err){
				MessageBox.alert('接口异常！(错误代码：103)');
				_this.showQRCode = true;
				console.log({'url':getScanQRCodePage,'err':err});
			});
	}
}
// 经营者管理平台 登录页面  用户名/密码
// 注册终端 页面  以及修改页面     展示：电站名称(select) 中控编号 (固定死值)   下拉选择(中控序号) { 选择终端 } 选择 快充/慢充 单选
// 跳转开始充电页面
</script>
<style>

</style>


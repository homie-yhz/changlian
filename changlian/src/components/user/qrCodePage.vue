<template>
	<div>
		二维码页面
	</div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import GLOBAL from '../../GLOBAL.js';
export default {
	data(){
		return {

		}
	},
	created(){
		let _this = this;
		// alert(this.$route.params.uuid);
		sessionStorage.setItem('qrCodeId',this.$route.params.qrCodeId);
		let getScanQRCodePage = GLOBAL.interfacePath + '/clyun/getScanQRCodePage?qrCodeId='+this.$route.params.qrCodeId;
		// let getScanQRCodePage = '';
		console.log('>getScanQRCodePage|通过qrCodeId获取即将跳转的页面',getScanQRCodePage);
		axios
			.get(getScanQRCodePage)
			.then(function(data){
				let res = data.data;
				console.log('>>>getAfterScanQRCode|返回数据|',res);
				if(res.code === 200){
					alert('即将跳转的页面>>>'+res.body.pageName);
					if(res.body.pageName === 'registerStationInfo'){
						_this.$router.replace({name:'registerStationInfo'});
					}
				}
			})
			.catch(function(err){
				console.log({'url':getScanQRCodePage,'err':err});
			});
	}
}
</script>
<style>

</style>

import Vue from 'vue';
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/message-box/style.css';
import GLOBAL from './GLOBAL';
export default {
    env: 'UAT',
    // interfacePath: 'http://192.168.1.110:8080/v1/api0/clyun',   //UAT 接口路径
    // interfacePath: 'http://localhost:8080/v1/api0/clyun',
    // interfacePath: 'http://192.168.31.23:8080/v1/api0',   //志鸿

    interfacePath: 'http://test.hebchanglian.com.cn:8080/v1/api0',   //UAT 接口路径
    interfacePathWS: 'test.hebchanglian.com.cn:8080/v1/api0',
    // interfacePath: 'http://192.168.31.101:8080/v1/api0',   //UAT 接口路径

    //interfacePath: 'http://localhost:8080/v1/api0/clyun',   //UAT 接口路径
    appPath: 'http://epsout.life.taikang.com/tkyc/tkgq/#',
    publicAccountAddress: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxNjEyMDAxMA==&scene=124#wechat_redirect',
    level:'2.2.1'

    //正式项目地址以及接口地址
    //公共账号及域名配置   64.11 64.12 64.13
    /*env:'prod',
    interfacePath:'http://eps.taikanglife.com/epstkrs',//接口路径公共域名部分
    appPath:'http://tkyc.eps.group.taikang.com/tkyc/tkgq/#',    //前台应用路径
    publicAccountAddress:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNjk1OTQ2NQ==&scene=124#wechat_redirect'*/
}
//判断是否登录模块
export let judgeLoginObj = {
    url: '',//let judgeLoginUrl = GLOBAL.interfacePath + '';
    normalFn: function () {
        return axios.get(this.url);
    },
    promiseFn: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(this.url)
                .then(function (data) {
                    console.log('judgeLoginUrl|返回数据|' + JSON.stringify(data.data));
                    data.data = {
                        "hasLogin": false
                    }
                    if (data.data.hasLogin) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(function (err) {
                    console.log({ 'url': judgeLoginUrl, 'err': JSON.stringify(err) });
                });
        });
    }
}

//判断是否有设备正在充电  模块
export let hasChargingMechineObj = {
    url: '',//let hasChargingMechineUrl = GLOBAL.interfacePath + '';
    normalFn: function () {
        return axios.get(this.url);
    },
    promiseFn: function () {
        return new Promise(function (resolve, reject) {
            //let judgeLoginUrl = GLOBAL.interfacePath + '';
            let hasChargingMechineUrl = '';
            axios
                .get(hasChargingMechineUrl)
                .then(function (data) {
                    console.log('hasChargingMechineUrl|返回数据|' + JSON.stringify(data.data));
                    data.data = {
                        'chargingMechineAmount': 0
                    }
                    if (!!data.data.chargingMechineAmount) {
                        resolve(data.data.chargingMechineAmount);
                    } else {
                        resolve(0);
                    }
                })
                .catch(function (err) {
                    console.log({ 'url': hasChargingMechineUrl, 'err': JSON.stringify(err) });
                });
        });
    }
}

// 获取用户信息
/**
 * 
 */
export function getUserInfo() {
    console.log('调动获取用户信息接口！');
    return new Promise(function (resolve, reject) {
        let getUserInfoUrl = GLOBAL.interfacePath + '/clyun/getUserInfo?userId='+sessionStorage.getItem('userId')||'';
        axios
            .get(getUserInfoUrl)
            .then(function (data) {
                let res = data.data;
                if (res.code === 200) {
                    console.log('getUserInfoUrl|返回数据|' + JSON.stringify(data.data));
                    sessionStorage.setItem('loginState', res.body.loginState);
                    resolve(res.body);
                }
                // data.data = {
                //     bindState: false,
                //     balance: "10",
                //     loginState: true,
                //     phone: '17777777777',
                //     usualStationId: '009',
                //     giveMoney: '20.00',
                //     userId: 'userId001',
                //     hasNews: true,
                //     chargingMechineAmount:1,
                //     chargingEquipmentList:[
                //         {
                //             addr:'昌平回龙观',
                //             num:'132313213123123',
                //             index:'1',
                //             chargingId:'001',
                //             chargeSource:'APP'
                //         },
                //         {
                //             addr:'沙河北大桥',
                //             num:'4324321431243214',
                //             index:'3',
                //             chargingId:'003',
                //             chargeSource:'IDCard'
                //         }
                //     ],
                //     chargeSource:'IDCard'
                // }
                
            })
            .catch(function (err) {
                console.log({ 'url': getUserInfoUrl, 'err': JSON.stringify(err) });
            });
    })
}


export function getCode(_this){
    // alert(window.location.href);
    //alert('调用获取code接口');
    let url = window.location.href;
    //首先获取 签名
    //先请求一次接口
    let getSignUrl = GLOBAL.interfacePath+'/order/scanQR';
    //alert(getSignUrl);
    let params = new URLSearchParams();
    params.append("url",encodeURIComponent(window.location.href.split('#')[0]));
    // alert(getSignUrl);
    return new Promise(function(resolve,reject){
      axios.post(getSignUrl,params)
        .then(function(data) {
          console.log(data);
          let res = data.data;
          if(res.code === 200){
            let WXoptions = res.body;
            alert(JSON.stringify(WXoptions));
            resolve(WXoptions);
          }
          // alert(JSON.stringify(options));
          //sessionStorage.setItem('WXoptions',JSON.stringify(options));
          // alert('进入获取签名接口');
          // alert('获取配置2'+sessionStorage.getItem('WXoptions'));
          /*if(!!localStorage.getItem('openId')){
            // alert('openId存在'+localStorage.getItem('openId'));
            // alert('getCode3-1')
            // alert('2');
            // alert('openId' + localStorage.getItem('openId'));
            let focusUrl = GLOBAL.interfacePath+'/jsonDataCtrl/getIsGz.do?openId='+localStorage.getItem('openId');
            axios.get(focusUrl)
              .then(function(data){
                // alert(JSON.stringify(data.data));
                if(data.data.state === 'false'){
                  //展示二维码
                //   _this.showQRCode = true;
                  //展示关注按钮
                //   _this.showQRCodeBtn = true;
                }
                resolve();
              })
              .catch(function(){
                layer.alert('是否关注接口报错！');
              });
          }
  
          else if(url.indexOf('code')>-1){
            // alert('getCode3-2')
            // alert('code存在');
  
            let code = '';
            let urlParamsArr = url.match(/\?(\S*)\#/)[1].split('&');
            let urlParamsLen = urlParamsArr.length;
            
            for(let i = 0;i<urlParamsLen;i++){
              if(urlParamsArr[i].indexOf('code')>-1){
                code = urlParamsArr[i].split('=')[1];
              }
            }
            
            // alert(code);
            let getOpenIdUrl = GLOBAL.interfacePath+'/jsonDataCtrl/getOpenid.do?code='+code;
            axios.get(getOpenIdUrl)
            //获取openId
              .then(function(data) {
  
                let openId = data.data.openId;
                (!!openId) && (localStorage.setItem('openId', openId));
                // alert('openId' + localStorage.getItem('openId'));
  
                //调用是否关注接口
                let focusUrl = GLOBAL.interfacePath + '/jsonDataCtrl/getIsGz.do?openId=' + localStorage.getItem('openId');
                axios.get(focusUrl)
                  .then(function (data) {
                    // alert(JSON.stringify(data.data));
                    if (data.data.state === 'false') {
                      //展示二维码
                      _this.showQRCode = true;
                      //展示关注按钮
                      _this.showQRCodeBtn = true;
                    }
                    resolve();
                  })
                  .catch(function(data){
                    layer.alert('是否关注接口报错！');
                  })
              })
          }
  
          else{
            // alert('3');
            //获取 WXoptions
            if(!!sessionStorage.getItem('WXoptions')){
              let APPID = JSON.parse(sessionStorage.getItem('WXoptions')).appid;
              let authorizeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+encodeURIComponent(window.location.href)+'&response_type=code' +
                '&scope=snsapi_userinfo&state=123#wechat_redirect';
              window.location.href = authorizeUrl;
            }
            else{
              alert('WXoptions为空');
            }
          }*/
        })
        .catch(function (data) {
          console.log(JSON.stringify(data));
        });
    });
  }


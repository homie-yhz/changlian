import Vue from 'vue';
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/message-box/style.css';

export default {
    env: 'UAT',
    interfacePath: 'http://epsout.life.taikang.com/epstk',   //UAT 接口路径
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
    return new Promise(function (resolve, reject) {
        //let userInfoUrl = GLOBAL.interfacePath + '';
        let getUserInfoUrl = '';
        axios
            .get(getUserInfoUrl)
            .then(function (data) {
                data.data = {
                    bindState: true,
                    balance: "10",
                    loginState: true,
                    phone: '17777777777',
                    usualStationId: '009',
                    giveMoney: '20.00',
                    userId: 'userId001',
                    hasNews: true,
                    chargingMechineAmount:1,
                    chargeSource:'IDCard'
                }
                console.log('getUserInfoUrl|返回数据|' + JSON.stringify(data.data));
                sessionStorage.setItem('loginState', data.data.loginState);
                resolve(data.data);
            })
            .catch(function (err) {
                console.log({ 'url': getUserInfoUrl, 'err': JSON.stringify(err) });
            });
    })
}


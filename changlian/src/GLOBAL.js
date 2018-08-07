import Vue from 'vue';
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/message-box/style.css';
import GLOBAL from './GLOBAL';
import store from './store';

//测试地址
// export default {
//     // env: 'UAT',
//     env: 'test',
//     // interfacePath: 'http://192.168.43.202:8080/v1/api0',   // 杰哥手机  志鸿本机
//     // interfacePathToken: 'http://192.168.43.202:8080/v1/api1',   // 带有token的接口
//     // interfacePathWS: '192.168.43.202:8080/v1/api0',

//     interfacePath: 'http://test.hebchanglian.com.cn:8080/v1/api0',   //UAT 接口路径
//     interfacePathToken: 'http://test.hebchanglian.com.cn:8080/v1/api1',
//     interfacePathWS: 'test.hebchanglian.com.cn:8080/v1/api0',

//     appPath: 'http://test.hebchanglian.com.cn/mpa/index.html',
//     //主页为：http://test.hebchanglian.com.cn/mpa/index.html#/nearbyStation/normalList
//     level: '2.2.1',
    // appId:'wx1dfdc1b4affcd19d'
// }

// 正式地址
export default {
    env: 'Pro',
    // env: 'test',
    interfacePath: 'http://csi.hebchanglian.com.cn/v1/api0',      //正式 接口地址
    interfacePathToken: 'http://csi.hebchanglian.com.cn/v1/api1', //正式 带有Token的接口地址
    interfacePathWS: '39.106.112.119:8080/v1/api0',           //正式 websocket地址

    appPath: 'http://test.hebchanglian.com.cn/mpa/index.html',    //app 地址
    appId:'wxbe2a6a0de66c0305',
    //主页为：http://test.hebchanglian.com.cn/mpa/index.html#/nearbyStation/normalList
    level: '2.2.1'
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
        let getUserInfoUrl = GLOBAL.interfacePath + '/clyun/getUserInfo?userId=' + localStorage.getItem('userId') || '';
        console.log('>>>getUseInfo|用户信息接口|'+getUserInfoUrl);
        axios
            .get(getUserInfoUrl)
            .then(function (data) {
                let res = data.data;
                if (res.code === 200) {
                    console.log('>>>getUserInfoUrl|用户个人信息', data.data);
                    sessionStorage.setItem('loginState', res.body.loginState||'');
                    localStorage.setItem('phone',res.body.phone||'');
                    localStorage.setItem('usualStationId',res.body.usualStationId||'');
                    localStorage.setItem('openId',res.body.openid||'');
                    //调用 获取用户信息接口的时候 就会改变vuex中的loginState与chargingMechineAmount的状态。
                    store.commit('setLoginState', res.body.loginState);
                    store.commit('setChargingMechineAmount', res.body.chargingMechineAmount);
                    resolve(res.body);
                }else if(res.code === 501){

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
export function getCode(_this) {
    console.log('调用getCode');
    // alert(window.location.href);
    //alert('调用获取code接口');
    let url = window.location.href;
    //首先获取 签名
    let getSignUrl = GLOBAL.interfacePath + '/order/scanQR';
    //alert(getSignUrl);
    let params = new URLSearchParams();
    params.append("url", encodeURIComponent(window.location.href.split('#')[0]));

    return new Promise(function (resolve, reject) {
        axios.post(getSignUrl, params)
            .then(function (data) {
                console.log(data);
                let res = data.data;
                if (res.code === 200) {
                    let WXoptions = res.body;
                    //alert(JSON.stringify(WXoptions));
                    resolve(WXoptions);
                }
            })
            .catch(function (data) {
                console.log(JSON.stringify(data));
            });
    });
}

export function ws() {
    console.log('*************ws start**********');
    // window.setInterval(function(){
    //   console.log(1);
    //   store.commit('setChargingMechineAmount',Math.floor((Math.random()*10)+1));
    // },1000);
    if (!!localStorage.getItem('userId')) {
        let _this = this;
        let websocket = null;
        if ('WebSocket' in window) {
            console.log("ws://" + GLOBAL.interfacePathWS + "/websocket/" + localStorage.getItem('userId'));
            websocket = new WebSocket("ws://" + GLOBAL.interfacePathWS + "/websocket/" + localStorage.getItem('userId'));
        } else {
            alert('当前浏览器 Not support websocket');
        }
        //连接发生错误的回调方法
        websocket.onerror = function () {
            setMessageInnerHTML("WebSocket连接发生错误");
        };

        //连接成功建立的回调方法
        websocket.onopen = function () {
            setMessageInnerHTML("*******WebSocket连接成功*********");
        }

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
            console.log('>>>>>>>>WS返回数据<<<<<<<<<<', JSON.parse(JSON.parse(event.data).body));
            let body = JSON.parse(JSON.parse(event.data).body);
            store.commit('increment');
            store.commit('getWSData', body)
            getUserInfo().then(function (userInfo) {
                store.commit('setChargingMechineAmount', userInfo.chargingMechineAmount);
            });
            console.log(store.state.update);
        }
        //连接关闭的回调方法
        websocket.onclose = function () {
            setMessageInnerHTML("WebSocket连接关闭");
        }

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            // alert('关闭websocket');
            websocket.close();
        }

        //关闭WebSocket连接
        function closeWebSocket() {
            websocket.close();
        }

        //将消息显示在网页上
        function setMessageInnerHTML(innerHTML) {
            console.log(innerHTML);
        }

        //发送消息
        function send() {
            websocket.send(message);
        }
    }
}
//获取openId的方法，首先用url
export function getOpenId() {
        let code, url = window.location.href;
        // alert(url);
        if (!localStorage.getItem('openId')) {
            if (url.indexOf('code=') > -1) {
                code = url.split('code=')[1].split('&')[0];
                // alert('code'+code);
                //获取code
                let getOpenId = GLOBAL.interfacePath + '/clyun/getOpenId';
                axios
                    .post(getOpenId, {'code':code})
                    .then(function (data) {
                        let res = data.data;
                        // alert(JSON.stringify(res));
                        // alert('openId:' + res.body.openid);
                        localStorage.setItem('openId', res.body.openid);
                        console.log('getOpenId|返回数据|', res);
                    })
                    .catch(function (err) {
                        console.log({ 'url': getOpenId, 'err': err });
                    });
            }else {
                var url1 = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+GLOBAL.appId+'&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                window.location.href = url1;
            }
        }
}


import Vue from 'vue'
import Router from 'vue-router'
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router);
// 用户页面
const IDCardList = r => require.ensure([], () => r(require('@/components/user/IDCardList.vue')), 'News');
const chargeElecLog = r => require.ensure([], () => r(require('@/components/user/chargeElecLog.vue')), 'News');
const charging = r => require.ensure([], () => r(require('@/components/user/charging.vue')), 'News');
const chargingList = r => require.ensure([], () => r(require('@/components/user/chargingList.vue')), 'News');
const endCharge = r => require.ensure([], () => r(require('@/components/user/endCharge.vue')), 'News');
const ICInfo = r => require.ensure([], () => r(require('@/components/user/ICInfo.vue')), 'News');
const ICRecharge = r => require.ensure([], () => r(require('@/components/user/ICRecharge.vue')), 'News');
const cardsBag = r => require.ensure([], () => r(require('@/components/user/cardsBag.vue')), 'News');
const ICCardRecharge = r => require.ensure([], () => r(require('@/components/user/ICCardRecharge.vue')), 'News');
const identifyCodeInput = r => require.ensure([], () => r(require('@/components/user/identifyCodeInput.vue')), 'News');
const login = r => require.ensure([], () => r(require('@/components/user/login.vue')), 'News');
const register = r => require.ensure([], () => r(require('@/components/user/register.vue')), 'News');
const getBackPwd = r => require.ensure([], () => r(require('@/components/user/getBackPwd.vue')), 'News');
const setPwd = r => require.ensure([], () => r(require('@/components/user/setPwd.vue')), 'News');
const rechargeAgreement = r => require.ensure([], () => r(require('@/components/user/rechargeAgreement.vue')), 'News');
const main = r => require.ensure([], () => r(require('@/components/user/main.vue')), 'News');
const personalCenter = r => require.ensure([], () => r(require('@/components/user/personalCenter.vue')), 'News');
const settings = r => require.ensure([], () => r(require('@/components/user/settings.vue')), 'News');
const modifyPwd = r => require.ensure([], () => r(require('@/components/user/modifyPwd.vue')), 'News');
const phoneInput = r => require.ensure([], () => r(require('@/components/user/phoneInput.vue')), 'News');
const pwdInput = r => require.ensure([], () => r(require('@/components/user/pwdInput.vue')), 'News');
const recharge = r => require.ensure([], () => r(require('@/components/user/recharge.vue')), 'News');
const rechargeLog = r => require.ensure([], () => r(require('@/components/user/rechargeLog.vue')), 'News');
const startElec = r => require.ensure([], () => r(require('@/components/user/startElec.vue')), 'News');
const chooseStationPort = r => require.ensure([], () => r(require('@/components/user/chooseStationPort.vue')), 'News');
const chooseChargeMethod = r => require.ensure([], () => r(require('@/components/user/chooseChargeMethod.vue')), 'News');
const usuallyStation = r => require.ensure([], () => r(require('@/components/user/usuallyStation.vue')), 'News');
const nearbyStation = r => require.ensure([], () => r(require('@/components/user/nearbyStation.vue')), 'News');
const bindStation = r => require.ensure([], () => r(require('@/components/user/bindStation.vue')), 'News');
const myNews = r => require.ensure([], () => r(require('@/components/user/myNews.vue')), 'News');
const aboutUs = r => require.ensure([], () => r(require('@/components/user/aboutUs.vue')), 'News');
const chooseToCharge = r => require.ensure([], () => r(require('@/components/user/chooseToCharge.vue')), 'News');
const userAgreement = r => require.ensure([], () => r(require('@/components/user/userAgreement.vue')), 'News');
const qrCodePage = r => require.ensure([], () => r(require('@/components/user/qrCodePage.vue')), 'News');
const registerStationInfo = r => require.ensure([], () => r(require('@/components/user/registerStationInfo.vue')), 'News');
const registerTerminalInfo = r => require.ensure([], () => r(require('@/components/user/registerTerminalInfo.vue')), 'News');

// errorPage
const errorPage = r => require.ensure([], () => r(require('@/components/user/errorPage.vue')), 'News');
// 运营商管理平台页面
const operatorPlatform = r => require.ensure([], () => r(require('@/components/operator/operatorPlatform.vue')), 'News');
const operatorLogin = r => require.ensure([], () => r(require('@/components/operator/operatorLogin.vue')), 'News');
const operatorMain = r => require.ensure([], () => r(require('@/components/operator/operatorMain.vue')), 'News');
const agentList = r => require.ensure([], () => r(require('@/components/operator/agentList.vue')), 'News'); //代理商列表
const createAgent = r => require.ensure([], () => r(require('@/components/operator/createAgent.vue')), 'News'); //创建代理商
const updateAgent = r => require.ensure([], () => r(require('@/components/operator/updateAgent.vue')), 'News'); //修改更新代理商信息
const scroller = r => require.ensure([], () => r(require('@/components/user/vueScroller.vue')), 'News'); //修改更新代理商信息

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'nearbyStation/normalList',
    },
    {
      path: '/nearbyStation/:listType',
      name: 'nearbyStation',
      component: nearbyStation
    },
    {
      path: '/IDCardList',
      name: 'IDCardList',
      component: IDCardList
    },
    {
      path: '/chargeElecLog',
      name: 'chargeElecLog',
      component: chargeElecLog
    },
    {
      path: '/charging',
      name: 'charging',
      component: charging
    },
    {
      path: '/chargingList',
      name: 'chargingList',
      component: chargingList
    },
    {
      path: '/endCharge',
      name: 'endCharge',
      component: endCharge
    },
    {
      path: '/ICInfo',
      name: 'ICInfo',
      component: ICInfo
    },
    {
      path: '/ICRecharge',
      name: 'ICRecharge',
      component: ICRecharge
    },
    {
      path: '/cardsBag',
      name: 'cardsBag',
      component: cardsBag
    },
    {
      path: '/ICCardRecharge/:ICCardId',
      name: 'ICCardRecharge',
      component: ICCardRecharge
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/getBackPwd',
      name: 'getBackPwd',
      component: getBackPwd
    },
    {
      path: '/setPwd',
      name: 'setPwd',
      component: setPwd
    },
    {
      path: '/modifyPwd',
      name: 'modifyPwd',
      component: modifyPwd
    },
    {
      path: '/rechargeAgreement',
      name: 'rechargeAgreement',
      component: rechargeAgreement
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: personalCenter
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/phoneInput/:title',
      name: 'phoneInput',
      component: phoneInput
    },
    {
      path: '/identifyCodeInput/:title/:phone',
      name: 'identifyCodeInput',
      component: identifyCodeInput
    },
    {
      path: '/pwdInput/:title/:phone/:indentifyCode',
      name: 'pwdInput',
      component: pwdInput
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/rechargeLog',
      name: 'rechargeLog',
      component: rechargeLog
    },
    {
      path: '/startElec',
      name: 'startElec',
      component: startElec
    },
    {
      path: '/chooseStationPort/:stationId',
      name: 'chooseStationPort',
      component: chooseStationPort
    },
    {
      path: '/chooseChargeMethod/:stationId/:portId/:portNumber/:consoleId/:consoleNumber',
      name: 'chooseChargeMethod',
      component: chooseChargeMethod
    },
    {
      path: '/usuallyStation',
      name: 'usuallyStation',
      component: usuallyStation
    },
    {
      path: '/bindStation',
      name: 'bindStation',
      component: bindStation
    },
    {
      path: '/myNews',
      name: 'myNews',
      component: myNews
    },
    {
      path: '/operatorPlatform',
      name: 'operatorPlatform',
      component: operatorPlatform
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/chooseToCharge',
      name: 'chooseToCharge',
      component: chooseToCharge
    },
    {
      path: '/userAgreement',
      name: 'userAgreement',
      component: userAgreement
    },
    //运营商管理平台相关页面
    {
      path: '/operatorLogin',
      name: 'operatorLogin',
      component: operatorLogin
    }, 
    {
      path: '/operatorMain',
      name: 'operatorMain',
      component: operatorMain
    }, 
    {
      path: '/agentList',
      name: 'agentList',
      component: agentList
    }, 
    {
      path: '/createAgent',
      name: 'createAgent',
      component: createAgent
    }, 
    {
      path: '/updateAgent',
      name: 'updateAgent',
      component: updateAgent
    },
    , 
    {
      path: '/scroller',
      name: 'scroller',
      component: scroller
    },
    {
      path: '/qrCodePage/:qrCodeId',
      name: 'qrCodePage',
      component: qrCodePage
    },
    {
      path: '/registerStationInfo',
      name: 'registerStationInfo',
      component: registerStationInfo
    },
    {
      path: '/registerTerminalInfo/:qrCodeId',
      name: 'registerTerminalInfo',
      component: registerTerminalInfo
    },
    {
      path: '*',   // 错误路由
      name: 'errorPage',   //重定向
      component:errorPage
    }
  ]
})
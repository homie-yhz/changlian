import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 用户页面
const IDCardList = r => require.ensure([], () => r(require('@/components/IDCardList.vue')), 'News');
const chargeElecLog = r => require.ensure([], () => r(require('@/components/chargeElecLog.vue')), 'News');
const charging = r => require.ensure([], () => r(require('@/components/charging.vue')), 'News');
const endCharge = r => require.ensure([], () => r(require('@/components/endCharge.vue')), 'News');
const ICInfo = r => require.ensure([], () => r(require('@/components/ICInfo.vue')), 'News');
const ICRecharge = r => require.ensure([], () => r(require('@/components/ICRecharge.vue')), 'News');
// const ICCardList = r => require.ensure([], () => r(require('@/components/ICCardList.vue')), 'News');
const cardsBag = r => require.ensure([], () => r(require('@/components/cardsBag.vue')), 'News');
const ICCardRecharge = r => require.ensure([], () => r(require('@/components/ICCardRecharge.vue')), 'News');
const identifyCodeInput = r => require.ensure([], () => r(require('@/components/identifyCodeInput.vue')), 'News');
const login = r => require.ensure([], () => r(require('@/components/login.vue')), 'News');
const register = r => require.ensure([], () => r(require('@/components/register.vue')), 'News');
const getBackPwd = r => require.ensure([], () => r(require('@/components/getBackPwd.vue')), 'News');
const setPwd = r => require.ensure([], () => r(require('@/components/setPwd.vue')), 'News');
const rechargeAgreement = r => require.ensure([], () => r(require('@/components/rechargeAgreement.vue')), 'News');
const main = r => require.ensure([], () => r(require('@/components/main.vue')), 'News');
const personalCenter = r => require.ensure([], () => r(require('@/components/personalCenter.vue')), 'News');
const settings = r => require.ensure([], () => r(require('@/components/settings.vue')), 'News');
const modifyPwd = r => require.ensure([], () => r(require('@/components/modifyPwd.vue')), 'News');
const phoneInput = r => require.ensure([], () => r(require('@/components/phoneInput.vue')), 'News');
const pwdInput = r => require.ensure([], () => r(require('@/components/pwdInput.vue')), 'News');
const recharge = r => require.ensure([], () => r(require('@/components/recharge.vue')), 'News');
const rechargeLog = r => require.ensure([], () => r(require('@/components/rechargeLog.vue')), 'News');
const showIC = r => require.ensure([], () => r(require('@/components/showIC.vue')), 'News');
const startElec = r => require.ensure([], () => r(require('@/components/startElec.vue')), 'News');
const chooseStationPort = r => require.ensure([], () => r(require('@/components/chooseStationPort.vue')), 'News');
const chooseChargeMethod = r => require.ensure([], () => r(require('@/components/chooseChargeMethod.vue')), 'News');
const usuallyStation = r => require.ensure([], () => r(require('@/components/usuallyStation.vue')), 'News');
const nearbyStation = r => require.ensure([], () => r(require('@/components/nearbyStation.vue')), 'News');
const bindStation = r => require.ensure([], () => r(require('@/components/bindStation.vue')), 'News');
const myNews = r => require.ensure([], () => r(require('@/components/myNews.vue')), 'News');
const operatorPlatform = r => require.ensure([], () => r(require('@/components/operatorPlatform.vue')), 'News');
const aboutUs = r => require.ensure([], () => r(require('@/components/aboutUs.vue')), 'News');
const chooseToCharge = r => require.ensure([], () => r(require('@/components/chooseToCharge.vue')), 'News');
const userAgreement = r => require.ensure([], () => r(require('@/components/userAgreement.vue')), 'News');
// 运营商管理平台页面
const operatorLogin = r => require.ensure([], () => r(require('@/components/operatorLogin.vue')), 'News');
const operatorMain = r => require.ensure([], () => r(require('@/components/operatorMain.vue')), 'News');
const agentList = r => require.ensure([], () => r(require('@/components/agentList.vue')), 'News'); //代理商列表
const createAgent = r => require.ensure([], () => r(require('@/components/createAgent.vue')), 'News'); //创建代理商
const updateAgent = r => require.ensure([], () => r(require('@/components/updateAgent.vue')), 'News'); //修改更新代理商信息
const scroller = r => require.ensure([], () => r(require('@/components/vueScroller.vue')), 'News'); //修改更新代理商信息

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/nearbyStation',
      name: 'nearbyStation',
      component: nearbyStation
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
      path: '/register',
      name: 'register',
      component: register
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
      path: '/rechargeLog/:userId',
      name: 'rechargeLog',
      component: rechargeLog
    },
    {
      path: '/showIC',
      name: 'showIC',
      component: showIC
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
      path: '/chooseChargeMethod/:portId',
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
    }
  ]
})
// this.a.beforeEach(function(to,from,next){
//   next();
// });
// this.a.afterEach(function(to,from){
// });
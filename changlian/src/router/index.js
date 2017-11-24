import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const bindIC = r => require.ensure([], () => r(require('@/components/bindIC.vue')), 'News');
const chargeElecLog = r => require.ensure([], () => r(require('@/components/chargeElecLog.vue')), 'News');
const charging = r => require.ensure([], () => r(require('@/components/charging.vue')), 'News');
const endCharge = r => require.ensure([], () => r(require('@/components/endCharge.vue')), 'News');
const ICInfo = r => require.ensure([], () => r(require('@/components/ICInfo.vue')), 'News');
const ICRecharge = r => require.ensure([], () => r(require('@/components/ICRecharge.vue')), 'News');
const ICCardList = r => require.ensure([], () => r(require('@/components/ICCardList.vue')), 'News');
const ICCardRecharge = r => require.ensure([], () => r(require('@/components/ICCardRecharge.vue')), 'News');
const identifyCodeInput = r => require.ensure([], () => r(require('@/components/identifyCodeInput.vue')), 'News');
const login = r => require.ensure([], () => r(require('@/components/login.vue')), 'News');
const main = r => require.ensure([], () => r(require('@/components/main.vue')), 'News');
const personalCenter = r => require.ensure([], () => r(require('@/components/personalCenter.vue')), 'News');
const phoneInput = r => require.ensure([], () => r(require('@/components/phoneInput.vue')), 'News');
const pwdInput = r => require.ensure([], () => r(require('@/components/pwdInput.vue')), 'News');
const recharge = r => require.ensure([], () => r(require('@/components/recharge.vue')), 'News');
const rechargeLog = r => require.ensure([], () => r(require('@/components/rechargeLog.vue')), 'News');
const showIC = r => require.ensure([], () => r(require('@/components/showIC.vue')), 'News');
const startElec = r => require.ensure([], () => r(require('@/components/startElec.vue')), 'News');
const stationDetail = r => require.ensure([], () => r(require('@/components/stationDetail.vue')), 'News');
const usuallyStation = r => require.ensure([], () => r(require('@/components/usuallyStation.vue')), 'News');
const nearbyStation = r => require.ensure([], () => r(require('@/components/nearbyStation.vue')), 'News');
const bindStation = r => require.ensure([], () => r(require('@/components/bindStation.vue')), 'News');
const myNews = r => require.ensure([], () => r(require('@/components/myNews.vue')), 'News');
const operatorPlatform = r => require.ensure([], () => r(require('@/components/operatorPlatform.vue')), 'News');
const aboutUs = r => require.ensure([], () => r(require('@/components/aboutUs.vue')), 'News');
const chooseToCharge = r => require.ensure([], () => r(require('@/components/chooseToCharge.vue')), 'News');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/bindIC',
      name: 'bindIC',
      component: bindIC
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
      path: '/ICCardList',
      name: 'ICCardList',
      component: ICCardList
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
      path: '/stationDetail/:stationId',
      name: 'stationDetail',
      component: stationDetail
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
    }
  ]
})
// this.a.beforeEach(function(to,from,next){
//   next();
// });
// this.a.afterEach(function(to,from){
// });
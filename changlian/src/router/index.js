import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const bindIC             = r => require.ensure([],() => r(require('@/components/bindIC.vue')),'News');
const chargeElecLog      = r => require.ensure([],() => r(require('@/components/chargeElecLog.vue')),'News');
const elecing            = r => require.ensure([],() => r(require('@/components/elecing.vue')),'News');
const endElec            = r => require.ensure([],() => r(require('@/components/endElec.vue')),'News');
const ICInfo             = r => require.ensure([],() => r(require('@/components/ICInfo.vue')),'News');
const ICRecharge         = r => require.ensure([],() => r(require('@/components/ICRecharge.vue')),'News');
const identifyCodeInput  = r => require.ensure([],() => r(require('@/components/identifyCodeInput.vue')),'News');
const login              = r => require.ensure([],() => r(require('@/components/login.vue')),'News');
const main               = r => require.ensure([],() => r(require('@/components/main.vue')),'News');
const nearbyStation      = r => require.ensure([],() => r(require('@/components/nearbyStation.vue')),'News');
const personalCenter     = r => require.ensure([],() => r(require('@/components/personalCenter.vue')),'News');
const phoneInput         = r => require.ensure([],() => r(require('@/components/phoneInput.vue')),'News');
const pwdInput           = r => require.ensure([],() => r(require('@/components/pwdInput.vue')),'News');
const recharge           = r => require.ensure([],() => r(require('@/components/recharge.vue')),'News');
const rechargeLog        = r => require.ensure([],() => r(require('@/components/rechargeLog.vue')),'News');
const showIC             = r => require.ensure([],() => r(require('@/components/showIC.vue')),'News');
const startElec          = r => require.ensure([],() => r(require('@/components/startElec.vue')),'News');
const stationInfo        = r => require.ensure([],() => r(require('@/components/stationInfo.vue')),'News');
const usuallyStation     = r => require.ensure([],() => r(require('@/components/usuallyStation.vue')),'News');

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
      path: '/elecing',
      name: 'elecing',
      component: elecing
    },
    {
      path: '/endElec',
      name: 'endElec',
      component: endElec
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
      path: '/stationInfo/:stationId',
      name: 'stationInfo',
      component: stationInfo
    },
    {
      path: '/usuallyStation',
      name: 'usuallyStation',
      component: usuallyStation
    }
  ]
})

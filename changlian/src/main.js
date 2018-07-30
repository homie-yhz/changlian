// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/message-box/style.css';
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')||'';
      if (!!token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.token = token;
      }
      console.log('config',config);
      return config;
  },
  err => {
      console.log('请求拦截器报错');
      return Promise.reject(err);
  });
// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response);
    let res = response.data;
    if(res.code === 501){
      MessageBox.alert(res.msg).then(action=>{
        router.push({name:'login'});
      });
    }
    return response;
  },
  error => {
    console.log('拦截器response ERROR',error);
      return Promise.reject(error)   // 返回接口返回的错误信息
  });
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

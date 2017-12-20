import Vue from 'vue';
import axios from 'axios';
import {MessageBox} from 'mint-ui';
import 'mint-ui/lib/message-box/style.css';

export default {
    env:'UAT',
    interfacePath:'http://epsout.life.taikang.com/epstk',   //UAT 接口路径
    // interfacePath:'http://192.168.1.107:8082/eps-tkyc',    //志鸿本机
    // interfacePath:'http://172.20.10.5:8080/eps-tkyc',    //志鸿本机
    // interfacePath:'http://192.168.1.109:8080/eps-tkyc',   //文杰本机
    // interfacePath:'http://192.168.1.107:8081/eps-tkyc',   //王嫡本机
    appPath:'http://epsout.life.taikang.com/tkyc/tkgq/#',
    publicAccountAddress:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxNjEyMDAxMA==&scene=124#wechat_redirect'
  
  
    //正式项目地址以及接口地址
    //公共账号及域名配置   64.11 64.12 64.13
     /*env:'prod',
     interfacePath:'http://eps.taikanglife.com/epstkrs',//接口路径公共域名部分
     appPath:'http://tkyc.eps.group.taikang.com/tkyc/tkgq/#',    //前台应用路径
     publicAccountAddress:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNjk1OTQ2NQ==&scene=124#wechat_redirect'*/
  
}

//是否登录模块
export function judgeLogin(){
    return {
        promiseFn:function(){
            return new Promise(function(resolve,reject){
                //let judgeLoginUrl = GLOBAL.interfacePath + '';
                let judgeLoginUrl = '';
                axios
                  .get(judgeLoginUrl)
                  .then(function(data){
                      console.log('judgeLoginUrl|返回数据|'+JSON.stringify(data.data));
                      data.data = {
                          "hasLogin":false
                      }
                      if(data.data.hasLogin){
                        resolve(true);
                      }else{
                        resolve(false);
                      }
                  })
                  .catch(function(err){
                      console.log({'url':judgeLoginUrl,'err':JSON.stringify(err)});
                  });
            });
        }
    }
}
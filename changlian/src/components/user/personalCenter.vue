<template>
  <div class="center-box">
    <!-- 头部 -->
    <div class="scroll-box" style="padding-top:0;padding-bottom:2rem;">
      <div>
        <div class="center-header">
          <div class="por">
            <div class="v-fm">
              <img src="../../../static/img/head-pic-blue.png" alt="">
              <div v-if="!userId" class="v-fcm">
                <router-link :to="{name:'login'}" tag="p">登录</router-link>
                <p style="margin:0 .2rem;">|</p>
                <router-link :to="{name:'register'}" tag="p">注册</router-link>
              </div>
              <div v-else>
                <span>{{userInfo.phone}}</span>
              </div>
            </div>
            <div>账户余额：<span>{{!!userId?userInfo.balance:'--:--'}}</span> 元</div>
            <div class="setting-message v-fm" style="width:auto;">
              <i class="iconfont icon-lingdang"></i>
              <div v-if="userInfo.loginState && userInfo.hasNews" class="v-f" style="height:.8rem;">
                <span class="icon-point-red"></span>
              </div>
              <span @click="routerTo('myNews','')">消息中心</span>
              <div class="v-fcm" @click="routerTo('settings','')">
                <i class="iconfont icon-ttpodicon" style="display:block;"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="blank"></div>
        <!-- tab卡 -->
        <div class="center-handle v-f">
          <a @click="routerTo('recharge')" class="v-fcm v-i1">
            <div class="tac">
              <i class="icon-charge"></i>
              <p>充值</p>
            </div>
          </a>
          <a @click="routerTo('cardsBag')" class="v-fcm v-i1">
            <div class="tac">
              <i class="icon-cardBox"></i>
              <p>卡包</p>
            </div>
          </a>
          <a @click="routerTo('IDCardList')" class="v-fcm v-i1">
            <div class="tac">
              <i class="icon-bindCard"></i>
              <p>卡片绑定</p>
            </div>
          </a>
        </div>
        <div class="blank"></div>
        <!-- 中心列表 -->
        <div class="center-list">
          <a @click="routerTo('rechargeLog')" class="v-fm">
            <i class="icon-rechargeLog"></i>
            <p class="v-i1">充值记录</p>
            <i class="icon-right"></i>
          </a>
          <a @click="routerTo('chargeElecLog')" class="v-fm">
            <i class="icon-chargeLog"></i>
            <p class="v-i1">充电记录</p>
            <i class="icon-right"></i>
          </a>
          <a @click="routerTo('chooseStationPort',{'stationId':userInfo.usualStationId})" :to="{name:'chooseStationPort',params:{stationId:userInfo.usualStationId}}" class="v-fm">
            <i class="icon-star"></i>
            <p class="v-i1">常用电站</p>
            <i class="icon-right"></i>
          </a>
        </div>
        <div class="blank"></div>
        <div class="center-list">
          <a @click="routerToPlatform()" class="v-fm">
            <i class="icon-operator"></i>
            <p class="v-i1">经营者管理平台</p>
            <i class="icon-right"></i>
          </a>
          <router-link :to="{name:'aboutUs'}" class="v-fm" style="margin-bottom:2rem;">
            <i class="icon-attention"></i>
            <p class="v-i1">关于我们</p>
            <i class="icon-right"></i>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <div class="footer v-f">
      <router-link class="v-i1" :to="{name:'nearbyStation',params:{listType:'normalList'}}">
        <i class="icon-elec m-auto"></i>
        <p class="tac">电站</p>
      </router-link>
      <div class="v-i1">
        <p class="tac" style="margin-top:1.05rem;" @click="scanQRCode()">扫一扫</p>
      </div>
      <div class="v-i1 checked">
        <i class="icon-me"></i>
        <p class="tac">我</p>
      </div>
      <div class="icon-scan" @click="scanQRCode()">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Toast,
    MessageBox
  } from "mint-ui";
  import "mint-ui/lib/toast/style.css";
  import GLOBAL, {
    getUserInfo,
    getCode
  } from "../../GLOBAL";
  import wx from 'weixin-js-sdk';
  export default {
    data() {
      return {
        userInfo: {},
        showPlatform: false,
        userId: null
      };
    },
    methods: {
      login() {},
      register() {},
      // 跳到到相关页面
      routerTo(name, params) {
        // if (!!localStorage.getItem('userId')) {
        //   console.log(name);
        //   if (name === 'chooseStationPort') {
        //     console.log(params);
        //     if (!params.stationId) {
        //       MessageBox.confirm('您还没有绑定电站，前去绑定？').then(action => {
        //         this.$router.push({
        //           name: 'nearbyStation',
        //           params: {
        //             'listType': 'bindList'
        //           }
        //         });
        //       });
        //       return false;
        //     }
        //   }
        //   this.$router.push({
        //     name: name,
        //     params: params
        //   });
        // } else {
        //   this.$router.push({
        //     name: 'login'
        //   });
        // }
  
        //判断是否登录过  没有登录过提示去登录
        if (!localStorage.getItem('userId')) {
          this.$router.push({
            name: 'login'
          });
          return false;
        }
        // console.log(name);
        // 如果点击的为 常用电站  或者  充值 按钮，会校验是否存在 绑定电站的信息，没有则提示跳转页面，有 则 跳转到正常页面
        if ((name === 'chooseStationPort' || name === 'recharge') && !localStorage.getItem('usualStationId')) {
          MessageBox.confirm('您还没有绑定电站，前去绑定？').then(action => {
            this.$router.push({
              name: 'nearbyStation',
              params: {
                'listType': 'bindList'
              }
            });
          });
          return false;
        }
  
        this.$router.push({
          name: name,
          params: params
        });
      },
      routerToPlatform() {
        if (!!localStorage.getItem('operatorId')) {
          this.$router.push({
            name: 'operatorCenter'
          });
        } else {
          this.$router.push({
            name: 'operatorLogin'
          });
        }
      },
      scanQRCode() {
        wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            // alert('扫一扫返回地址：' + result);
          }
        });
      }
    },
    created() {
      let _this = this;
      this.userId = localStorage.getItem("userId");
      if (!!this.userId) {
        getUserInfo()
          .then((userInfo) => {
            console.log('>>>userInfo', userInfo);
            _this.userInfo = Object.assign({}, _this.userInfo, userInfo);
            localStorage.setItem('operatorId', _this.userInfo.operatorId || '');
          })
          .catch(function(err) {
            loader.hide();
            MessageBox.alert('接口异常！');
            console.log({
              url: url,
              err: JSON.stringify(err)
            });
          })
  
      }
      //获取code 调用扫一扫功能
      getCode(_this)
        .then(function(WXoptions) {
          // alert('获取到的微信配置信息：---' + JSON.stringify(WXoptions));
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: WXoptions.appId, // 必填，公众号的唯一标识
            timestamp: WXoptions.timestamp, // 必填，生成签名的时间戳
            nonceStr: WXoptions.nonceStr, // 必填，生成签名的随机串
            signature: WXoptions.signature, // 必填，签名
            jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表
          });
        });
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  @import "../../../static/css/iconfont.css";
  .center-header {
    overflow: hidden;
    height: 8.5rem;
    color: #fff;
    background: url("../../../static/img/personal-bg.png") top center no-repeat;
    background-size: 100%;
    & img {
      width: 3.2rem;
      height: 3.2rem;
      display: block;
      margin: 0 0.5rem 0.2rem 0;
    }
    &>div {
      margin: 1rem 0 0 1rem;
    }
    & .setting-message {
      position: absolute;
      right: 0.5rem;
      top: 0;
      .icon-point-red {
        width: 5px;
        height: 5px;
        display: block;
        border-radius: 50%;
        background-color: #e51c23;
        margin-right: 0.2rem;
      }
    }
  }
  
  .center-handle {
    height: 3.5rem;
    &>a {
      border-right: 1px solid #e6e6e6;
      &:last-child {
        border: none;
      }
      i {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto 0.2rem;
        display: block;
        background-size: 100% 100%;
      }
    }
  }
  
  .center-list {
    &>a {
      height: 1.8rem;
      border-bottom: 1px solid #e6e6e6;
      &>i {
        width: 1rem;
        height: 1rem;
        margin: 0 1rem 0;
        display: block;
        background-size: 100% 100%;
      }
    }
  }
  
  .footer {
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background: #f8f8f8;
    border-top: 1px solid #d0d0d0;
    &>div {
      height: 2rem;
      &.checked {
        color: #2eafed;
        &>.icon-elec {
          background: url("../../../static/img/bolt-blue.png") center center no-repeat;
          background-size: 100% 100%;
        }
        &>.icon-scan {
          background: url("../../../static/img/bolt-blue.png") center center no-repeat;
          background-size: 100% 100%;
        }
        &>.icon-me {
          background: url("../../../static/img/person-blue.png") center center no-repeat;
          background-size: 100% 100%;
        }
        &>p {
          text-align: center;
        }
      }
    }
  }
</style>

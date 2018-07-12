<template>
  <!-- 充值页面 -->
  <div>
    <header class="header-bg-fff v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充值</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box" style="padding-bottom:3rem;overflow:scroll;">
      <!-- 充值模块 -->
      <div class="recharge-box">
        <div class="money-box">
          <p class="v-fcm por" v-for="val in rechargeCardsList" @click="chooseCard(val)" :class="{'checked':postData.chargeCardId===val.id}" :key="val.cardId">
            <span class="agent-name">{{val.name}}</span>
            <i class="icon-cl-log"></i>
            <span class="fz-60"><span>¥</span>&nbsp;<span class="fz-100">{{val.faceValue}}</span></span>
            <span v-show="!!val.freeValue" class="give-money">赠{{val.freeValue}}元</span>
            <i v-show="postData.chargeCardId===val.id" class="icon-check"></i>
            <i v-show="postData.chargeCardId===val.id" class="icon-check-yes"></i>
            <span class="give-money-end-time">赠额有效期至{{val.expirationDate}}</span>
          </p>
        </div>
        <div class="mt-8 mb-5 fz-50">
          <span style="color:#e51c23;">赠额使用规则：</span><span>仅限绑定设备使用</span>
        </div>
        <div class="payMethod">
          <p style="margin:.5rem auto;">支付方式</p>
          <!-- <div @click="payMethods('zfb')" class="v-fm mt-2 mb-10">
                                                    <i class="icon-zfb"></i>
                                                    <p class="v-i1">支付宝支付</p><i :class="{'icon-check-yes':postData.payMethod==='zfb'}" class="icon-select"></i>
                                                  </div> -->
          <div @click="payMethods('wx')" class="v-fm mt-5 mb-5">
            <i class="icon-wx"></i>
            <p class="v-i1">微信支付</p><i :class="{'icon-check-yes':postData.payMethod==='wx'}" class="icon-select"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 充值按钮 -->
    <div class="recharge-bottom-box">
      <div class="agreement v-fcm">
        点击立即充值，即表示您已经同意
        <router-link :to="{name:'rechargeAgreement'}">《充值协议》</router-link>
      </div>
      <div class="recharge-btn-box v-f">
        <div class="v-fcm v-i1">
          充值金额：<span>{{selectedMoney||0}} 元</span>
        </div>
        <div @click="rechargeNow" class="recharge-btn v-fcm">立即充值</div>
      </div>
    </div>
    <!-- 弹出层 -->
    <cl-alert v-on:closeClAlert="closeClAlert" v-show="showClAlert"></cl-alert>
  </div>
</template>

<script>
  import Vue from "vue";
  import {
    Toast,
    MessageBox
  } from "mint-ui";
  import axios from "axios";
  import "mint-ui/lib/toast/style.css";

  import GLOBAL, {
    getUserInfo,
    getOpenId
  } from "../../GLOBAL";
  import clAlert from "../my-cpt/cl-alert.vue";
  Vue.component("cl-alert", clAlert);
  export default {
    data() {
      return {
        rechargeCardsList: [],
        selectedMoney: "",
        cardInfo: {},
        postData: {
          chargeCardId: "", //卡号
          payMethod: "", //支付方式：微信/支付宝
          faceValue: '', //面值
          userId: localStorage.getItem('userId') || '',
          openId: localStorage.getItem('openId') || ''
        },
        showClAlert: false //展示 绑定弹出层
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      //监听子组件关闭事件
      closeClAlert(state) {
        this.showClAlert = state;
      },
      // 选择卡片事件
      chooseCard(val) {
        this.selectedMoney = val.faceValue;
        this.postData.chargeCardId = val.id;
        this.postData.faceValue = val.faceValue;
      },
      // 选择付款方式
      payMethods(method) {
        this.postData.payMethod = method;
      },
      //获取充值卡片信息接口
      getRechargeCardInfo() {
        let _this = this;
        let getRechargeCard = GLOBAL.interfacePath + '/clyun/getRechargeCard?userId=' + localStorage.getItem('userId');
        axios
          .get(getRechargeCard)
          .then(function(data) {
            let res = data.data;
            // alert('获取充值卡片信息接口!' + res.code);
            console.log('getRechargeCard|返回数据|', res);
            if (res.code === 200) {
              _this.rechargeCardsList = res.body;
            }
            //返回703 说明没有绑定电站  无法充值，跳转绑定电站页面。
            else if (res.code === 703) {
              MessageBox.alert(res.msg).then(action => {
                this.$route.push({
                  name: 'nearbyStation',
                  params: {
                    listType: 'normalList'
                  }
                });
              });
            } else {
              MessageBox.alert(res.msg);
            }
          })
          .catch(function(err) {
            MessageBox.alert('接口异常! 错误代码：107');
            console.log({
              'url': getRechargeCard,
              'err': err
            });
          });
      },
      // 充值接口
      rechargeInterface() {
        let rechargeUrl = GLOBAL.interfacePathToken + '/clyun/rechargeUrl';
        // alert('发送数据：' + JSON.stringify(this.postData));
        axios
          .post(rechargeUrl, this.postData)
          .then(function(data) {
            let res = data.data;
            console.log(">>>rechargeUrl|返回数据|" + JSON.stringify(data.data));
            if (res.code === 200) {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": res.body.appId, //公众号名称，由商户传入
                  "timeStamp": res.body.timeStamp, //时间戳，自1970年以来的秒数
                  "nonceStr": res.body.nonceStr, //随机串
                  "package": res.body.package,
                  "signType": res.body.signType, //微信签名方式：
                  "paySign": res.body.sign //微信签名
                },
                function(res) {
                  alert(JSON.stringify(res));
                  if (res.err_msg === "get_brand_wcpay_request:ok") { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    MessageBox.alert('充值成功！');
                  } else {
                    MessageBox.alert('充值失败！');
                  }
                }
              );
            } else if (res.code === 501) {
              //
            } else {
              MessageBox.alert(res.msg);
            }
          })
          .catch(function(err) {
            MessageBox.alert('接口异常！错误代码：106');
            console.log({
              url: rechargeUrl,
              err: JSON.stringify(err)
            });
          });
      },
      // 立即充值
      rechargeNow() {
        let _this = this;
        if (!this.postData.chargeCardId) {
          Toast("选择充值面额！");
        } else if (!this.postData.payMethod) {
          Toast("请选择支付方式！");
        } else {
          this.postData.openId = localStorage.getItem('openId');
          this.rechargeInterface();
        }
      },
      back() {
        this.$router.go(-1);
      }
    },
    created() {
      //获取充值卡片信息
      this.getRechargeCardInfo();
      getOpenId();
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  @import "../../../static/css/iconfont.css";
  .recharge-box {
    padding: 0 0.7rem;
    &>.money-box {
      display: flex;
      flex-wrap: wrap;
      p {
        color: #fff;
        overflow: hidden;
        width: 48%;
        height: 4rem;
        border-radius: 4px;
        margin-top: 0.5rem;
        margin-top: 0.5rem;
        background: url("../../../static/img/recharge-card-bg-blue.jpg") center center no-repeat;
        background-size: 100%;
        &.checked {
          color: #fff;
          border: 1px solid #1189bd;
          box-shadow: 0 0 6px #0564a8;
        }
        &:nth-child(2n-1) {
          margin-right: 4%;
        }
        .give-money {
          position: absolute;
          right: 0;
          top: 3px;
          display: block;
          border-radius: 10rem;
          padding: 0.1rem 0.4rem;
          background: #e51c23;
          color: #fff;
          font-size: 0.55rem;
        }
        .icon-check-yes {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 0.7rem;
          height: 0.7rem;
          z-index: 11;
        }
      }
      .agent-name {
        display: block;
        color: #fff;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        font-size: 0.4rem;
        padding: 0.1rem 0 0 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-cl-log {
        background: url("../../../static/img/changlian-logo-white.png") center center no-repeat;
        background-size: 140% 170%;
        display: block;
        width: 1.6rem;
        height: 1.4rem;
        position: absolute;
        left: 0;
        bottom: 0;
        opacity: 0.5;
      }
      .give-money-end-time {
        position: absolute;
        bottom: 0;
        right: 0;
        display: block;
        font-size: 0.4rem;
      }
    }
  }

  .payMethod {
    margin-top: 0.2rem;
    .icon-check-yes {
      border: none;
    }
  }

  .agreement>a {
    color: #2eafed;
    font-size: 0.55rem;
  }

  .icon-wx {
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background: url("../../../static/img/logo-wx.png");
    background-size: 100% 100%;
    margin-right: 0.5rem;
  }

  .icon-zfb {
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background: url("../../../static/img/logo-zfb.png");
    background-size: 100% 100%;
    margin-right: 0.5rem;
  }

  .icon-select {
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    border: 1px solid #bbbbbb;
  }

  .icon-check {
    border: 1.4rem solid transparent;
    border-bottom: 1.4rem solid #fff;
    display: block;
    position: absolute;
    right: -1.4rem;
    bottom: -1px;
    z-index: 2;
  }

  .recharge-bottom-box {
    height: 3rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 3;
    .agreement {
      height: 1rem;
    }
    .recharge-btn-box {
      height: 2rem;
      div {
        height: 2rem;
        &:first-child {
          background-color: #f8f8f8;
          &>span {
            color: #e51c23;
          }
        }
      }
      .recharge-btn {
        height: 2rem;
        width: 40%;
        background-color: #ff000f;
        color: #fff;
      }
    }
  }
</style>

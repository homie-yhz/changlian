<template>
<!-- 充值页面 -->
  <div>
    <header class="header-bg-fff v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充值</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <!-- 充值模块 -->
    <div class="recharge-box">
      <div class="money-box">
        <p class="v-fcm por" v-for="val in moneyList" @click="chooseCard(val)" :class="{'checked':postData.cardId===val.cardId}" :key="val.cardId">
          <span class="agent-name">{{val.agentName}}</span>
          <i class="icon-cl-log"></i>
          <span class="fz-60"><span>¥</span>&nbsp;<span class="fz-100">{{val.money}}</span></span>
          <span v-show="!!val.giveMoney" class="give-money">赠{{val.giveMoney}}元</span>
          <i v-show="postData.cardId===val.cardId" class="icon-check"></i>
          <i v-show="postData.cardId===val.cardId" class="icon-check-yes"></i>
          <span class="give-money-end-time">赠额有效期至{{val.giveMoneyEndTime}}</span>
        </p>
      </div>
      <div class="mt-8 mb-5 fz-50">
        <span style="color:#e51c23;">赠额使用规则：</span><span>仅限绑定设备使用</span> 
      </div>
      <div class="payMethod">
        <p style="margin:.5rem auto;">支付方式</p>
        <div @click="payMethods('zfb')" class="v-fm mt-2 mb-10">
          <i class="icon-zfb"></i>
          <p class="v-i1">支付宝支付</p><i :class="{'icon-check-yes':postData.payMethod==='zfb'}" class="icon-select"></i>
        </div>
        <div @click="payMethods('wx')" class="v-fm mt-5 mb-5">
          <i class="icon-wx"></i>
          <p class="v-i1">微信支付</p><i :class="{'icon-check-yes':postData.payMethod==='wx'}" class="icon-select"></i>
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
import Vue from 'vue';
import { Toast } from "mint-ui";
import axios from 'axios';
import "mint-ui/lib/toast/style.css";
import GLOBAL, { getUserInfo } from "../GLOBAL";
import clAlert from './my-cpt/cl-alert.vue';
Vue.component('cl-alert',clAlert);
export default {
  data() {
    return {
      moneyList: [
        {
          money: 20,
          giveMoney: 0,
          giveMoneyEndTime:"2017-01-01",
          cardId:"a",
          agentName:"代理商名称"
        },
        {
          money: 50,
          giveMoney: 5,
          giveMoneyEndTime:"2017-01-01",
          cardId:"b",
          agentName:"代理商名称"
        },
        {
          money: 100,
          giveMoneyEndTime:"2017-01-01",
          giveMoney: 10,
          cardId:"c",
          agentName:"代理商名称"
        },
        {
          money: 200,
          giveMoneyEndTime:"2017-01-01",
          giveMoney: 15,
          cardId:"d",
          agentName:"代理商名称"
        }
      ],
      selectedMoney: "",
      cardInfo: {},
      postData: {
        cardId: "", //卡号
        payMethod: "" //支付方式：微信/支付宝
      },
      showClAlert:false //展示 绑定弹出层
    };
  },
  methods: {
    //监听子组件关闭事件
    closeClAlert(state){
      this.showClAlert = state;
    },
    // 选择卡片事件
    chooseCard(val) {
      this.selectedMoney = val.money;
      this.postData.cardId = val.cardId;
    },
    // 选择付款方式
    payMethods(method) {
      this.postData.payMethod = method;
    },
    // 充值接口
    rechargeInterface() {
      //let rechargeUrl = GLOBAL.interfacePath + '';
      let rechargeUrl = "";
      axios
        .get(rechargeUrl)
        .then(function(data) {
          console.log("rechargeUrl|返回数据|" + JSON.stringify(data.data));
          data.data = {
            state: "success"
          };
          if(data.data.state === 'success'){
            MessageBox.alert('充值成功！');
          }
        })
        .catch(function(err) {
          console.log({ url: rechargeUrl, err: JSON.stringify(err) });
        });
    },
    // 立即充值
    rechargeNow() {
      let _this = this;
      if (!this.postData.cardId) {
        Toast("选择充值面额！");
      } else if (!this.postData.payMethod) {
        Toast("请选择支付方式！");
      } else {
        console.log(JSON.stringify(this.postData));
        // 判断是否绑定过用户
        getUserInfo().then(function(userInfo) {
          console.log('bind');
          console.log(userInfo);
          // 已绑定  调用充值接口
          if(userInfo.bindState===true){
            _this.rechargeInterface();
          }
          // 未绑定  弹框提示
          else{
            _this.showClAlert = true;
            console.log(_this.showClAlert);
          }
        });
      }
    },
    back(){
      this.$router.go(-1);
    }
  },
  created(){

  }
};
</script>

<style lang="scss">
@import "../../static/css/common.scss";
@import "../../static/css/iconfont.css";
.recharge-box {
  padding: 0 0.7rem;
  & > .money-box {
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
      background: url("../../static/img/recharge-card-bg-blue.jpg") center
        center no-repeat;
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
        font-size:.55rem;
      }
      .icon-check-yes {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 0.7rem;
        height: 0.7rem;
        z-index:11;
      }
    }
    .agent-name{
      display: block;
      color:#fff;
      position: absolute;
      width:100%;
      left: 0;
      top:0;
      font-size:.4rem;
      padding:.1rem 0 0 .2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-cl-log{
      background:url('../../static/img/changlian-logo-white.png') center center no-repeat;
      background-size:140% 170%;
      display: block;
      width:1.6rem;
      height:1.4rem;
      position: absolute;
      left: 0;bottom:0;
      opacity:.5;
    }
    .give-money-end-time{
      position: absolute;
      bottom:0;
      right:0;
      display: block;
      font-size:.4rem;
    }
  }
}

.payMethod {
  margin-top: 0.2rem;
  .icon-check-yes {
    border: none;
  }
}
.agreement > a {
  color: #2eafed;
  font-size: 0.55rem;
}
.icon-wx {
  width: 0.8rem;
  height: 0.8rem;
  display: block;
  background: url("../../static/img/logo-wx.png");
  background-size: 100% 100%;
  margin-right: 0.5rem;
}

.icon-zfb {
  width: 0.8rem;
  height: 0.8rem;
  display: block;
  background: url("../../static/img/logo-zfb.png");
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
  z-index:2;
}

.recharge-bottom-box {
  height: 3rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  .agreement {
    height: 1rem;
  }
  .recharge-btn-box {
    height: 2rem;
    div {
      height: 2rem;
      &:first-child {
        background-color: #f8f8f8;
        & > span {
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

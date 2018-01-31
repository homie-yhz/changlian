<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">IC卡充值</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div style="padding:.5rem .7rem .35rem;border-bottom:1px solid #d9d9d9">
      <p>卡号：{{cardInfo.num}}</p>
      <p>余额：{{cardInfo.charge||'0.00'}} 元</p>
    </div>
    <div class="ICRecharge-box">
      <p style="">充值金额</p>
      <div class="money-box">
        <p class="v-fcm" v-for="val in moneyList" @click="chooseMoney(val.money)" :class="{'checked':selectedMoney===val.money}">{{val.money}}元</p>
      </div>
      <div class="payMethod">
        <p style="margin:.5rem auto;">支付方式</p>
        <div @click="payMethod('zfb')" class="v-fm mt-2">
          <i class="icon-zfb"></i>
          <p class="v-i1">支付宝支付</p><i class="icon-select"></i>
        </div>
        <div @click="payMethod('wx')" class="v-fm mt-5 mb-5">
          <i class="icon-wx"></i>
          <p class="v-i1">微信支付</p><i class="icon-select"></i>
        </div>
      </div>
      <div @click="rechargeNow" class="btn recharge-now-btn mb-2">立即充值</div>
      <p class="tac">点击立即充值，即表示您已经同意
        <router-link :to="{name:''}" class="cl-color">《充值协议》</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import GLOBAL,{getUserInfo} from '../GLOBAL';
  import axios from 'axios';
  export default {
    data() {
      return {
        userInfo:{},
        moneyList: [{
            'money': 20
          },
          {
            'money': 50
          },
          {
            'money': 100
          },
          {
            'money': 200
          }
        ],
        selectedMoney: 20,
        cardInfo: {},
        postData: {
          cardNum: '', //卡号
          rechargeNum: '', //充值的数量
          method: '', //支付方式：微信/支付宝
        }
      };
    },
    methods: {
      chooseMoney(money) {
        this.selectedMoney = money;
      },
      rechargeNow() {
        // if(this.userInfo.bindState === false){
        //   console.log('未绑定');
        // }else{
          
        // }
      },
      payMethods(method) {
  
      }
    },
    created() {
      let _this = this;
      let ICCardInfoUrl = GLOBAL.interfacePath + '';
      axios
        .get(ICCardInfoUrl)
        .then(function(data) {
          console.log('ICCardInfoUrl|返回数据|' + JSON.stringify(data.data));
  
        })
        .catch(function(err) {
          console.log({
            'url': ICCardInfoUrl,
            'err': JSON.stringify(err)
          });
        });

        getUserInfo().then(function(userInfo){
          _this.userInfo = userInfo;
        });
    }
  };
</script>

<style lang="scss">
  @import "../../static/css/common.scss";
  .ICRecharge-box {
    padding: 0.5rem 0.7rem 0;
    &>.money-box {
      display: flex;
      flex-wrap: wrap;
      p {
        width: 45%;
        height: 2rem;
        border: 1px solid $cl-color;
        border-radius: 4px;
        background-size:100% 100%;
        margin-top:.5rem;
        &.checked {
          background-color: $cl-color;
          color: #fff;
        }
        &:nth-child(2n-1) {
          margin-right: 10%;
        }
      }
    }
  }
  
  .payMethod {
    margin-top: .2rem;
  }
  
  .icon-wx {
    width: .8rem;
    height: .8rem;
    display: block;
    background: url('../../static/img/logo-wx.png');
    background-size: 100% 100%;
    margin-right: .5rem;
  }
  
  .icon-zfb {
    width: .8rem;
    height: .8rem;
    display: block;
    background: url('../../static/img/logo-zfb.png');
    background-size: 100% 100%;
    margin-right: .5rem;
  }
  
  .icon-select {
    height: 0.8rem;
    width: .8rem;
    background-color: red;
  }
</style>

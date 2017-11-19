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
    <div class="recharge-box">
      <p style="">充值金额</p>
      <div class="money-box">
        <div class="v-fb" v-for="item in moneyList">
          <p class="v-fcm" v-for="money in item" @click="chooseMoney(money)" :class="{'checked':selectedMoney===money}">{{money}}元</p>
        </div>
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
      <p class="tac">点击立即充值，即表示您已经同意<router-link :to="{name:''}" class="cl-color">《充值协议》</router-link></p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        moneyList: [
          [20, 50],
          [100, 200]
        ],
        selectedMoney: 20,
        cardInfo:{},
        postData:{
          cardNum:'',     //卡号
          rechargeNum:'', //充值的数量
          method:'',      //支付方式：微信/支付宝
        }
      };
    },
    methods: {
      chooseMoney(money) {
        this.selectedMoney = money;
      },
      rechargeNow(){
        
      },
      payMethods(method){
        
      }
    }
  };
</script>

<style lang="scss">
  @import "../../static/css/common.scss";
  .recharge-box {
    padding: 0.5rem 0.7rem 0;
    &>.money-box {
      &>div {
        margin-top: 0.7rem;
        &:first-child {
          margin-top: 0.5rem;
        }
        p {
          width: 45%;
          height: 2rem;
          border: 1px solid $cl-color;
          border-radius: 4px;
          &.checked {
            background-color: $cl-color;
            color: #fff;
          }
        }
      }
    }
  }
  .payMethod{
    margin-top:.2rem;
  }
  .icon-wx{
    width:.8rem;height: .8rem;
    display: block;
    background:url('../../static/img/logo-wx.png');
    background-size:100% 100%;
    margin-right:.5rem;
  }
  .icon-zfb{
    width:.8rem;height: .8rem;
    display: block;
    background:url('../../static/img/logo-zfb.png');
    background-size:100% 100%;
    margin-right:.5rem;
  }
  .icon-select{
    height: 0.8rem;
    width:.8rem;
    background-color:red;
  }
</style>

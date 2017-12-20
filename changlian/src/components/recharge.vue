<template>
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
        <p class="v-fcm por" v-for="val in moneyList" @click="chooseMoney(val.money)" :class="{'checked':selectedMoney===val.money}">
          <span class="fz-60"><span>¥</span>&nbsp;<span class="fz-100">{{val.money}}</span></span>
          <span v-if="!!val.discount" class="discount">赠{{val.discount}}元</span>
          <i v-if="selectedMoney===val.money" class="icon-check"></i>
        </p>
      </div>
      <div class="mt-5 mb-5">
        <span style="color:#e51c23;">赠额使用规则：</span><span>仅限绑定设备使用</span> 
      </div>
      <div class="payMethod">
        <p style="margin:.5rem auto;">支付方式</p>
        <div @click="payMethods('zfb')" class="v-fm mt-2 mb-10">
          <i class="icon-zfb"></i>
          <p class="v-i1">支付宝支付</p><i :class="{'checked':postData.method==='zfb'}" class="icon-select"></i>
        </div>
        <div @click="payMethods('wx')" class="v-fm mt-5 mb-5">
          <i class="icon-wx"></i>
          <p class="v-i1">微信支付</p><i :class="{'checked':postData.method==='wx'}" class="icon-select"></i>
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div class="recharge-bottom-box">
      <div class="agreement v-fcm">
        点击立即充值，即表示您已经同意
        <router-link :to="{name:''}" class="cl-color">《充值协议》</router-link>
      </div>
      <div class="recharge-btn-box v-f">
        <div class="v-fcm v-i1">
          充值金额：<span>{{selectedMoney}} 元</span>
        </div>
        <div @click="rechargeNow" class="recharge-btn v-fcm">立即充值</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        moneyList: [{
            'money': 20,
            'discount': ''
          },
          {
            'money': 50,
            'discount': '5'
          },
          {
            'money': 100,
            'discount': '10'
          },
          {
            'money': 200,
            'discount': '15'
          }
        ],
        selectedMoney: '',
        cardInfo: {},
        postData: {
          cardNum: '',     //卡号
          rechargeNum: '', //充值的钱数
          method: '',      //支付方式：微信/支付宝
        }
      };
    },
    methods: {
      chooseMoney(money) {
        this.selectedMoney = money;
      },
      rechargeNow() {
        console.log(JSON.stringify(this.postData));
      },
      payMethods(method) {
        this.postData.method = method;
      }
    }
  };
</script>

<style lang="scss">
  @import "../../static/css/common.scss";
  .recharge-box {
    padding: 0 0.7rem;
    &>.money-box {
      display: flex;
      flex-wrap: wrap;
      p {
        color: #fff;
        overflow: hidden;
        width: 45%;
        height: 4rem;
        border: 1px solid $cl-color;
        border-radius: 4px;
        margin-top: .5rem;
        margin-top: .5rem;
        background: url('../../static/img/recharge-card-bg-blue.jpg') center center no-repeat;
        &.checked {
          background-color: $cl-color;
          color: #fff;
          box-shadow: 0 0 4px #4d4d4d;
        }
        &:nth-child(2n-1) {
          margin-right: 10%;
        }
        .discount {
          position: absolute;
          right: 0;
          top: 3px;
          display: block;
          border-radius: 10rem;
          padding: .1rem .4rem;
          background: #fff500;
          color: black;
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
    border-radius:50%;
    border:1px solid #bbbbbb;
    &.checked {
      background-color: red;
    }
  }
  
  .icon-check {
    // height: 0.8rem;
    // width:.8rem;
    // background-color: red;
    // position: absolute;
    // right: 0;bottom:0;
    border: 1.4rem solid transparent;
    border-bottom: 1.4rem solid #fff;
    display: block;
    position: absolute;
    right: -1.4rem;
    bottom: -1px;
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

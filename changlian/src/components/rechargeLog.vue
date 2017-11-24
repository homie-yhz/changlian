<template>
  <div>
    <header class="header-poa v-fcm">
      <div class="v-fcm m-auto h-100" style="width:80%">充值记录</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="tab-box">
      <div class="v-fm">
        <div @click="chooseTab('accountRechargeLog')" class="v-fm" :class="{'checked':checkedTab==='accountRechargeLog'}">账户充值记录</div>
        <div @click="chooseTab('ICCardRechargeLog')" class="v-fm" :class="{'checked':checkedTab==='ICCardRechargeLog'}">IC卡充值记录</div>
      </div>
    </div>
    <ul class="scroll-box rechargeLog-list" style="padding-top:3.7rem!important;">
      <li class="v-fb v-fm" v-for="rechargeLog in rechargeLogList">
        <div>
          <p class="mb-10">{{rechargeLog.state}}</p>
          <p style="color:#969696;">{{rechargeLog.time}}</p>
        </div>
        <div style="color:#e51c23;">
          {{rechargeLog.money}}元
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import GLOBAL from '../GLOBAL';
  import axios from 'axios';
  export default {
    data() {
      return {
        rechargeLogList: [{
          "state": "微信支付成功",
          "time": "2017-09-08 08:04",
          "money": "20.00"
        }, {
          "state": "微信支付成功",
          "time": "2017-09-08 08:04",
          "money": "20.00"
        }, {
          "state": "微信支付成功",
          "time": "2017-09-08 08:04",
          "money": "20.00"
        }, {
          "state": "微信支付成功",
          "time": "2017-09-08 08:04",
          "money": "20.00"
        }, {
          "state": "微信支付成功",
          "time": "2017-09-08 08:04",
          "money": "20.00"
        }, {
          "state": "微信支付成功",
          "time": "2017-09-08 08:04",
          "money": "20.00"
        }, ],
        checkedTab: 'accountRechargeLog'
      };
    },
    methods: {
      chooseTab(method) {
        this.checkedTab = method;
      }
    },
    created() {
      let ICCardListUrl = GLOBAL.interfacePath + "";
      axios
        .get(ICCardListUrl)
        .then(function(data) {
          console.log("ICCardListUrl|返回数据|" + JSON.stringify(data.data));
        })
        .catch(function(err) {
          console.log({
            url: ICCardListUrl,
            err: JSON.stringify(err)
          });
        });
    }
  };
</script>

<style lang="scss">
  @import "../../static/css/common.scss";
  .tab-box {
    padding: 0 .8rem;
    z-index: 2;
    position: absolute;
    width: 100%;
    top: 2rem;
    height: 1.7rem;
    &>div {
      border-bottom: 1px solid #cfcfcf;
      height: 100%;
      &>div {
        height: 100%;
        &:first-child {
          margin-right: .8rem;
        }
      }
      div.checked {
        border-bottom: 2px solid #ffdc24;
      }
    }
  }
  
  .rechargeLog-list {
    padding: 0 .8rem;
    &>li {
      height: 3rem;
      border-bottom: 1px solid #cfcfcf;
    }
  }
</style>


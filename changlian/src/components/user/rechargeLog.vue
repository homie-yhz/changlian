<template>
  <div>
    <!-- 充值记录 -->
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充值记录</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box">
      <div class="rechargeLog-list">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <!-- <li v-for="item in list">{{ item }}</li> -->
          <li class="v-fb v-fm" v-for="rechargeLog in rechargeLogList" :key="rechargeLog.ID">
            <div>
              <p class="">{{rechargeLog.state}}</p>
              <p style="color:#969696;">{{rechargeLog.time}}</p>
            </div>
            <div style="color:#e51c23;">
              {{rechargeLog.money}}元
            </div>
          </li>
        </ul>
        <div class="v-fcm">
          <div v-if="loadingState" class="v-fm" style="padding:.5rem 0;">
            <mt-spinner type="fading-circle" style="margin-right:.5rem;"></mt-spinner> 加载中...
          </div>
          <div v-if="!loadingState" class="v-fm" style="padding:.5rem 0;">没有更多数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import GLOBAL from '../../GLOBAL';
  import axios from 'axios';
  import {
    InfiniteScroll
  } from 'mint-ui';
  import 'mint-ui/lib/style.css'
  import {
    Spinner
  } from 'mint-ui';
  
  Vue.component('mt-spinner', Spinner);
  Vue.use(InfiniteScroll);
  export default {
    data() {
      return {
        rechargeLogList: [],
        checkedTab: 'accountRechargeLog',
        hasNext: true,
        postData: {
          currentPage: 1,
          userId: '0032013213',
          listLen:10
        },
        loadingState:true
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      loadMore() {
        let _this = this;
        if (this.hasNext) {
          this.hasNext = false;
          this.loading = true;
          //let getRechargeLogListUrl = GLOBAL.interfacePath + '';
          let getRechargeLogListUrl = '';
          axios
            .get(getRechargeLogListUrl)
            .then(function(data) {
              data.data = {
                'hasNext': false,
                'rechargeLogList': [{
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
                  "state": "支付宝支付成功",
                  "time": "2017-09-08 08:04",
                  "money": "20.00"
                }, {
                  "state": "支付宝支付成功",
                  "time": "2017-09-08 08:04",
                  "money": "20.00"
                }]
              }
              console.log('getRechargeLogListUrl|返回数据|' + JSON.stringify(data.data));
              setTimeout(() => {
                _this.rechargeLogList = _this.rechargeLogList.concat(data.data.rechargeLogList);
                _this.loading = false;
                _this.hasNext = data.data.hasNext;
                !_this.hasNext && (_this.loadingState = false);
              }, 2500);
            })
            .catch(function(err) {
              console.log({
                'url': getRechargeLogListUrl,
                'err': JSON.stringify(err)
              });
            });
        }
      }
    },
    created() {
      // let ICCardListUrl = GLOBAL.interfacePath + "";
      let ICCardListUrl = "";
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
  @import "../../../static/css/common.scss";
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
    &>ul>li {
      padding: .5rem 0 .5rem;
      border-bottom: 1px solid #cfcfcf;
      &>div:first-child>p:last-child {
        font-size: .55rem;
      }
    }
  }
</style>


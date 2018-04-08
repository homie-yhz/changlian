<template>
  <div>
    <!-- 充电记录 -->
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充电记录</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <ul class="scroll-box ">
  
    </ul>
    <div class="scroll-box">
      <div class="chargeElecLog-list">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li class="" v-for="chargeElecLog in chargeElecLogList">
            <div>{{chargeElecLog.time}}</div>
            <div>{{chargeElecLog.addr}}</div>
            <div>设备：{{chargeElecLog.equipmentNum}}</div>
            <div class="v-fb">
              <p class="v-fm"><i class="icon-time"></i>充电时间：{{chargeElecLog.chargeTime}}</p>
              <p class="v-fm"><i class="icon-money"></i>充电费用：{{chargeElecLog.coast}} 元</p>
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
        chargeElecLogList: [],
        hasNext: true,
        postData: {
          currentPage: 1,
          stationId: '0032013213'
        },
        loadingState: true
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
          //let getChargeElecLogListUrl = GLOBAL.interfacePath + '';
          let getChargeElecLogListUrl = '';
          axios
            .get(getChargeElecLogListUrl)
            .then(function(data) {
              data.data = {
                'hasNext': false,
                'chargeElecLogList': [{
                  "time": "2017-11-10 09:09",
                  "addr": "龙井大事",
                  "equipmentNum": "3213213213",
                  "chargeTime": "2小时12分钟",
                  "coast": "22"
                }]
              }
              console.log('getChargeElecLogListUrl|返回数据|' + JSON.stringify(data.data));
              setTimeout(() => {
                _this.chargeElecLogList = _this.chargeElecLogList.concat(data.data.chargeElecLogList);
                _this.loading = false;
                _this.hasNext = data.data.hasNext;
                !_this.hasNext && (_this.loadingState = false);
              }, 2500);
            })
            .catch(function(err) {
              console.log({
                'url': getChargeElecLogListUrl,
                'err': JSON.stringify(err)
              });
            });
        }
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
  @import "../../../static/css/common.scss";
  .chargeElecLog-list {
    padding: 0 .8rem;
    &>ul>li {
      padding: .4rem 0;
      border-bottom: 1px solid #cfcfcf;
      &>div {
        margin-bottom: .2rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  
  .icon-time {
    display: block;
    width: .9rem;
    height: .9rem;
    background: url('../../../static/img/clock-blue.png') center center no-repeat;
    background-size: 100% 100%;
  }
  
  .icon-money {
    display: block;
    width: .9rem;
    height: .9rem;
    background: url('../../../static/img/money.png') center center no-repeat;
    background-size: 100% 100%;
  }
</style>


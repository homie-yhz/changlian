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
      <div class="rechargeLog-list" style="position:relative;height:100%;">
          <scroller :on-refresh="refresh" :height="height" :is-no-more-data="hasNext" :on-infinite="infinite" ref="scrollDom" :no-data-text="noDataText">
            <ul>
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
            <!-- <div class="v-fcm">
            <div v-if="loadingState" class="v-fm" style="padding:.5rem 0;">
              <mt-spinner type="fading-circle" style="margin-right:.5rem;"></mt-spinner> 加载中...
            </div>
            <div v-if="!loadingState" class="v-fm" style="padding:.5rem 0;">没有更多数据</div>
          </div> -->
          </scroller>
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
  import VueScroller from "vue-scroller";
  Vue.use(VueScroller);
  Vue.component('mt-spinner', Spinner);
  Vue.use(InfiniteScroll);
  export default {
    data() {
      return {
        rechargeLogList: [],
        checkedTab: 'accountRechargeLog',
        hasNext: true,
        postData: {
          currentPage: 0,
          listLen: 3
        },
        loadingState: true,
        scrollState: '',
        height: '100%',
        noDataText: '没有更多数据！'
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      refresh(done) {
        console.log("refresh-1");
        this.scrollState = "refresh";
        this.postData.currentPage = 0;
        this.hasNext = true;
        let _this = this;
        if (this.hasNext) {
          _this.loadMore(done);
        } else {
          console.log(`没有更多数据`);
          this.$refs.scrollDom.finishInfinite(true);
        }
      },
      infinite(done) {
        let _this = this;
        if (this.hasNext && this.scrollState === "") {
          console.log("loadmore-1");
          _this.loadMore(done);
        } else {
          console.log(`没有更多数据`);
          this.$refs.scrollDom.finishInfinite(true);
        }
      },
      loadMore(done) {
        let _this = this;
        setTimeout(() => {
          this.postData.currentPage++;
          // let getRechargeLogListUrl = "../../../../static/data/stationInfo.json";
          let getRechargeLogListUrl = GLOBAL.interfacePath + '/clyun/getRechargeLogListUrl?' +
            'userId=' + localStorage.getItem('userId') + '&currentPage=' + this.postData.currentPage + '&listLen=' + this.postData.listLen;
          // let getRechargeLogListUrl = GLOBAL.interfacePath+'/getStationList?body='+JSON.stringify(_this.postData);
          console.log(JSON.stringify(this.postData));
          axios.get(getRechargeLogListUrl).then(function(data) {
            // data = {
            //   data: {
            //     body: {
            //       'hasNext': true,
            //       'rechargeLogList': [{
            //         "state": "微信支付成功",
            //         "time": "2017-09-08 08:04",
            //         "money": "20.00"
            //       }, {
            //         "state": "微信支付成功",
            //         "time": "2017-09-08 08:04",
            //         "money": "20.00"
            //       }, {
            //         "state": "微信支付成功",
            //         "time": "2017-09-08 08:04",
            //         "money": "20.00"
            //       }, {
            //         "state": "微信支付成功",
            //         "time": "2017-09-08 08:04",
            //         "money": "20.00"
            //       }, {
            //         "state": "支付宝支付成功",
            //         "time": "2017-09-08 08:04",
            //         "money": "20.00"
            //       }, {
            //         "state": "支付宝支付成功",
            //         "time": "2017-09-08 08:04",
            //         "money": "20.00"
            //       }]
            //     }
            //   }
            // }
            // console.log(JSON.stringify(data));
            let res = data.data;
            if (_this.scrollState === "refresh") {
              _this.rechargeLogList = [];
            }
            _this.rechargeLogList = _this.rechargeLogList.concat(
              res.body.rechargeLogList
            );
            _this.hasNext = res.body.hasNext;
            _this.scrollState = "";
  
            if (_this.rechargeLogList.length === 0) {
              let noDataDom = document.getElementsByClassName("no-data-text")[0];
              let noDataMsgHtml =
                '暂无充值记录！';
              noDataDom.innerHTML = noDataMsgHtml;
            } else {
              _this.noDataText = "暂无更多充值记录！";
            }
            _this.$nextTick(function() {
              _this.$refs.scrollDom.resize();
            });
            done();
          });
        }, 1000);
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
    & ul{
      padding: 0 .8rem;
      li {
      padding: .5rem 0 .5rem;
      border-bottom: 1px solid #cfcfcf;
      &>div:first-child>p:last-child {
        font-size: .55rem;
      }
    }
    }
  }
</style>


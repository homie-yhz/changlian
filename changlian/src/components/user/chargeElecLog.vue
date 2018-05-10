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
      <div class="chargeElecLog-list" style="position:relative;height:100%;">
        <scroller :on-refresh="refresh" :height="height" :is-no-more-data="hasNext" :on-infinite="infinite" ref="scrollDom" :no-data-text="noDataText">
          <ul>
            <li v-if="chargeElecLogList.length>0" class="" v-for="chargeElecLog in chargeElecLogList" :key="chargeElecLog.id">
              <div>{{chargeElecLog.time||''}}</div>
              <div>{{chargeElecLog.addr||''}}</div>
              <div>设备：{{chargeElecLog.equipmentNum}}</div>
              <div class="v-fb">
                <p class="v-fm"><i class="icon-time"></i>充电时间：{{chargeElecLog.chargeTime||''}}</p>
                <p class="v-fm"><i class="icon-money"></i>充电费用：{{chargeElecLog.coast||''}} 元</p>
              </div>
            </li>
          </ul>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import GLOBAL from '../../GLOBAL';
  import axios from 'axios';
  import 'mint-ui/lib/style.css'
  import {
    Spinner
  } from 'mint-ui';
  Vue.component('mt-spinner', Spinner);

  import VueScroller from "vue-scroller";
  Vue.use(VueScroller);
  export default {
    data() {
      return {
        chargeElecLogList: [],
        hasNext: true,
        postData: {
          currentPage: 1,
          listLen: 1
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
        if (this.hasNext && this.scrollState === "") {
          console.log("loadmore-1");
          this.loadMore(done);
        } else {
          console.log(`没有更多数据`);
          this.$refs.scrollDom.finishInfinite(true);
        }
      },
      loadMore(done) {
        let _this = this;
        setTimeout(function(){
          _this.postData.currentPage++;
          //let getChargeElecLogListUrl = GLOBAL.interfacePath + '';
          let getChargeElecLogListUrl = GLOBAL.interfacePath + '/getChargeElecLogListUrl?' +
            'userId=' + sessionStorage.getItem('userId') + '&currentPage=' + _this.postData.currentPage + '&listLen=' + _this.postData.listLen;
            console.log(getChargeElecLogListUrl);
            getChargeElecLogListUrl = '';
          axios
            .get(getChargeElecLogListUrl)
            .then(function(data) {
              data= {
                data:{
                  code:200,
                  body:{
                'hasNext': true,
                'chargeElecLogList': [{
                  "time": "2017-11-10 09:09",
                  "addr": "龙井大事",
                  "equipmentNum": "3213213213",
                  "chargeTime": "2小时12分钟",
                  "coast": "22"
                }]
              }
                }
              }
              console.log('getChargeElecLogListUrl|返回数据|' + JSON.stringify(data.data));
              let res = data.data;

              if (res.code === 200) {
                console.log('in');
            if (_this.scrollState === "refresh") {
              _this.chargeElecLogList = [];
            }
            _this.chargeElecLogList = _this.chargeElecLogList.concat(
              res.body.chargeElecLogList
            );
            _this.hasNext = res.body.hasNext;
            _this.scrollState = "";
  
            if (_this.chargeElecLogList.length === 0) {
              let noDataDom = document.getElementsByClassName("no-data-text")[0];
              let noDataMsgHtml =
                '<img src="../../../static/img/empty.jpg"><p>没有发现充电站</p>';
              noDataDom.innerHTML = noDataMsgHtml;
            } else {
              _this.noDataText = "没有更多数据！";
            }
            _this.$nextTick(function() {
              _this.$refs.scrollDom.resize();
            });
            done();

              }
              
            })
            .catch(function(err) {
              console.log({
                'url': getChargeElecLogListUrl,
                'err': JSON.stringify(err)
              });
            });
        },1000);
          
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
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  .chargeElecLog-list {
    & ul{
    padding: 0 .8rem;
      li {
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


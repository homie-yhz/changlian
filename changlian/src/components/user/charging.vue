<template>
  <div class="charge-box" ref="charging">
    <!-- 详情 -->
    <header class="header-poa-white v-fcm" style="background-color:#fff;">
      <div class="v-fcm m-auto h-100 header-title" style="width:80%">充电</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
      <!-- <div @click="back()" class="poa rt-0 v-fcm h-100" style="width:10%;">
                                                              <span class="arrow-back"></span>
                                                            </div> -->
    </header>
    <div class="scroll-box" style="padding-bottom:2rem">
      <div>
        <!-- 设备信息 -->
        <div>
          <div class="equitment-box v-fb v-fm" style="background-color: #2daeec;">
            <div class="">
              <!-- 设备地址 -->
              <p>{{equipment.stationAddr}}</p>
              <!-- 设备编号 -->
              <p>设备编号：{{equipment.stationNum}}</p>
            </div>
            <div class="v-fcm icon-equipment-num">{{equipment.portIndex}}</div>
          </div>
          <div class="v-fm handle-method">
            <div v-if="userInfo.chargeSource === 'APP'" class="v-fm">
              <i class="icon-app"></i>APP
            </div>
            <div v-if="userInfo.chargeSource === 'IDCard'" class="v-fm">
              <i class="icon-IDCard"></i>ID卡
            </div>
          </div>
        </div>
        <!-- 空格 -->
        <div class="cl-blank"></div>
        <!-- 冲电圈 -->
        <div class="charge-state por">
          <!-- 正在充电 -->
          <div class="circle opacity0" :class="{'opacity1':chargeLog.chargeState==='charging'}">
            <div class="percent">
              <span>{{chargeLog.hasChargedPercent}}</span>
            </div>
            <div class="v-fcm" style="margin-top:1rem">
              <i class="icon-lightning"></i>
            </div>
            <div>健康保养充电中...</div>
            <div class="v-fcm">
              <p>已充时长 {{chargeLog.hasChargedTime|timestampToData}}</p>
            </div>
            <div class="v-fcm">
              <p>当前功率 {{chargeLog.currentW}}瓦</p>
            </div>
          </div>
          <!-- 请求充电中 -->
          <div class="opacity0" :class="{'opacity1':chargeLog.chargeState==='startCharge'}" style="position:absolute;width:100%;top:.7rem;">
            <div class="circle v-fcm">
              <div style="font-size:2rem;">
                <i class="icon-lightning icon-lightning-big"></i>
              </div>
              <div style="position:absolute;bottom:1rem;">请求充电中<span v-text="waitText"></span></div>
            </div>
          </div>
        </div>
        <!-- 收费方式 -->
        <div class="cost-method-box opacity0" :class="{'opacity1':chargeLog.chargeState==='charging'}">
          <div class="v-fm v-fb" style="padding:.5rem .8rem;">
            <div class="v-fm">预设充电时长</div>
            <div>{{chargeLog.expectedChargeTime|SToHM}}</div>
          </div>
          <div style="padding:.5rem .8rem;border-top:1px solid #fff;border-bottom:1px solid #fff;">
            <div class="mb-40">收费标准</div>
            <div class="v-fm v-fb">
              <div class="v-fm">
                {{chargeLog.wRange}}</div>
              <div>{{chargeLog.priceRate}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部停止充电按钮 -->
    <div class="v-fcm opacity0" :class="{'opacity1':chargeLog.chargeState==='charging'}" style="height:3rem;width:100%;bottom:0;position:absolute;z-index:2;">
      <div @click="stopCharge" class="stop-btn v-fcm">停止充电</div>
    </div>
  </div>
</template>

<script>
  let interval = null;
  import axios from "axios";
  import loader from '../../loading.js';
  import GLOBAL, {
    getUserInfo
  } from "../../GLOBAL";
  import {
    Toast,
    MessageBox
  } from "mint-ui";
  import "mint-ui/lib/toast/style.css";
  import {
    timestampToData,
    SToHM
  } from "../../Filter";
  import store from '../../store';
  import {
    clearTimeout,
    setInterval
  } from 'timers';
  export default {
    data() {
      return {
        userInfo: {},
        stationInfo: {},
        chargeLog: {
          chargeState: "startCharge"
        },
        postData: {
          portId: "",
          stationId: "",
          methodId: ""
        },
        chargeMethods: [],
        equipment: {},
        waitText: '...'
      };
    },
    computed: {
      update: function() {
        console.log('子组件更新');
        return store.state.update;
      },
      wsData: function() {
        console.log('ws发来数据');
        return store.state.chargingData;
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      //请求充电接口  或者是  获取是否含有充电信息的接口。
      requestChargeInfo1(status) {
        let _this = this;
        // 获取充电信息
        let chargeLog = GLOBAL.interfacePath + '/clyun/chargeLog?chargeLogId=' + sessionStorage.getItem('chargeRecordId') + '&userId=' + sessionStorage.getItem('userId') + '&methodId=' + sessionStorage.getItem('methodId');
        // let chargeLog = '';
        console.log('>>>chargeLog|充电信息', chargeLog);
        if (status === 2) {
          axios
            .get(chargeLog)
            .then(function(data) {
              console.log("chargeLog|返回数据|", data.data);
              let res = data.data;
              // res = {
              //   code: 200,
              //   msg: 'fdsfds',
              //   body: {
              //     chargeState: 'charging',
              //     hasChargedPercent: "1%",
              //     hasChargedTime: "58000",
              //     currentW: "800", //当前功率与实际功率
              //     payMethod: "按时长收费",
              //     expectedChargeTime: "2",
              //     actualChargeTime: "1小时28分",
              //     wRange: "200<功率≤500瓦",
              //     priceRate: "0.7元/小时",
              //     costMoney: "1.80",
              //     costDegree: "3", //使用的度数
              //     chargeEndTime: "2017-11-10 20:00"
              //   }
              // }
              if (res.code === 200) {
                //判断已充时长是否存在 如果不存在则 等待ws返回数据  如果存在直接调用。
                // if (!!_this.chargeLog.hasChargedTime) {
                _this.chargeLog.chargeState = 'charging';
                window.clearInterval(interval);
                _this.chargeLog = JSON.parse(res.body)[0];
                //自增已充时长。
                interval = setInterval(() => {
                  _this.chargeLog.hasChargedTime = (
                    parseInt(_this.chargeLog.hasChargedTime) + 1
                  ).toString();
                }, 1000);
              }
            }).catch(function(err) {
              console.log({
                url: chargeLog,
                err: JSON.stringify(err)
              });
            });
        } else if (status === 4) {
          MessageBox.alert('充电结束！跳转结算页面！').then(action => {
            //设置userId 以及 登录状态 
            _this.$router.replace({
              name: 'endCharge'
            });
          });
        } else {
          MessageBox.alert(res.msg);
        }
      },
      requestChargeInfo() {
        let _this = this;
        // 获取充电信息
        let chargeLog = GLOBAL.interfacePath + '/clyun/chargeLog?chargeLogId=' + sessionStorage.getItem('chargeRecordId') + '&userId=' + sessionStorage.getItem('userId') + '&methodId=' + sessionStorage.getItem('methodId');
        // let chargeLog = '';
        console.log('>>>chargeLog|充电信息', chargeLog);
        axios
          .get(chargeLog)
          .then(function(data) {
            console.log("chargeLog|返回数据|", data.data);
            let res = data.data;
            // res = {
            //   code: 200,
            //   msg: 'fdsfds',
            //   body: {
            //     chargeState: 'charging',
            //     hasChargedPercent: "1%",
            //     hasChargedTime: "58000",
            //     currentW: "800", //当前功率与实际功率
            //     payMethod: "按时长收费",
            //     expectedChargeTime: "2",
            //     actualChargeTime: "1小时28分",
            //     wRange: "200<功率≤500瓦",
            //     priceRate: "0.7元/小时",
            //     costMoney: "1.80",
            //     costDegree: "3", //使用的度数
            //     chargeEndTime: "2017-11-10 20:00"
            //   }
            // }
            if (res.code === 200) {
              //判断已充时长是否存在 如果不存在则 等待ws返回数据  如果存在直接调用。
              // if (!!_this.chargeLog.hasChargedTime) {
              _this.chargeLog.chargeState = 'charging';
              window.clearInterval(interval);
              _this.chargeLog = JSON.parse(res.body)[0];
              //自增已充时长。
              interval = setInterval(() => {
                _this.chargeLog.hasChargedTime = (
                  parseInt(_this.chargeLog.hasChargedTime) + 1
                ).toString();
              }, 1000);
            }
          }).catch(function(err) {
            console.log({
              url: chargeLog,
              err: JSON.stringify(err)
            });
          });
      },
      stopCharge() {
      let _this = this;
      //let stopChargeUrl = GLOBAL.interfacePath + '';
      let stopChargeUrl = GLOBAL.interfacePath + '/clyun/stopCharge?userId=' + sessionStorage.getItem('userId') + '&consoleNumber=' + sessionStorage.getItem('consoleNumber') + '&portNumber=' + sessionStorage.getItem('portNumber') + '&chargingTime=' + sessionStorage.getItem('chargingTime') + '&chargeLogId=' + sessionStorage.getItem('chargeRecordId');
      // 'http://192.168.31.23:8080/v1/api0/clyun/stopCharge?userId=1&consoleNumber=2&portNumber=3&chargingTime=4&chargeLogId=6'
      console.log(stopChargeUrl);
      axios
        .get(stopChargeUrl)
        .then(function(data) {
          // let res = data.data;
          // console.log("stopChargeUrl|停止充电返回数据|", data.data);
          // if (res.code === 200) {
          //   _this.$router.replace({
          //     name: "endCharge"
          //   });
          // } else {
          //   MessageBox.alert(res.msg);
          // }
        })
        .catch(function(err) {
          console.log({
            url: stopChargeUrl,
            err: JSON.stringify(err)
          });
        });
    },
  },
  mounted() {},
    created() {
      let _this = this;
      // this.chargeLog.chargeState = 'charging';
      // 开始充电页面
      //时间戳转化 时间 filter 方法。
      timestampToData();
      //时间戳转化 时间 filter 方法。
      SToHM();
      //请求充电信息
      this.requestChargeInfo();
      // 电站详情信息
      let stationDetailInfo = GLOBAL.interfacePath + '/clyun/stationDetailInfo?stationId=' + sessionStorage.getItem('stationId');
      axios
        .get(stationDetailInfo)
        .then(function(data) {
          console.log('stationDetailInfo|返回数据|', data.data.body);
          let res = data.data;
          if (res.code === 200) {
            _this.equipment = res.body;
            _this.equipment.portIndex = sessionStorage.getItem('portIndex');
          }
        })
        .catch(function(err) {
          console.log({
            'url': stationDetailInfo,
            'err': JSON.stringify(err)
          });
        });
      getUserInfo().then(function(userInfo) {
        _this.userInfo = userInfo;
        console.log(_this.userInfo);
      });
      //console.log(store.state.update);
    },
    watch: {
      update: function(nv, ov) {
        console.log('websocket返回信息！');
        this.requestChargeInfo1(this.wsData.status);
      }
    },
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  @import "../../../static/css/iconfont.css";
  .bgc-2e {
    background-color: #2e2e2e;
  }
  
  .charge-box {
    color: #fff;
    height: 100%;
    background-color: #2daeec;
    .charge-state {
      overflow: hidden;
      padding-top: .7rem;
      .circle {
        border: 2px solid #fff;
        border-radius: 50%;
        height: 7rem;
        width: 7rem;
        margin: 0.5rem auto;
        position: relative;
        &>div {
          margin: 0 auto 0.2rem;
          text-align: center;
        }
        // 70%
        &>div:nth-child(1) {
          color: #fff !important;
        }
        // 健康保养充电中...
        &>div:nth-child(3) {
          margin-top: 0.4rem;
          color: #fff !important;
          text-shadow: #fff 0px 0px 4px;
        }
        &>div:nth-child(4) {
          color: #ebd510;
          &>p {
            border-bottom: 1px solid #b2dbee;
          }
        }
        &>div:nth-child(5) {
          color: #ebd510;
          &>p {
            border-bottom: 1px solid #b2dbee;
          }
        }
        .percent {
          position: absolute;
          top: -0.4rem;
          width: 100%;
          text-align: center;
          @include fcm;
          span {
            background-color: #2daeec;
            display: block;
            width: 1.8rem;
          }
        }
      }
    }
  }
  
  .equitment-box {
    padding: 0.5rem 0.8rem 0.2rem;
    background-color: #2daeec;
    &>div>p:first-child {
      margin-bottom: 0.2rem;
      min-height: 0.5rem;
    }
    .icon-equipment-num {
      border-radius: 100rem;
      height: 2rem;
      width: 2rem;
      background-color: #ff9800;
      color: #fff;
      font-size: 0.9rem;
    }
  }
  
  .cost-method-box {
    &>div {}
  }
  
  .icon-point-green {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: block;
    background-color: #19d74f;
    margin-right: 0.2rem;
  }
  
  .stop-btn {
    width: 80%;
    margin: 0 auto;
    height: 1.6rem;
    border: 2px solid #fff;
    color: #fff;
    border-radius: 5px;
    box-shadow: #fff 0px 0px 10px;
  }
  
  .opacity0 {
    opacity: 0;
    transition: opacity 0.25s ease-in;
  }
  
  .opacity1 {
    opacity: 1;
  }
  
  .handle-method {
    margin: 0 0 0.5rem 0.8rem;
    font-size: 0.5rem;
    &>div {
      @include fm;
      background: rgba(255, 255, 255, 0.7);
      color: #666;
      border-radius: 3px;
      padding: 0.1rem 0.2rem;
    }
  }
</style>

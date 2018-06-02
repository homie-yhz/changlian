<template>
  <div>
    <!-- 充电结束 -->
    <header class="header-poa-white v-fcm">
      <div class="v-fcm m-auto h-100 header-title" style="width:80%">充电结束</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box">
      <div>
        <!-- 结算头 -->
        <div class="v-fcm">
          <div class="v-fm" style="margin:2rem auto;">
            <!-- 结算成功动画 -->
            <div class="success-box">
              <!-- :class="{'shine':paySuccessState}" -->
              <transition appear appear-class="shine1" appear-active-class="shine2">
                <i class="icon-success-part1"></i>
              </transition>
              <transition appear appear-class="shine1" appear-active-class="shine3">
                <i class="icon-success-part2"></i>
              </transition>
            </div>
            <div>
              <p class="tac" style="color:#10ad3c;font-size:.8rem;">结算成功</p>
              <p class="tac" style="color:#e51c23;font-size:.7rem;">{{chargeLog.costMoney}} 元</p>
            </div>
          </div>
        </div>
        <!-- 充电设备详情 -->
        <div class="equitment-box v-fb v-fm" style="background-color: #f2f2f2;padding:.5rem .8rem">
          <div class="">
            <!-- 设备地址 -->
            <p>{{equipment.stationAddr}}</p>
            <!-- 设备编号 -->
            <p>设备编号：{{equipment.stationNum}}</p>
          </div>
          <div class="v-fcm icon-equipment-num">{{equipment.portIndex}}</div>
        </div>
        <!-- 用电信息 -->
        <div class="cl-box charge-info">
          <p class="v-fb v-fm">
            <span class="v-fm">
              <span class="icon-point-gray"></span>收费方式
            </span>
            <span>{{chargeLog.payMethod}}</span>
          </p>
          <p class="v-fb v-fm">
            <span class="v-fm">
              <span class="icon-point-gray"></span>收费标准
            </span>
            <span>{{chargeLog.wRange}}&nbsp;&nbsp;{{chargeLog.priceRate}}</span>
          </p>
          <p class="v-fb v-fm">
            <span class="v-fm">
              <span class="icon-point-gray"></span>实际功率
            </span>
            <span>{{chargeLog.currentW}}瓦</span>
          </p>
          <p class="v-fb v-fm">
            <span class="v-fm">
              <span class="icon-point-gray"></span>充电时长
            </span>
            <span>{{chargeLog.actualChargeTime}}</span>
          </p>
          <p class="v-fb v-fm">
            <span class="v-fm">
              <span class="icon-point-gray"></span>使用度数
            </span>
            <span>{{chargeLog.costDegree}}度</span>
          </p>
          <p class="v-fb v-fm">
            <span></span>
            <span>{{chargeLog.chargeEndTime}}</span>
          </p>
        </div>
        <router-link :to="{name:'nearbyStation',params:{listType:'normalList'}}" replace class="btn" style="height:1.8rem;width:90%;margin:0 auto;">关闭</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import GLOBAL from "../../GLOBAL.js";
  export default {
    data() {
      return {
        chargeLog: {},
        equipment: {},
        paySuccessState: ""
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      closeEndChargePage() {
        this.$router.replace({
          name: "nearbyStation/normalList"
        });
      }
    },
    mounted() {},
    created() {
      this.paySuccessState = false;
      console.log("0" + this.paySuccessState);
      let _this = this;
      // 获取充电信息
      let chargeLog = GLOBAL.interfacePath + '/clyun/chargeLog?chargeLogId=' + sessionStorage.getItem('chargeRecordId') + '&userId=' + sessionStorage.getItem('userId') + '&methodId=' + sessionStorage.getItem('methodId');
      // let chargeLog = '';
      console.log('chargeLog', chargeLog);
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
            _this.chargeLog = JSON.parse(res.body)[0];
          } else {
            MessageBox.alert(res.msg);
          }
        })
        .catch(function(err) {
          console.log({
            url: chargeLog,
            err: JSON.stringify(err)
          });
        });
        // 获取电站信息
        // 电站详情信息
      let stationDetailInfo = GLOBAL.interfacePath + '/clyun/stationDetailInfo?stationId=' + sessionStorage.getItem('stationId');
      axios
        .get(stationDetailInfo)
        .then(function(data) {
          console.log('>>>stationDetailInfo|电站详情|', data.data);
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
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  .endCharge-station {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    &>p {
      margin-bottom: 0.1rem;
    }
  }
  
  .charge-info {
    padding: 0.5rem 2rem;
    font-size: 0.5rem;
    &>p {
      margin: 0.2rem 0;
      &>span:last-child {
        color: #666;
      }
    }
  }
  
  .success-box {
    width: 4rem;
    height: 3rem;
    position: relative;
    .icon-success-part1 {
      position: absolute;
      width: 3rem;
      height: 3rem;
      background: url("../../../static/img/pay-success-1.png") center center no-repeat;
      background-size: 100%;
      display: block;
    }
    .icon-success-part2 {
      position: absolute;
      width: 3rem;
      height: 2rem;
      top: .4rem;
      background: url("../../../static/img/pay-success-2.png") center center no-repeat;
      background-size: 100%;
      display: block;
    }
  }
  
  .shine1 {
    opacity: 0!important;
  }
  
  .shine2 {
    opacity: 1;
    transition: opacity 1s!important;
  }
  
  .shine3 {
    opacity: 1;
    transition: opacity 1s 500ms!important;
  }
  
  .equitment-box {
    background-color: #f2f2f2;
    &>div>p:first-child {
      margin-bottom: 0.4rem;
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
  
  .icon-point-gray {
    margin-right: 0.5rem;
    height: 4px;
    width: 4px;
    background-color: #bbbbbb;
    display: block;
  }
</style>

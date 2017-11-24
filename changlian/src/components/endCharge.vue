<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充电结束</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <!-- 充电结束 电站信息 -->
    <div class="cl-box endCharge-station">
      <p class="tac">{{endChargeInfo.stationAddr}}</p>
      <p class="v-fb">
        <span>设备编号</span><span>{{endChargeInfo.portNum}}</span>
      </p>
      <p class="v-fb">
        <span>设备座号</span><span>{{endChargeInfo.portIndex}}</span>
      </p>
    </div>
    <div class="blank"></div>
    <!-- 用电信息 -->
    <div class="cl-box charge-info" style="padding-top:.2rem;">
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-green"></span>已充电量
        </span>
        <span>{{endChargeInfo.chargeDegree}}度</span>
      </p>
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-green"></span>已充时长
        </span>
        <span>{{endChargeInfo.chargeHours}}</span>
      </p>
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-green"></span>总费用
        </span>
        <span>{{endChargeInfo.totalCost}}元</span>
      </p>
      <p class="mt-30 c-666">{{endChargeInfo.chargeEndTime}}</p>
      <router-link :to="{name:''}" class="btn">关闭</router-link>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        endChargeInfo: {}
      }
    },
    created() {
      let _this = this;
      let endChargeInfoUrl = '';
      axios
        .get(endChargeInfoUrl)
        .then(function(data) {
          console.log('endChargeInfoUrl|返回数据|' + JSON.stringify(data.data));
          data.data = {
            'stationAddr': '充电站地址',
            'portNum': '9889932819312',
            'portIndex': '01',
            'chargeHours':'21小时30分',
            'chargeDegree':'1.2',
            'totalCost':'1.80',
            'chargeEndTime':'2017-11-10 09:09'
          }
          _this.endChargeInfo = data.data;
        })
        .catch(function(err) {
          console.log({
            'url': endChargeInfoUrl,
            'err': JSON.stringify(err)
          });
        });
    }
  }
</script>

<style lang="scss">
  @import '../../static/css/common.scss';
  .endCharge-station{
    padding-top:.2rem;
    padding-bottom:.2rem;
    &>p{
      margin-bottom:.1rem;
    }
  }
 .charge-info{
   padding-bottom:.4rem!important;
   &>p{
     border-bottom: 1px solid #bbbbbb;
     height:1.8rem;
     &>span:last-child{
       color:#666;
     }
   }
 }
 .icon-point-green{
   margin-right:.5rem;
   height: 4px;
   width: 4px;
   background-color: $cl-color;
   display: block;
 }
</style>

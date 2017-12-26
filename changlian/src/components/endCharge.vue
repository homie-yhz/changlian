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
          <i class="icon-Settlement"></i>
          <div>
            <p class="tac" style="color:#10ad3c;font-size:.8rem;">结算成功</p>
            <p class="tac" style="color:#e51c23;font-size:.7rem;">{{endChargeInfo.totalCost}} 元</p>
          </div>
          </div>
        </div>
        <!-- 充电设备详情 -->
        <div class="equitment-box v-fb v-fm" style="background-color: #f2f2f2;">
          <div class="">
            <!-- 设备地址 -->
            <p>{{equipment.addr}}</p>
            <!-- 设备编号 -->
            <p>设备编号：{{equipment.num}}</p>
          </div>
          <div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
        </div>
    <!-- 用电信息 -->
    <div class="cl-box charge-info">
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-gray"></span>收费方式
        </span>
        <span>{{endChargeInfo.chargeMethod}}</span>
      </p>
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-gray"></span>收费标准
        </span>
        <span>{{endChargeInfo.chargeStander}}</span>
      </p>
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-gray"></span>实际功率
        </span>
        <span>{{endChargeInfo.truePower}}瓦</span>
      </p>
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-gray"></span>充电时长
        </span>
        <span>{{endChargeInfo.chargeTime}}</span>
      </p>
      <p class="v-fb v-fm">
        <span class="v-fm">
            <span class="icon-point-gray"></span>使用度数
        </span>
        <span>{{endChargeInfo.usedDegree}}度</span>
      </p>
      <p class="v-fb v-fm">
        <span></span>
        <span>{{endChargeInfo.chargeEndTime}}</span>
      </p>
    </div>
    <router-link :to="{name:'nearbyStation'}" replace class="btn" style="height:1.8rem;width:90%;margin:0 auto;">关闭</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        endChargeInfo: {},
        equipment: {
          addr: "fdsafsa",
          num: "321321321",
          index: "02",
        }
      }
    },
    methods:{
      closeEndChargePage(){
        this.$router.replace();
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
   padding:.5rem 2rem;
   font-size:.5rem;
   &>p{
     margin:.2rem 0;
     &>span:last-child{
       color:#666;
     }
   }
 }
 
 .icon-Settlement{
   display: block;
   width:2rem;
   margin-right:.5rem;
   height: 2rem;
   background:url('../../static/img/star.png') center center no-repeat;
   background-size:100% 100%;
 }
 .equitment-box {
  padding: 0.5rem 0.8rem;
  background-color: #f2f2f2;
  & > div > p:first-child {
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
.icon-point-gray{
    margin-right:.5rem;
    height: 4px;
    width: 4px;
    background-color: #bbbbbb;
    display: block;
 }
</style>

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
            <p class="tac" style="color:#e51c23;font-size:.7rem;">{{chargeLog.costMoney}} 元</p>
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
        chargeLog: {},
        equipment: {
          addr: "fdsafsa",
          num: "321321321",
          index: "02",
        }
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      closeEndChargePage(){
        this.$router.replace({name:'nearbyStation'});
      }
    },
    created() {
      let _this = this;
      let chargeLogUrl = '';
      //充电记录
      axios
        .get(chargeLogUrl)
        .then(function(data) {
          console.log('chargeLogUrl|返回数据|' + JSON.stringify(data.data));
          data.data = {
              chargeState: 'charging',
              hasChargedPercent: "69%",
              hasChargedTime: "58000",
              currentW: "800", //当前功率与实际功率
              payMethod:"按时长收费",
              expectedChargeTime: "2",
              actualChargeTime:"1小时28分",
              wRange: "200<功率≤500瓦",
              priceRate: "0.7元/小时",
              costMoney:"1.80",
              costDegree:"3",//使用的度数
              chargeEndTime:"2017-11-10 20:00"
            };
          _this.chargeLog = data.data;
        })
        .catch(function(err) {
          console.log({
            'url': chargeLogUrl,
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

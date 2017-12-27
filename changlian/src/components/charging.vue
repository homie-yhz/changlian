<template>
  <div class="charge-box">
    <!-- 详情 -->
    <header class="header-poa-white v-fcm">
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
          <div class="equitment-box v-fb v-fm">
            <div class="">
              <!-- 设备地址 -->
              <p>{{equipment.addr}}</p>
              <!-- 设备编号 -->
              <p>设备编号：{{equipment.num}}</p>
            </div>
            <div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
          </div>
          <div class="v-fm" style="margin:0 0 .5rem .8rem;">
            <i class="icon"></i>APP
          </div>
        </div>
        <!-- 空格 -->
        <div class="cl-blank"></div>
        <!-- 冲电圈 -->
        <div class="charge-state por " style="overflow:hidden;">
          <!-- 正在充电 -->
          <div class="circle opacity0" :class="{'opacity1':equipment.chargingState}">
            <div class="percent">
              <span>70%</span>
            </div>
            <div class="v-fcm" style="margin-top:1rem">
              ⚡️
            </div>
            <div>健康保养充电中...</div>
            <div class="v-fcm">
              <p>已充时长 00小时10分</p>
            </div>
            <div class="v-fcm">
              <p>当前功率 800瓦</p>
            </div>
          </div>
          <!-- 请求充电中 -->
          <div class="opacity0" :class="{'opacity1':!equipment.chargingState}" style="position:absolute;width:100%;top:0;">
            <div class="circle v-fcm">
              <div style="font-size:2rem;">⚡️</div>
              <div style="position:absolute;bottom:1rem;">请求充电中...</div>
            </div>
          </div>
        </div>
        <!-- 收费方式 -->
        <div class="cost-method-box opacity0" :class="{'opacity1':equipment.chargingState}">
          <div class="v-fm v-fb" style="padding:.5rem .8rem;">
            <div class="v-fm">预设充电时长</div>
            <div>2小时</div>
          </div>
          <div style="padding:.5rem .8rem;border-top:1px solid #fff;border-bottom:1px solid #fff;">
            <div class="mb-40">收费标准</div>
            <div class="v-fm v-fb">
              <div class="v-fm">
                200
                <功率≤500瓦 </div>
                  <div>0.7元/小时</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部开始充电按钮 -->
      <div class="v-fcm opacity0" :class="{'opacity1':equipment.chargingState}" style="height:3rem;width:100%;bottom:0;position:absolute;z-index:2;">
        <div @click="stopCharge" class="stop-btn v-fcm">停止充电</div>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import GLOBAL from "../GLOBAL";
  import {
    Toast
  } from "mint-ui";
  import "mint-ui/lib/toast/style.css";
  export default {
    data() {
      return {
        stationInfo: {},
        postData: {
          portId: "",
          stationId: "",
          methodId: ""
        },
        chargeMethods: [],
        equipment: {},
        chargingState: false
      };
    },
    methods: {
      stopCharge() {
        let _this = this;
        //let stopChargeUrl = GLOBAL.interfacePath + '';
        let stopChargeUrl = '';
        axios
          .get(stopChargeUrl)
          .then(function(data) {
            console.log('stopChargeUrl|返回数据|' + JSON.stringify(data.data));
            _this.$router.push({
              name: 'endCharge'
            });
          })
          .catch(function(err) {
            console.log({
              'url': stopChargeUrl,
              'err': JSON.stringify(err)
            });
          });
      }
    },
    created() {
      let _this = this;
      //let requestChargeUrl = GLOBAL.interfacePath + '';
      let requestChargeUrl = "";
      axios
        .get(requestChargeUrl)
        .then(function(data) {
          console.log("requestChargeUrl|返回数据|" + JSON.stringify(data.data));
          setTimeout(() => {
            _this.equipment = {
              addr: "fdsafsa",
              num: "321321321",
              index: "02",
              chargingState: true
            };
          }, 2000);
        })
        .catch(function(err) {
          console.log({
            url: requestChargeUrl,
            err: JSON.stringify(err)
          });
        });
    }
  };
</script>

<style lang="scss">
  @import "../../static/css/common.scss";
  .bgc-2e {
    background-color: #2e2e2e;
  }
  
  .charge-box {
    color: #fff;
    height: 100%;
    background-color: #2daeec;
    .charge-state {
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
    padding: 0.5rem 0.8rem;
    background-color: #2daeec;
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
    border: 1px solid #fff;
    color: #fff;
    border-radius: 5px;
  }
  
  .opacity0 {
    opacity: 0;
    transition: opacity 0.25s ease-in;
  }
  
  .opacity1 {
    opacity: 1;
  }
</style>

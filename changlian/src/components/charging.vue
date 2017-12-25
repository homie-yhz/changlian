<template>
  <div class="charge-box">
    <!-- 详情 -->
    <header class="header-poa v-fcm">
      <div class="v-fcm m-auto h-100" style="width:80%">充电状态</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box" style="padding-bottom:2rem">
      <!-- 冲电圈 -->
      <div class="charge-state">
        <div class="circle">
          <div class="percent">
            <span>70%</span>
          </div>
          <!-- 电池 -->
          <div class="battery m-auto v-fm">
            <div class="v-fcm por">
              ⚡️
              <p class="poa"></p>
            </div>
            <div></div>
          </div>
          <div>健康保养充电中...</div>
          <div class="v-fcm">
            <p>已充时长 00小时10分</p>
          </div>
          <div class="v-fcm">
            <p>当前功率 800瓦</p>
          </div>
        </div>
      </div>
      <!-- 设备信息 -->
      <div class="equitment-box v-fb v-fm">
        <div class="">
          <!-- 设备地址 -->
          <p>{{equipment.addr}}</p>
          <!-- 设备编号 -->
          <p>设备编号：{{equipment.num}}</p>
        </div>
        <div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
      </div>
      <!-- 收费方式 -->
      <ul class="cl-box cost-method-box">
        <li class="v-fm">收费方式：按时长收费</li>
        <li class="v-fm v-fb">
          <div class="v-fm">
            <i class="icon-point-green"></i>0
            <功率≤200瓦 </div>
              <div>0.5元/小时</div>
        </li>
        <li class="v-fm v-fb">
          <div class="v-fm">
            <i class="icon-point-green"></i>200
            <功率≤500瓦 </div>
              <div>0.7元/小时</div>
        </li>
        <li class="v-fm v-fb">
          <div class="v-fm">
            <i class="icon-point-green"></i>500
            <功率≤800瓦 </div>
              <div>1元/小时</div>
        </li>
        <li class="v-fm v-fb">
          <div class="v-fm">
            <i class="icon-point-green"></i>800
            <功率≤1000瓦 </div>
              <div>1.2元/小时</div>
        </li>
      </ul>
    </div>
    <!-- 底部开始充电按钮 -->
    <div class="v-fcm" style="padding:0 .8rem;height:2rem;width:100%;bottom:0;position:absolute;z-index:2;">
      <div @click="stopCharge" class="stop-btn v-fcm">停止充电</div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import GLOBAL from "../GLOBAL";
  import {
    Toast
  } from 'mint-ui'
  import 'mint-ui/lib/toast/style.css';
  export default {
    data() {
      return {
        stationInfo: {},
        postData: {
          portId: '',
          stationId: '',
          methodId: '',
        },
        chargeMethods: [],
        equipment: {
          'addr': 'fdsafsa',
          'num': '321321321',
          'index': '02'
        }
      }
    },
    methods: {
      stopCharge(){
        
      }
    },
    created() {
      let _this = this;
  
    }
  }
</script>

<style lang="scss">
  @import '../../static/css/common.scss';
  .bgc-2e {
    background-color: #2e2e2e;
  }
  
  .charge-box {
    color: #fff;
    height: 100%;
    background-color: #2e2e2e;
    header {
      background-color: #2e2e2e;
      border-bottom-color: #666;
      color: #fff;
      .arrow-back {
        border-color: #fff;
      }
    }
    .charge-state {
      .circle {
        border: 1px solid #06c421;
        border-radius: 50%;
        height: 7rem;
        width: 7rem;
        margin: .5rem auto;
        position: relative;
        &>div {
          margin: 0 auto .2rem;
          text-align: center;
        }
        // 70%
        &>div:nth-child(1) {
          color: #06c421!important;
        }
        // 健康保养充电中...
        &>div:nth-child(3) {
          margin-top: .4rem;
          color: #06c421!important;
          text-shadow: #19d74f 0px 0px 4px;
        }
        &>div:nth-child(4) {
          color: #f2960c;
          &>p {
            border-bottom: 1px solid #ababab;
          }
        }
        &>div:nth-child(5) {
          color: #f2960c;
          &>p {
            border-bottom: 1px solid #ababab;
          }
        }
        .percent {
          position: absolute;
          top: -.4rem;
          width: 100%;
          text-align: center;
          span {
            background-color: #2e2e2e;
          }
        }
        .battery {
          width: 3rem;
          margin-top: 1rem;
          &>div:first-child {
            width: 95%;
            height: 1.3rem;
            border: 1px solid #06c421;
            p {
              background-color: #06c421;
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              z-index: -1;
              animation: changeWidth 3s linear infinite;
            }
          }
          &>div:last-child {
            width: 5%;
            height: .4rem;
            background-color: #06c421;
          }
        }
      }
    }
  }
  
  .equitment-box {
    padding: 0.5rem 0.8rem;
    background-color: #757575;
    &>div>p:first-child {
      margin-bottom: 0.4rem;
    }
  }
  
  .icon-equipment-num {
    border-radius: 100rem;
    height: 2rem;
    width: 2rem;
    background-color: #ff9800;
    color: #fff;
    font-size: .9rem;
  }
  
  .cost-method-box {
    &>li {
      height: 1.8rem;
      border-bottom: 1px dashed #fff;
      &:first-child {
        border-bottom: none;
        height: 1rem;
        margin-top: .3rem;
      }
    }
  }
  
  .icon-point-green {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: block;
    background-color: #19d74f;
    margin-right: .2rem;
  }
  .stop-btn{
    width:100%;
    margin:0 auto;
    height: 1.6rem;
    border:1px solid #19d74f;
    color:#19d74f;
    border-radius:5px;
  }
  @keyframes changeWidth {
    0% {
      width: 0%;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
</style>

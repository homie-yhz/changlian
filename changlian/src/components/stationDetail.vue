<template>
  <div>
    <!-- 详情 -->
    <header class="header-poa v-fcm">
      <div class="v-fcm m-auto h-100" style="width:80%">详情</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box" style="padding-bottom:2rem">
      <!-- 充电站信息 -->
      <div class="v-fm station-box">
        <!-- 充电站信息 -->
        <div class="v-i1">
          <!-- 站点名称 -->
          <p class="fw-b" v-bind:id="stationInfo.stationId">{{stationInfo.stationName}}</p>
          <!-- 允许支付方式 -->
          <p class="icon-label-box">
            <span v-for="payMethod in stationInfo.payMethods">{{payMethod}}</span>
          </p>
          <!-- 充电口情况 -->
          <p class="v-fm mt-2">
            <span class="v-fm mr-6">
                                                        <span class="icon-total v-fcm">共</span><span style="width:1rem;">{{stationInfo.totalChargePortsNum}}</span>
            </span>
            <span class="v-fm mr-6">
                                                        <span class="icon-idle v-fcm">闲</span><span style="width:1rem;">{{stationInfo.idleChargePortsNum}}</span>
            </span>
          </p>
        </div>
        <!-- 快慢充 -->
        <div v-if="stationInfo.chargeType==='fast'" class="v-fcm fast-charge">快充</div>
        <div v-if="stationInfo.chargeType==='slow'" class="v-fcm slow-charge">慢充</div>
        <div class="v-fcm" style="width:2.8rem;border-left:1px solid #e3e3e3;">
          <div>
            <i class="icon-star" style="margin-top:.2rem;"></i>
            <!-- 据我多远 -->
            <span>{{stationInfo.distanceToMe}}</span>
          </div>
        </div>
      </div>
      <!-- 充电站补充信息 -->
      <div class="station-info-2" style="">
        <div class="v-fb">
          <span>运营时间</span>
          <span>{{stationInfo.operationTime}}</span>
        </div>
        <div>站点地址</div>
        <div style="color:#8a8a8a">{{stationInfo.stationAddr}}</div>
        <div class="v-fb">
          <span>运营商</span>
          <span>{{stationInfo.operator}}</span>
        </div>
        <div class="v-fb">
          <span>停车费用</span><span>{{stationInfo.parkCost}}</span>
        </div>
      </div>
      <div class="blank"></div>
      <!-- 选择充电设备 -->
      <div style="padding:.5rem .8rem;">
        <p>选择充电设备</p>
        <div class="ports-box">
          <div class="v-fm" @click="choosePort(port)" :class="{broken:port.state==='broken',charging:port.state==='charging',idle:port.state==='idle',checked:postData.portId===port.ID}" v-for="(port,key) in stationInfo.chargePortsList">
            <div class="v-fcm">{{key+1}}</div>
            <div class="v-fcm">
              <div v-if="port.method==='AC'">
                <p>~~</p>
                <p>交流电</p>
              </div>
              <div v-if="port.method==='DC'">
                <p>--</p>
                <p>直流电</p>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-50">选择充电方式</p>
        <div class="method-box">
          <div :class="{'checked':postData.methodId === method.ID}" @click="chooseChargeMethod(method)" class="v-fcm" v-for="method in chargeMethods">
            {{method.name}}
            <i v-if="postData.methodId === method.ID"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部开始充电按钮 -->
    <div @click="startCharge" class="start-charge-btn v-fcm">开始充电</div>
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
        chargeMethods: []
      }
    },
    methods: {
      choosePort(port) {
        console.log(port.ID);
        let portState = port.state;
        if (portState === 'idle') {
          //增加样式
          this.postData.portId = port.ID;
        } else if (portState === 'broken') {
          Toast('抱歉！该充电口暂时无法使用！');
        } else if (portState === 'charging') {
          Toast('该端口正在使用！');
        }
      },
      // 选择充电模式
      chooseChargeMethod(method) {
        console.log(method.ID);
        // 充电模式存入postData
        this.postData.methodId = method.ID;
      },
      startCharge(){
        if(!this.postData.portId){
          Toast('请选择充电设备');
        }else if(!this.postData.methodId){
          Toast('请选择充电方式');
        }else{
          console.log(JSON.stringify(this.postData));
        }
      }
    },
    created() {
      let _this = this;
      // let stationInfoUrl = GLOBAL.interfacePath + '';
      let stationInfoUrl = '';
      axios
        .get(stationInfoUrl)
        .then(function(data) {
          data.data = {
            "stationName": "龙锦苑东五区充电站", //充电站名称
            "stationAddr": "北京市昌平区龙锦三街-龙锦苑东五区-13号楼1单元对面", //充电站地址
            "stationId": "001", //充电站ID
            "payMethods": [
              "刷卡",
              "APP支付"
            ], //支持的支付方式
            "totalChargePortsNum": 3, //一共的充电口数
            "idleChargePortsNum": 2, //闲置的充电口数
            "chargeType": "fast", //充电口类型  fast/slow
            "distanceToMe": "200m", //距离我的位置
            "ID": "充电站ID", //充电站ID
            "operationTime": "00:00-24:00", //运营时间
            "operator": "运营商", //运营商
            "parkCost": "免费/2元/h", //停车费用
            "chargePortsList": [{
              "ID": "port1",
              "method": "AC", //交流电AC、直流电DC
              "state": "broken" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port2",
              "method": "DC", //交流电AC、直流电DC
              "state": "broken" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port3",
              "method": "AC", //交流电AC、直流电DC
              "state": "charging" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port4",
              "method": "AC", //交流电AC、直流电DC
              "state": "charging" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port5",
              "method": "AC", //交流电AC、直流电DC
              "state": "idle" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port6",
              "method": "DC", //交流电AC、直流电DC
              "state": "idle" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port7",
              "method": "AC", //交流电AC、直流电DC
              "state": "idle" //损坏/充电中/闲置broken/charging/idle
            }, {
              "ID": "port8",
              "method": "AC", //交流电AC、直流电DC
              "state": "idle" //损坏/充电中/闲置broken/charging/idle
            }, ]
          }
          console.log('stationInfoUrl|返回数据|' + JSON.stringify(data.data));
          _this.stationInfo = data.data;
          //set 充电站Id
          _this.postData.stationId = data.data.stationId;
        })
        .catch(function(err) {
          console.log({
            'url': stationInfoUrl,
            'err': JSON.stringify(err)
          });
        });
  
      // let chargeMethodsUrl = GLOBAL.interfacePath + '';
      let chargeMethodsUrl = '';
      axios
        .get(chargeMethodsUrl)
        .then(function(data) {
          data.data = [{
              name: "充满自停",
              ID: "full"
            },
            {
              name: "1小时",
              ID: "1"
            },
            {
              name: "2小时",
              ID: "2"
            },
            {
              name: "3小时",
              ID: "3"
            },
            {
              name: "5小时",
              ID: "5"
            },
            {
              name: "8小时",
              ID: "8"
            }
          ]
          console.log('chargeMethodsUrl|返回数据|' + JSON.stringify(data.data));
          _this.chargeMethods = data.data;
        })
        .catch(function(err) {
          console.log({
            'url': chargeMethodsUrl,
            'err': JSON.stringify(err)
          });
        });
    }
  }
</script>

<style lang="scss">
  @import '../../static/css/common.scss';
  $cl-c: #ff9800;
  $cl-bgc: #ff9800;
  .station-box {
    padding: 0.3rem 0 .4rem .8rem;
    border-bottom: 1px solid #e6e6e6;
  }
  
  .method-box {
    display: flex;
    flex-wrap: wrap;
    &>div {
      position: relative;
      border: 1px solid #8a8a8a;
      border-radius: 4px;
      width: 28%;
      height: 1.6rem;
      margin-right: 8%;
      margin-top: .5rem;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &.checked {
        border: 1px solid #19d64e;
        color: #19d64e;
      }
      i {
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 1rem;
        height: 0.5rem;
        background-color: red;
      }
    }
  }
  
  .ports-box {
    display: flex;
    flex-wrap: wrap;
    &>div {
      margin-top: .5rem;
      border-radius: 3px;
      width: 22%;
      margin-right: 4%;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &>div {
        &:first-child {
          width: 35%;
        }
        &:last-child {
          width: 65%;
          height: 100%;
          color: #fff;
          &>div {
            &>p {
              text-align: center;
            }
          }
        }
      }
      &.broken {
        border: 1px solid #e6e6e6;
        &>div {
          &:last-child {
            background-color: #e6e6e6;
          }
        }
      }
      &.charging {
        border: 1px solid #ff0000;
        &>div {
          &:last-child {
            background-color: #ff0000;
          }
        }
      }
      &.idle {
        border: 1px solid #19d64e;
        &>div {
          &:last-child {
            background-color: #19d64e;
          }
        }
        &.checked {
          background-color: #19d64e;
          color: #fff;
          border-color: rgb(14, 140, 49);
          box-shadow: #034716 0px 0px 4px;
        }
      }
    }
  }
  
  .icon-star {
    display: block;
    width: 1rem;
    height: 1rem;
    background: url("../assets/logo.png") center center no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  
  .icon-total {
    background-color: $cl-c;
    font-size: 0.45rem;
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    color: #fff;
  }
  
  .fast-charge {
    width: 2rem;
    background-color: $cl-c;
    color: #fff;
    margin: auto 0.2rem;
    border-radius: 3px;
  }
  
  .slow-charge {
    width: 2rem;
    background-color: #fff;
    color: $cl-c;
    border: 1px solid $cl-c;
    margin: auto 0.2rem;
    border-radius: 3px;
  }
  
  
  /* 剩余的 */
  
  .icon-idle {
    background-color: #00d94a;
    color: #fff;
    width: 0.8rem;
    height: 0.8rem;
    font-size: 0.45rem;
    margin-right: 0.2rem;
    border-radius: 3px;
  }
  
  .icon-label-box>span {
    padding: 0 0.3rem;
    border: 1px solid #e3e3e3;
    border-radius: 10rem;
    font-size: 0.5rem;
    margin-right: .4rem;
  }
  
  .station-info-2 {
    padding: .3rem .8rem 0.2rem;
    border-bottom: 1px solid #e6e6e6;
    &>div {
      margin-bottom: .1rem;
    }
  }
  .start-charge-btn{
    height: 2rem;position: absolute;
    width:100%;color:#fff;
    background-color: $cl-color;
    bottom:0;
    z-index:2;
  }
</style>

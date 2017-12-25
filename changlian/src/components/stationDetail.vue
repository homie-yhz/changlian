<template>
  <div>
    <!-- 详情 -->
    <header class="header-poa-white v-fcm">
      <div class="v-fcm m-auto h-100" style="width:80%">详情</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
      <div @click="back()" class="poa rt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box" style="padding-bottom:2rem">
      <div>
      <!-- 选择充电口 -->
      <div class="cl-box">
        <p class="mb-20">选择充电口</p>
        <p class="v-fb fz-50">
          <span class="v-fm">
            <i class="icon-port icon-ac-blue"></i>交流电：需自带充电器
          </span>
          <span class="v-fm">
            <i class="icon-port icon-dc-blue"></i>直流电：无需带充电器
          </span>
        </p>
        <div class="ports-box">
          <div class="v-fm" @click="choosePort(port)" :class="{broken:port.state==='broken',charging:port.state==='charging',idle:port.state==='idle',checked:postData.portId===port.ID}" :key="port.id" v-for="(port,key) in stationDetail.chargePortsList">
            <div class="v-fcm">{{key+1}}</div>
            <div class="v-fcm fz-55">
              <div v-if="port.method==='AC'" class="">
                <p class="icon-port icon-ac-white"></p>
                <p>交流电</p>
              </div>
              <div v-if="port.method==='DC'">
                <p class="icon-port icon-dc-white"></p>
                <p>直流电</p>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-50">选择充电方式</p>
        <div class="method-box">
          <div :class="{'checked':postData.methodId === method.ID}" @click="chooseChargeMethod(method)" class="v-fcm" v-for="method in chargeMethods">
            {{method.name}}
            <div v-if="postData.methodId === method.ID">
              <i class="icon-triangle"></i>
              <i class="icon-yes"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <!-- 充电站补充信息 -->
      <div class="cl-box">
        <p>收费标准说明</p>
        <!-- 收费说明块 -->
        <ul class="charge-description">
          <li v-for="chargeDescriptionItem in stationDetail.chargeDescripetionList">
            <p>{{chargeDescriptionItem.wRange}}</p>
            <p>{{chargeDescriptionItem.priceRate}}</p>
          </li>
        </ul>
        <div style="color:#666;">
          <div class="v-fb">
            <span>运营时间</span>
            <span>{{stationDetail.operationTime}}</span>
          </div>
          <div>站点地址</div>
          <div>{{stationDetail.stationAddr}}</div>
          <div class="v-fb">
            <span>运营商</span>
            <span>{{stationDetail.operator}}</span>
          </div>
          <div class="v-fb">
            <span>停车费用</span><span>{{stationDetail.parkCost}}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    <!-- 底部开始充电按钮 -->
    <div class="cl-footer v-fb">
      <div class="v-fcm v-i1" style="background-color:#f2f2f2;">
        <span class="v-i1 tac">余额：<span class="cl-red balance">{{userInfo.balance}}</span></span>
        <router-link :to="{name:'recharge'}" @click="recharge"  class="v-fcm btn-recharge">充值</router-link>
      </div>
      <div @click="startCharge" class="v-fcm btn-start-charge">开始充电</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import GLOBAL,{getUserInfo} from "../GLOBAL";
import { Toast } from "mint-ui";
import "mint-ui/lib/toast/style.css";
export default {
  data() {
    return {
      postData: {
        portId: "",
        stationId: "",
        methodId: ""
      },
      chargeMethods: [],
      stationDetail: {},
      userInfo:{}
    };
  },
  methods: {
    choosePort(port) {
      console.log(port.ID);
      let portState = port.state;
      if (portState === "idle") {
        //增加样式
        this.postData.portId = port.ID;
      } else if (portState === "broken") {
        Toast("抱歉！该充电口暂时无法使用！");
      } else if (portState === "charging") {
        Toast("该端口正在使用！");
      }
    },
    // 选择充电模式
    chooseChargeMethod(method) {
      console.log(method.ID);
      // 充电模式存入postData
      this.postData.methodId = method.ID;
    },
    // 开始充电
    startCharge() {
      if (!this.postData.portId) {
        Toast("请选择充电设备");
      } else if (!this.postData.methodId) {
        Toast("请选择充电方式");
      } else {
        console.log(JSON.stringify(this.postData));
      }
    },
    // 充值
    recharge(){
      console.log('点击充值');
    },
  },
  created() {
    let _this = this;
    // let stationInfoUrl = GLOBAL.interfacePath + '';
    let stationInfoUrl = "";
    axios
      .get(stationInfoUrl)
      .then(function(data) {
        data.data = {
          stationName: "龙锦苑东五区充电站", //充电站名称
          stationAddr: "北京市昌平区龙锦三街-龙锦苑东五区-13号楼1单元对面", //充电站地址
          stationId: "001", //充电站ID
          payMethods: ["刷卡", "APP支付"], //支持的支付方式
          totalChargePortsNum: 3, //一共的充电口数
          idleChargePortsNum: 2, //闲置的充电口数
          chargeType: "fast", //充电口类型  fast/slow
          distanceToMe: "200m", //距离我的位置
          ID: "充电站ID", //充电站ID
          operationTime: "00:00-24:00", //运营时间
          operator: "运营商", //运营商
          parkCost: "免费/2元/h", //停车费用
          chargePortsList: [
            {
              ID: "port1",
              method: "AC", //交流电AC、直流电DC
              state: "broken" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port2",
              method: "DC", //交流电AC、直流电DC
              state: "broken" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port3",
              method: "AC", //交流电AC、直流电DC
              state: "charging" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port4",
              method: "AC", //交流电AC、直流电DC
              state: "charging" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port5",
              method: "AC", //交流电AC、直流电DC
              state: "idle" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port6",
              method: "DC", //交流电AC、直流电DC
              state: "idle" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port7",
              method: "AC", //交流电AC、直流电DC
              state: "idle" //损坏/充电中/闲置broken/charging/idle
            },
            {
              ID: "port8",
              method: "AC", //交流电AC、直流电DC
              state: "idle" //损坏/充电中/闲置broken/charging/idle
            }
          ],
          chargeDescripetionList:[
            {
              "wRange":"0<功率≤200瓦",
              "priceRate":".5元/小时"
            },
            {
              "wRange":"0<功率≤200瓦",
              "priceRate":".5元/小时"
            },{
              "wRange":"999<功率≤200瓦",
              "priceRate":".5元/小时"
            }
            ,{
              "wRange":"999<功率≤200瓦",
              "priceRate":".5元/小时"
            }
          ]
        };
        console.log("stationInfoUrl|返回数据|" + JSON.stringify(data.data));
        _this.stationDetail = data.data;
        //set 充电站Id
        _this.postData.stationId = data.data.stationId;
      })
      .catch(function(err) {
        console.log({
          url: stationInfoUrl,
          err: JSON.stringify(err)
        });
      });

    // let chargeMethodsUrl = GLOBAL.interfacePath + '';
    let chargeMethodsUrl = "";
    axios
      .get(chargeMethodsUrl)
      .then(function(data) {
        data.data = [
          {
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
        ];
        console.log("chargeMethodsUrl|返回数据|" + JSON.stringify(data.data));
        _this.chargeMethods = data.data;
      })
      .catch(function(err) {
        console.log({
          url: chargeMethodsUrl,
          err: JSON.stringify(err)
        });
      });

    getUserInfo().then(function(userInfo){
      _this.userInfo = userInfo;
    });
  }
};
</script>

<style lang="scss">
@import "../../static/css/common.scss";
@import "../../static/css/iconfont.css";
$cl-c: #ff9800;
$cl-bgc: #ff9800;
.station-box {
  padding: 0.3rem 0 0.4rem 0.8rem;
  border-bottom: 1px solid #e6e6e6;
}

.method-box {
  display: flex;
  flex-wrap: wrap;
  & > div {
    position: relative;
    border: 1px solid #8a8a8a;
    border-radius: 4px;
    width: 30%;
    height: 1.6rem;
    margin-right: 5%;
    margin-top: 0.5rem;
    overflow: hidden;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.checked {
      border: 1px solid #2eafed;
      color: #2eafed;
    }
    .icon-triangle{
      position: absolute;
      right: 0;
      bottom: -1rem;
      display: block;
      border:1rem solid transparent;
      border-right:1rem solid #2eafed;
      
    }
    .icon-yes{
      position: absolute;
      right: 0;
      bottom:0;
      width:.6rem;
      height:.6rem;
      z-index:2;
      background:url('../../static/img/yes-white.png') top right no-repeat;
      background-size:100% 100%;
    }
  }
}

.ports-box {
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin-top: 0.5rem;
    border-radius: 3px;
    width: 22%;
    margin-right: 4%;
    &:nth-child(4n) {
      margin-right: 0;
    }
    & > div {
      &:first-child {
        width: 35%;
      }
      &:last-child {
        width: 65%;
        height: 100%;
        color: #fff;
        & > div {
          & > p {
            text-align: center;
          }
        }
      }
    }
    &.broken {
      border: 1px solid #e6e6e6;
      & > div {
        &:last-child {
          background-color: #e6e6e6;
        }
      }
    }
    &.charging {
      border: 1px solid #ff0000;
      & > div {
        &:last-child {
          background-color: #ff0000;
        }
      }
    }
    &.idle {
      border: 1px solid #2eafed;
      & > div {
        &:last-child {
          background-color: #2eafed;
        }
      }
      &.checked {
        background-color: #2eafed;
        color: #fff;
        border-color: #0c81b3;
        box-shadow:0 0 4px #0564a8;
        font-weight:bold;
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

.icon-label-box > span {
  padding: 0 0.3rem;
  border: 1px solid #e3e3e3;
  border-radius: 10rem;
  font-size: 0.5rem;
  margin-right: 0.4rem;
}

.station-info-2 {
  padding: 0.3rem 0.8rem 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  & > div {
    margin-bottom: 0.1rem;
  }
}
.start-charge-btn {
  height: 2rem;
  position: absolute;
  width: 100%;
  color: #fff;
  background-color: $cl-color;
  bottom: 0;
  z-index: 2;
}

// 收费说明
.charge-description{
  margin-bottom:.5rem;
  @include fw;
  li{
    width: 30%;
    margin:.5rem 5% 0 0;
    height:2.5rem;
    border:1px solid #2daeec;
    border-radius:4px;
    background-color: #f7f7f7;
    p{
      text-align: center;
      font-size:.5rem;
      margin-top:.3rem;
      &:last-child{
        color:#2daeec;
        font-size:.6rem;
        margin-top:.2rem;
      }
    }
    &:nth-child(3n){
      margin-right:0;
    }
  }
}
// 充值按钮
.btn-recharge{
  height: 1.2rem;
  width:3rem;
  margin:0 .5rem;
  color:#2daeec;
  border:1px solid #2daeec;
  @include fcm;
}
// 开始充电按钮
.btn-start-charge{
  background-color: #2daeec;
  @include fcm;
  width:40%;
  color:#fff;
}
.balance{
  width:3rem;
}
</style>


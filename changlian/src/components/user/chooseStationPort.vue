<template>
  <div>
    <!-- 详情 -->
    <header class="header-poa-white v-fcm">
      <div class="v-fcm m-auto h-100 header-title" style="width:80%">{{stationDetail.stationName}}</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
      <a v-bind:href="'tel:'+stationDetail.phone" class="poa rt-0 v-fcm h-100" style="width:10%;">
        <span class="icon-call"></span>
      </a>
    </header>
    <div class="scroll-box">
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
            <div class="v-fm" @click="choosePort(port)" :class="{broken:port.state==='broken'||port.state ==='',charging:port.state==='charging',idle:port.state==='idle',checked:postData.consoleId===port.consoleId}" :key="port.consoleId" v-for="(port,key) in chargePortsList">
              <div class="v-fcm">{{key+1}}</div>
              <div class="v-fcm v-i1 fz-55">
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
        </div>
        <div class="blank"></div>
        <!-- 充电站补充信息 -->
        <div class="cl-box">
          <div style="color:#666;">
            <div class="v-fb">
              <span>运营时间:</span>
              <span>{{stationDetail.operationTime}}</span>
            </div>
            <div class="v-fb">
              <span style="width:5rem;">站点地址:</span>
              <span>{{stationDetail.stationAddr}}</span>
            </div>
            <div class="v-fb">
              <span>运营商:</span>
              <span>{{stationDetail.operator}}</span>
            </div>
            <div class="v-fb">
              <span>停车费用:</span><span>{{stationDetail.parkCost}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import axios from "axios";
  import GLOBAL, {
    getUserInfo
  } from "../../GLOBAL";
  import {
    Toast
  } from "mint-ui";
  import "mint-ui/lib/toast/style.css";
  export default {
    data() {
      return {
        postData: {
          consoleId: "",
          stationId: "",
          methodId: ""
        },
        chargeMethods: [],
        stationDetail: {},
        chargePortsList: [],
        userInfo: {}
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      choosePort(port, portIndex) {
        console.log(port.consoleId);
        let portState = port.state;
        if (portState === "idle") {
          //增加样式
          sessionStorage.setItem('portIndex', port.portIndex);
          sessionStorage.setItem('num',port.num);
          sessionStorage.setItem('stationId',this.$route.params.stationId);
          sessionStorage.setItem('portId',port.ID);
          sessionStorage.setItem('portNumber',port.portNumber);
          sessionStorage.setItem('consoleId',port.consoleId);
          sessionStorage.setItem('consoleNumber',port.consoleNumber);

          this.postData.consoleId = port.consoleId;
          this.$router.push({
            name: "chooseChargeMethod",
            params: {
              stationId: this.$route.params.stationId || '*',
              portId: port.ID || '*',
              portNumber: port.portNumber || '*',
              consoleId: port.consoleId || '*',
              consoleNumber: port.consoleNumber || '*'
            }
          });
        } else if (portState === "broken" || portState === '') {
          Toast("抱歉！该充电口暂时无法使用！");
        } else if (portState === "charging") {
          Toast("该端口正在使用！");
        }
      }
    },
    created() {
      let _this = this;
      let chargePortsListUrl = GLOBAL.interfacePath + '/clyun/chargePortsList?stationId=' + this.$route.params.stationId;
      // let stationInfoUrl = "";
      console.log(chargePortsListUrl);
      axios
        .get(chargePortsListUrl)
        .then(function(data) {
          let res = data.data;
          console.log('获取端口+chargePortsListUrl', res)
          if (res.code === 200) {
            _this.chargePortsList = res.body;
          }
          // data.data = {
          //   stationName: "龙锦苑东五区充电站", //充电站名称
          //   stationAddr: "北京市昌平区龙锦三街-龙锦苑东五区-13号楼1单元对面", //充电站地址
          //   stationId: "001", //充电站ID
          //   payMethods: ["刷卡", "APP支付"], //支持的支付方式
          //   totalChargePortsNum: 3, //一共的充电口数
          //   idleChargePortsNum: 2, //闲置的充电口数
          //   chargeType: "fast", //充电口类型  fast/slow
          //   distanceToMe: "200m", //距离我的位置
          //   operationTime: "00:00-24:00", //运营时间
          //   operator: "运营商", //运营商
          //   parkCost: "免费/2元/h", //停车费用
          //   chargePortsList: [
          //     {
          //       index: "1",
          //       ID: "port1",
          //       method: "AC", //交流电AC、直流电DC
          //       state: "broken" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "2",
          //       ID: "port2",
          //       method: "DC", //交流电AC、直流电DC
          //       state: "broken" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "3",
          //       ID: "port3",
          //       method: "AC", //交流电AC、直流电DC
          //       state: "charging" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "4",
          //       ID: "port4",
          //       method: "AC", //交流电AC、直流电DC
          //       state: "charging" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "5",
          //       ID: "port5",
          //       method: "AC", //交流电AC、直流电DC
          //       state: "idle" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "6",
          //       ID: "port6",
          //       method: "DC", //交流电AC、直流电DC
          //       state: "idle" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "7",
          //       ID: "port7",
          //       method: "AC", //交流电AC、直流电DC
          //       state: "idle" //损坏/充电中/闲置broken/charging/idle
          //     },
          //     {
          //       index: "8",
          //       ID: "port8",
          //       method: "AC", //交流电AC、直流电DC
          //       state: "idle" //损坏/充电中/闲置broken/charging/idle
          //     }
          //   ]
          // };

          //set 充电站Id
          _this.postData.stationId = data.data.stationId;
        })
        .catch(function(err) {
          console.log({
            url: chargePortsListUrl,
            err: JSON.stringify(err)
          });
        });

      let stationDetailInfoUrl = GLOBAL.interfacePath + '/clyun/stationDetailInfo?stationId=' + this.$route.params.stationId;
      //let stationDetailInfoUrl = GLOBAL.interfacePath + '';
      axios
        .get(stationDetailInfoUrl)
        .then(function(data) {
          let res = data.data;
          console.log('>>>stationDetail|电站详情', res);
          if (res.code === 200) {
            _this.stationDetail = res.body;
            sessionStorage.setItem('stationAddr',res.body.stationAddr);
          } else {
//            alert(res.msg);
          }
        })
        .catch(function(err) {
          console.log({
            'url': stationDetailInfoUrl,
            'err': JSON.stringify(err)
          });
        });
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  @import "../../../static/css/iconfont.css";
  $cl-c: #ff9800;
  $cl-bgc: #ff9800;
  .station-box {
    padding: 0.3rem 0 0.4rem 0.8rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .ports-box {
    display: flex;
    flex-wrap: wrap;
    &>div {
      margin-top: 0.5rem;
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
        border: 1px solid #bbbbbb;
        &>div {
          &:last-child {
            background-color: #bbbbbb;
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
          border-color: #19d64e;
          box-shadow: 0 0 4px #19d64e;
          font-weight: bold;
        }
      }
    }
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
    margin-right: 0.4rem;
  }

  .station-info-2 {
    padding: 0.3rem 0.8rem 0.2rem;
    border-bottom: 1px solid #e6e6e6;
    &>div {
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

  .balance {
    width: 3rem;
  }
</style>


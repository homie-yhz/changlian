<template>
  <div>
    <header class="header-poa-white v-fcm" style="background-color:#fff;">
      <div class="v-fcm m-auto h-100 header-title" style="width:80%">充电中</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
      <!-- <div @click="back()" class="poa rt-0 v-fcm h-100" style="width:10%;">
    						<span class="arrow-back"></span>
        </div> -->
    </header>
    <div class="scroll-box" style="padding-bottom:2rem">
      <ul class="charging-equipment-list">
        <li v-for="equipment in chargingList" :key="equipment.chargingId" @click="toChargingPage(equipment)">
          <div class="equitment-box v-fb v-fm">
            <div class="">
              <!-- 设备地址 -->
              <p>{{equipment.addr}}</p>
              <!-- 设备编号 -->
              <p>设备编号：{{equipment.num}}</p>
            </div>
            <div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
          </div>
          <div class="v-fm handle-method">
            <div v-if="equipment.chargeSource === 'APP'" class="v-fm">
              <i class="icon-app"></i>APP
            </div>
            <div v-if="equipment.chargeSource === 'IDCard'" class="v-fm">
              <i class="icon-IDCard"></i>ID卡
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import axios from "axios";
  import GLOBAL, {
    getUserInfo
  } from "../../GLOBAL";
  export default {
    data() {
      return {
        chargingList: [],
        userInfo: {}
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      toChargingPage(equipment){
        console.log('~~~~~~~~~~~~')
        console.log(equipment);
        //需要参数  chargeRecordId methodId userId
        sessionStorage.setItem('chargeRecordId',equipment.chargingId);
        sessionStorage.setItem('methodId',equipment.methodId);
				this.$router.push({name:'charging'});
      }
    },
    created() {
      let _this = this;
      let chargingList =
        GLOBAL.interfacePath +
        "/clyun/chargingList?" +
        "userId=" +
        sessionStorage.getItem("userId")+'&chargeLogId=0';
      axios
        .get(chargingList)
        .then(function(data) {
          console.log(">>>chargingList|充电列表|",data.data);
          // data = {
          //   data: {
          //     code:200,
          //     body: [{
          //         addr: "昌平回龙观",
          //         num: "132313213123123",
          //         index: "1",
          //         chargeRecordId: "001",
          //         chargeSource: "APP",
          //         methodId:"123"
          //       }
          //     ]
          //   }
          // };
          let res = data.data;
          if (res.code === 200) {
            console.log(res.body);
            // _this.chargingList = JSON.parse(res.body);
            _this.chargingList = res.body;
            
          } else {
            alert(res.msg);
          }
        })
        .catch(function(err) {
          console.log({
            url: chargingList,
            err: JSON.stringify(err)
          });
        });
      // getUserInfo().then(function(userInfo) {
      // 	_this.chargingList = userInfo.chargingList;
      // 	console.log(_this.equipmentList);
      // });
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  @import "../../../static/css/iconfont.css";
  .charging-equipment-list {
    li {
      border-bottom: 1px solid #d9d9d9;
      background: #f5f5f5;
      .equitment-box {
        background: #f5f5f5;
        padding: 0.5rem 0.8rem 0.2rem;
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
    }
  }
  
  .handle-method {
    margin: 0 0 0.5rem 0.8rem;
    font-size: 0.5rem;
    &>div {
      @include fm;
      // background: rgba(255, 255, 255, 0.7);
      color: #666;
      border-radius: 3px;
      padding: 0.1rem 0.2rem;
    }
  }
</style>


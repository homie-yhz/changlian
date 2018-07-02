<template>
  <div>
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充电</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <!-- 选择充电方式 -->
    <div class="scroll-box">
      <div>
        <!-- 设备相关信息 -->
        <div class="equitment-box v-fb v-fm" style="background-color:#fff;">
          <div class="">
            <!-- 设备地址 -->
            <p>{{stationDetail.stationAddr}}</p>
            <!-- 设备编号 -->
            <p>设备编号：{{stationDetail.num}}</p>
          </div>
          <div class="v-fcm icon-equipment-num">{{stationDetail.portIndex}}</div>
        </div>
        <div class="blank"></div>
        <div class="cl-box">
  
          <!-- 选择充电方式模块 -->
          <p>选择充电方式</p>
          <div class="method-box">
            <div :class="{'checked':postData.chargeMethodId === method.methodId}" class="v-fcm" @click="chooseChargeMethod(method)" v-for="method in chargeMethods" :key="method.methodId">
              {{method.name}}
              <div v-if="postData.chargeMethodId === method.methodId">
                <i class="icon-triangle"></i>
                <i class="icon-yes"></i>
              </div>
            </div>
          </div>
  
          <!-- 收费说明块 -->
          <p class="mt-10">收费标准说明</p>
          <ul class="charge-description">
            <li v-for="chargeDescriptionItem in chargeDescripetionList">
              <p>{{chargeDescriptionItem.wRange}}</p>
              <p>{{chargeDescriptionItem.priceRate}}</p>
            </li>
          </ul>
  
          <!-- 余额  以及  去充值 -->
          <div class="v-fb v-fm v-i1" style="margin-top:1rem;">
            <span class="tac">余额：<span class="cl-red balance">{{userInfo.balance||'*'}} 元</span></span>
            <a @click="recharge()" class="v-fcm btn-recharge">去充值</a>
          </div>
  
        </div>
        <div class="v-fcm" style="width:80%;z-index:2;margin:1rem auto;">
          <div @click="startCharge()" class="v-fcm btn-start-charge">开始充电</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import GLOBAL, {
    getUserInfo
  } from "../../GLOBAL";
  import {
    Toast,
    MessageBox
  } from "mint-ui";
  import "mint-ui/lib/toast/style.css";
  import store from '../../store';
  import loader from '../../loading.js';
  export default {
    data() {
      return {
        postData: {
          stationPortId: "",
          chargeMethodId: ""
        },
        chargeMethods: [],
        chargeDescripetionList: [],
        stationDetail: {},
        userInfo: {},
        equipment: {},
      };
    },
    computed: {
      update: function() {
        console.log('子组件更新');
        return store.state.update;
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      // 选择充电模式
      chooseChargeMethod(method) {
        // 充电模式存入postData
        this.postData.chargeMethodId = method.methodId;
        this.postData.chargingTime = method.chargeTime;
      },
      // 开始充电
      startCharge() {
        let _this = this;
        if (!!localStorage.getItem('userId')) {
          // store.commit('increment');
          if (this.userInfo.balance - 0.1 < 0) {
            Toast("余额不足！无法充电！");
          } else if (!this.postData.chargeMethodId) {
            Toast("请选择充电方式");
          } else {
            loader.show();
            //设置chargingTime:即为充电ID
            sessionStorage.setItem('methodId', this.postData.chargeMethodId);
            sessionStorage.setItem('chargingTime', this.postData.chargingTime)
            // 请求充电
            let requestChargeUrl = GLOBAL.interfacePath + '/clyun/startCharge?' +
              'userId=' + localStorage.getItem('userId') + '&consoleNumber=' + sessionStorage.getItem('consoleNumber') +
              '&portNumber=' + sessionStorage.getItem('portNumber') + '&chargingTime=' + sessionStorage.getItem('chargingTime') + '&methodId=' + this.postData.chargeMethodId;
            console.log('>>>请求充电', requestChargeUrl);
            axios
              .get(requestChargeUrl)
              .then(function(data) {
                loader.hide();
                let res = data.data;
                console.log('>>>点击开始充电返回数据： requestChargeUrl', res);
                if (res.code === 200) {
                  if (res.body.success === true) {
                    //设置 充电记录Id 
                    sessionStorage.setItem('chargeRecordId', res.body.info.chargeRecordId);
                    _this.$router.replace({
                      name: 'charging'
                    });
                  } else {
                    MessageBox.alert('请求充电失败！请重新请求！');
                  }
                } else {
                  MessageBox.alert(res.msg);
                }
              })
              .catch(function(err) {
                console.log({
                  url: requestChargeUrl,
                  err: JSON.stringify(err)
                });
              });
          }
        } else {
          MessageBox.alert('您还没有登录，前去登录？').then(action => {
            this.$router.push({
              name: "login"
            });
          });
        }
      },
      recharge() {
        //未登录 去登录
        if (!localStorage.getItem('userId')) {
          MessageBox.alert('您还没有登录，前去登录？').then(action => {
            this.$router.push({
              name: "login"
            });
          });
          return false;
        } else {
          this.$router.push({
            name: 'recharge'
          });
        }
  
      }
    },
    created() {
      let _this = this;
      sessionStorage.setItem('consoleNumber', this.$route.params.consoleNumber);
      sessionStorage.setItem('portNumber', this.$route.params.portNumber);
      sessionStorage.setItem('stationId', this.$route.params.stationId);
      this.stationDetail.stationAddr = sessionStorage.getItem('stationAddr');
      this.stationDetail.portIndex = sessionStorage.getItem('portIndex');
      this.stationDetail.num = sessionStorage.getItem('num');
      // 选择充电方式
      let chargeMethods = GLOBAL.interfacePath + '/clyun/chargeMethods?stationId=' + this.$route.params.stationId + '&portId=' + this.$route.params.portId + '&consoleId=' + this.$route.params.consoleId;
      axios
        .get(chargeMethods)
        .then(function(data) {
          console.log('chargeMethods|返回数据|', data.data);
          let res = data.data;
          if (res.code === 200) {
            _this.chargeMethods = res.body;
          }
        })
        .catch(function(err) {
          console.log({
            'url': chargeMethods,
            'err': JSON.stringify(err)
          });
        });
      // 收费标准说明
      let chargeDescripetionList = GLOBAL.interfacePath + '/clyun/chargeDescripetionList?stationId=' + this.$route.params.stationId + '&portId=' + this.$route.params.portId + '&consoleId=' + this.$route.params.consoleId;
      axios
        .get(chargeDescripetionList)
        .then(function(data) {
          console.log('22222222');
          let res = data.data;
          if (res.code === 200) {
            _this.chargeDescripetionList = res.body;
            console.log('>>>收费标准', res.body);
          }
        })
        .catch(function(err) {
          console.log({
            url: chargeDescripetionList,
            err: JSON.stringify(err)
          });
        });
  
      //请求个人信息接口  获取金额
      if (sessionStorage.getItem('loginState') === 'true') {
        getUserInfo().then(function(userInfo) {
          _this.userInfo = userInfo;
        });
      }
    },
    watch: {
      update: function(nv, ov) {
  
      }
      // 监听是否有充电信息更新   
    },
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
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
  
  .method-box {
    display: flex;
    flex-wrap: wrap;
    &>div {
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
      .icon-triangle {
        position: absolute;
        right: 0;
        bottom: -1rem;
        display: block;
        border: 1rem solid transparent;
        border-right: 1rem solid #2eafed;
      }
      .icon-yes {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0.6rem;
        height: 0.6rem;
        z-index: 2;
        background: url("../../../static/img/yes-white.png") top right no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  
  // 收费说明
  .charge-description {
    margin-bottom: 0.5rem;
    @include fw;
    li {
      width: 30%;
      margin: 0.5rem 5% 0 0;
      height: 2.5rem;
      border: 1px solid #2daeec;
      border-radius: 4px;
      background-color: #f7f7f7;
      p {
        text-align: center;
        font-size: 0.5rem;
        margin-top: 0.3rem;
        &:last-child {
          color: #2daeec;
          font-size: 0.6rem;
          margin-top: 0.2rem;
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  
  // 去充值按钮
  .btn-recharge {
    height: 1.5rem;
    width: 4rem;
    border-radius: 4px;
    color: #2daeec;
    border: 1px solid #2daeec;
    @include fcm;
  }
  
  // 开始充电按钮
  .btn-start-charge {
    background-color: #2daeec;
    @include fcm;
    width: 100%;
    height: 1.8rem;
    border-radius: 4px;
    // margin-top: 1rem;
    color: #fff;
  }
</style>

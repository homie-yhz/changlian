<template>
  <div>
    <header class="header-poa v-fcm">
      <div class="v-fcm m-auto h-100" style="width:80%">充电记录</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <ul class="scroll-box chargeLog-list">
      <li class="" v-for="chargeLog in chargeLogList">
        <div>{{chargeLog.time}}</div>
        <div>{{chargeLog.addr}}</div>
        <div>设备：{{chargeLog.equipmentNum}}</div>
        <div class="v-fb">
          <p class="v-fm"><i class="icon-time"></i>充电时间：{{chargeLog.chargeTime}}</p>
          <p class="v-fm"><i class="icon-money"></i>充电费用：{{chargeLog.coast}} 元</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import GLOBAL from '../GLOBAL';
  import axios from 'axios';
  export default {
    data() {
      return {
        chargeLogList: [{
          "time": "2017-11-10 09:09",
          "addr": "龙井大事",
          "equipmentNum": "3213213213",
          "chargeTime":"2小时12分钟",
          "coast":"22"
        }],
      };
    },
    methods: {

    },
    created() {
      let ICCardListUrl = GLOBAL.interfacePath + "";
      axios
        .get(ICCardListUrl)
        .then(function(data) {
          console.log("ICCardListUrl|返回数据|" + JSON.stringify(data.data));
        })
        .catch(function(err) {
          console.log({
            url: ICCardListUrl,
            err: JSON.stringify(err)
          });
        });
    }
  };
</script>

<style lang="scss">
  @import "../../static/css/common.scss";
  .tab-box {
    padding: 0 .8rem;
    z-index: 2;
    position: absolute;
    width: 100%;
    top: 2rem;
    height: 1.7rem;
    &>div {
      border-bottom: 1px solid #cfcfcf;
      height: 100%;
      &>div {
        height: 100%;
        &:first-child {
          margin-right: .8rem;
        }
      }
      div.checked {
        border-bottom: 2px solid #ffdc24;
      }
    }
  }
  
  .chargeLog-list {
    padding: 0 .8rem;
    &>li {
      padding:.4rem 0;
      border-bottom: 1px solid #cfcfcf;
      &>div{
        margin-bottom:.2rem;
        &:last-child{
          margin-bottom:0;
        }
      }
    }
  }
  .icon-time{
    display: block;
    width:.9rem;
    height: .9rem;
    background:url('../../static/img/time.png') center center no-repeat;
    background-size:100% 100%;
  }
  .icon-money{
    display: block;
    width:.9rem;
    height: .9rem;
    background:url('../../static/img/money.png') center center no-repeat;
    background-size:100% 100%;
  }
</style>


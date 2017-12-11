<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="header-poa" style="">
      <!-- 头部:附近电站 -->
      <header class="header v-fcm por">
        <div class="v-fcm m-auto h-100" style="width:80%">附近电站</div>
        <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
          <span class="arrow-back"></span>
        </div>
      </header>
      <!-- 搜索框 -->
      <div class="v-fm" style="height:2rem;">
        <input type="text" class="v-i1 ml-6 search-station" placeholder="请输入电站" style="" v-model="searchInfo">
        <div class="v-fcm" style="width:2.8rem;padding:.1rem 0;">
          <div class="">
            <i class="icon-star"></i>
            <span class="fz-50 db" style="color:black;">常用</span>
          </div>
        </div>
      </div>
      <!-- 搜索列表 -->
      <tab v-model="index01" prevent-default @on-before-index-change="switchTabItem">
        <tab-item selected>全部</tab-item>
        <tab-item>慢充</tab-item>
        <tab-item>快充</tab-item>
      </tab>
    </div>
    <!-- 电站列表 -->
    <div class="scroll-box" style="padding-top:5.7rem!important;padding-bottom:4rem;">
      <div>
        <ul class="station-list">
          <li v-for="stationInfo in stationList">
            <router-link :to="{name:'stationInfo',params:{stationId:stationInfo.ID}}" class="v-fm" style="width:100%;">
              <div class="ml-6 v-i1">
                <!-- 地址 -->
                <p class="fw-b">{{stationInfo.stationAddr}}</p>
                <!-- 允许支付方式 -->
                <p class="icon-label-box mt-2">
                  <span>现金</span>
                  <span>APP支付+</span>
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
            </router-link>
          </li>
          <li class="v-fcm">附近4公里范围内没有更多站点了</li>
        </ul>
      </div>
    </div>
    <div class="footer v-fm">
      <div class="v-i1 v-fcm">
        <i class="icon-elec m-auto"></i>
        <p class="m-auto">电站</p>
      </div>
      <div class="v-i1 v-fcm">
        <i class="icon-scan"></i>
        <p class="m-auto">扫一扫</p>
      </div>
      <div class="v-i1 v-fcm">
        <i class="icon-me"></i>
        <p class="m-auto">我</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "Vue";
  import axios from "axios";
  import {
    Tab,
    TabItem
  } from "vux";
  export default {
    components: {
      Tab,
      TabItem
    },
    data() {
      return {
        searchInfo: "",
        stationList: [],
        index01: 0
      };
    },
    methods: {
      getStationList() {
        let _this = this;
        var stationListUrl = "../../../../static/data/stationInfo.json";
        axios.get(stationListUrl).then(function(data) {
          console.log(data.data);
          console.log(JSON.stringify(data));
          _this.stationList = data.data;
        });
      },
      switchTabItem(index) {
        console.log("on-before-index-change", index);
        // this.$vux.loading.show({
        //   text: 'loading'
        // })
        // setTimeout(() => {
        // this.$vux.loading.hide()
        this.index01 = index;
        // }, 1000)
      },
      onItemClick(index) {
        console.log("on item click:", index);
      }
    },
    created() {
      //获取附近电站信息列表
      this.getStationList();
    }
  };
</script>

<style lang="less">
  @import "~vux/src/styles/1px.less";
  @import "~vux/src/styles/center.less";
</style>

<style lang="scss">
  @import "../../static/css/common.scss";
  $cl-c: #ff9800;
  $cl-bgc: #ff9800;
  //重置tabs样式
  .vux-tab .vux-tab-item.vux-tab-selected {
    color: rgb(46, 175, 237) !important;
  }
  
  .vux-tab-ink-bar {
    background-color: rgb(46, 175, 237) !important;
  }
  
  .vux-tab .vux-tab-item {
    height: 1.7rem !important;
    line-height: 1.7rem !important;
  }
  
  .vux-tab {
    height: 1.7rem !important;
  }
  
  .search-station {
    border: 1px solid #dbdbdb;
    padding-left: 0.2rem;
    height: 1.3rem;
    border-radius: 3px;
    background-color: #f7f7f7;
  }
  
  .fast-charge {
    width: 2rem;
    background-color: $cl-c;
    color: #fff;
    margin: auto 0.5rem;
    border-radius: 3px;
    height: 1rem;
  }
  
  .slow-charge {
    width: 2rem;
    background-color: #fff;
    color: $cl-c;
    border: 1px solid $cl-c;
    margin: auto 0.2rem;
    border-radius: 3px;
  }
  
  .icon-star {
    display: block;
    width: 1rem;
    height: 1rem;
    background: url("../assets/logo.png") center center no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  
  .station-list>li {
    padding: 0.3rem 0;
    border-bottom: 1px solid #e3e3e3;
    &:last-child {
      border-bottom: none;
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
  }
</style>

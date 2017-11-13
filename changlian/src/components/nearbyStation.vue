<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div>
    <!-- 搜索框 -->
    <div class="v-fm">
      <input type="text" class="v-i1 ml-6 search-station" placeholder="电站搜索" style="" v-model="searchInfo">
      <div class="v-fcm" style="width:2.8rem;">
        <div class="">
          <i class="icon-star"></i>
          <span class="fz-50 db">常用</span>
        </div>
      </div>
    </div>
    <!-- 搜索列表 -->
    <ul class="station-list">
      <li v-for="stationInfo in stationList">
        <router-link :to="{name:stationInfo}" class="v-fm" style="width:100%;">
        <div class="ml-6 v-i1">
          <!-- 地址 -->
          <p class="fw-b">{{stationInfo.addr}}</p>
          <!-- 允许支付方式 -->
          <p class="icon-label-box">
            <span>现金</span>
            <span>APP支付+</span>
          </p>
          <!-- 充电口情况 -->
          <p class="v-fm mt-2">
            <span class="v-fm mr-6">
              <span class="icon-total v-fcm">共</span><span style="width:1rem;">{{stationInfo.totalElec}}</span>
            </span>
            <span class="v-fm mr-6">
              <span class="icon-idle v-fcm">闲</span><span style="width:1rem;">{{stationInfo.idleElec}}</span>
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
</template>
<script>
import Vue from "Vue";
import axios from "axios";
export default {
  data() {
    return {
      searchInfo: "",
      stationList: []
    };
  },
  methods: {
    getStationList() {
      let _this = this;
      var stationListUrl = "../../../../static/data/stationInfo.json";
      axios.get(stationListUrl).then(function(data) {
        console.log(JSON.stringify(data.data));
        if (data) {
          _this.stationList = data.data;
        }
      });
    }
  },
  created() {
    //获取电站信息
    this.getStationList();
  }
};
</script>
<style lang="scss">
$cl-c: #ff9800;
$cl-bgc: #ff9800;
.search-station {
  border: 1px solid #e3e3e3;
  padding-left: 0.2rem;
  height: 1.3rem;
  border-radius: 3px;
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
.icon-star {
  display: block;
  width: 1rem;
  height: 1rem;
  background: url("../assets/logo.png") center center no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}
.station-list > li {
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
.icon-label-box > span {
  padding: 0 0.3rem;
  border: 1px solid #e3e3e3;
  border-radius: 10rem;
  font-size: 0.5rem;
}
</style>

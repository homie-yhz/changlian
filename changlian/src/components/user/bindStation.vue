<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">常用电站</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
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
</template>
<script>
export default {
  data(){
      return {
          stationList:[1,2,3,4]
      }
  }
}
</script>
<style lang="scss">
@import '../../../static/css/common.scss';
.search-station {
  border: 1px solid #e3e3e3;
  padding-left: 0.2rem;
  height: 1.3rem;
  border-radius: 3px;
}
.fast-charge {
  width: 2rem;
  background-color: $cl-color;
  color: #fff;
  margin: auto 0.2rem;
  border-radius: 3px;
}
.slow-charge {
  width: 2rem;
  background-color: #fff;
  color: $cl-color;
  border: 1px solid $cl-color;
  margin: auto 0.2rem;
  border-radius: 3px;
}
.icon-star {
  display: block;
  width: 1rem;
  height: 1rem;
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
  background-color: $cl-color;
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

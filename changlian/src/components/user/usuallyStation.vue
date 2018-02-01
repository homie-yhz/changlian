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
          
      }
  }
}
</script>
<style lang="scss">
@import '../../../static/css/common.scss';

</style>

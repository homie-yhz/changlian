<template >
  <div style="border:1px solid red;">
    <div>
    <!-- 搜索框 -->
    <div class="v-fm">
      <input type="text" class="v-i1 ml-6" placeholder="电站搜索" style="border:1px solid #e3e3e3;padding-left:.2rem;height:1.3rem;border-radius:3px;" v-model="searchInfo">
      <div class="v-fcm" style="width:2.8rem;">
        <div class="">
          <i class="icon-star"></i>
          <span class="fz-50">常用</span>
        </div>
      </div>
    </div>
    <!-- 搜索列表 -->
    <ul class="station-list">
      <li class="v-fm" v-for="stationInfo in stationList">
        <div class="ml-6 v-i1">
          <p class="fw-b">龙锦苑东</p>
          <p class="icon-label-box">
            <span>现金</span>
            <span>APP支付+</span>
          </p>
          <p class="v-fm mt-2">
            <span class="v-fm mr-6">
              <span class="icon-total v-fcm">共</span><span>10</span>
            </span>
            <span class="v-fm mr-6">
              <span class="icon-idle v-fcm">闲</span><span>2</span>
            </span>
          </p>
        </div>
        <div class="v-fcm" style="width:2rem;background-color:yellow;color:#fff;margin:auto .2rem;">快充</div>
        <div class="v-fcm" style="width:2.8rem;border-left:1px solid #e3e3e3;">
          <div style="">
            <i class="icon-star" style="margin-top:.2rem;"></i>
            <span>300m</span>
          </div>
        </div>
      </li>
      <li class="v-f">
        <div>
          <p>龙锦苑东</p>
          <p>
            <span>现金</span>
            <span>APP支付</span>
          </p>
          <p class="v-fm">
            <span class="v-fm">
              <span class="icon-yellow v-fcm">共</span><span>10</span>
            </span>
            <span class="v-fm">
              <span>闲</span><span>2</span>
            </span>
          </p>
        </div>
        <div>快充</div>
        <div>300m</div>
      </li>
      <li class="v-fcm">附近4公里范围内没有更多站点了</li>
    </ul>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
export default {

  data(){
    return {
      searchInfo:'',
      stationList:[]
    }
  },
  methods:{
    getStationList(){
      let _this = this;
      var stationListUrl = '';
      axios.get(stationListUrl)
        .then(function(data){
          if(data){
            _this.stationList = data;
          }
        })
    }
  }
}
</script>
<style>
.icon-star{
  display: block;
  width:1rem;
  height: 1rem;
  background:url('../assets/logo.png') center center no-repeat;
  background-size:100% 100%;
  border:1px solid red;
  margin:0 auto;
}
.station-list>li{
  padding:.3rem 0;

}
.icon-total{
  background-color: yellow;
  font-size:.45rem;
  width:.8rem;
  height: .8rem;
  margin-right:.2rem;
  border-radius:3px;
  color:#fff;
}
/* 剩余的 */
.icon-idle{
  background-color:green;
  color:#fff;
  width:.8rem;
  height:.8rem;
  font-size:.45rem;
  margin-right:.2rem;
  border-radius:3px;
}
.icon-label-box>span{
  padding:0 .3rem;
  border:1px solid #e3e3e3;
  border-radius:10rem;
  font-size:.5rem;
}
</style>

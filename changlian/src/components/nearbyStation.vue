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
      <div class="v-fm" style="height:2rem;color:black;">
        <div class="por v-fm v-i1">
          <input type="text" class="v-i1 ml-6 search-station" placeholder="请输入电站" style="" v-model.lazy="searchInfo">
          <span class="iconfont icon-sousuo"></span>
        </div>
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
    <div class="scroll-box" style="padding-top:5.7rem!important;padding-bottom:2rem;">
    <div style="position:relative;height:100%;">
      <scroller 
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="scrollDom"
        :no-data-text="noDataText"
        >
            <router-link 
            v-for="stationInfo in stationList" 
            :key="stationInfo.stationId" 
            tag="div" 
            :to="{name:'stationDetail',params:{stationId:stationInfo.stationId}}" 
            class="v-fm station-item" style="width:100%;">
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
                  <i class="icon-distance" style="margin-top:.2rem;"></i>
                  <!-- 据我多远 -->
                  <span>{{stationInfo.distanceToMe}}</span>
                </div>
              </div>
            </router-link>
      </scroller>
    </div>
    </div>
    <!-- 底部选项卡 -->
    <div class="footer v-f">
      <div class="v-i1 checked">
        <i class="icon-elec m-auto"></i>
        <p class="tac">电站</p>
      </div>
      <div class="v-i1">
        <p class="tac" style="margin-top:1.05rem;">扫一扫</p>
      </div>
      <router-link class="v-i1" :to="{name:'personalCenter'}">
        <i class="icon-me"></i>
        <p class="tac">我</p>
      </router-link>
      <div class="icon-scan">
        <i></i>
      </div>
    </div>
    <float-circle :num="chargingNum" :show="showFloatCircle"></float-circle>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueScroller from "vue-scroller";
import FloatCircle from "./my-cpt/float-circle.vue";
import $ from "jquery";
Vue.use(VueScroller);
import { Tab, TabItem } from "vux";
import GLOBAL, { judgeLogin } from "../GLOBAL";
export default {
  components: {
    Tab,
    TabItem,
    FloatCircle
  },
  data() {
    return {
      searchInfo: "",
      stationList: [],
      index01: 0,
      refreshing: false,
      chargingNum: 0,
      showFloatCircle: true,
      hasNext: true,
      noDataText: "附近10公里范围内没有更多站点了",
      postData: {
        currentPage: 0,
        searchMethod: "all",
        searchInfo: ""
      }
    };
  },
  computed: {},
  methods: {
    getStationList(done) {
      this.postData.currentPage++;
      console.log(JSON.stringify(this.postData));
      let _this = this;
      let stationListUrl = "../../../../static/data/stationInfo.json";
      axios.get(stationListUrl).then(function(data) {
        // console.log(data.data);
        // console.log(JSON.stringify(data));
        setTimeout(function() {
          _this.stationList = _this.stationList.concat(data.data.stationList);
          _this.hasNext = data.data.hasNext;
          if (_this.stationList.length === 0) {
            let noDataMsgHtml =
              '<img src="../../static/img/empty.jpg"><p>没有发现充电站</p>';
            $(".loading-layer>div").html(noDataMsgHtml);
          } else {
            _this.noDataText = "附近10公里范围内没有更多站点了";
          }
          done();
        }, 2000);
      });
    },
    switchTabItem(index) {
      console.log("on-before-index-change", index);
      this.postData.searchMethod =
        index === 0 ? "all" : index === 1 ? "slow" : "fast";
      // this.$vux.loading.show({
      //   text: 'loading'
      // })
      // setTimeout(() => {
      // this.$vux.loading.hide()
      this.index01 = index;
      // }, 1000)
      console.log(this.postData.searchMethod);
      this.refresh();
    },
    onItemClick(index, item) {
      console.log(index);
    },
    refresh(done) {
      console.log("refresh");
      this.$nextTick(function() {
        if (this.hasNext) {
          $(".loading-layer")
            .find(".spinner-holder")
            .addClass("active");
        } else {
          $(".loading-layer")
            .find(".spinner-holder")
            .removeClass("active");
        }
      });
      let _this = this;
      this.refreshing = true;
      this.postData.currentPage = 0;
      this.postData.currentPage++;
      console.log(this.postData);
      let stationListUrl = "../../../../static/data/stationInfo.json";
      axios.get(stationListUrl).then(function(data) {
        // console.log(data.data);
        // console.log(JSON.stringify(data));
        setTimeout(function() {
          _this.stationList = [];
          _this.stationList = _this.stationList.concat(data.data.stationList);
          _this.hasNext = data.data.hasNext;
          _this.$nextTick(function() {
            if (this.hasNext) {
              $(".loading-layer")
                .find(".spinner-holder")
                .addClass("active");
            } else {
              $(".loading-layer")
                .find(".spinner-holder")
                .removeClass("active");
            }
          });
          if (_this.stationList.length === 0) {
            let noDataMsgHtml =
              '<img src="../../static/img/empty.jpg"><p>没有发现充电站</p>';
            $(".loading-layer>div").html(noDataMsgHtml);
          } else {
            _this.noDataText = "附近10公里范围内没有更多站点了";
          }

          _this.refreshing = false;
          done();
        }, 2000);
      });
    },
    infinite(done) {
      if (!this.refreshing) {
        if (this.hasNext) {
          console.log("infinite");
          this.getStationList(done);
        } else {
          this.$refs.scrollDom.finishInfinite(true);
        }
      } else {
        done();
      }
    }
  },
  mounted() {},
  created() {
    //获取附近电站信息列表
    // this.getStationList();
    console.log(this.hasNext);
    //调用  是否登录接口
    axios.all(){
      
    }
    judgeLogin().then(function(hasLogin) {
      console.log("是否登录：" + hasLogin);
      
    });
  },
  watch: {
    searchInfo: function(nv, ov) {
      console.log(nv, ov);
      this.postData.searchInfo = nv;
      this.refresh();
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
</style>

<style lang="scss">
@import "../../static/css/common.scss";
@import "../../static/css/iconfont.css";

//重置tabs样式
.vux-tab .vux-tab-item.vux-tab-selected {
  color: rgb(46, 175, 237) !important;
}

.search1:after {
  content: "\e6d8";
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
  padding-right: 1.3rem;
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
.station-item {
  border-bottom: 1px solid #bbb;
  padding: 0.5rem 0;
}

// 底部
.footer {
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
  background: #f8f8f8;
  border-top: 1px solid #d0d0d0;
  & > div {
    height: 2rem;
    &.checked {
      color: #2eafed;
      & > .icon-elec {
        background: url("../../static/img/bolt-blue.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      & > .icon-scan {
        background: url("../../static/img/bolt-blue.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      & > .icon-me {
        background: url("../../static/img/person-blue.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      & > p {
        text-align: center;
      }
    }
  }
}
</style>

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
          <span class="iconfont icon-sousuo"></span>
          <input type="text" class="v-i1 search-station" placeholder="请输入电站" style="" v-model.lazy="searchInfo">
        </div>
        <router-link tag="div" :to="{name:'chooseStationPort',params:{stationId:stationList.stationId}}" v-show="userInfo.loginState && userInfo.bindState" class="v-fm" style="margin-right:.6rem;padding:.1rem 0;">
          <div class="">
            <i class="icon-star"></i>
            <span class="fz-50 db" style="color:black;">常用</span>
          </div>
        </router-link>
      </div>
      <!-- 搜索列表 -->
      <tab v-if="postData.listType==='normalList'" v-model="index01" prevent-default @on-before-index-change="switchTabItem">
        <tab-item selected>全部</tab-item>
        <tab-item>慢充</tab-item>
        <tab-item>快充</tab-item>
      </tab>
    </div>
    <!-- 电站列表 -->
    <div class="scroll-box" :class="{pt1:postData.listType==='bindList',pt2:postData.listType === 'normalList'}" style="padding-bottom:2rem;">
      <div style="position:relative;height:100%;">
        <div>
          <scroller :on-refresh="refresh" :height="height" :is-no-more-data="hasNext" :on-infinite="infinite" ref="scrollDom" :no-data-text="noDataText">
            <router-link v-for="stationInfo in stationList" :key="stationInfo.stationId" tag="div" :to="{name:'chooseStationPort',params:{stationId:stationInfo.stationId}}" class="v-fm station-item" style="width:100%;">
              <div class="ml-6 v-i1" :stationId="stationInfo.stationId">
                <!-- 地址 -->
                <p class="fw-b">{{stationInfo.stationAddr}}</p>
                <!-- 允许支付方式 -->
                <p class="icon-label-box mt-2">
                  <span style="margin-right:.2rem;" v-for="payMethod in stationInfo.payMethods">{{payMethod}}</span>
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
              <div class="">
                <div class="v-f">
                  <!-- 快慢充 -->
                  <div v-if="stationInfo.chargeType==='fast'" class="v-fcm fast-charge">快充</div>
                  <div v-if="stationInfo.chargeType==='slow'" class="v-fcm slow-charge">慢充</div>
                  <div class="v-fcm" style="width:2.8rem;border-left:1px solid #e3e3e3;">
                    <div>
                      <i class="icon-distance" style="margin-top:.2rem;"></i>
                      <!-- 据我多远 -->
                      <span>{{stationInfo.distanceToMe>1000?(stationInfo.distanceToMe/1000).toFixed(2)+'km':(stationInfo.distanceToMe).toFixed(2)+'m'}}</span>
                    </div>
                  </div>
                </div>
                <!-- 绑定按钮 -->
                <div @click.prevent="bindStation(stationInfo)" class="btn-bind" v-if="stationInfo.showBindBtn">
                  绑定
                </div>
              </div>
            </router-link>
          </scroller>
        </div>
      </div>
    </div>
    <!-- 底部选项卡 -->
    <div class="footer v-f">
      <div class="v-i1 checked">
        <i class="icon-elec m-auto"></i>
        <p class="tac">电站</p>
      </div>
      <div class="v-i1">
        <p class="tac" style="margin-top:1.05rem;" @click="scanQRCode()">扫一扫</p>
      </div>
      <router-link class="v-i1" :to="{name:'personalCenter'}">
        <i class="icon-me"></i>
        <p class="tac">我</p>
      </router-link>
      <div class="icon-scan" @click="scanQRCode()">
        <i></i>
      </div>
    </div>
    <!-- 充电设备圈 -->
    <!-- <float-circle :num="userInfo.chargingMechineAmount" :show="userInfo.loginState && !!userInfo.chargingMechineAmount"></float-circle> -->
  </div>
</template>

<script>
  import Vue from "vue";
  import axios from "axios";
  import VueScroller from "vue-scroller";
  import FloatCircle from "../my-cpt/float-circle.vue";
  import $ from "jquery";
  import wx from 'weixin-js-sdk';
  import loader from '../../loading.js';
  import {
    Toast,
    MessageBox
  } from "mint-ui";
  import "mint-ui/lib/toast/style.css";
  Vue.use(VueScroller);
  import {
    Tab,
    TabItem
  } from "vux";
  import GLOBAL, {
    getUserInfo,
    judgeLoginObj,
    hasChargingMechineObj,
    getCode
  } from "../../GLOBAL";
  export default {
    components: {
      Tab,
      TabItem,
      FloatCircle
    },
    data() {
      return {
        userInfo: {},
        searchInfo: "",
        stationList: [],
        index01: 0,
        refreshing: false,
        chargingNum: 0,
        showFloatCircle: false, //是否展示悬浮球。
        hasNext: true,
        noDataText: "附近10公里范围内没有更多站点了",
        showUsuallyStation: false, //是否展示常用电站按钮
  
        //正式数据
        // postData: {
        //   pageIndex: 0,
        //   listLen: 10,
        //   searchInfo: "",
        //   position: [], // 39.907,116.337
        //   userId: "",
        //   listType: "" //bindList:带有绑定按钮的List normalList:不带有绑定按钮的List;
        // },
  
        //postData 测试参数
        postData: {
          pageIndex: 0,
          listLen: 10,
          searchInfo: "",
          position: [40.552, 116.167], // 39.907,116.337
          userId: "",
          listType: "normalList" //bindList:带有绑定按钮的List normalList:不带有绑定按钮的List;
        },
        height: "100%",
        scrollState: "", // refresh/infinite
        tabState: 1 //1:允许点击  0：不允许点击
      };
    },
    mounted() {
      this.top = 1;
      this.bottom = 0;
    },
    computed: {},
    methods: {
      back() {
        this.$router.go(-1);
      },
      /**
       * 绑定电站接口：bindStationUrl
       * 绑定成功后进行刷新操作。
       * params:  stationId->stationInfo   userId->localStorage
       */
      bindStation(stationInfo) {
        let _this = this;
        if (!!localStorage.getItem('userId')) {
          loader.show();
          MessageBox.confirm('您即将绑定电站？').then(action => {
            let bindStationUrl = GLOBAL.interfacePathToken + '/clyun/bindStation';
            axios
              .post(
                bindStationUrl, {
                  'stationId': (stationInfo.stationId).toString(),
                  'userId': localStorage.getItem('userId')
                })
              .then(function(data) {
                loader.hide();
                console.log(data);
                let res = data.data;
                if (res.code === 200) {
                  localStorage.setItem('usualStationId', stationInfo.stationId);
                  MessageBox.alert('绑定电站成功！');
                  _this.$refs.scrollDom.triggerPullToRefresh();
                }else if(res.code === 501){
                  //拦截器。
                }else{
                  MessageBox.alert(res.msg);
                }
                console.log('bindStationUrl|返回数据|', res);
              })
              .catch(function(err) {
                loader.hide();
                MessageBox.alert('接口异常！错误代码:105');
                console.log(err);
              });
          });
        } else {
          MessageBox.alert('您尚未登录，前去登录？').then(action => {
            this.$router.push({
              name: 'login'
            });
          });
        }
      },
      getStationList(done) {
        let _this = this;
        this.postData.pageIndex++;
        let stationListUrl = GLOBAL.interfacePath + '/clyun/stationList?postData=' + JSON.stringify(_this.postData);
        axios.get(stationListUrl).then(function(data) {
          console.log('>>>电站列表', data.data);
          // data.data = {
          //   "code": 200,
          //   "message": "充电站接口",
          //   "body": {
          //     "hasNext": true,
          //     "stationList": [{
          //       "stationName": "龙锦苑东五区充电站//充电站名称",
          //       "stationAddr": "北京市昌平区龙锦三街-龙锦苑东五区-13号楼1单元对面//充电站地址",
          //       "stationId": "001",
          //       "stationNum": "9803213213213//充电站编号",
          //       "payMethods": [
          //         "刷卡",
          //         "APP支付//支持的支付方式"
          //       ],
          //       "totalChargePortsNum": 3,
          //       "idleChargePortsNum": 2,
          //       "chargeType": "fast",
          //       "distanceToMe": 200,
          //       "operationTime": "00:00-24:00//运营时间",
          //       "operator": "运营商//运营商",
          //       "parkCost": "免费/2元/h//停车费用",
          //       "showBindBtn": true
          //     }]
          //   }
          // }
          // console.log(JSON.stringify(data));
          let request = data.data;
          if (_this.scrollState === "refresh") {
            _this.stationList = [];
          }
          _this.stationList = _this.stationList.concat(
            request.body.stationList
          );
          _this.hasNext = request.body.hasNext;
          _this.scrollState = "";
  
          if (_this.hasNext) {
            let noDataDom = document.getElementsByClassName("no-data-text")[0];
          }
  
          if (_this.stationList.length === 0) {
            let noDataDom = document.getElementsByClassName("no-data-text")[0];
            let noDataMsgHtml =
              '<img src="../../../static/img/empty.jpg"><p>没有发现充电站</p>';
            noDataDom.innerHTML = noDataMsgHtml;
          } else {
            _this.noDataText = "附近10公里范围内没有更多站点了！";
          }
          _this.$nextTick(function() {
            _this.$refs.scrollDom.resize();
          });
          done();
        });
      },
      //切换tab卡 重新请求信息
      switchTabItem(index) {
        console.log("on-before-index-change", index);
        this.postData.searchMethod =
          index === 0 ? "all" : index === 1 ? "slow" : "fast";
        this.postData.pageIndex = 0;
        this.index01 = index;
        // }, 1000)
        console.log(this.postData.searchMethod);
        this.$refs.scrollDom.triggerPullToRefresh();
      },
      refresh(done) {
        console.log("refresh-1");
        this.scrollState = "refresh";
        this.postData.pageIndex = 0;
        this.hasNext = true;
        let _this = this;
        if (this.hasNext) {
          _this.getStationList(done);
        } else {
          console.log('没有更多数据');
          this.$refs.scrollDom.finishInfinite(true);
        }
      },
      infinite(done) {
        let _this = this;
        //获取code 调用扫一扫功能
        if (GLOBAL.env !== 'test') {
          getCode(_this)
            .then(function(WXoptions) {
              // return new Promise(function(resolve, reject) {
              //alert('获取到的微信配置信息：---' + JSON.stringify(WXoptions));
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx1dfdc1b4affcd19d', // 必填，公众号的唯一标识
                timestamp: WXoptions.timestamp, // 必填，生成签名的时间戳
                nonceStr: WXoptions.nonceStr, // 必填，生成签名的随机串
                signature: WXoptions.signature, // 必填，签名
                jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表
              });
              wx.ready(function() {
                wx.getLocation({
                  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function(res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    _this.postData.position[0] = longitude;
                    _this.postData.position[1] = latitude;
                    //alert('获取经纬度：经度：' + latitude + '(经度)/' + longitude + '(纬度)/' + speed + '(速度)/' + accuracy + '(经度)');
                    //alert(JSON.stringify('发送给后台的定位信息' + _this.postData.position));
                    if (_this.hasNext && _this.scrollState === "") {
                      console.log("loadmore-1");
                      _this.getStationList(done);
                    } else {
                      console.log(`没有更多数据`);
                      _this.$refs.scrollDom.finishInfinite(true);
                    }
                  }
                });
              });
            });
        } else {
          if (_this.hasNext && _this.scrollState === "") {
            console.log("loadmore-1");
            _this.getStationList(done);
          } else {
            console.log(`没有更多数据`);
            _this.$refs.scrollDom.finishInfinite(true);
          }
        }
      },
      scanQRCode() {
        // alert('调用扫一扫');
        wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            //alert('扫一扫返回地址：' + result);
          }
        });
      }
    },
    mounted() {},
    created() {
      let _this = this;
      console.log('listType|电站列表：' + this.$route.params.listType);
      this.postData.listType = this.$route.params.listType;
      this.postData.userId = localStorage.getItem('userId');
      //~~~
      // getUserInfo().then(function(userInfo) {
      //   _this.userInfo = userInfo;
      // });
  
      //获取附近电站信息列表
      //调用  是否登录接口
      // axios
      //   .all([judgeLoginObj.normalFn(), hasChargingMechineObj.normalFn()])
      //   .then(function() {
      //     console.log("all");
      //     axios.spread(function(acc, pers) {
      //       console.log(acc);
      //       console.log(pers);
      //     });
      //   });
  
  
      //获取code 调用扫一扫功能
      /*getCode(_this).then(function(WXoptions) {
        alert('获取到的微信配置信息：---' + JSON.stringify(WXoptions));
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx1dfdc1b4affcd19d', // 必填，公众号的唯一标识
          timestamp: WXoptions.timestamp, // 必填，生成签名的时间戳
          nonceStr: WXoptions.nonceStr, // 必填，生成签名的随机串
          signature: WXoptions.signature, // 必填，签名
          jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度
              _this.postData.position[0] = longitude;
              _this.postData.position[1] = latitude;
              alert('获取经纬度：经度：'+latitude+'(经度)/'+longitude+'(纬度)/'+speed+'(速度)/'+accuracy+'(经度)');
              alert(JSON.stringify('发送给后台的定位信息'+_this.postData.position));
            }
          });
        });
      });
      */
  
  
  
      // function judgeLoginFn(){
      //   return axios.get('');
      // }
      // function hasChargingMechineFn(){
      //   return axios.get('');
      // }
      // axios.all([judgeLoginFn(),hasChargingMechineFn()]).then(function(){
      //   console.log('2222');
  
      //   axios.spread(function(acc,pers){
      //     console.log(222);
      //     console.log(acc);
      //     console.log(pers);
      //   });
      // })
  
      var html = `  `;
    },
    watch: {
      searchInfo: function(nv, ov) {
        console.log(nv, ov);
        this.postData.searchInfo = nv;
        this.$refs.scrollDom.triggerPullToRefresh();
      }
    }
  };
</script>

<style lang="less">
  @import "~vux/src/styles/1px.less";
  @import "~vux/src/styles/center.less";
</style>

<style lang="scss">
  @import "../../../static/css/common.scss";
  @import "../../../static/css/iconfont.css";
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
    padding-left: 1.3rem;
    height: 1.3rem;
    border-radius: 3px;
    background-color: #f7f7f7;
    padding-right: 0.2rem;
    margin: 0 0.6rem;
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
    margin: auto 0.5rem;
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
    &>div {
      height: 2rem;
      &.checked {
        color: #2eafed;
        &>.icon-elec {
          background: url("../../../static/img/bolt-blue.png") center center no-repeat;
          background-size: 100% 100%;
        }
        &>.icon-scan {
          background: url("../../../static/img/bolt-blue.png") center center no-repeat;
          background-size: 100% 100%;
        }
        &>.icon-me {
          background: url("../../../static/img/person-blue.png") center center no-repeat;
          background-size: 100% 100%;
        }
        &>p {
          text-align: center;
        }
      }
    }
  }
  
  .btn-bind {
    width: 80%;
    border: 1px solid #2eafed;
    height: 1.2rem;
    @include fcm;
    border-radius: 5px;
    color: #2eafed;
    margin: 0.2rem auto;
  }
  
  .pt1 {
    padding-top: 3.5rem !important;
  }
  
  .pt2 {
    padding-top: 5.5rem !important;
  }
</style>

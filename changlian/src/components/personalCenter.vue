<template>
  <div class="center-box">
    <!-- 头部 -->
    <div class="center-header">
      <div class="por">
        <div class="v-fm">
          <img src="../../static/img/head-pic-blue.png" alt="">
          <div v-if="!userInfo.loginState" class="v-fcm">
            <p @click="routerTo('login')">登录</p>
            <p style="margin:0 .2rem;">|</p>
            <p @click="routerTo('login')">注册</p>
          </div>
          <div v-else>
            <span>{{userInfo.phone}}</span>
          </div>
        </div>
        <div>账户余额：<span v-bind:val1="userInfo.loginState">{{userInfo.loginState?userInfo.balance:'--:--'}}</span> 元</div>
        <div class="setting-message v-fm">
          <i class="iconfont icon-lingdang"></i>
          <div v-if="userInfo.loginState && userInfo.hasNews" class="v-f" style="height:.8rem;">
            <span class="icon-point-red"></span>
          </div>
          <span @click="routerTo('myNews','')">消息中心</span>
          <div class="v-fcm" @click="routerTo('settings','')">
            <i class="iconfont icon-ttpodicon" style="display:block;"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <!-- tab卡 -->
    <div class="center-handle v-f">
      <a @click="routerTo('recharge')" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-charge"></i>
          <p>充值</p>
        </div>
      </a>
      <a @click="routerTo('cardsBag')" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-cardBox"></i>
          <p>卡包</p>
        </div>
      </a>
      <a @click="routerTo('IDCardList')" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-bindCard"></i>
          <p>卡片绑定</p>
        </div>
      </a>
    </div>
    <div class="blank"></div>
    <!-- 中心列表 -->
    <div class="center-list">
      <a @click="routerTo('rechargeLog')" class="v-fm">
        <i class="icon-rechargeLog"></i>
        <p class="v-i1">充值记录</p>
        <i class="icon-right"></i>
      </a>
      <a @click="routerTo('chargeElecLog')" class="v-fm">
        <i class="icon-chargeLog"></i>
        <p class="v-i1">充电记录</p>
        <i class="icon-right"></i>
      </a>
      <a @click="routerTo('chooseStationPort')" :to="{name:'chooseStationPort',params:{stationId:userInfo.usualStationId}}" class="v-fm">
        <i class="icon-star"></i>
        <p class="v-i1">常用电站</p>
        <i class="icon-right"></i>
      </a>
    </div>
    <div class="blank"></div>
    <div class="center-list">
      <router-link :to="{name:'aboutUs'}" class="v-fm">
        <i class="icon-operator"></i>
        <p class="v-i1">经营者管理平台</p>
        <i class="icon-right"></i>
      </router-link>
      <router-link :to="{name:'aboutUs'}" class="v-fm">
        <i class="icon-attention"></i>
        <p class="v-i1">关于我们</p>
        <i class="icon-right"></i>
      </router-link>
    </div>
    <!-- 底部导航栏 -->
    <div class="footer v-f">
      <router-link class="v-i1" :to="{name:'nearbyStation'}">
        <i class="icon-elec m-auto"></i>
        <p class="tac">电站</p>
      </router-link>
      <div class="v-i1">
        <p class="tac" style="margin-top:1.05rem;">扫一扫</p>
      </div>
      <div class="v-i1 checked">
        <i class="icon-me"></i>
        <p class="tac">我</p>
      </div>
      <div class="icon-scan">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
import GLOBAL, { getUserInfo } from "../GLOBAL";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    login() {},
    register() {},
    // 跳到到相关页面
    routerTo(name, params) {
      if(this.userInfo.loginState){
        this.$router.push({name:name,params:params});
      }else{
        this.$router.push({name:'login'});
      }
    }
  },
  created() {
    let _this = this;
    let userId = sessionStorage.getItem("userId");
    if (!!userId) {
      getUserInfo().then((userInfo)=>{
        _this.userInfo = Object.assign({}, _this.userInfo, userInfo);
      })
    }
  }
};
</script>

<style lang="scss">
@import "../../static/css/common.scss";
@import "../../static/css/iconfont.css";
.center-header {
  overflow: hidden;
  height: 8.5rem;
  color: #fff;
  background: url("../../static/img/personal-bg.png") top center no-repeat;
  background-size: 100%;
  & img {
    width: 3.2rem;
    height: 3.2rem;
    display: block;
    margin: 0 0.5rem 0.2rem 0;
  }
  & > div {
    margin: 1rem 0 0 1rem;
  }
  & .setting-message {
    position: absolute;
    right: 0.5rem;
    top: 0;
    .icon-point-red {
      width: 5px;
      height: 5px;
      display: block;
      border-radius: 50%;
      background-color: #e51c23;
      margin-right: 0.2rem;
    }
  }
}

.center-handle {
  height: 3.5rem;
  & > a {
    border-right: 1px solid #e6e6e6;
    &:last-child {
      border: none;
    }
    i {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0 auto 0.2rem;
      display: block;
      background-size: 100% 100%;
    }
  }
}

.center-list {
  & > a {
    height: 1.8rem;
    border-bottom: 1px solid #e6e6e6;
    & > i {
      width: 1rem;
      height: 1rem;
      margin: 0 1rem 0;
      display: block;
      background-size: 100% 100%;
    }
  }
}

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

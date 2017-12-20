<template>
  <div class="center-box">
    <!-- 头部 -->
    <div class="center-header">
      <div class="por">
        <div class="v-fm">
          <img src="../../static/img/head-pic-blue.png" alt="">
          <p @click="login">登录</p>
          <p style="margin:0 .2rem;">|</p>
          <p @click="register">注册</p>
        </div>
        <div>账户余额：<span v-text="accountReharge"></span>元</div>
        <div class="setting-message v-fm">
          <i class="iconfont icon-lingdang"></i>
          <span>
            <span class="icon-point">·</span>消息中心
          </span>
          <div>
            <i class="iconfont icon-ttpodicon" style="display:block;"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <!-- tab卡 -->
    <div class="center-handle v-f">
      <router-link :to="{name:'recharge'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-charge"></i>
          <p>充值</p>
        </div>
      </router-link>
      <router-link :to="{name:'rechargeLog'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-chargeMoneyLog"></i>
          <p>卡包</p>
        </div>
      </router-link>
      <router-link :to="{name:'bindIC'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-ICbind"></i>
          <p>卡片绑定</p>
        </div>
      </router-link>
      <!-- <router-link :to="{name:'chargeElecLog'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-chargeElecLog"></i>
          <p>充电记录</p>
        </div>
      </router-link> -->
    </div>
    <div class="blank"></div>
    <!-- 中心列表 -->
    <div class="center-list">
      <router-link :to="{name:'usuallyStation'}" class="v-fm">
        <i class="icon-star"></i>
        <p class="v-i1">常用电站</p>
        <i class="icon-right"></i>
      </router-link>
      <router-link :to="{name:'myNews'}" class="v-fm">
        <i class="icon-email"></i>
        <p class="v-i1">我的消息<i v-show="hasNews" class="icon-redPoint">·</i></p>
        <i class="icon-right"></i>
      </router-link>
      <router-link :to="{name:'operatorPlatform'}" class="v-fm">
        <i class="icon-operator"></i>
        <p class="v-i1">运营商管理平台</p>
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
      <div  class="v-i1 checked">
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
export default {
  data() {
    return {
      accountReharge: "" || "--:--",
      hasNews: true
    };
  },
  methods: {
    login() {},
    register() {}
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
  & .setting-message{
    position: absolute;
    right:.5rem;
    top:0;
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
      width: 1.3rem;
      height: 1.3rem;
      margin: 0 auto 0.2rem;
      display: block;
      background-size: 100% 100%;
    }
  }
}
.center-list {
  & > a {
    height: 1.5rem;
    border-bottom: 1px solid #e6e6e6;
    & > i {
      width: 0.7rem;
      height: 0.7rem;
      margin: 0 0.3rem 0;
      display: block;
      background-size: 100% 100%;
    }
  }
}
.footer {
    border-top:1px solid #eee;
    position: absolute;
    bottom:0;
    width:100%;
    z-index:2;
    background:#f8f8f8;
    border-top:1px solid #d0d0d0;
    &>div {
      height:2rem;
      &.checked {
        color:#2eafed;
        &>.icon-elec {
          background: url('../../static/img/bolt-blue.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &>.icon-scan {
          background: url('../../static/img/bolt-blue.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &>.icon-me{
          background:url('../../static/img/person-blue.png') center center no-repeat;
          background-size:100% 100%;
        }
        &>p {
          text-align: center;
        }
      }
      
    }
  }
</style>

<template>
  <div class="center-box">
    <!-- 头部 -->
    <div class="center-header">
      <div>
        <div class="v-fm">
          <img src="../../static/img/person-green2.png" alt="">
          <p @click="login">登录</p>
          <p style="margin:0 .2rem;">|</p>
          <p @click="register">注册</p>
        </div>
        <div>账户余额：<span v-text="accountReharge"></span>元</div>
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
      <router-link :to="{name:'bindIC'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-ICbind"></i>
          <p>IC卡绑定</p>
        </div>
      </router-link>
      <router-link :to="{name:'rechargeLog'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-chargeMoneyLog"></i>
          <p>充值记录</p>
        </div>
      </router-link>
      <router-link :to="{name:'chargeElecLog'}" class="v-fcm v-i1">
        <div class="tac">
          <i class="icon-chargeElecLog"></i>
          <p>充电记录</p>
        </div>
      </router-link>
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
.icon-right {
  width: 0.4rem !important;
  height: 0.4rem !important;
  border-right: 2px solid #adadad;
  border-top: 2px solid #adadad;
  transform: rotate(45deg);
  margin-right: 0.8rem !important;
}
.icon-charge {
  background: url("../../static/img/money.png") center center no-repeat;
}

.icon-ICbind {
  background: url("../../static/img/book.png") center center no-repeat;
}

.icon-chargeMoneyLog {
  background: url("../../static/img/money-red.png") center center no-repeat;
}

.icon-chargeElecLog {
  background: url("../../static/img/recharge-log.png") center center no-repeat;
}

.icon-star {
  background: url("../../static/img/star.png") center center no-repeat;
}

.icon-email {
  background: url("../../static/img/email-green.png") center center no-repeat;
}

.icon-operator {
  background: url("../../static/img/person-blue.png") center center no-repeat;
}

.icon-attention {
  background: url("../../static/img/attention.png") center center no-repeat;
}

.icon-redPoint {
  color: red;
  font-size: 1.3rem;
  position: absolute;
  margin-top: -0.8rem;
  margin-left: 0.1rem;
}
</style>

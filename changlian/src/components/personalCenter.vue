<template>
  <div class="center-box">
  
    <div class="center-header">
      <div>
        <div class="v-fm">
          <img src="" alt="">
          <p @click="login">登录</p> |
          <p @click="register">注册</p>
        </div>
        <div>账户余额：<span v-text="accountReharge"></span>元</div>
      </div>
    </div>
  
    <div class="blank"></div>
  
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
  
    <div class="center-list"></div>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        accountReharge: "" || "--:--"
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
    height: 8.5rem;
    background: url("../../static/img/personal-bg.png") top center no-repeat;
    background-size: 100%;
  }
  
  .center-handle {
    height: 3.5rem;
    &>a {
      border-right: 1px solid #e6e6e6;
      &:last-child {
        border: none;
      }
      i {
        width: 1rem;
        height: 1rem;
        margin: 0 auto 0.2rem;
        display: block;
        background-size: 100% 100%;
      }
    }
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
</style>

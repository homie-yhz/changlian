<template>
  <div>
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">常用电站</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div style="width:85%;" class="m-auto login-box mt-5">
        <input type="tel" v-model="phone" maxlength="11" class="mt-5" placeholder="手机号">
        <p @click="nextStep" class="btn btn-login v-fcm" :class="{disable:phone.length!=11}">下一步</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      title: ""
    };
  },
  methods: {
    // 下一步  输入手机验证码
    nextStep() {
      if (this.phone.length === 11) {
        this.$router.push({
          name: "identifyCodeInput",
          params: { phone: this.phone }
        });
      }
    }
  },
  created() {
    console.log(this.$route.params.title);
    this.title = this.$route.params.title === "register" ? "注册" : "找回密码";
  }
};
</script>
<style lang="scss">
@import "../../../static/css/common.scss";
.login-box {
  & > input {
    height: 1.8rem;
    width: 100%;
    border-bottom: 1px solid #bbbbbb;
    &:last-child {
      margin-top: 0.5rem;
    }
  }
}
.btn-login {
  margin: 0.8rem 0;
  border-radius: 3px;
  height: 1.6rem;
}
</style>

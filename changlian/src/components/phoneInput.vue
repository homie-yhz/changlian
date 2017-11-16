<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">{{title}}</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div style="width:85%;" class="m-auto login-box mt-5">
        <input type="tel" v-model="phone" maxlength="11" class="mt-5" placeholder="手机号">
        <p @click="nextStep" class="btn-login v-fcm">下一步</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone:'',
      title:''
    };
  },
  methods:{
    // 下一步  输入手机验证码
    nextStep(){
      this.$router.push({name:'identifyCodeInput'});
    }
  },
  created(){
    console.log(this.$route.params.title);
    this.title = (this.$route.params.title==='register')?'注册':'找回密码';
  }
};
</script>
<style lang="scss">
@import '../../static/css/common.scss';
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
  background-color: #19d64e;
  color: #fff;
  margin: 0.8rem 0;
  border-radius: 3px;
  height: 1.6rem;
}
</style>

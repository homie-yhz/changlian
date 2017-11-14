<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">登录</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div>
      <!-- 图标 -->
      <div class="v-fcm">
        <div style="margin:2rem 0;">
          <div class="icon-star"></div>
          <div>畅联通，共享用</div>
        </div>
      </div>
      <!-- 登录输入框 -->
      <div style="width:85%;" class="m-auto login-box">
        <input type="text" v-model="loginInfo.phone" placeholder="手机号">
        <input type="text" v-model="loginInfo.pwd" placeholder="密码">
        <p class="v-fb register-or-backpwd">
          <router-link :to="'phoneInput'" class="v-fm td-u">新用户注册>></router-link>
          <router-link :to="'pwdInput'" class="v-fm td-u">找回密码</router-link>
        </p>
        <p @click="login" class="btn-login v-fcm">登录</p>
        <p class="tac agreement">登录即表示同意《畅联通用户协议》</p>
        <div class="v-fm other-login-method">
          <p class="v-i1"></p>
          <p>其它方式登录</p>
          <p class="v-i1"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import GLOBAL from '../GLOBAL';
export default {
  data() {
    return {
      loginInfo: {}
    };
  },
  methods: {
    login() {
      let _this = this;
      console.log("提交登录信息");
      let url = GLOBAL.interfacePath + '';
      axios
        .get(loginUrl)
        then(function(data){
          console.log('url|返回数据|'+JSON.stringify(data.data));
          
        })
        .catch(function(err){
          console.log({'url':url,'err':JSON.stringify(err)});
        })
    }
  }
};
log
</script>
<style lang="scss">
.header {
  height: 2rem;
  border-bottom: 1px solid #d9d9d9;
}
.arrow-back {
  width: 0.4rem;
  height: 0.4rem;
  border-left: 2px solid #616161;
  border-top: 2px solid #616161;
  transform: rotate(-45deg);
  margin-left: 0.5rem;
}
.icon-star {
  display: block;
  width: 1rem;
  height: 1rem;
  background: url("../assets/logo.png") center center no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}
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
.other-login-method {
  margin-top: 2rem;
  color: #999;
  font-size: 0.5rem;
  & > p:nth-child(2) {
    margin: 0 0.5rem;
  }
  & > :first-child,
  :last-child {
    border-top: 1px solid #dbdbdb;
  }
}
.register-or-backpwd > a {
  margin-top: 0.2rem;
  text-decoration: underline;
  color: #e65300;
}
.agreement {
  color: #5c5c5c;
  font-size: 0.55rem;
}
</style>

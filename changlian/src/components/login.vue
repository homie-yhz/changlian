<template>
  <div>
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">常用电站</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box">
      <div>
        <!-- 图标 -->
        <div class="v-fcm">
          <div style="margin:2rem 0;">
            <div class="icon-changlian-logo"></div>
            <div>畅联通，共享用</div>
          </div>
        </div>
        <!-- 登录输入框 -->
        <div style="width:85%;" class="m-auto login-box">
          <input type="text" v-model="loginInfo.phone" placeholder="手机号" maxlength="11">
          <input type="text" v-model="loginInfo.pwd" placeholder="密码">
          <p class="v-fb register-or-backpwd">
            <router-link :to="{name:'phoneInput',params:{title:'register'}}" class="v-fm">新用户注册</router-link>
            <router-link :to="{name:'phoneInput',params:{title:'backPwd'}}" class="v-fm">找回密码?</router-link>
          </p>
          <p @click="login" class="btn-login v-fcm">登录</p>
          <p class="tac agreement">登录即表示同意
            <router-link :to="{name:'userAgreement'}">《畅联通用户协议》</router-link>
            </p>
          <div class="v-fm other-login-method">
            <p class="v-i1"></p>
            <p>其它方式登录</p>
            <p class="v-i1"></p>
          </div>
          <div class="icon-wx-logo" style="margin-top:.3rem;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GLOBAL from "../GLOBAL";
export default {
  data() {
    return {
      loginInfo: {}
    };
  },
  methods: {
    back(){
      this.$router.go(-1);
    },
    login() {
      let _this = this;
      console.log("提交登录信息");
      let url = GLOBAL.interfacePath + "";
      axios.get(loginUrl);
      then(function(data) {
        console.log("url|返回数据|" + JSON.stringify(data.data));
      }).catch(function(err) {
        console.log({
          url: url,
          err: JSON.stringify(err)
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../static/css/common.scss";
@import "../../static/css/iconfont.css";
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
  background-color: #2eafed;
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
  margin-top: 0.4rem;
  color: #2eafed;
  font-size:.55rem;
}

.agreement {
  color: #5c5c5c;
  font-size: 0.55rem;
  a{
    color:#2eafed;
  }
}
</style>

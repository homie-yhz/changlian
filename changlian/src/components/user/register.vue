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
        <div style="width:85%;" class="register-box">
          <div>
            <input type="tel" v-model="postData.phone" maxlength="11" placeholder="手机号">
            <span @click="getCode" style="color:#2eafed">{{getCodeBtn.text}}</span>
          </div>
          <input type="tel" v-model="postData.identifyCode" maxlength="6" placeholder="验证码">
          <input type="password" v-model="postData.pwd" maxlength="16" placeholder="密码（请输入6-16位字幕+数字的密码组合）">
          <p @click="postUserInfo" class="btn btn-login v-fcm" :class="{disable:!allowNext}">下一步</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import GLOBAL from "../../GLOBAL";
import axios from "axios";
import regExp from "../../RegExp";
import { Toast } from "mint-ui";
import VueJsonp from "vue-jsonp";
Vue.use(VueJsonp);
import "mint-ui/lib/toast/style.css";
const leftTime = 60;

export default {
  data() {
    return {
      phone: "",
      title: "",
      allowNext: false,
      getCodeBtn: {
        state: 1, //0:不可以点击  1：允许点击  2：倒计时
        leftTime: leftTime,
        text: "发送验证码" //倒计时剩余时间,
      },
      postData: {
        phone: "",
        identifyCode: "",
        pwd: "",
        smsId:"",
      }
    };
  },
  methods: {
    back(){
      this.$router.go(-1);
    },
    // 下一步  输入手机验证码
    nextStep() {
      if (this.phone.length === 11) {
        this.$router.push({
          name: "identifyCodeInput",
          params: {
            phone: this.phone
          }
        });
      }
    },
    //获取验证码
    getCode() {
      if (this.getCodeBtn.state === 1) {
        console.log("允许点击");
        this.getCodeBtn.text = leftTime + "s后重新获取";
        this.countDown();
        this.getIndentifyCode_IF();
      }
    },
    //倒计时
    countDown() {
      this.getCodeBtn.state = 2;
      let _this = this;
      setTimeout(() => {
        _this.getCodeBtn.text = --_this.getCodeBtn.leftTime + "s后重新获取";
        if (_this.getCodeBtn.leftTime > 0) {
          _this.countDown();
        } else {
          // 重置数据
          _this.getCodeBtn = {
            state: 1, //0:不可以点击  1：允许点击  2：倒计时
            leftTime: leftTime,
            text: "重新获取" //倒计时剩余时间,
          };
        }
      }, 1000);
    },
    //获取验证码接口
    getIndentifyCode_IF() {
      //params:phone
      let getIndentifyCodeUrl = GLOBAL.interfacePath + '/getIndentifyCodeUrl?phone='+this.postData.phone;
      // let getIndentifyCodeUrl = "";
      let _this = this;
      axios
        .get(getIndentifyCodeUrl)
        .then(function(data) {
          console.log("getIndentifyCodeUrl|返回数据|" + JSON.stringify(data.data));
          let body = JSON.parse(data.data.body);
          if (!!data.data) {
            sessionStorage.setItem('smsId',body.smsId);
            _this.postData.smsId = body.smsId;
            alert("验证码" + body.code);
          }
        })
        .catch(function(err) {
          console.log({
            url: getIndentifyCodeUrl,
            err: JSON.stringify(err)
          });
        });
    },
    //点击下一步  注册成功
    postUserInfo() {
      let postRegisterInfoUrl = (GLOBAL.env==='UAT'?'/api':GLOBAL.interfacePath)+'/postRegisterInfoUrl';
      //let postRegisterInfoUrl = "";
      let _this = this;
      axios
        .post(postRegisterInfoUrl,{
        phone: "17777777777",
        identifyCode: "111111",
        pwd: "afdsa123213",
        smsId:"28",
      })
        .then(function(data) {
          console.log("postRegisterInfoUrl|返回数据|" + JSON.stringify(data.data));
        })
        .catch(function(err) {
          console.log({ url: postRegisterInfoUrl, err: JSON.stringify(err) });
        });
    }
  },
  created() {},
  watch: {
    postData: {
      handler(nv) {
        console.log(JSON.stringify(nv));
        if (
          regExp.phone.test(nv.phone) &&
          regExp.identifyCode.test(nv.identifyCode) &&
          regExp.pwd.test(nv.pwd)
        ) {
          this.allowNext = true;
        } else {
          this.allowNext = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/css/common.scss";
.register-box {
  margin: 0.5rem auto 0;
  & > div {
    border-bottom: 1px solid #bbbbbb;
    @include fm;
    & > input {
      @include i1;
      border-bottom: none;
    }
    & > span {
      display: block;
      height: 2rem;
      @include fm;
    }
  }
  input {
    height: 2rem;
    width: 100%;
    border-bottom: 1px solid #bbbbbb;
    &:last-child {
    }
  }
}

.btn-login {
  margin: 0.8rem 0;
  border-radius: 3px;
  height: 1.6rem;
}
</style>
